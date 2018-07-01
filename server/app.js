var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var launchesRouter = require('./routes/launches');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/launches', launchesRouter);
app.use('/api/*',  function(req, res) {
  res.status(404).json({});
});

// Respond with index to handle client-side routing
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
