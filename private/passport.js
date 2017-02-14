const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;

var db = require('/usr/src/app/secret/database.js');

function sha512(data) {
  return crypto.createHash("sha512").update(data).digest("hex");
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

      db.getConnection(function(err, conn){
        if(err) {
          conn.release();
          return done(err);
        }

        conn.query("SELECT password,salt FROM accounts WHERE email=?", [username], function(err, rows, fields){
          if(err) {
            conn.release();
            return done(err);
          }

          if(!rows.length){ // cant find user
            conn.release();
            return done(null, false, { message: 'Incorrect username.' });
          }

          var stored_password = rows[0].password;
          var salt = rows[0].salt;
          var hash = sha512(password + salt);

          if(hash === stored_password){ // correct password
            conn.release();
            done(null, {username: username});
          }
          else{ // wrong password
            conn.release();
            done(null, false, { message: 'Incorrect password.' });
          }
        });
      });
    }
  ));
}
