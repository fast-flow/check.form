var extend = require('extend')
module.exports = function (rule) {
    var defaultRule = {
        trim: true,
        be: true
    }
    return extend(true, defaultRule, rule)
}
