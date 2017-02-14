var express = require('express');
var router = express.Router();
var db = require('/usr/src/app/secret/database.js');

router.post('/', function(req, res){
  var from_url = decodeURIComponent(req.body.from);
  var to_url = decodeURIComponent(req.body.to);

  var results = {
    from_id: null, // the prev total
    to_id: null // 30 most recent records
  };

  db.getConnection(function(err, conn){
    // posibilities are: folder, url, title, icon
    conn.query("SELECT id FROM bookmarks WHERE url=? LIMIT 1", [from_url], function(err, rows, fields){
      results.from_id = parseInt(rows[0].id);
      checkIds();
    });

    conn.query("SELECT id FROM bookmarks WHERE url=? LIMIT 1", [to_url], function(err, rows, fields){
      results.to_id = parseInt(rows[0].id);
      checkIds();
    });

    function checkIds(){
      var from_id, to_id;
      from_id = results.from_id;
      to_id = results.to_id;

      if(from_id != null && to_id != null){ // have ids
        if(from_id < to_id)
          conn.query("UPDATE bookmarks SET id=id-1 WHERE folder='Bookmark Bar' AND id > ? AND id <= ?", [from_id, to_id], last_query);
        else
          conn.query("UPDATE bookmarks SET id=id+1 WHERE folder='Bookmark Bar' AND id < ? AND id >= ?", [from_id, to_id], last_query);

        function last_query(err, rows, fields){
          conn.query("UPDATE bookmarks SET id=? WHERE url=? LIMIT 1", [to_id, from_url], function(err, rows, fields){
            conn.release();
            res.status(200).end();
          });
        }
      }
    }
  });
});

module.exports = router;
