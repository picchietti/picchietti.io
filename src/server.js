import fs from 'fs';
import http from 'http';
import http2 from 'http2';

import app from './server/koa.js';

const privateKey = fs.readFileSync('./src/secret/letsencrypt/live/picchietti.io/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./src/secret/letsencrypt/live/picchietti.io/fullchain.pem', 'utf8');
const options = {
  key: privateKey,
  cert: certificate,
  allowHTTP1: true
};
const port = 443;
http2.createSecureServer(options, app.callback()).listen(port, () => {
  console.log(`node koa server running on port ${port}`);
});

// redirect http to https
http.createServer(function(req, res) {
  res
    .writeHead(302, { Location: `https://${req.headers.host}${req.url}` })
    .end();
}).listen(80);
