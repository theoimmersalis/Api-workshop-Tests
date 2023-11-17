'use strict';

// eslint-disable-next-line no-redeclare
const mongoose = require('mongoose');

// load models
const Article = require('../src/models/article');
const User = require('../src/models/user');

mongoose.connection.on('error', function(err) {
  console.error('DB connection:', err);
});

mongoose.connection.once('connected', function() {
  console.info('Mongoose connected to MongoDB server');
});

mongoose.connection.once('closed', function() {
  console.log('Mongoose connection closed');
});

function connectMongoose() {
  return mongoose.connect(`mongodb://${process.env.MONGO_SERVER}/app`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  });
}

// eslint-disable-next-line no-redeclare
function connectMongoDB(done) {
  return connectMongoose()
    .then(() => {
      done();
    })
    .catch((err) => {
      console.error(err);
      done(err);
    });
}

// eslint-disable-next-line no-redeclare
function closeMongoDB(done) {
  mongoose.connection.close(function() {
    console.log('Mongoose connection closed gracefully');
    done();
  });
}

// Expose global (module scoped)
global.apiUrl = 'http://localhost:3000';
global.connectMongoDB = connectMongoDB;
global.closeMongoDB = closeMongoDB;
global.mongoose = mongoose;

module.exports = {Article, User};
