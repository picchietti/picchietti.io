var express = require('express');
var router = express.Router();
var db = require('/usr/src/app/picchietti.io/private/database.js');

router.post('/', function(req, res){

  db.getConnection(function(err, conn){
    var task = req.body.replaced.replace(">","&gt;").replace("<","&lt;");
    var id = req.body.id;

    conn.query("UPDATE tasks SET task=? WHERE id=? LIMIT 1", [task, id], function(err, result){
      conn.release();
      if(!err)
        res.status(200).end();
      else
        res.status(500).end();

    });
  });

});

module.exports = router;
