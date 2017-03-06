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
            }
        },
        {
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
        },
        {
            key: 'fn',
            test: function () {
                var errorMsg = rule.fn(value)
                if (!errorMsg) {
                    emit({
                        type: 'SYNC_PASS',
                        rule: rule
                    })
                }
                else {
                    emit({
                        type: 'SYNC_FAIL',
                        rule: rule,
                        errorMsg: renderMsg(errorMsg, errorMsgRenderData)
                    })
                }
            }
        },
        {
            key: 'async',
            test: function () {
                var p = new Promise(rule.async)
                p.then(function () {
                    emit({
                        type: 'ASYNC_PASS',
                        rule: rule
                    })
                }, function (errorMsg) {
                    emit({
                        type: 'ASYNC_FAIL',
                        rule: rule,
                        errorMsg: renderMsg(errorMsg, errorMsgRenderData)
                    })
                })
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
        match = true
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
    else {
        var findAttr = false
        attrs.some(function (item) {
            var match = rule[item.key]
            if (match) {
                findAttr = true
                item.test()
                return true
            }
        })
        if (!findAttr) {
            throw new Error('node_modules/form-test: Invalid format of rules https://github.com/fast-flow/form-check/issues/1')
        }
    }
}
