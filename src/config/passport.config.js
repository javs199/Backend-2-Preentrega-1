import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/User.model.js';
import { isValidPassword } from '../utils/hash.js';

export function initializePassport() {
  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'Credenciales inválidas' });
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, { message: 'Credenciales inválidas' });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await UserModel.findById(payload.id);
          if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}
