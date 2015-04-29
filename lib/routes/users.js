var express = require('express');
var router  = express.Router();
var User = require('./../../lib/models/user.js');

module.exports = function(client, log) {

    router.use(function timeLog(req, res, next) {
        log.info(Date.now());
        next();
    });

    router.get('/', function(req, res) {
        var opts = {
            filter: '(objectclass=posixAccount)',
            scope: 'sub'
        };

        client.search('ou=People,dc=local', opts, function(err, ldapresponse) {
            if(err) { log.error(err.message); }
            var users = [];

            ldapresponse.on('searchEntry', function(entry) {
                log.info(JSON.stringify(entry.object));
                users.push(entry.object);
            });
            ldapresponse.on('searchReference', function(referral) {
                log.info('referral: ' + referral.uris.join());
            });
            ldapresponse.on('error', function(err) {
                log.error(err.message);
            });
            ldapresponse.on('end', function(result) {
                log.info('Status: ' + result.status);
                if(users.length === 0) {
                    res.status(204).send();
                } else {
                    res.status(200).send(users);
                }
            });
        });
    });

    router.post('/', function(req, res) {

        var newUser = new User({
            firstname    : req.body.firstname,
            surname      : req.body.surname
        });

        client.add('cn=' + newUser.uid + ',ou=People,dc=local', newUser, function(err) {
            if(err) {
                var EntryAlreadyExistsError = err.code === 68;
                if (EntryAlreadyExistsError) {
                    log.error(err.message);
                    res.status(409).send(err.message);
                } else {
                    res.status(500).send(err.message);
                }
            } else {
                res.status(201).send(newUser.uid + ' Successfully Created');
            }
        });
    });

    router.get('/:userid', function(req, res) {
        var userid = req.params.userid;

        var opts = {
            filter: '(&(uid=' + userid + ')(objectclass=posixAccount))',
            scope: 'sub'
        };


        client.search('ou=People,dc=local', opts, function(err, ldapresponse) {
            if(err) { log.error(err.message); }
            var user;

            ldapresponse.on('searchEntry', function(entry) {
                log.info(JSON.stringify(entry.object));
                user = entry.object;
            });
            ldapresponse.on('searchReference', function(referral) {
                log.info('referral: ' + referral.uris.join());
            });
            ldapresponse.on('error', function(err) {
                log.error(err.message);
            });
            ldapresponse.on('end', function(result) {
                log.info('Status: ' + result.status);
                if (user === undefined) {
                    res.status(404).send('User not found');
                } else {
                    res.status(200).send(user);
                }
            });
        });
    });

    router.put('/:userid', function(req, res) {
        var userid = req.params.userid;
        res.send('updating user with id: ' + userid);
    });

    router.delete('/:userid', function(req, res) {
        var userid = req.params.userid;

        client.del('cn=' + userid + ',ou=People,dc=local', function(err) {
            if(err) {
                var InvalidDnSpecified = err.code === 34;
                if (InvalidDnSpecified) {
                    log.error(err.message);
                    res.status(400).send(err.message);
                } else {
                    var notFoundMessage = 'User ' + userid + ' Not Found';
                    log.info(notFoundMessage);
                    res.status(404).send(notFoundMessage);
                }
            } else {
                res.status(200).send('Deleted User ' + userid);
            }
        });
    });

    return router;
};