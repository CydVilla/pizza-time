var LocalStrategy = require("passport-local").Strategy;

var User = require("../app/models/user");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        emailField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        console.log(email);

        User.findOne({ "local.email": email }, function (err, user) {
          if (err) return done(err);

          if (user) {
            return done(
              null,
              false,
              req.flash("signupMessage", "That email is already taken.")
            );
          } else {
            var newUser = new User();
            newUser.local.username = req.body.username;
            newUser.local.email = req.body.email;
            newUser.local.password = newUser.generateHash(password);

            newUser.save(function (err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        console.log(req);
        console.log(email);
        console.log(password);
        User.findOne({ "local.email": email }, function (err, user) {
          if (err) return done(err);

          if (!user)
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found.")
            );
          if (!user.validPassword(password))
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            );

          return done(null, user);
        });
      }
    )
  );
};
