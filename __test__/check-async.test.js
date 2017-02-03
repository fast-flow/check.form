var test = require('../lib/index')
it('ajax', function () {
    return new Promise(function (resolve) {
        var rule = {
            async: function (done, value) {
                setTimeout(function () {
                    done('错误消息');return
                }, 200)
            }
        }
        test.check({
            value: '1234567890',
            rules: [
                {
                    rule: rule
                }
            ],
            settings: {
                onAsyncError: function (error) {
                    expect(error.errorMsg).toEqual('错误消息')
                    resolve()
                }
            }
        })
    })
})

it('async onPass', function () {
    return new Promise(function (resolve, reject) {
        test.check({
            value: '1234567890',
            rules: [
                {
                    rule: {
                        async: function (done) {
                            setTimeout(function () {
                                done();return
                            },10)
                        }
                    }
                }
            ],
            settings: {
                onAsyncError: function () {
                    reject()
                },
                onPass: function () {
                    resolve()
                }
            }
        })
    })
})
