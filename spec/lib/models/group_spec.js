var mocha = require('mocha');
var expect = require('chai').expect;
var Group  = require('../../../lib/models/group.js');

describe("An ldap group", function() {
    describe("attributes", function() {
        it("should have the attributes of a posix group", function() {
            var group = new Group({
                groupname: 'something',
                gidNumber: '12039'
            });

            expect(group.groupname()).to.equal('something');
            expect(group.gid()).to.equal('12039');
            expect(group.toLdapObject()).to.deep.equal({
                cn          : 'something',
                gidnumber   : '12039',
                objectclass : ['top', 'posixGroup']
            });
        });

        it("should not allow instantiation with empty data", function() {
            var emptyGroup = function() {
                new Group();
            };

            expect(emptyGroup).to.throw(Error);
        });

        it("should not allow instantiation with no data", function() {
            var invalidGroup = function() {
                new Group('invalid');
            };

            expect(invalidGroup).to.throw(Error);
        });
    });

    describe("validation", function() {
    });
});