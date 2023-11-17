'use strict';

// eslint-disable-next-line no-redeclare
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connection.on('error', function(err) {
  logError('DB connection:', err);
});

mongoose.connection.once('connected', function() {
  log('Mongoose connected to MongoDB server');
});

mongoose.connection.once('closed', function() {
  log('Mongoose connection closed');
});

function connectMongoose() {
  return mongoose.connect(`mongodb://${process.env.MONGO_SERVER}/app`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  });
}

module.exports = {mongoose, connectMongoose};
