(function() {
    var Group = function(userData) {
        if (typeof(userData) !== 'object' ) {
            throw Error('Group data must be an object');
        }
        this.cn          = userData.groupname;
        this.gidnumber   = userData.gidNumber;
        this.objectclass = ['top', 'posixGroup'];
    };

    Group.prototype.groupname = function() { return this.cn; };
    Group.prototype.gid       = function() { return this.gidnumber; };

    Group.prototype.toLdapObject = function() {
        return {
            cn          : this.cn,
            gidnumber   : this.gidnumber,
            objectclass : this.objectclass
        };
    };

    module.exports = Group;
})();