var express = require('express');
var router = express.Router();
var db = require('/usr/src/app/private/database.js');
var moment = require('moment');

router.get('/', function(req, res){
  var thirtyDays = new Date();
  thirtyDays.setTime(thirtyDays.getTime() - 2592000000);

  var results = {
    one: null, // the prev total
    two: null // 30 most recent records
  };

  db.getConnection(function(err, conn){
    // get the total of every record before the most recent thirty days
    conn.query('SELECT sum(users) AS users FROM impact_analytics WHERE ymd < ?', [thirtyDays], function(err, rows, fields){
      results.one = rows[0]['users'];

      if(!!results.one && !!results.two)
        queriesComplete();
    });

    // get the 30 most recent records
    conn.query('SELECT sum(users) AS count, ymd AS `date` FROM impact_analytics WHERE ymd > ? GROUP BY ymd', [thirtyDays], function(err, rows, fields){
      results.two = rows;

      if(!!results.one && !!results.two)
        queriesComplete();
    });

    function queriesComplete(){
      for(var i=0,y=results.two.length;i<y;i++){
        results.one += results.two[i]['count'];
        results.two[i]['count'] = results.one;
        results.two[i]['date'] = moment(results.two[i]['date']).format('YYYY-MM-DD');
      }

      conn.release();
      res.json(results.two);
    }
  });
});

module.exports = router;
