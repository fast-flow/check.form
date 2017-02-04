var extend = require('extend')
var Mustache = require('mustache')
/**
 * @param value {string}
 * @param rule {object}
 * @param settings {object} test.check(value, settings, callback)
 * @param emit {function} ./check.js: emeit function () {}
 */
var renderMsg = function (template, data) {
     template = template || ''
     return Mustache.render(template, data)
}
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
            test: function () {
                if (rule.regexp.test(value) === rule.be) {
                    emit({
                        type: 'SYNC_PASS',
                        rule: rule
                    })
                }
                else {
                    emit({
                        type: 'SYNC_FAIL',
                        rule: rule,
                        errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                    })
                }
            },
            key: 'equal',
            test: function () {
                if (rule.equal === value) {
                    emit({
                        type: 'SYNC_PASS',
                        rule: rule
                    })
                }
                else {
                    emit({
                        type: 'SYNC_FAIL',
                        rule: rule,
                        errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                    })
                }
            }
        }
    ]
    var hasMinMaxAttr = {
        min: function () {
            if (value.length >= rule.min) {
                emit({
                    type: 'SYNC_PASS',
                    rule: rule
                })
            }
            else {
                emit({
                    type: 'SYNC_FAIL',
                    rule: rule,
                    errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                })
            }
        },
        max: function () {
            if (value.length <= rule.max) {
                emit({
                    type: 'SYNC_PASS',
                    rule: rule
                })
            }
            else {
                emit({
                    type: 'SYNC_FAIL',
                    rule: rule,
                    errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                })
            }
        },
        minmax: function () {
            if (value.length >= rule.min && value.length <= rule.max) {
                emit({
                    type: 'SYNC_PASS',
                    rule: rule
                })
            }
            else {
                emit({
                    type: 'SYNC_FAIL',
                    rule: rule,
                    errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                })
            }
        }
    }
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
        // {min:5} {max:10} {min:5,max:10}
        if (rule.min || rule.max) {
            if (rule.min && !rule.max) {
                hasMinMaxAttr.min()
            }
            else if (rule.max && !rule.min) {
                hasMinMaxAttr.max()
            }
            // {min:5, max:10}
            else {
                hasMinMaxAttr.minmax()
            }

        }
        // ["regxp", "equal", ...]
        else if (target){
            item.test()
        }
        // not match
        else {
            throw new Error('node_modules/form-test/test.js:\ntest.check(value, settings, callback)\nDid not match to the `settings.tests[rule]` rule[key]')
        }
        // 匹配到规则中断校验
        if (!settings.every && target) {
            return true
        }
    })
}
