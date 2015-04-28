/**
 * Created by tcowling on 28/04/15.
 */
var express    = require('express');
var app        = express();
var pkg        = require('./package.json');
var config     = require('./config.json');
var log        = require('./lib/logging.js');
var client     = require('./lib/ldapclient.js');

var users      = require('./lib/routes/users.js')(client, log);
var groups     = require('./lib/routes/groups.js')(client, log);

client.bind(config.ldapserver.rootCn, config.ldapserver.rootPassword, function(err) {
    if(err) {
        log.error(err);
    } else {
        log.info('Successfully connected to LDAPserver on ' + config.ldapserver.host + ':' + config.ldapserver.port);

    }
});

app.use('/api/v1/users', users);
app.use('/api/v1/groups', groups);

app.get('/version', function(req, res) {
    res.send(pkg.version);
});

app.listen(config.app.port, function() {
    log.info('listening on port ' + config.app.port);
});