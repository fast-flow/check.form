var extend = require('extend')
module.exports = function (ruleName, extendRule) {
    var self = this
    if (typeof self._rule[ruleName] === 'undefined') {
        throw new Error('node_modules/form.test: test.replaceRule("' + ruleName + '"), "' + ruleName + '" not existing!')
    }
    self._rule[ruleName] = extend(true, self._rule[ruleName], extendRule)
}
