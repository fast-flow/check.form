var Test = require('../lib/index')
var test = new Test()
it('function', function () {
    return new Promise(function (resolve, reject) {
        test.check('123', {
            name: '函数校验',
            tests: [
                {
                    fn: function (value) {
                        // fail
                        return "错误消息"
                        // pass
                        // return
                    }
                }
            ]
        }, {
            pass: function () {
                reject()
            },
            fail: function (errors) {
                expect(errors[0].errorMsg).toEqual("错误消息")
                expect(typeof errors[0].rule.fn).toEqual('function')
                resolve()
            }
        })
    }).then(function () {
        return new Promise(function(resolve, reject) {
            test.check('123', {
                name: '函数校验',
                tests: [
                    {
                        fn: function (value) {
                            // fail
                            // return "错误消息"
                            // pass
                            return
                        }
                    }
                ]
            }, {
                pass: function () {
                    resolve()
                },
                fail: function (errors) {
                    reject()
                }
            })
        })
    })
})
