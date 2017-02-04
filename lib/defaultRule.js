var extend = require('extend')
module.exports = function (rule) {
    var defaultRule = {
        trim: false,
        be: true
    }
    return extend(true, defaultRule, rule)
}
