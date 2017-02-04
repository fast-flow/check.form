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
module.exports = Test
