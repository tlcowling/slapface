/**
 * Created by tcowling on 28/04/15.
 */
var express    = require('express');
var app        = express();
var pkg        = require('./package.json');
var config     = require('./config.json');
var log        = require('./lib/logging.js');
var client     = require('./lib/ldapclient.js');

client.bind('cn=root', 'secret', function(err) {
    log.info('ldap not working there yet');
});

app.get('/version', function(req, res, next) {
    res.send(pkg.version);
});

app.listen(config.app.port, function(req, res, next) {
    log.info('listening on port ' + config.app.port);
});