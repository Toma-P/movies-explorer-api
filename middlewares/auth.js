const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SECRET } = require('../utils/config');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { unauthorizedErrorMessage } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(unauthorizedErrorMessage.bearerTokenError));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET);
  } catch (err) {
    next(new UnauthorizedError(unauthorizedErrorMessage.verifyTokenError));
  }
  req.user = payload;

  next();
};
