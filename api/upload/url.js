var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var url = require('url');
var fs = require('fs');

const root_dir = '/usr/src/app';

router.post('/', function(req, res){
  var file_url = req.body.url;
  var filename = Date.now() + ' - ' + file_url.substring(file_url.lastIndexOf('/') + 1);
  var path = root_dir + '/secret/uploads/';
  var file = fs.createWriteStream(path + filename);

  file.on('open', function(){
    var request_done = function(response) {
      file.on('finish', function(){
        file.close();
        res.status(204).end();
      });

      response.pipe(file);
    };

    var request, protocol = url.parse(file_url).protocol;
    if(protocol == 'http:')
      request = http.get(file_url, request_done);
    else if(protocol == 'https:')
      request = https.get(file_url, request_done);
    else
      return res.status(400).end();

    request.on('error', function(err){
      fs.unlink(path + filename);
      res.status(500).end();
    });
  });
});

module.exports = router;
