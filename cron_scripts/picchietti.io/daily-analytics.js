var google = require('googleapis');
var analytics = google.analytics('v3');
var moment = require('moment');
var sleep = require('sleep');
var db = require('/usr/src/app/release/picchietti.io/private/database.js');
var key = require('/usr/src/app/release/picchietti.io/private/resume-stats-a8a939419e3a.json');

var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  'https://www.googleapis.com/auth/analytics.readonly',
  null
);

var Analytics = {
  start_end: moment().subtract(1, 'days').format('YYYY-MM-DD'),
  todo: 0,

  save: function(id, source){
    Analytics.todo++;

    var params = {
      "auth": jwtClient,
      "ids": 'ga:' + id,
      "start-date": Analytics.start_end,
      "end-date": Analytics.start_end,
      "metrics": 'ga:users,ga:pageviews'
    }

    analytics.data.ga.get(params, function(err, response){
      row = response.rows[0];
      Analytics.store(response.rows[0], source);
    });
  },

  store: function(results, source){
    db.getConnection(function(err, conn){
      var users = parseInt(results[0]);
      var pageviews = parseInt(results[1]);

      conn.query("INSERT INTO impact_analytics (pageviews, users, source, ymd) VALUES (?, ?, ?, ?)", [pageviews, users, source, Analytics.start_end], function(err, result){
        Analytics.todo--;
        conn.release();

        // or else command line script wont exit
        if(Analytics.todo == 0)
          db.end()
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
// Analytics.save('74075825', 'msknighteducation.com'); // since '2013-07-02'
