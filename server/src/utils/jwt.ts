import jwt from 'jsonwebtoken';

const SECRET = 'supersecret'; 

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
};
