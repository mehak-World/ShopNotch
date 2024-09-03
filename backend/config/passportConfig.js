const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User");
require('dotenv').config();


module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await User.findOne({ userId: profile.id });
        if (user) {
          return cb(null, user);
        }
        if (!user) {
          user = new User({ username: profile.displayName, userId: profile.id });
          await user.save();
          return cb(null, user);
        }
      } catch (err) {
        return cb(err);
      }
    }
  ));

  passport.serializeUser(function (user, cb) {
    cb(null, user._id);
  });

  passport.deserializeUser(async function (id, cb) {
    try {
      const user = await User.findById(id);
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  });
};
