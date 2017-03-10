var extend = require('extend')
var test = require('./test')
/**
 * @param value {string}
 * @param settings {object}
 * @param callback {object}
 * @param callback.done {function}
 * @param callback.fail {function}
 * @param callback.always {function}
 */
module.exports = function (value, settings, callback) {
    var self = this
    if (typeof callback === 'function') {
        callback = {
            always: callback
        }
    }
    var defaultCallback = {
        done: function () {},
        fail: function () {},
        asyncFail: function () {},
        always: function () {}
    }
    let callbackAlways = function (stat) {
        let outputStat = extend(true, {}, stat)
        outputStat.fail = outputStat.async.fail.concat(outputStat.sync.fail)
        outputStat.done = outputStat.async.done.concat(outputStat.sync.done)
        callback.always(outputStat)
    }
    extend(true, defaultCallback, callback)
    callback = defaultCallback
    var stat = {
        sync: {
            fail: [],
            done: [],
            count: 0
        },
        async: {
            fail: [],
            done: [],
            count: 0
        }
    }
    var checkAsyncTestDone = function () {
        if (stat.async.count === stat.async.done.length) {
            callback.done()
        }
        if (stat.async.count === stat.async.done.length + stat.async.fail.length) {
            callbackAlways(stat)
        }
    }
    var emit = function (action) {
        switch (action.type) {
            case 'SYNC_DONE':
                stat.sync.done.push({
                    rule: action.rule
                })
            break
            case "ASYNC_DONE":
                stat.async.done.push({
                    rule: action.rule
                })
                checkAsyncTestDone()
            break
            case 'SYNC_FAIL':
                stat.sync.fail.push({
                    rule: action.rule,
                    errorMsg: action.errorMsg
                })
            break
            case 'ASYNC_FAIL':
                var errorData = {
                    rule: action.rule,
                    errorMsg: action.errorMsg
                }
                stat.async.fail.push(errorData)
                callback.asyncFail(errorData)
                checkAsyncTestDone()
            break
            case 'SYNC_COUNT_INCREMENT':
                stat.sync.count++
            break
            case 'ASYNC_COUNT_INCREMENT':
                stat.async.count++
            break
        }
    }
    settings.tests.some(function (item, index) {
        if (typeof item === 'string') {
            item = {
                rule: item
            }
        }
        if (item.rule) {
            test(value, settings, self._rule[item.rule], emit)
        }
        else {
            test(value, settings, item, emit)
        }
        // 非 every 模式下出现一次错误就停止后续校验
        if (!settings.every && stat.sync.fail.length !==0) {
            return true
        }
    })
    if (stat.sync.fail.length) {
        callback.fail(stat.sync.fail)
    }
    // 不存在异步校验时，根据同步校验错误计数回调 fail 或 done
    if (stat.async.count === 0) {
        if (stat.sync.fail.length === 0) {
            callback.done()
        }
        callbackAlways(stat)
    }
}
