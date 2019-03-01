const google = require('googleapis');
const analytics = google.analytics('v3');
const moment = require('moment');
const key = require('../../../secret/resume-stats-a8a939419e3a.json'); // eslint-disable-line import/no-unresolved
const mongo = require('../../../server/mongodb.js');

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  'https://www.googleapis.com/auth/analytics.readonly',
  null
);

const Analytics = {
  startEnd: moment().subtract(1, 'days'),
  todo: 0,

  save: function(id, source) {
    Analytics.todo++;
    const startEndString = Analytics.startEnd.format('YYYY-MM-DD');

    const params = {
      auth: jwtClient,
      ids: `ga:${id}`,
      'start-date': startEndString,
      'end-date': startEndString,
      metrics: 'ga:users,ga:pageviews'
    };

    analytics.data.ga.get(params, function(err, response) {
      const totals = response.totalsForAllResults;
      Analytics.store(totals, source);
    });
  },

  store: function(totals, source) {
    mongo.getDb().then((db) => {
      const users = parseInt(totals['ga:users']);
      const pageviews = parseInt(totals['ga:pageviews']);

      db.collection('impact_analytics').insert({
        pageviews: pageviews,
        users: users,
        source: source,
        ymd: Analytics.startEnd.toDate()
      }, (error, result) => {
        // or else command line script wont exit
        if(--Analytics.todo === 0)
          mongo.close();
      });
    });
  }
};

jwtClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  Analytics.save('41469908', 'siualumni.com'); // since '2013-10-30'
  Analytics.save('82388800', 'dnadiscovery.net'); // since '2014-02-18'
  Analytics.save('118734877', 'picchietti.io'); // since '2016-03-26'
});

// // Legacy
// Analytics.save('71729805', 'jonpicchietti.com'); // since '2013-04-26'
