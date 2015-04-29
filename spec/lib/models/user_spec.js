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
            expect(user.ldapObjectClass()).to.deep.equal(['top', 'person', 'posixAccount']);
        });

        it ("should not allow instantiation with anything other than an object containing data", function() {
            var nonObjectUserData = 'invalid';
            // wrap the call in an anonymous function to allow chai to expect error throw
            var invalidUser = function() {
                new User(nonObjectUserData);
            };

            expect(invalidUser).to.throw(Error);
        });

        it ("should return a valid LDAP object for ldapjs to consume", function() {
            var user = new User({
                "firstname"    : 'Tom',
                "surname"      : 'McGiblets',
                "emailaddress" : 'tom.mcgiblets@gmail.com',
                "password"     : 'Soon to be hashed'
            });

            var toLdapObject = user.toLdapObject();

            expect(toLdapObject).to.have.deep.property('cn', user.firstname());
            expect(toLdapObject).to.have.deep.property('sn', user.surname());
            expect(toLdapObject).to.have.deep.property('email', user.emailaddress());
            expect(toLdapObject).to.have.deep.property('objectclass[0]', 'top');
            expect(toLdapObject).to.have.deep.property('objectclass[1]', 'person');
            expect(toLdapObject).to.have.deep.property('objectclass[2]', 'posixAccount');
        });

        it ("should by default use the value of the cn in lowercase for the uid of the user", function() {
            var userAccountWithUidSameAsFirstName = new User({
                "firstname": 'Tom',
                "surname": 'McGiblets',
                "emailaddress": 'tom.mcgiblets@gmail.com',
                "password": 'Soon to be hashed'
            });

            expect(userAccountWithUidSameAsFirstName).to.have.deep.property('uid', userAccountWithUidSameAsFirstName.cn.toLowerCase());
        });

        it ("should allow the user account to overwrite the uid with the attribute username", function() {
            var userAccountWithDifferentUidToCn = new User({
                "firstname"    : 'Tom',
                "surname"      : 'McGiblets',
                "username"     : 'littletom',
                "emailaddress" : 'tom.mcgiblets@gmail.com',
                "password"     : 'Soon to be hashed'
            });

            expect(userAccountWithDifferentUidToCn).to.have.deep.property('uid', 'littletom');
        });

        it ("should by default use the value of the uid in the home directory", function() {
            var homeDirectoryDefaultUser = new User({
                "firstname" : "Fred",
                "surname"   : "Giblets"
            });

            expect(homeDirectoryDefaultUser.homedirectory).to.equal('/home/fred');
        });

        it ("should allow the value of homeDirectory to be overwritten", function() {
            var homeDirectoryOverwrittenUser = new User({
                "firstname" : "Fred",
                "surname"   : "Giblets",
                "homeDirectory" : "/home/notnormal"
            });

            expect(homeDirectoryOverwrittenUser.homedirectory).to.equal('/home/notnormal');
        });
    });

    describe('validation', function() {
        it ("should throw an exception if it is not created with all valid fields", function() {

        });
    });
});