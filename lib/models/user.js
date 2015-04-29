var User = function(userData, options) {
    this.userData        = userData;
    this.cn              = this.userData.name;
    this.objectClass     = 'posixAccount';
};

User.prototype.name = function() { return this.cn; };
User.prototype.ldapObjectClass = function() { return this.objectClass; };

module.exports = User;