const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('/usr/src/app/private/mongodb.js');

function sha512(data) {
  return crypto.createHash('sha512').update(data).digest('hex');
}

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(id, done) {
    done(null, {username: id});
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      // find a way to throttle failed attempts or reimplement own

      mongo.getConnection().then( (db) => {
        db.collection('users').findOne({ email: username }, function(err, user){
          if(err) {
            return done(err);
          }

          if(!user){ // cant find user
            return done(null, false, { message: 'Incorrect username.' });
          }

          var stored_password = user.password;
          var salt = user.salt;
          var hash = sha512(password + salt);

          if(hash === stored_password){ // correct password
            done(null, {username: username});
          }
          else{ // wrong password
            done(null, false, { message: 'Incorrect password.' });
          }
        } );
      });
    }
  ));
}
