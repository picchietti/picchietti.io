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
  todo: [], // each item is an array with id, source, and since strings

  doAll: function(){
    if(!Analytics.todo.length){
      db.end();
      return;
    }

    var todo = Analytics.todo.shift();
    var source = todo[1];
    var since = moment(todo[2]);

    console.log('getting analytics for...', source);

    if(since.isSameOrBefore(Analytics.yesterday)) {
    	Analytics.get(todo[0], source, since);
    }
  },

  get: function(id, source, since){
    console.log('getting analytics for', source, since.format('YYYY-MM-DD'));

    var since_string = since.format('YYYY-MM-DD');
    var params = {
      "auth": jwtClient,
      "ids": 'ga:' + id,
      "start-date": since_string,
      "end-date": since_string,
      "metrics": 'ga:users,ga:pageviews'
    };

    analytics.data.ga.get(params, function(err, response){
      console.log('got analytics for', source, since_string);
      totals = response.totalsForAllResults;
      Analytics.store(totals, source, since_string);

      since.add(1, 'days')
      if(since.isSameOrBefore(Analytics.yesterday)){
        sleep.sleep(5);
        Analytics.get(id, source, since);
      }
      else {
        console.log('...done getting analytics for', source);
        Analytics.doAll();
      }
    });
  },

  store: function(totals, source, when){
    db.getConnection(function(err, conn){
      if(err) throw err;
      var users = parseInt(totals['ga:users']);
      var pageviews = parseInt(totals['ga:pageviews']);

      conn.query("INSERT INTO impact_analytics (pageviews, users, source, ymd) VALUES (?, ?, ?, ?)", [pageviews, users, source, when], function(err, result){
        if(err) throw err;
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

  // api allows 100 requests in 100 seconds
  // sleep from one source seems to interfere with another's db.getConnection handshake
  Analytics.todo.push(['41469908', 'siualumni.com', '2016-11-22']); // established '2013-10-30'
  Analytics.todo.push(['82388800', 'dnadiscovery.net', '2016-11-22']); // established '2014-02-18'
  Analytics.todo.push(['118734877', 'picchietti.io', '2016-11-22']); // established '2016-03-26'

  Analytics.doAll();
});

// // Legacy
// Analytics.save('74075825', 'msknighteducation.com', '2016-11-22'); // established '2013-07-02'
// Analytics.save('71729805', 'jonpicchietti.com', '2016-11-22'); // established '2013-04-26'
