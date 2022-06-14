const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const argon2 = require("argon2");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "lemail",
        passwordField: "lpassword",
      },
      async (lemail, lpassword, done) => {
        try {
          let user = await User.findOne({ email: lemail });
          if (!user) {
            // user = await User.create(newUser);
            done(null, false, { emessage: "wrong email or password" });
          }

          if (user && (await argon2.verify(user.password, lpassword))) {
            done(null, user);
          } else {
            done(null, false, { emessage: "wrong email or password" });
          }
        } catch (err) {
          console.log(err);
          done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
