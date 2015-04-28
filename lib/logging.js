var bunyan = require('bunyan');
var pkg    = require('../package.json');

module.exports = bunyan.createLogger({
    name: pkg.name
});