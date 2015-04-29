// Server Entry Point
var config     = require('./config.json');
var log        = require('./lib/logging.js');

var app        = require('./server.js')(config, log);