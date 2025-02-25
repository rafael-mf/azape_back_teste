import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth.js';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: true, message: 'Token not informed' });
  }

  //Pegando apenas o token do array
  const [, token] = authHeader.split(' ');

  try {
    jwt.verify(token, authConfig.secret, async (error, response) => {
      if (!error && response) {
        return next();
      } else {
        return res.status(401).json({ error: true, message: 'Invalid token' });
      }
    });
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Invalid Token' });
  }
}