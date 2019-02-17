const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('/usr/src/app/src/server/mongodb.js');

const sha512 = (data) => {
  return crypto.createHash('sha512').update(data).digest('hex');
};

const setupPassport = (app) => {
  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(id, done) {
    done(null, { username: id });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      // find a way to throttle failed attempts or reimplement own

      mongo.getDb().then((db) => {
        db.collection('users').findOne({ email: username }, function(err, user) {
          if(err) {
            done(err);
            return;
          }

          if(!user) { // cant find user
            done(null, false, { message: 'Incorrect username.' });
            return;
          }

          const storedPassword = user.password;
          const salt = user.salt;
          const hash = sha512(password + salt);

          if(hash === storedPassword) { // correct password
            done(null, { username: username });
          }
          else{ // wrong password
            done(null, false, { message: 'Incorrect password.' });
          }
        });
      });
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = setupPassport;
