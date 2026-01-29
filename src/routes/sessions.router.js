import { Router } from 'express';
import UserModel from '../models/User.model.js';
import { createHash } from '../utils/hash.js';
import { generateToken } from '../config/jwt.js';
import { passportCall } from '../utils/passportCall.js';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    const hashedPassword = createHash(password);
    await UserModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
    });
    res.status(201).json({ message: 'success' });
  } catch (err) {
    next(err);
  }
});

router.post('/login', passportCall('login'), (req, res) => {
  const token = generateToken(req.user);
  res.json({ token });
});

router.get('/current', passportCall('jwt'), (req, res) => {
  const { password, ...payload } = req.user.toObject();
  res.json({ payload });
});

export default router;
