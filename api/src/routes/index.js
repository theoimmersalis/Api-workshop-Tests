'use strict';

// Home
api.app.get('/', function(req, res) {
  res.send(200, 'Hello World!');
});

requireAll(__dirname);
