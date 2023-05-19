const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const UnAuthorizedError = require('../errors/UnAuthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorizedError('Authorization Required'));// 401
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'development-secret';
    payload = jwt.verify(token, secret);
  } catch (err) {
    return next(new UnAuthorizedError('Authorization Required'));// 401
  }

  req.user = payload;

  return next();
};
