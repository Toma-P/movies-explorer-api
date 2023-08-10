const mongoose = require('mongoose');

const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const createMovie = (req, res, next) => {
//  const { movieId } = req.body;
//
//   Movie.findOneAndUpdate(
//     { movieId },
//     { $addToSet: { owner: req.user._id }, ...req.body },
//     { new: true, runValidators: true, upsert: true },
//   )
//     .then((movie) => {
//       res.status(201).send(movie);
//     })
//     .catch((err) => {
//       if (err instanceof mongoose.Error.ValidationError) {
//         next(new BadRequestError('Переданы некорректные данные при добавлении фильма'));
//         return;
//       }
//       next(err);
//     });
// };

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при добавлении фильма'));
        return;
      }
      next(err);
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
//   Movie.findByIdAndUpdate(
//     req.params.movieId,
//     { $pull: { owner: req.user._id } },
//     { new: true },
//   )
//     .orFail(() => {
//       next(new NotFoundError('Фильм по указанному _id не найден'));
//     })
//     .then((movie) => {
//       res.send(movie);
//     })
//     .catch((err) => {
//       if (err instanceof mongoose.Error.CastError) {
//         next(new BadRequestError('Переданы некорректные данные'));
//         return;
//       }
//       next(err);
//     });

  Movie.findById(req.params.movieId)
    .orFail(() => {
      next(new NotFoundError('Фильм по указанному _id не найден'));
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne(movie)
          .then(() => res.send(movie));
      } else {
        throw new ForbiddenError('Удаление чужих сохраненных фильмов недоступно');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
