var google = require('googleapis');
var analytics = google.analytics('v3');
var moment = require('moment');
var sleep = require('sleep');
var db = require('/usr/src/app/secret/database.js');
var key = require('/usr/src/app/secret/resume-stats-a8a939419e3a.json');

var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  'https://www.googleapis.com/auth/analytics.readonly',
  null
);

var Analytics = {
  yesterday: moment().subtract(1, 'days'),

  save: function(id, source, since){
    since = moment(since);

    while (since.isSameOrBefore(Analytics.yesterday)) {
      var since_string = since.format('YYYY-MM-DD');
      var params = {
        "auth": jwtClient,
        "ids": 'ga:' + id,
        "start-date": since_string,
        "end-date": since_string,
        "metrics": 'ga:users,ga:pageviews'
      };

    	Analytics.get(params, source);
    	since.add(1, 'days');
    	sleep.sleep(2);
    }
  },

  get: function(params, source){
    analytics.data.ga.get(params, function(err, response){
      totals = response.totalsForAllResults;
      Analytics.store(totals, source, params['start-date']);
    });
  },

  store: function(totals, source, when){
    db.getConnection(function(err, conn){
      var users = parseInt(totals['ga:users']);
      var pageviews = parseInt(totals['ga:pageviews']);

      conn.query("INSERT INTO impact_analytics (pageviews, users, source, ymd) VALUES (?, ?, ?, ?)", [pageviews, users, source, when], function(err, result){
        conn.release();
      });
    });
  }
};

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  Analytics.save('41469908', 'siualumni.com', '2016-11-22'); // established '2013-10-30'
  Analytics.save('82388800', 'dnadiscovery.net', '2016-11-22'); // established '2014-02-18'
  Analytics.save('118734877', 'picchietti.io', '2016-11-22'); // established '2016-03-26'
  
  // Analytics.save('74075825', 'msknighteducation.com', '2016-11-22'); // established '2013-07-02'
  // Analytics.save('71729805', 'jonpicchietti.com', '2016-11-22'); // established '2013-04-26'
});
