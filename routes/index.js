const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const NotFoundError = require('../utils/errors/NotFoundError');
const { notFoundErrorMessage } = require('../utils/constants');

router.use('/movies', moviesRouter);
router.use('/users', usersRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(notFoundErrorMessage.notFoundPage));
});

module.exports = router;
