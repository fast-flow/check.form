require('babel-polyfill')
var defaultRule = require('./defaultRule')
/**
 * @param ruleName {string}
 * @param rule {object}
 */
module.exports = addRule = function (ruleName, rule) {
    var self = this
    rule = defaultRule(rule)
    if (typeof self.ruleMap[ruleName] !== 'undefined') {
        throw new Error('node_modules/form-check: ' + ruleName + ' already!')
    }
    self.ruleMap[ruleName] = rule
}
