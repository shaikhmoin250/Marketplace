import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Stategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User";
import config from "../config";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await User.findOne({ email });

      console.log('inside local strategy ', user);
      if (!user) return done(null, false, { message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return done(null, false, { message: "Invalid credentials" });

      return done(null, done);
    }
  )
);

// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: config.JWT_SECRET,
//     },
//     async (jwtPayload, done) => {
//       const user = await User.findById(jwtPayload.id);
//       return user ? done(null, user) : done(null, false);
//     }
//   )
// );
