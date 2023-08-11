const express = require('express');
require('dotenv').config();

const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const rateLimiter = require('./middlewares/rateLimiter');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { userInfoValidation, authInfoValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL } = require('./utils/config');

const { NODE_ENV, PORT = 3000, DB_URL } = process.env;

app.use(express.json());
app.use(helmet());
mongoose.connect(NODE_ENV === 'production' ? DB_URL : MONGO_URL);

app.use(cors());
app.use(requestLogger);
app.use(rateLimiter);

app.post('/signup', userInfoValidation, createUser);
app.post('/signin', authInfoValidation, login);

app.use(auth);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT);
