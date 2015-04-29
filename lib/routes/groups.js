var express = require('express');
var router  = express.Router();
var ldap    = require('ldapjs');
var Group   = require('./../../lib/models/group');

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
                }2
            });
        });
    });

    router.post('/', function(req, res) {
        var newGroup = new Group({
            groupname    : req.body.groupname,
            gid          : req.body.gid
        });

        client.add('cn='+newGroup.cn+',ou=Groups,dc=local', newGroup, function(err) {
            if (err) {
                var GroupAlreadyExists = err.code === 68;

                if(GroupAlreadyExists) {
                    log.error(err.message);
                    res.status(409).send(err.message);
                } else {
                    log.error(err.message);
                    res.status(500).send();
                }
            } else {
                res.status(200).send();
            }
        });
    });

    router.put('/:groupid', function(req, res) {
        res.send('updating group with id ' + req.params.groupid);
    });

    router.delete('/:groupid', function(req, res) {
        var groupid = req.params.groupid;

        client.del('cn=' + groupid + 'ou=Groups,dc=local', function(err) {
            if (err) {
                var NoSuchGroup = err.code === 32;
                if(NoSuchGroup) {
                    log.error(err.message);
                    res.status(404).send(err.message);
                } else {
                    log.error(err.message);
                    res.status(500).send(err.message);
                }
            } else {
                res.status(204).send();
            }
        });
    });

    // get list of users for a group
    router.get('/:groupid/users', function(req, res) {
        var groupid = req.params.groupid;

        var opts = {
            filter: '(cn=' + groupid + ')',
            scope: 'sub'
        };

        client.search('ou=Groups,dc=local', opts, function(err, ldapresponse) {
            if (err) {
                log.error(err.message);
                res.status(500).send();
            }

            var group;

            ldapresponse.on('searchEntry', function(entry) {
                log.info('entry: ' + JSON.stringify(entry.object));
                group = entry.object;
            });
            ldapresponse.on('searchReference', function(referral) {
                log.info('referral: ' + referral.uris.join());
            });
            ldapresponse.on('error', function(err) {
                log.error('error: ' + err.message);
            });
            ldapresponse.on('end', function(result) {
                log.info('status: ' + result.status);
                res.status(200).send(group.memberUid);
            });
        });
    });

    // add users to groups using the 'memberUid'
    router.post('/:groupid/users', function(req, res) {
        var groupid = req.params.groupid;
        var uidToAdd = req.body.uid;

        var change = new ldap.Change({
            operation: 'add',
            modification: {
                memberUid: uidToAdd
            }
        });

        client.modify('cn=' + groupid + ',ou=Groups,dc=local', change, function(err) {
            if(err) {
                log.warn(err);
                var NoSuchGroup = err.code === 32;
                var AttributeAlreadyPresent = err.code === 20;

                if (NoSuchGroup) {
                    log.error(err.message);
                    res.status(404).send(err.message);
                } else if(AttributeAlreadyPresent) {
                    log.error(err.message);
                    log.error(change);
                    res.status(409).send(err.message + ': ' + change.json.modification.vals);
                } else {
                    log.error(err.message);
                    res.status(500).send(err.message);
                }
            } else {
                res.status(200).send('Successfully added')
            }
        });
    });

    return router;
};

