var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('/usr/src/app/secret/database.js');

router.get('/', function(req, res){
  var amount = parseInt(req.params.amount);
  var total = parseInt(req.params.total);
  var folder = decodeURIComponent(req.params.folder);

  db.getConnection(function(err, conn){
    // posibilities are: folder, url, title, icon
    conn.query("SELECT url,title,icon FROM bookmarks WHERE folder=? ORDER BY id asc LIMIT ?,?", [folder, total, amount], function(err, rows, fields){
      results = rows;
      conn.release();
      res.json(results);
    });
  });
});

module.exports = router;
