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

    router.get('/about', function(req, res) {
        res.send('A group is a linux group');
    });

    return router;
};

