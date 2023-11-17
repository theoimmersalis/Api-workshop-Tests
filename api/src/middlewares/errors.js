'use strict';

const HttpError = require('http-errors').HttpError;

// Catch 404 and forward to error handler
function notFoundHandler(req, res, next) {
  let err = new Error(
    'Not Found: ' + req.method + ' ' + req.url + ' ' + JSON.stringify(req.body)
  );

  err.status = 404;
  next(err);
}

// Handle all errors
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  logError(err);

  // eslint-disable-next-line valid-typeof
  if (err instanceof HttpError) {
    res = res.status(err.status);

    if (err.expose === false) {
      res.send({message: 'error occured'});
      return;
    }

    res.send(err);
    return;
  }

  res.status(err.status || 500).send({message: err.message || 'error occured'});
}

module.exports = {notFoundHandler, errorHandler};
