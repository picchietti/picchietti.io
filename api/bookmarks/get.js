var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('/usr/src/app/secret/database.js');

router.get('/', function(req, res){
  var amount = parseInt(req.params.amount);
  var folder = decodeURIComponent(req.params.folder);
  var results = {
    bar: null, // the prev total
    other: null // 30 most recent records
  };

  db.getConnection(function(err, conn){
    // posibilities are: folder, url, title, icon
    conn.query("SELECT url,title,icon FROM bookmarks WHERE folder='Bookmark Bar' ORDER BY id asc", function(err, rows, fields){
      results.bar = rows || [];

      if(!!results.bar && !!results.other)
        queriesComplete();
    });

    conn.query("SELECT url,title,icon FROM bookmarks WHERE folder=? ORDER BY id asc LIMIT ?", [folder, amount], function(err, rows, fields){
      results.other = rows || [];

      if(!!results.bar && !!results.other)
        queriesComplete();
    });

    function queriesComplete(){
      conn.release();
      res.json(results);
    }
  });
});

module.exports = router;
