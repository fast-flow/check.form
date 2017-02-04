var extend = require('extend')
var test = require('./test')
/**
 * @param value {string}
 * @param settings {object}
 * @param callback {object}
 * @param callback.pass {function}
 * @param callback.fail {function}
 * @param callback.finish {function}
 */
module.exports = function (value, settings, callback) {
    var self = this
    var defaultCallback = {
        pass: function () {},
        fail: function () {},
        asyncFail: function () {},
        finish: function () {}
    }
    extend(true, defaultCallback, callback)
    callback = defaultCallback
    var stat = {
        sync: {
            fail: [],
            pass: [],
            count: 0
        },
        async: {
            fail: [],
            pass: [],
            count: 0
        }
    }
    var checkAsyncTestDone = function () {
        if (stat.async.count === stat.async.pass.length) {
            callback.pass()
        }
    }
    var emit = function (action) {
        switch (action.type) {
            case 'SYNC_PASS':
                stat.sync.pass.push({
                    rule: action.rule
                })
            break
            case "ASYNC_PASS":
                stat.async.pass.push({
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
        if (item.rule) {

        }
        else {
            test(value, settings, item, emit)
        }
        // 非 every 模式下出现一次错误就停止后续校验
        if (!settings.every && stat.sync.fail.length !==0) {
            return true
        }
    })
    // 不存在异步校验时，根据同步校验错误计数回调 fail 或 pass
    if (stat.async.count === 0) {
        if (stat.sync.fail.length === 0) {
            callback.pass()
        }
    }
    if (stat.sync.fail.length) {
        callback.fail(stat.sync.fail)
    }
}
