const multer = require('multer');

const rootDir = '/usr/src/app/src';
const uploadDir = `${rootDir}/secret/uploads/`;

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function(req, file, cb) {
    cb(null, `${Date.now()} - ${file.originalname}`);
  }
});

const MAX_FILES = 10;
const limits = {
  files: MAX_FILES
};

const uploader = multer({
  storage,
  limits
}).any();

// uploader, but with a proper return status based on error or success
const allowUpload = (req, res, next) => {
  uploader(req, res, function(uploadError) {
    if(uploadError) {
      res.status(500).json(uploadError);
      return;
    }

    next();
  });
};

module.exports = allowUpload;
