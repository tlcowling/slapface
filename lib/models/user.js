(function() {
    var User = function (userData, options) {
        if (typeof(userData) !== 'object') {
            throw Error('Needs to be an object containing user data');
        }

        this.cn = userData.firstname;
        this.sn = userData.surname;
        this.uid = userData.username || this.cn.toLowerCase();
        this.uidNumber = userData.uidNumber || 10000;
        this.gidNumber = userData.gidNumber || 10000;
        this.homedirectory = userData.homeDirectory || '/home/' + this.uid;
        this.objectclass = ['top', 'person', 'posixAccount'];
    };

    User.prototype.firstname = function () {
        return this.cn;
    };
    User.prototype.surname = function () {
        return this.sn;
    };
    User.prototype.username = function () {
        return this.uid;
    };
    User.prototype.ldapObjectClass = function () {
        return this.objectclass;
    };
    User.prototype.toLdapObject = function () {
        return {
            cn: this.cn,
            sn: this.sn,
            uid: this.cn,
            uidNumber: this.uid,
            gidNumber: this.uidNumber,
            homedirectory: this.homedirectory,
            email: this.email,
            objectclass: this.objectclass
        }
    };

    module.exports = User;
})();