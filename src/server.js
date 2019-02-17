const fs = require('fs');
const express = require('express');
const spdy = require('spdy');
const app = require('./server/app.js');

const privateKey = fs.readFileSync('./src/secret/letsencrypt/live/picchietti.io/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./src/secret/letsencrypt/live/picchietti.io/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
spdy.createServer(credentials, app).listen(443); // https + http2

const http = express();
http.get('*', function(req, res) {
  res.redirect(`https://${req.headers.host}${req.url}`);
});
http.listen(80);
