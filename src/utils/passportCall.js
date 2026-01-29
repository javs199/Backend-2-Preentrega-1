import passport from 'passport';

export function passportCall(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ error: info?.message || 'Unauthorized' });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
}
