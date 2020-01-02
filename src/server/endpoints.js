import endpointUsers from './endpoints/data/month/users.js';
import endpointPageviews from './endpoints/data/month/pageviews.js';
import endpointContributions from './endpoints/data/month/contributions.js';

const setupEndpoints = (router) => {
  router.get('/data/month/users', endpointUsers);
  router.get('/data/month/pageviews', endpointPageviews);
  router.get('/data/month/contributions', endpointContributions);
};

export default setupEndpoints;
