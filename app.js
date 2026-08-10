var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Bring in the database connection
require('./app_api/models/db');

// Require Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var travelRouter = require('./app_server/routes/travel'); // Updated path
var apiRouter = require('./app_api/routes/index');

var app = express(); // Uncommented express initialization

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Middleware configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter); // Mounts REST API under /api

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;