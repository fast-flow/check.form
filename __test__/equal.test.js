var Test = require('../lib/index')
var test = new Test()
it('basic', function () {
    return new Promise(function (resolve, reject) {
        test.check('123', {
            name: '重复密码',
            tests: [
                {
                    equal: '1234',
                    msg: '两次输入密码不一致'
                }
            ]
        }, {
            done: function () {
                reject()
            },
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "msg": "两次输入密码不一致",
                            "rule": {
                                "equal": "1234",
                                "msg": "两次输入密码不一致"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            test.check('123', {
                name: '重复密码',
                tests: [
                    {
                        equal: '123',
                        msg: '两次输入密码不一致'
                    }
                ]
            }, {
                done: function () {
                    resolve()
                },
                fail: function () {
                    reject()
                }
            })
        })
    })
})
