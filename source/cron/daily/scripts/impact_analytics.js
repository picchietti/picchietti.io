var google = require('googleapis');
var analytics = google.analytics('v3');
var moment = require('moment');
var key = require('/usr/src/app/secret/resume-stats-a8a939419e3a.json');
const mongo = require('/usr/src/app/private/mongodb.js');

var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  'https://www.googleapis.com/auth/analytics.readonly',
  null
);

var Analytics = {
  start_end: moment().subtract(1, 'days'),
  todo: 0,

  save: function(id, source){
    Analytics.todo++;
    const start_end_string = Analytics.start_end.format('YYYY-MM-DD');

    var params = {
      'auth': jwtClient,
      'ids': 'ga:' + id,
      'start-date': start_end_string,
      'end-date': start_end_string,
      'metrics': 'ga:users,ga:pageviews'
    }

    analytics.data.ga.get(params, function(err, response){
      var totals = response.totalsForAllResults;
      Analytics.store(totals, source);
    });
  },

  store: function(totals, source){
    mongo.getDb().then( (db) => {
      var users = parseInt(totals['ga:users']);
      var pageviews = parseInt(totals['ga:pageviews']);

      db.collection('impact_analytics').insert({
        pageviews: pageviews,
        users: users,
        source: source,
        ymd: Analytics.start_end.toDate()
      }, (error, result) => {
        // or else command line script wont exit
        if(--Analytics.todo === 0)
          mongo.close()
      });
    });
  }
};

jwtClient.authorize(function (err, tokens) {
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
