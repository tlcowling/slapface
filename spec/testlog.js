// a fake logger to suppress output in functional tests
var Log = {
    info:function(msg) { },
    error:function(msg) { },
    debug:function(msg) { },
    warn:function(msg) { }
};

module.exports = Log;