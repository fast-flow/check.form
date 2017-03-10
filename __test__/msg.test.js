var Test = require('../lib/index')
var test = new Test()
it('msg mustache', function () {
    return new Promise(function (resolve, reject) {
        test.check('123', {
            name: '用户名',
            tests: [
                {
                    regexp: /abc/,
                    be: true,
                    some: '123',
                    msg: '{{ name }}必须存在abc {{self.some}}'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "rule": {
                                "be": true,
                                "some": '123',
                                "msg": '{{ name }}必须存在abc {{self.some}}',
                                "regexp": /abc/
                            },
                            "msg": "用户名必须存在abc 123"
                        }
                    ]
                )
                resolve()
            }
        })
    })
})
