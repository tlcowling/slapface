var mocha = require('mocha');
var expect = require('chai').expect;
var User  = require('../../../lib/models/user.js');

describe('Ldap user model', function() {
    describe('attributes', function() {
        it ('should be created with with valid data', function() {
            var user = new User({
                "firstname"    : 'Tom',
                "surname"      : 'McGiblets',
                "emailaddress" : 'tom.mcgiblets@gmail.com',
                "password"     : 'Soon to be hashed'
            });

            expect(user.firstname()).to.equal('Tom');
            expect(user.surname()).to.equal('McGiblets');
            expect(user.emailaddress()).to.equal('tom.mcgiblets@gmail.com');
            expect(user.ldapObjectClass()).to.equal('posixAccount');
        });

        it ("should not allow instantiation with anything other than an object containing data", function() {
            var nonObjectUserData = 'invalid';
            // wrap the call in an anonymous function to allow chai to expect error throw
            var invalidUser = function() {
                new User(nonObjectUserData);
            };

            expect(invalidUser).to.throw(Error);
        });
    });
    describe('validation', function() {
        it ("should throw an exception if it is not created with all valid fields", function() {

        });
    });
});