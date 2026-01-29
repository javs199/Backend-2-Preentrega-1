import express from 'express';
import { initializePassport } from './config/passport.config.js';
import sessionsRouter from './routes/sessions.router.js';
import passport from 'passport';

const app = express();

initializePassport();
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

app.use('/api/sessions', sessionsRouter);

export default app;
