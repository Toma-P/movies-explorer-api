const router = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidate,
  movieIdValidate,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovieValidate, createMovie);
router.delete('/:movieId', movieIdValidate, deleteMovie);

module.exports = router;
