const express = require('express');
require('dotenv').config({ path: './.env' });
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const { DB_ADDRESS } = require('./utils/constants');
const router = require('./routes');
// const { MONGO_DB = 'mongodb://localhost:27017/newsdb' } = require('./utils/config');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(DB_ADDRESS);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
