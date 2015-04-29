var express = require('express');
var router  = express.Router();

module.exports = function(client, log) {

    router.use(function timeLog(req, res, next) {
        log.info(Date.now());
        next();
    });

    router.get('/', function(req, res) {
        res.send('Groups');
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

