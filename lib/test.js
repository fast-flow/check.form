var extend = require('extend')
var Mustache = require('mustache')
/**
 * @param value {string}
 * @param rule {object}
 * @param settings {object} test.check(value, settings, callback)
 * @param emit {function} ./check.js: emeit function () {}
 */
module.exports = function test (value, settings, rule, emit) {
    if (rule.trim) {
        value = value.trim()
    }
    var errorMsgRenderData = {}
    extend(true, errorMsgRenderData, settings)
    errorMsgRenderData.self = rule
    var attrs = [
        {
            key: 'regexp',
            fn: function () {
                if (rule.regexp.test(value) === rule.be) {
                    emit({
                        type: 'SYNC_PASS',
                        rule: rule,
                        errorMsg: Mustache.render(rule.msg, errorMsgRenderData)
                    })
                }
                else {
                    emit({
                        type: 'SYNC_FAIL',
                        rule: rule,
                        errorMsg: Mustache.render(rule.msg, errorMsgRenderData)
                    })
                }
            }
        }
    ]
    attrs.some(function (item) {
        var target = rule[item.key]
        if (rule.async) {
            emit({
                type: 'ASYNC_COUNT_INCREMENT'
            })
        }
        else {
            emit({
                type: 'SYNC_COUNT_INCREMENT'
            })
        }

        item.fn()
        // 匹配到规则中断校验
        if (!settings.every && target) {
            return true
        }
    })
}
