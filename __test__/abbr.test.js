var Test = require('../lib/index')
var test = new Test()
it('abbr', function () {
    return new Promise(function (resolve, reject) {
        test.check('yamadie', {
            name: '昵称',
            tests: [
                'required',
                'email'
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "msg": "昵称的格式不正确",
                            "rule": {
                                "be": true,
                                "msg": "{{name}}的格式不正确",
                                "regexp": /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})
