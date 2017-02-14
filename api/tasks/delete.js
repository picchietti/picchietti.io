var express = require('express');
var router = express.Router();
var db = require('/usr/src/app/secret/database.js');

router.post('/', function(req, res){

  db.getConnection(function(err, conn){
    var task = req.body.task.replace(">","&gt;").replace("<","&lt;");

    conn.query("DELETE FROM tasks WHERE task=? LIMIT 1", [task], function(err, result){
      conn.release();
      if(!err)
        res.status(200).end();
      else
        res.status(500).end();

    });
  });

});

module.exports = router;
