const passport = require("passport");
const LocalStrategy = require("passport-local");
const { Admin } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user",
    },
    async function (user, password, done) {
      const admin = await Admin.findOne({ user });
      if (!admin) {
        return done(null, false);
      } else {
        if (admin.password === password) {
          return done(null, admin);
        } else {
          return done(null, false);
        }
      }
    }
  )
);

passport.serializeUser(function (admin, done) {
  done(null, admin._id);
});

passport.deserializeUser(async function (id, done) {
  await Admin.findById(id, function (err, admin) {
    done(err, admin);
  });
});
