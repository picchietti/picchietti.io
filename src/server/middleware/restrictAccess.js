// If this isnt called, make sure your defined route has priority over express.static
module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  req.session.referrer = req.path;
  res.redirect('/pages/login/');
};
