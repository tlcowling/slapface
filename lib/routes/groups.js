var express = require('express');
var router  = express.Router();

module.exports = function(client, log) {

    router.use(function timeLog(req, res, next) {
        log.info(Date.now());
        next();
    });

    router.get('/', function(req, res) {
        var opts = {
            filter: '(objectclass=posixGroup)',
            scope: 'sub'
        };

        client.search('ou=Groups,dc=local', opts, function(err, ldapresponse) {
            if(err) { log.error(err.message); }
            var groups = [];

            ldapresponse.on('searchEntry', function(entry) {
                log.info(JSON.stringify(entry.object));
                groups.push(entry.object);
            });
            ldapresponse.on('searchReference', function(referral) {
                log.info('referral: ' + referral.uris.join());
            });
            ldapresponse.on('error', function(err) {
                var NoSuchObject = err.code === 32;
                log.error(err.message);

                if(NoSuchObject) {
                    res.status(404).send(err.message);
                } else {
                    res.status(400).send(err.message);
                }
            });
            ldapresponse.on('end', function(result) {
                log.info('Status: ' + result.status);
                if(groups.length === 0) {
                    res.status(204).send();
                } else {
                    res.status(200).send(groups);
                }
            });
        });
    });

    router.post('/', function(req, res) {
        res.send('adding a group');
    });

    router.put('/:groupid', function(req, res) {
        res.send('updating group with id ' + req.params.groupid);
    });

    router.delete('/:groupid', function(req, res) {
        res.send('delete group with id ' + req.params.groupid);
    });

    return router;
};

