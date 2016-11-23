var express = require('express');
var router = express.Router({mergeParams: true});
var db = require('/usr/src/app/picchietti.io/private/database.js');

router.get('/', function(req, res){
  db.getConnection(function(err, conn){
    conn.query("SELECT DISTINCT(folder) AS folder FROM bookmarks ORDER BY folder asc", function(err, rows, fields){
      var folders = [];
      for(var i=0, y=rows.length; i<y; i++)
        folders.push(rows[i].folder);

      conn.release();
      res.json( folders );
    });
  });
});

module.exports = router;
