var test = require('../lib/index')

it('required | value: ""', function () {
    var triggerError = false
    test.check({
        value: '',
        rules: {
            rule: 'required',
            name: '用户名'
        },
        settings: {
            every: false,
            onError: function (error) {
                triggerError = true
                expect(error).toEqual([
                    {
                        "rule": {
                            "regexp": /\S/,
                            "be": true,
                            "trim": true,
                            "msg": "{{ name }}必填",
                            "rule": "required",
                            "name": "用户名"
                        },
                        "errorMsg": "用户名必填"
                    }
                ])
            }
        }
    })
    expect(triggerError).toEqual(true)
})

it('required | value: "123"', function () {
    var triggerError = false
    test.check({
        value: '123',
        rules: {
            rule: 'required',
            name: '用户名'
        },
        settings: {
            onError: function (error) {
                triggerError = true
                throw new Error('Should not triger onError')
            }
        }
    })
    expect(triggerError).toEqual(false)
})

it('required every true', function () {
    var triggerError = false
    test.check({
        value: '',
        rules: [
            {
                rule: 'required',
                name: '用户名'
            },
            {
                rule: {
                    regexp: /\S/,
                    be: true,
                    msg: '必填哦'
                }
            }
        ],
        settings: {
            every: true,
            onError: function (error) {
                triggerError = true
                expect(error).toEqual(
                    [
                        {
                            "errorMsg": "用户名必填",
                            "rule": {
                                "be": true,
                                "msg": "{{ name }}必填",
                                "name": "用户名",
                                "regexp": /\S/,
                                "rule": "required",
                                "trim": true
                            }
                        },
                        {
                            "errorMsg": "必填哦",
                            "rule": {
                                "be": true,
                                "msg": "必填哦",
                                "regexp": /\S/,
                                "trim": true
                            }
                        }
                    ]
                )
            }
        }
    })
    expect(triggerError).toEqual(true)
})

it('required every true, value: "123"', function () {
    var triggerError = false
    test.check({
        value: '123',
        rules: [
            {
                rule: 'required',
                name: '用户名'
            },
            {
                rule: {
                    regexp: /\S/,
                    be: true,
                    msg: '必填哦'
                }
            }
        ],
        settings: {
            every: true,
            onError: function (error) {
                triggerError = true
                throw new Error('Should not triger onError')
            }
        }
    })
    expect(triggerError).toEqual(false)
})
