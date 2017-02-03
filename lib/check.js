require('babel-polyfill')
var extend = require('extend')
var checkRule = require('./checkRule')
var defaultRule = require('./defaultRule')
/**
 * @param value {string}
 * @param rules {object|array}
 * @param settings {object}
 */
module.exports = function check (options) {
    var value = options.value
    var rules = options.rules
    var settings = options.settings

    var self = this
    var defaultSettings = {
        every: false,
        onError: function (errors) {},
        onAsyncError: function (error) {},
        onCheckDone: function () {data},
        onPass: function () {}
    }
    extend(true, defaultSettings, settings)
    settings = defaultSettings
    if (typeof rules !== 'object') {
        throw new Error('node_modules/form-test/check.js test.check(rules, settings), rules must to be array or object.')
    }
    // rules is object
    if (!Array.isArray(rules)) {
        rules = [rules]
    }
    var syncErors = []
    var asyncErrors = []
    var asyncCount = 0
    var asyncPassCount = 0
    var hasAsyncResult = function () {
        if (asyncCount === asyncPassCount) {
            settings.onPass()
        }
    }
    var onAsync = function (data) {
        switch(data.type) {
            case 'begin-to-check':
                asyncCount++
            break
            case 'error':
                asyncErrors.push(data.errorData)
                settings.onAsyncError(data.errorData)
                hasAsyncResult()
            break
            case 'pass':
                asyncPassCount++
                hasAsyncResult()
            break
            default:
                throw new Error('Not match type (node_modules/form-test/check.js onAsync)')
        }
    }
    rules.some(function (item, index) {
        switch(typeof item.rule) {
            case 'object':
                extend(true, {}, item)
                var tempRule = defaultRule(item.rule)
                checkRule(value, tempRule, syncErors, onAsync)
            break
            case 'string':
                var rule = self.ruleMap[item.rule]
                extend(true, rule, item)
                checkRule(value, rule, syncErors, onAsync)
            break
            default:
                throw new Error('test.check(rules, settings), rules[key] must to be string or object')
        }
        if (!settings.every && syncErors.length !== 0) {
            return true
        }
    })
    // 只存在同步的情况下直接判断同步错误消息数量
    if (syncErors.length === 0 && asyncCount === 0 ) {
        settings.onPass()
    }
    if (syncErors.length !== 0 ) {
        settings.onError(syncErors)
    }
}
