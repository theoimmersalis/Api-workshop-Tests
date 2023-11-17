// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

const createDebug = require('debug');
// eslint-disable-next-line no-redeclare
const {requireAll} = require('qfiles');
// eslint-disable-next-line no-redeclare
const {mongoose, connectMongoose} = require('./utils/mongoose');

console.log(`App ${process.pid} start...`);


/*----------------------------------------------------------------------------*\
  Global scope
\*----------------------------------------------------------------------------*/

// Framework core
global.api = {};

// Import (require) all files from a directory
global.requireAll = requireAll;

// Execution environment
global.__NODE_ENV = process.env.NODE_ENV;

// Debug
global.log = createDebug('app');
global.logError = createDebug('error');
global.logWarn = createDebug('warn');
global.logInfo = createDebug('info');

// Debug: STD output
logError.log = console.error.bind(console);
logWarn.log = console.warn.bind(console);
logInfo.log = console.info.bind(console);

// ODM
global.mongoose = mongoose;

log('booting...');
logInfo('NODE_ENV: ' + __NODE_ENV);

/*----------------------------------------------------------------------------*\
  Init modules
\*----------------------------------------------------------------------------*/

// Nothing for now


/*----------------------------------------------------------------------------*\
  Init server
\*----------------------------------------------------------------------------*/

const express = require('express');
const cors = require('cors');
const app = express();

api.app = app;
api.Router = express.Router;
api.router = api.Router();


/*----------------------------------------------------------------------------*\
  Middlewares
\*----------------------------------------------------------------------------*/

const {notFoundHandler, errorHandler} = require('./middlewares/errors');

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true,
}));

// Cross Origin Resource Sharing (CORS)
app.use(cors({
  // some project need to be securised by origin and more
  origin: true,
  allowedHeaders: 'Origin, X-Requested-With, '
    + 'Authorization, Content-Type, Accept, '
    + 'Accept-Version, Content-Length, AcceptedLanguage, '
    + 'Accept-Encoding, Accept-Language,'
    + 'x-auth-token, x-device-id',
  methods: 'OPTIONS,GET,PUT,PATCH,POST,DELETE',
}));

// load resources
require('./models');
require('./controllers');
require('./routes');

// Main router
app.use(api.router);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Boot Mongoose and launch HTTP server (REST API)
connectMongoose()
  .then(() => {
    app.listen(3000);
    logInfo('server listening on port 3000');
  })
  .catch((err) => {
    logError(err);
  });

// Event handler, called on the current process ends.
function onProcessEnd() {
  log('Process stopped');

  mongoose.connection.close(function() {
    log('Mongoose connection closed gracefully');
    process.exit(0);
  });

  setTimeout(function() {
    logError('onProcessEnd: timeout');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', onProcessEnd);
process.on('SIGINT', onProcessEnd);

