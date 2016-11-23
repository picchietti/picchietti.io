'use strict';

const root_dir = '/usr/src/app/picchietti.io';

// // App
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const nodeadmin = require('nodeadmin');
const fs = require('fs');
const spdy = require('spdy');
const shrinkray = require('shrink-ray');
// const helmet = require('helmet');

require('./private/passport.js')(passport);
var uploader = require('./private/multer.js')(multer);

// app.use(helmet.hsts());
app.use(shrinkray());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'pleasechangethis',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // change to true once https is enabled
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(nodeadmin(app));

// // Routes
const router = express.Router();

require('./routes.js')(router, passport, uploader);

// Static Resources - AFTER ROUTES.js so restricted access routes have priority.
router.use(express.static(root_dir + '/public/'));


// 404 redirect.
router.use(function (req, res, next) {
  res.status(404).sendFile(root_dir + '/public/pages/404/index.html');
});

app.use('/', router);


var privateKey  = fs.readFileSync('/usr/src/app/picchietti.io/private/letsencrypt/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/usr/src/app/picchietti.io/private/letsencrypt/fullchain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
spdy.createServer(credentials, app).listen(443); // https + http2

var http = express();
http.get('*', function(req, res){
  res.redirect("https://" + req.headers.host + req.url);
});
http.listen(80);
