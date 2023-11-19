const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const jwtToken = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(jwtToken, JWT_SECRET);
    if (!payload) {
      throw new UnauthorizedError('Необходима авторизация');
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Необходима авторизация'));
    }
    console.log(req.headers);
    next(new UnauthorizedError(`${req.cookies.jwt}`));
  }

  req.user = payload;

  next();
};
