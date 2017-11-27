'use strict';

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

const root_dir = '/usr/src/app';

require('./private/passport.js')(passport);
var uploader = require('./private/multer.js')(multer);

app.use(shrinkray());
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

app.use(nodeadmin(app));

// // Routes
const router = express.Router();

require('./routes.js')(router, passport, uploader);

// Static Resources - AFTER ROUTES.js so restricted access routes have priority.
router.use(express.static('./public/'));

// send user the homepage with a react router that decides what page component to load
router.use(function (req, res, next) {
  res.sendFile(root_dir + '/public/index.html');
});

app.use('/', router);

var privateKey  = fs.readFileSync('./secret/letsencrypt/live/picchietti.io/privkey.pem', 'utf8');
var certificate = fs.readFileSync('./secret/letsencrypt/live/picchietti.io/fullchain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
spdy.createServer(credentials, app).listen(443); // https + http2

var http = express();
http.get('*', function(req, res){
  res.redirect("https://" + req.headers.host + req.url);
});
http.listen(80);
