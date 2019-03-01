const google = require('googleapis');
const analytics = google.analytics('v3');
const moment = require('moment');
const sleep = require('sleep');
const key = require('../../secret/resume-stats-a8a939419e3a.json'); // eslint-disable-line import/no-unresolved
const mongo = require('../mongodb.js');

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  'https://www.googleapis.com/auth/analytics.readonly',
  null
);

mongo.getDb().then((db) => {
  const Analytics = {
    yesterday: moment().subtract(1, 'days'),
    todo: [], // each item is an array with id, source, and since strings

    doAll: function() {
      if(!Analytics.todo.length) {
        db.end();
        return;
      }

      const todo = Analytics.todo.shift();
      const source = todo[1];
      const since = moment(todo[2]);

      console.log('getting analytics for...', source);

      if(since.isSameOrBefore(Analytics.yesterday)) {
        Analytics.get(todo[0], source, since);
      }
    },

    get: function(id, source, since) {
      const sinceString = since.format('YYYY-MM-DD');
      console.log('getting analytics for', source, sinceString);

      const params = {
        auth: jwtClient,
        ids: `ga:${id}`,
        'start-date': sinceString,
        'end-date': sinceString,
        metrics: 'ga:users,ga:pageviews'
      };

      analytics.data.ga.get(params, function(err, response) {
        console.log('got analytics for', source, sinceString);
        const totals = response.totalsForAllResults;
        Analytics.store(totals, source, since.toDate());

        since.add(1, 'days');
        if(since.isSameOrBefore(Analytics.yesterday)) {
          sleep.sleep(3);
          Analytics.get(id, source, since);
        }
        else {
          console.log('...done getting analytics for', source);
          Analytics.doAll();
        }
      });
    },

    store: function(totals, source, when) {
      const users = parseInt(totals['ga:users']);
      const pageviews = parseInt(totals['ga:pageviews']);

      db.collection('impact_analytics').insert({
        pageviews: pageviews,
        users: users,
        source: source,
        ymd: when
      });
    }
  };

  jwtClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

    // api allows 100 requests in 100 seconds
    // sleep from one source seems to interfere with another's db.getConnection handshake
    Analytics.todo.push(['41469908', 'siualumni.com', '2013-10-30']); // established '2013-10-30'
    Analytics.todo.push(['82388800', 'dnadiscovery.net', '2014-02-18']); // established '2014-02-18'
    Analytics.todo.push(['118734877', 'picchietti.io', '2016-03-26']); // established '2016-03-26'

    // // Legacy
    // Analytics.todo.push(['71729805', 'jonpicchietti.com', '2013-04-26']); // established '2013-04-26'

    Analytics.doAll();
  });
});
