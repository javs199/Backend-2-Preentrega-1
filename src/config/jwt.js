import jwt from 'jsonwebtoken';

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name,
    cart: user.cart,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
}
