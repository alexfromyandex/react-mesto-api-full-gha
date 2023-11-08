require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { signinValidation, signupValidation } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('./middlewares/cors');

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 });

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(('mongodb://127.0.0.1:27017/mestodb'), {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      const requestHeaders = req.headers['access-control-request-headers'];
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  return next();
});

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('/', (req, res, next) => next(new NotFoundError('Страницы не существует')));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
