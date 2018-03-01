var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');

const root_dir = '/usr/src/app';

router.post('/', function(req, res){
  var file_url = req.body.url;
  var filename = Date.now() + ' - ' + file_url.substring(file_url.lastIndexOf('/') + 1);
  var path = root_dir + '/secret/uploads/';

  var file = fs.createWriteStream(path + filename);
  file.on('open', function(fd){
    file.on('finish', function(){
      file.close();
      res.status(204).end();
    })

    request(file_url).on('error', function(err) {
      file.close();
      fs.unlink(path + filename);
      res.status(500).end();
    }).pipe(file);
  });
});

module.exports = router;
