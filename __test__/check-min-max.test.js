var test = require('form-test')

it('min 5', function () {
    return new Promise(function (resolve) {
        test.check({
            value: '1234',
            rules: [
                {
                    rule: {
                        // value.length < 5
                        min: 5,
                        msg: '用户名不能小于5位'
                    }
                }
            ],
            settings: {
                onError: function (error) {
                    expect(error).toEqual([
                        {
                            "errorMsg": "用户名不能小于5位",
                            "rule": {
                                "be": true,
                                "min": 5,
                                "msg": "用户名不能小于5位",
                                "trim": false
                            }
                        }
                    ])
                    resolve()
                }
            }
        })
    })
})


it('max 5', function () {
    return new Promise(function (resolve) {
        test.check({
            value: '123456',
            rules: [
                {
                    rule: {
                        // value.length < 5
                        max: 5,
                        msg: '用户名不能大于5位'
                    }
                }
            ],
            settings: {
                onError: function (error) {
                    expect(error).toEqual([
                        {
                            "errorMsg": "用户名不能大于5位",
                            "rule": {
                                "be": true,
                                "max": 5,
                                "msg": "用户名不能大于5位",
                                "trim": false
                            }
                        }
                    ])
                    resolve()
                }
            }
        })
    })
})


it('min 5 max 10 value:1234567890123456789', function () {
    test.addRule('test/check-min-max', {
        min: 5,
        max: 10,
        msg: '用户名不能小于5位和大于10位'
    })
    return new Promise(function (resolve) {
        test.check({
            value: '1234567890123456789',
            rules: [
                {
                    rule: 'test/check-min-max'
                }
            ],
            settings: {
                onError: function (error) {
                    expect(error).toEqual([
                        {
                            "errorMsg": "用户名不能小于5位和大于10位",
                            "rule": {
                                "be": true,
                                "max": 10,
                                "min": 5,
                                "msg": "用户名不能小于5位和大于10位",
                                "rule": "test/check-min-max",
                                "trim": false
                            }
                        }
                    ])
                    resolve()
                }
            }
        })
    })
})


it('min 5 max 10 value:123456', function () {
    return new Promise(function (resolve, reject) {
        test.check({
            value: '123456',
            rules: [
                {
                    rule: 'test/check-min-max'
                }
            ],
            settings: {
                onPass: function () {
                    resolve()
                },
                onError: function (error) {
                    reject()
                }
            }
        })
    })
})
