const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const shrinkray = require('shrink-ray-current');

const setupRoutes = require('./routes.js');
const setSecurityHeaders = require('./securityHeaders.js');

const app = express();
const rootDir = '/usr/src/app';

setSecurityHeaders(app);

app.use(shrinkray({
  threshold: 100
}));
app.use(cookieParser());
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const devWebpackConfig = require('../../configs/webpack.dev.js');
  const compiler = webpack(devWebpackConfig);
  const devMiddleware = require('webpack-dev-middleware');
  app.use(devMiddleware(compiler, {
    publicPath: devWebpackConfig.output.publicPath,
    writeToDisk: true
  }));
}

// // Routes
const router = new express.Router();

setupRoutes(router);

// Static Resources - AFTER setupRoutes so restricted access routes have priority.
router.use(express.static('./dist/'));

// send user the homepage with a react router that decides what page component to load
router.use(function(req, res, next) {
  res.sendFile(`${rootDir}/dist/index.html`);
});

app.use('/', router);

module.exports = app;
