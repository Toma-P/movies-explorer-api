const rateLimits = require('express-rate-limit');

const rateLimiter = rateLimits({
  windowMS: 60000,
  max: 100,
  message: 'Превышен лимит запросов',
});

module.exports = rateLimiter;
