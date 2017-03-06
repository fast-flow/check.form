module.exports = function (ruleName, rule) {
    var self = this
    if (self._rule[ruleName]) {
        throw new Error('node_modules/form.test: test.addRule("' + ruleName + '"), "' + ruleName + '" existing!')
    }
    self._rule[ruleName] = rule
}
