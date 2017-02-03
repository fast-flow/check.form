var test = require('../lib/index')
it('addRule testabc |value: "abc"', function () {
    var triggerError = false
    test.addRule('testabc', {
        regexp: /abc/,
        be: false,
        msg: '{{name}}不能包含abc'
    })
    test.check({
        value: 'abc',
        rules: {
            rule: 'testabc',
            name: '用户名'
        },
        settings: {
            every: false,
            onError: function (error) {
                triggerError = true
                expect(error).toEqual([{
                    "errorMsg": "用户名不能包含abc",
                    "rule": {
                        "be": false,
                        "msg": "{{name}}不能包含abc",
                        "name": "用户名",
                        "regexp": /abc/,
                        "rule": "testabc",
                        "trim": true
                    }
                }])
            }
        }
    })
    expect(triggerError).toEqual(true)
})

it('addRule testabc |value: "123"', function () {
    var triggerError = false
    test.addRule('testabc2', {
        regexp: /abc/,
        be: false,
        msg: '{{name}}不能包含abc'
    })
    test.check({
        value: '123',
        rules: {
            rule: 'testabc2',
            name: '用户名'
        },
        settings: {
            every: false,
            onError: function (error) {
                triggerError = true
                throw new Error('Should not triger onError')
            }
        }
    })
    expect(triggerError).toEqual(false)
})
