const root_dir = '/usr/src/app';

module.exports = function(router, passport, allowUpload){

  router.post('/upload/file', restrictAccess, allowUpload);
  router.use('/upload/url', restrictAccess, require(root_dir + '/src/api/upload/url.js'));

  router.use('/data/month/users', require(root_dir + '/src/api/data/month/users.js'));
  router.use('/data/month/pageviews', require(root_dir + '/src/api/data/month/pageviews.js'));

  router.post('/login', passport.authenticate('local'), function(req, res){
    var referrer = req.session.referrer;
    delete req.session.referrer;
    res.send(referrer).status(200).end();
  });
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  router.get('/pages/uploader', restrictAccess, function(req, res) {
    res.sendFile(root_dir + '/dist/public/index.html');
  });

};


// // Helpers

// If this isnt called, make sure your defined route has priority over express.static
function restrictAccess(req, res, next) {
  if (req.isAuthenticated())
    return next();

  req.session.referrer = req.path;
  res.redirect('/pages/login/');
}
