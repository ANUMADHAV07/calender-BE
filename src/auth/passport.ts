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
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
          console.log("Updated user with tokens:", {
            accessToken: !!accessToken,
            refreshToken: !!refreshToken,
          });
          return done(null, user);
        }

        const newUser = new User({
          googleId: profile.id,
          email: profile.emails?.[0]?.value || "",
          name: profile.displayName || "",
          picture: profile.photos?.[0]?.value || "",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
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
