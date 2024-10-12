const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (profile, done) => {
      try {
        // Check if User already exists in db
        let user = await User.findOne({ email: profile._json.email });

        if (!user) {
          // Generate Random Password:
          const lastSixDigitsId = profile.id.substring(profile.id.length - 6);
          const lastTwoDigitsName = profile._json.name.substring(
            profile._json.name.length - 2
          );
          const newPass = lastTwoDigitsName + lastSixDigitsId;
          // Generate Salt
          const salt = await bcrypt.genSalt(Number(process.env.SALT));
          const hashedPassword = await bcrypt.hash(newPass, salt);

          user = await User.create({
            email: profile._json.email,
            userName: profile._json.name,
            password: hashedPassword,
            profilePhoto: profile._json.picture,
          });
        }
        return done(null, { user });
      } catch (e) {
        return done(e);
      }
    }
  )
);
