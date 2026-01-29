import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export function createHash(password) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

export function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
