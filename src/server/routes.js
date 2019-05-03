const passport = require('passport');

const restrictAccess = require('./middleware/restrictAccess.js');
const allowUpload = require('./middleware/allowUpload.js');

const endpointUrl = require('./endpoints/upload/url.js');
const endpointUsers = require('./endpoints/data/month/users.js');
const endpointPageviews = require('./endpoints/data/month/pageviews.js');
const endpointLogin = require('./endpoints/login.js');
const endpointLogout = require('./endpoints/logout.js');

const rootDir = '/usr/src/app';

const setupRoutes = (router) => {
  router.post('/upload/file', restrictAccess, allowUpload, (req, res) => {
    res.status(204).end();
  });
  router.post('/upload/url', restrictAccess, endpointUrl);

  router.get('/data/month/users', endpointUsers);
  router.get('/data/month/pageviews', endpointPageviews);

  router.post('/login', passport.authenticate('local'), endpointLogin);
  router.get('/logout', endpointLogout);

  router.get('/pages/uploader', restrictAccess, function(req, res) {
    res.sendFile(`${rootDir}/dist/index.html`);
  });
};

module.exports = setupRoutes;
