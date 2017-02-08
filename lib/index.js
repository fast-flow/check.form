var extend = require('extend')
var Test = function (settings) {
    var defaultSettings = {
        rule: extend(true, {}, require('./defaultRule'))
    }
    extend(true, defaultSettings, settings)
    settings = defaultSettings
    this._rule = settings.rule
}
Test.prototype.check = require('./check.js')
Test.prototype.addRule = require('./addRule.js')
Test.prototype.replaceRule = require('./replaceRule.js')
module.exports = Test
