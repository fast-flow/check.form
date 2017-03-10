var Test = require('../lib/index')
var test = new Test()
it('sensitive word', function () {
    return new Promise(function (resolve, reject) {
        test.addRule('sensitiveWord', {
            regexp: /(yamadie|yikuyiku)/,
            be: false,
            msg: "{{name}}存在敏感词"
        })
        test.check('yamadie', {
            name: '昵称',
            tests: [
                {
                    rule: 'sensitiveWord'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "msg": "昵称存在敏感词",
                            "rule": {
                                "be": false,
                                "msg": "{{name}}存在敏感词",
                                "regexp": /(yamadie|yikuyiku)/
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('ruleName existing', function () {
    try {
        test.addRule('abc', {
            regexp: /(yamadie|yikuyiku)/,
            be: false,
            msg: "{{name}}存在敏感词"
        })
        test.addRule('abc', {
            regexp: /(yamadie|yikuyiku)/,
            be: false
        })
    }
    catch (e) {
        expect(e.message).toEqual('node_modules/form.test: test.addRule("abc"), "abc" existing!')
    }
})
