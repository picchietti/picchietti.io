const endpointUsers = require('./endpoints/data/month/users.js');
const endpointPageviews = require('./endpoints/data/month/pageviews.js');

const setupRoutes = (router) => {
  router.get('/data/month/users', endpointUsers);
  router.get('/data/month/pageviews', endpointPageviews);
};

module.exports = setupRoutes;
