const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const shrinkray = require('shrink-ray-current');
const helmet = require('helmet');

const app = express();
const rootDir = '/usr/src/app';

require('./passport.js')(passport);
const uploader = require('./multer.js')(multer);

app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'www.google-analytics.com'
    ]
  },
  loose: true
}));
if(process.env.NODE_ENV !== 'development') {
  app.use(helmet.hsts({
    // Must be at least 1 year for preload
    maxAge: 31536000,

    // Must be enabled for preload
    includeSubDomains: true,
    preload: true
  }));
}

app.use(shrinkray({
  threshold: 100
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const devWebpackConfig = require('../../configs/webpack.dev.js');
  const compiler = webpack(devWebpackConfig);
  const devMiddleware = require('webpack-dev-middleware');
  app.use(devMiddleware(compiler, {
    publicPath: devWebpackConfig.output.publicPath
  }));
}

// // Routes
const router = new express.Router();

require('../routes.js')(router, passport, uploader);

// Static Resources - AFTER ROUTES.js so restricted access routes have priority.
router.use(express.static('./dist/public/'));

// send user the homepage with a react router that decides what page component to load
router.use(function(req, res, next) {
  res.sendFile(`${rootDir}/dist/public/index.html`);
});

app.use('/', router);

module.exports = app;
