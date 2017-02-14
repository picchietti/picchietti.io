var express = require('express');
var router = express.Router();
var db = require('/usr/src/app/secret/database.js');

router.get('/', function(req, res){

  db.getConnection(function(err, conn){
    conn.query("SELECT id,task FROM tasks ORDER BY id asc", function(err, rows, fields){
      conn.release();
      if(!err)
        res.json(rows)
    });
  });

});

module.exports = router;
