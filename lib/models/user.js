var User = function(userData, options) {
    if (typeof(userData) !== 'object') {
        throw Error('Needs to be an object containing user data');
    }

    this.userData        = userData;
    this.cn              = this.userData.firstname;
    this.sn              = this.userData.surname;
    this.email           = this.userData.emailaddress;
    this.objectClass     = 'posixAccount';
};

User.prototype.firstname       = function() { return this.cn; };
User.prototype.surname         = function() { return this.sn; };
User.prototype.emailaddress    = function() { return this.email; };
User.prototype.ldapObjectClass = function() { return this.objectClass; };

module.exports = User;