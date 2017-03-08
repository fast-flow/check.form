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
                        type: 'SYNC_done',
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
                        type: 'SYNC_done',
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
                        type: 'SYNC_done',
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
                        type: 'ASYNC_done',
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
        minLengthBety: function () {
            if (value.length >= rule.minLength) {
                emit({
                    type: 'SYNC_done',
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
        minLength: function () {
            if (value.length >= rule.minLength) {
                emit({
                    type: 'SYNC_done',
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
        maxLength: function () {
            if (value.length <= rule.maxLength) {
                emit({
                    type: 'SYNC_done',
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
        minmaxLength: function () {
            if (value.length >= rule.minLength && value.length <= rule.maxLength) {
                emit({
                    type: 'SYNC_done',
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

    // {minLength:5} {maxLength:10} {minLength:5,maxLength:10}
    if (rule.minLength || rule.maxLength) {
        match = true
        if (rule.minLength && !rule.maxLength) {
            hasMinMaxAttr.minLength()
        }
        else if (rule.maxLength && !rule.minLength) {
            hasMinMaxAttr.maxLength()
        }
        // {minLength:5, maxLength:10}
        else {
            hasMinMaxAttr.minmaxLength()
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
