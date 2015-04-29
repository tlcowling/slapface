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

            ldapresponse.on('searchEntry', function(entry) {
                log.info(JSON.stringify(entry.object));
            });
            ldapresponse.on('searchReference', function(referral) {
                console.log('referral: ' + referral.uris.join());
            });
            ldapresponse.on('error', function(err) {
                log.error(err.message);
            });
            ldapresponse.on('end', function(result) {
                log.info('Status: ' + result.status);
            });
        });
    });

    router.post('/', function(req, res) {

        var newUser = new User({
            firstname    : req.body.firstname,
            surname      : req.body.surname,
            emailaddress : req.body.emailaddress
        });

        log.warn(newUser);

        client.add('cn=' + newUser.cn + ',ou=People,dc=local', newUser, function(err) {
            if(err) { log.error(err.message); }
            res.sendStatus(200);
        });
    });

    router.get('/:userid', function(req, res) {
        var userid = req.params.userid;
        res.send('getting user with id: ' + userid);
    });

    router.put('/:userid', function(req, res) {
        var userid = req.params.userid;
        res.send('updating user with id: ' + userid);
    });

    router.delete('/:userid', function(req, res) {
        var userid = req.params.userid;
        res.send('deleting user with id: ' + userid);
    });

    return router;
};