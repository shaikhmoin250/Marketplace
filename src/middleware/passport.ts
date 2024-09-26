import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import User from "../models/User";
import config from "../config";
import bcrypt from "bcrypt";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractStrategy = passportJwt.ExtractJwt;


passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return done(null, false, { message: "Invalid credentials" });

      return done(null, user);
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractStrategy.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      const user = await User.findById(jwtPayload.id);
      return user ? done(null, user) : done(null, false);
    }
  )
);
