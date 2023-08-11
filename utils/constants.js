const CREATED_CODE = 201;
const MONGODB_CODE = 11000;

const unauthorizedErrorMessage = {
  bearerTokenError: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
  verifyTokenError: 'При авторизации произошла ошибка. Переданный токен некорректен',

};
const notFoundErrorMessage = {
  notFoundUser: 'Пользователь не найден',
  notFoundPage: 'Страница по указанному маршруту не найдена',
  notFoundMovie: 'Фильм по указанному _id не найден',
};
const badRequestErrorMessage = {
  createUser: 'При регистрации пользователя произошла ошибка',
  getUser: 'Переданы некорректные данные',
  updateUser: 'При обновлении профиля произошла ошибка',
  createMovie: 'Переданы некорректные данные при добавлении фильма',
  deleteMovie: 'Переданы некорректные данные при удалении фильма',
};
const forbiddenErrorMessage = {
  deleteMovie: 'Удаление чужих сохраненных фильмов недоступно',
};
const conflictErrorMessage = {
  createUser: 'Пользователь с таким email уже существует',
};

module.exports = {
  CREATED_CODE,
  MONGODB_CODE,
  unauthorizedErrorMessage,
  notFoundErrorMessage,
  badRequestErrorMessage,
  forbiddenErrorMessage,
  conflictErrorMessage,
};
