var Test = require('../lib/index')
var test = new Test()
it('ajax', function () {
    return new Promise(function (resolve, reject) {
        test.check('abc', {
            tests: [
                {
                    async: function (pass, fail) {
                        // mock ajax
                        setTimeout(function () {
                            fail('异步错误消息')
                        }, 200)
                    }
                }
            ]
        }, {
            asyncFail: function (error) {
                expect(error.errorMsg).toEqual("异步错误消息")
                expect(typeof error.rule.async).toEqual('function')
                resolve()
            }
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            test.check('abc', {
                tests: [
                    {
                        async: function (pass, fail) {
                            // mock ajax
                            setTimeout(function () {
                                pass()
                            }, 200)
                        }
                    }
                ]
            }, {
                pass: function () {
                    resolve()
                }
            })
        })
    })
})
