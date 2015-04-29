var mocha = require('mocha');
var expect = require('chai').expect;
var User  = require('../../../lib/models/user.js');

describe('An ldap user', function() {
    it ('should be created with with valid data', function() {
        var user = new User({
            "name": 'Tom',
            "password": "Soon to be hashed"
        });

        expect(user.name()).to.equal('Tom');
        expect(user.ldapObjectClass()).to.equal('posixAccount');
    });

    it ("should not allow instantiation with anything other than an object containing data", function() {
    });

    it ("should throw an exception if it is not created with all valid fields", function() {

    });
});