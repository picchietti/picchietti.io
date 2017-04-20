var express = require('express');
var fs = require('fs');
var db = require('/usr/src/app/private/database.js');
var router = express.Router();

const root_dir = '/usr/src/app';

router.post('/', function(req, res){
  var url = decodeURIComponent(req.body.url);

  db.getConnection(function(err, conn){
    conn.query("SELECT icon FROM bookmarks WHERE url=? LIMIT 1", [url], function(err, rows, fields){
      var icon = rows[0].icon;

      function afterDeleteIcon(){
        conn.query("DELETE FROM bookmarks WHERE url=? LIMIT 1", [url], function(err, rows, fields){
          conn.release();
          res.status(200).end();
        });
      }

      if(icon != "favicon.png" && icon != "file.png"){
        fs.unlink(root_dir + "/public/pages/bookmarks/icons/" + icon, afterDeleteIcon);
      }
      else{
        afterDeleteIcon();
      }
    });
  });
});

module.exports = router;
