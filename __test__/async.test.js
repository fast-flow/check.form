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

it('Multiple async errors', function () {
    var errorCount = 0
    return new Promise(function (resolve, reject) {
        test.check('abc', {
            tests: [
                {
                    async: function (pass, fail) {
                        fail('async error 1')
                    }
                },
                {
                    async: function (pass, fail) {
                        fail('async error 2')
                    }
                }
            ]
        }, {
            pass: function () {
                reject()
            },
            asyncFail: function (error) {
                errorCount++
                expect(error.errorMsg).toMatch(/async error (1|2)/)
                if (errorCount === 2) {
                    resolve()
                }
            },
            fail: function (errors) {
                reject()
            }
        })
    })
})
