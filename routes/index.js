const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const NotFoundError = require('../utils/errors/NotFoundError');

router.use('/movies', moviesRouter);
router.use('/users', usersRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

module.exports = router;
