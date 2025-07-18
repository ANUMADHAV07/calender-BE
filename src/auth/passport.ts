import passport, { use } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../config/config";
import User from "../models/user";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: "http://localhost:3001/api/auth/google/callback",
    },
    async (accessToken: string, refreshToken: string, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          console.log("Existing user found, updating tokens");
          user.accessToken = accessToken;

          await user.save();
          return done(null, user);
        }

        console.log("Creating new user");
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails?.[0]?.value || "",
          name: profile.displayName || "",
          picture: profile.photos?.[0]?.value || "",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });

        console.log("New user object:", newUser.toObject());

        const savedUser = await newUser.save();
        console.log("New user saved successfully:", savedUser._id);
        return done(null, newUser);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(null, user || null);
});

export default passport;
