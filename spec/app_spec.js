var mocha   = require('mocha');
var log     = require('./testlog.js');
var config  = require('./testconfig.json');
var app     = require('../server')(config, log);

var request = require('supertest');

describe("Slapface", function() {
    describe("api", function() {
        it("should return the version", function(done) {
            request(app)
                .get('/version')
                .expect(200, '1.0.0', done);
        });

        describe("version 1", function() {
            describe("when getting users", function() {
                //it ("should return a list of all users for /", function(done) {
                //    request(app)
                //        .get('/api/v1/users')
                //        .expect(204, [], done);
                //});

                it ("should return a single specific user when specifying the userid")//, function(done) {
                //request(app)
                //    .get('/api/v1/users/bob')
                //    .expect(200, [], done);
                //});
            });


            describe("creating users", function() {
                it ("should create a user")//, function(done) {
                //request(app)
                //    .post('/api/v1/users')
                //    .expect(500, '', done);
                //});

                it ("should fail when trying to create a user that already exists")//, function(done) {
                //request(app)
                //    .post('/api/v1/users')
                //    .expect(409, '', done);
                //});
            });

            describe("deleting a user", function() {
                it ("should delete a user that exists");
                it ("should return not found when trying to delete a user that doesnt exists");
            });

            describe("modifying a user", function() {
                it ("should modify a user");
                it ("should warn when modifying a user that doesnt exist");
                it ("should warn when modification is invalid");
            })
        });

        describe("groups", function() {
            describe("getting groups", function() {
                it ("should return a list of groups");
                it ("should return a specific group");
            });

            describe("creating a group", function() {
                it ("should create a group");
                it ("should return 409 when trying to create a group that already exists");
            });

            describe("deleting groups", function() {
                it ("should delete a group that exists");
                it ("should warn when trying to delete a group that is not there");
            });

            describe("modifying groups", function() {
                it ("should modify a specific group that exists");
                it ("should warn when trying to modify a group that does not exist");
            });

            describe("adding users to a group", function() {
                it ("should add a user that exists to a group");
                it ("should warn if trying to add a user to a group that doesn't exist");
                it ("should warn when trying to add a user that doesnt exist to a group");
                it ("should warn when trying to add the same user to a group");
            });

            describe("removing users from a group", function() {
                it ("should delete a user from a group");
                it ("should warn if trying to delete a user from a group that doesn't exist");
                it ("should warn when trying to delete a user that is not in a group");
                it ("should warn when trying to remove a user that is not part of a group");
            });

            describe("returning users for a specific group", function() {
                it ("should return the users for a specific group");
            });
        });
    });


});