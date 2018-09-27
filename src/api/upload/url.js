const express = require('express');
const fs = require('fs');
const request = require('request');
const router = new express.Router();

const rootDir = '/usr/src/app/src';

router.post('/', function(req, res) {
  const fileUrl = req.body.url;
  const filename = `${Date.now()} - ${fileUrl.substring(fileUrl.lastIndexOf('/') + 1)}`;
  const path = `${rootDir}/secret/uploads/`;

  const file = fs.createWriteStream(path + filename);
  file.on('open', function(fd) {
    file.on('finish', function() {
      file.close();
      res.status(204).end();
    });

    request(fileUrl).on('error', function(err) {
      file.close();
      fs.unlink(path + filename);
      res.status(500).end();
    }).pipe(file);
  });
});

module.exports = router;
