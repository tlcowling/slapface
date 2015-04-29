(function() {
    module.exports = function(config, log) {
        var express    = require('express');
        var app        = express();
        var pkg        = require('./package.json');

        var client     = require('./lib/ldapclient.js');

        var users      = require('./lib/routes/users.js')(client, log);
        var groups     = require('./lib/routes/groups.js')(client, log);

        var bodyParser = require('body-parser');

        client.bind(config.ldapserver.rootCn, config.ldapserver.rootPassword, function(err) {
            if(err) {
                log.error(err);
            } else {
                log.info('Successfully connected to LDAPserver on ' + config.ldapserver.host + ':' + config.ldapserver.port);
            }
        });

        var peopleOrganizationalUnit = { objectclass: ['top', 'organizationalUnit'] };
        var groupOrganizationalUnit = { objectclass: ['top', 'organizationalUnit'] };

        client.add('ou=People,dc=local', peopleOrganizationalUnit, function(err) {
            if(err) {
                log.error(err.message);
            } else {
                log.info('successfully added peoples organizational group');
            }
        });

        client.add('ou=Groups,dc=local', groupOrganizationalUnit, function(err) {
            if(err) {
                log.error(err.message);
            } else {
                log.info('successfully added groups organizational group');
            }
        });

        app.use( bodyParser.json() );       // to support JSON-encoded bodies
        app.use( bodyParser.urlencoded ({     // to support URL-encoded bodies
            extended: true
        }));

        app.use('/api/v1/users', users);
        app.use('/api/v1/groups', groups);

        app.get('/version', function(req, res) {
            res.send(pkg.version);
        });

        app.listen(config.app.port, function() {
            log.info('listening on port ' + config.app.port);
        });

        return app;
    };
})();
