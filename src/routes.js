const rootDir = '/usr/src/app';

module.exports = function(router, passport, allowUpload) {
  router.post('/upload/file', restrictAccess, allowUpload);
  router.use('/upload/url', restrictAccess, require(`${rootDir}/src/api/upload/url.js`));

  router.use('/data/month/users', require(`${rootDir}/src/api/data/month/users.js`));
  router.use('/data/month/pageviews', require(`${rootDir}/src/api/data/month/pageviews.js`));

  router.post('/login', passport.authenticate('local'), function(req, res) {
    const referrer = req.session.referrer;
    delete req.session.referrer;
    res.status(200).send(referrer);
  });
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/pages/uploader', restrictAccess, function(req, res) {
    res.sendFile(`${rootDir}/dist/public/index.html`);
  });
};


// // Helpers

// If this isnt called, make sure your defined route has priority over express.static
function restrictAccess(req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  req.session.referrer = req.path;
  res.redirect('/pages/login/');
}
