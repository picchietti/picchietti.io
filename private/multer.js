const root_dir = '/usr/src/app';

module.exports = function(multer){
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, root_dir + '/secret/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ' - ' + file.originalname);
    }
  });

  var uploader = multer({ storage: storage });

  // uploader, but with a proper return status based on error or success
  var allowUpload = function(req, res) {
    var cb = uploader.any();

    cb(req, res, function(err) {
      if(err)
        return res.status(500).end();

      res.status(204).end();
    });
  }

  return allowUpload;
};
