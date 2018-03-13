var google = require('googleapis');
var analytics = google.analytics('v3');
var moment = require('moment');
var sleep = require('sleep');
var key = require('/usr/src/app/secret/resume-stats-a8a939419e3a.json');
const mongo = require('/usr/src/app/private/mongodb.js');

var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  'https://www.googleapis.com/auth/analytics.readonly',
  null
);

mongo.getDb().then( (db) => {
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
      let since_string = since.format('YYYY-MM-DD');
      console.log('getting analytics for', source, since_string);

      var params = {
        'auth': jwtClient,
        'ids': 'ga:' + id,
        'start-date': since_string,
        'end-date': since_string,
        'metrics': 'ga:users,ga:pageviews'
      };

      analytics.data.ga.get(params, function(err, response){
        console.log('got analytics for', source, since_string);
        var totals = response.totalsForAllResults;
        Analytics.store(totals, source, since.toDate());

        since.add(1, 'days')
        if(since.isSameOrBefore(Analytics.yesterday)){
          sleep.sleep(3);
          Analytics.get(id, source, since);
        }
        else {
          console.log('...done getting analytics for', source);
          Analytics.doAll();
        }
      });
    },

    store: function(totals, source, when){
      var users = parseInt(totals['ga:users']);
      var pageviews = parseInt(totals['ga:pageviews']);

      db.collection('impact_analytics').insert({
        pageviews: pageviews,
        users: users,
        source: source,
        ymd: when
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
    Analytics.todo.push(['41469908', 'siualumni.com', '2013-10-30']); // established '2013-10-30'
    Analytics.todo.push(['82388800', 'dnadiscovery.net', '2014-02-18']); // established '2014-02-18'
    Analytics.todo.push(['118734877', 'picchietti.io', '2016-03-26']); // established '2016-03-26'

    // // Legacy
    // Analytics.todo.push(['71729805', 'jonpicchietti.com', '2013-04-26']); // established '2013-04-26'

    Analytics.doAll();
  });
});
