var express = require('express');
var router  = express.Router();

module.exports = function(client, log) {

    router.use(function timeLog(req, res, next) {
        log.info(Date.now());
        next();
    });

    router.get('/', function(req, res) {
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