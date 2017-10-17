const root_dir = '/usr/src/app';

module.exports = function(router, passport, allowUpload){

  router.post('/upload/file', restrictAccess, allowUpload);
  router.use('/upload/url', restrictAccess, require(root_dir + '/api/upload/url.js'));

  router.use('/bookmarks/delete', restrictAccess, require(root_dir + '/api/bookmarks/delete.js'));
  router.use('/bookmarks/update', restrictAccess, require(root_dir + '/api/bookmarks/update.js'));
  router.use('/bookmarks/move', restrictAccess, require(root_dir + '/api/bookmarks/move.js'));
  router.use('/bookmarks/add', restrictAccess, require(root_dir + '/api/bookmarks/add.js'));
  router.use('/bookmarks/folders', restrictAccess, require(root_dir + '/api/bookmarks/folders.js'));
  router.use('/bookmarks/get/:folder/:amount', restrictAccess, require(root_dir + '/api/bookmarks/get.js'));
  router.use('/bookmarks/list/:folder/:amount', restrictAccess, require(root_dir + '/api/bookmarks/list.js'));
  router.use('/bookmarks/more/:folder/:amount/:total', restrictAccess, require(root_dir + '/api/bookmarks/more.js'));

  router.use('/data/month/users', require(root_dir + '/api/data/month/users.js'));
  router.use('/data/month/pageviews', require(root_dir + '/api/data/month/pageviews.js'));

  router.post('/login', passport.authenticate('local'), function(req, res){
    var referrer = req.session.referrer;
    delete req.session.referrer;
    res.send(referrer).status(200).end();
  });
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  router.get('/pages/bookmarks', restrictAccess, function(req, res) {
    res.sendFile(root_dir + '/public/pages/bookmarks/');
  });
  router.get('/pages/upload', restrictAccess, function(req, res) {
    res.sendFile(root_dir + '/public/pages/upload/');
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
