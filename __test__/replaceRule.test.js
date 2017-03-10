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
    }).then(function () {
        test.replaceRule('sensitiveWord', {
            regexp: /(yamadie|yikuyiku)/,
            be: false,
            msg: "{{name}}敏感词!"
        })
        return new Promise(function (resolve, reject) {
            test.check('yikuyiku', {
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
                                "msg": "昵称敏感词!",
                                "rule": {
                                    "be": false,
                                    "msg": "{{name}}敏感词!",
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
})

it('ruleName not existing', function () {
    try {
        test.replaceRule('abc', {
            msg: "{{name}}存在敏感词"
        })
    }
    catch (e) {
        expect(e.message).toEqual('node_modules/form.test: test.replaceRule(\"abc\"), \"abc\" not existing!')
    }
})
