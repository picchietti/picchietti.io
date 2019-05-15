const fs = require('fs');
const axios = require('axios');

const rootDir = '/usr/src/app/src';

module.exports = (req, res) => {
  const fileUrl = req.body.url;
  const filename = `${Date.now()} - ${fileUrl.substring(fileUrl.lastIndexOf('/') + 1)}`;
  const path = `${rootDir}/secret/uploads/`;

  const file = fs.createWriteStream(path + filename);
  file.on('open', (fd) => {
    file.on('finish', () => {
      file.close();
      res.status(204).end();
    });

    axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'stream'
    }).then((response) => {
      response.data.pipe(file);
    }).catch((error) => {
      file.close();
      fs.unlink(path + filename);
      res.status(500).end();
    });
  });
};
