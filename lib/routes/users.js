var express = require('express');
var router  = express.Router();

module.exports = function(client, log) {

    router.use(function timeLog(req, res, next) {
        log.info(Date.now());
        next();
    });

    router.get('/', function(req, res) {
        var opts = {
            //filter: '(&(l=Seattle)(email=*@foo.com))',
            //scope: 'sub'
        };

        client.search('ou=People,dc=local', opts, function(err, res) {
            if(err) {
                log.error(err.message);
            }

            res.on('searchEntry', function(entry) {
                log.info(JSON.stringify(entry.object));
            });
            res.on('searchReference', function(referral) {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function(err) {
                log.error(err.message);
            });
            res.on('end', function(result) {
                console.log('status: ' + result.status);
            });
        });
        res.send('all users');
    });

    router.post('/', function(req, res) {
        res.send('create a new user');
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