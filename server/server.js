var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config.js');

var app = express();

// set up mongo database with mongoose
var location = process.env.PARAM1 || config.mongoLocation || 'localhost/suspiciouspi';
mongoose.connect('mongodb://' + location);

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// export our app for testing and flexibility, required by index.js
module.exports = app;
