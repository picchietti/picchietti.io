const rootDir = '/usr/src/app/src';

module.exports = function(multer) {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, `${rootDir}/secret/uploads/`);
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()} - ${file.originalname}`);
    }
  });

  const uploader = multer({ storage: storage });

  // uploader, but with a proper return status based on error or success
  const allowUpload = function(req, res) {
    const cb = uploader.any();

    cb(req, res, function(err) {
      if(err) {
        res.status(500);
        return;
      }

      res.status(204);
    });
  };

  return allowUpload;
};
