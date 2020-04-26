import axios from 'axios';
import moment from 'moment';

// eslint-disable-next-line import/no-unresolved
import credentials from '../../../secret/cloudflare.js';
import mongo from '../../../server/mongodb.js';

const cloudflareRequest = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4/',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Email': credentials.apiEmail,
    'X-Auth-Key': credentials.apiKey
  }
});

const zones = [
  { name: 'picchietti.io', id: '8f53de18f785024ba8faeb2d50d60f52' }
];

const rfc3339 = 'YYYY-MM-DDTHH:mm:ss[Z]';
const yesterday = moment().subtract(1, 'days');
const today = moment().format(rfc3339);

const zonePromises = zones.map((zone) => {
  return cloudflareRequest.get(
    `zones/${zone.id}/analytics/dashboard` +
      `?since=${yesterday.format(rfc3339)}` +
      `&until=${today}` +
      '&continuous=true' // default, moves time frame back to match a full bucket
  ).then((response) => {
    const users = response.data.result.totals.uniques.all;
    const pageviews = response.data.result.totals.pageviews.all;

    return mongo.getDb().then((db) => {
      db.collection('impact_analytics').insertOne({
        pageviews: pageviews,
        users: users,
        source: zone.name,
        ymd: yesterday.toDate()
      });
    });
  }).catch((error) => {
    if (error.response) {
      const response = error.response;
      console.error(
        `Status ${response.status}: ${response.statusText}`
      );
    }
    else {
      console.log('error', error);
    }
  });
});

Promise.all(zonePromises).then(() => mongo.close());
