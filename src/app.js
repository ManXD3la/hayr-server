/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const usersRouter = require('./users/users-router');
const entriesRouter = require('./entries/entries-router');
const authRouter = require('./auth/auth-router');



const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}));

app.use(cors());
app.use(helmet());


app.use('/api/user', usersRouter);
app.use('/api/entry', entriesRouter);
app.use('/api/auth', authRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    console.error(error);
    response = { error: 'server error' };
  } else {
    console.error(error);
    response = { error: error.message, details: error };
  }
  res.status(500).json(response);
});

module.exports = app;