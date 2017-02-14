var express = require('express');
var crypto = require('crypto');
var router = express.Router({mergeParams: true});
var db = require('/usr/src/app/secret/database.js');

function md5(data) {
  return crypto.createHash("md5").update(data).digest("hex");
}

router.put('/', function(req, res){
  var complete = {
    one: false, // the prev total
    two: false // 30 most recent records
  };

  var old_url, url, name;
  old_url = decodeURIComponent(req.body.oldurl);
  url = decodeURIComponent(req.body.url);
  name = decodeURIComponent(req.body.name);

  db.getConnection(function(err, conn){
    if(name){
      conn.query("UPDATE bookmarks SET title=? WHERE url=? LIMIT 1", [name, old_url], function(err, rows, fields){
        complete.one = true;
        checkComplete();
      });
    }
    else{
      complete.one = true;
      checkComplete();
    }

    if(url){
      var hash = md5(url);
      conn.query("UPDATE bookmarks SET url=?, url_hash=? WHERE url=? LIMIT 1", [url, hash, old_url], function(err, rows, fields){
        complete.two = true;
        checkComplete();
      });
    }
    else{
      complete.two = true;
      checkComplete();
    }

    function checkComplete(){
      if(complete.one && complete.two){
        conn.release();
        res.status(200).end();
      }
    }
  });
});

module.exports = router;
