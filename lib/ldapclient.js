var ldap = require('ldapjs');
var config = require('./../config.json');

module.exports = ldap.createClient({
    url: 'ldap://' + config.ldapserver.host + ":" + config.ldapserver.port
});
