var Test = require('../lib/index')
var test = new Test()
it('regexp be true', function () {
    return new Promise(function (resolve, reject) {
        test.check('123', {
            name: '用户名',
            tests: [
                {
                    regexp: /abc/,
                    be: true,
                    msg: '{{ name }}必须存在abc'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "rule": {
                                "be": true,
                                "msg": "{{ name }}必须存在abc",
                                "regexp": /abc/
                            },
                            "errorMsg": "用户名必须存在abc"
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('regexp be false', function () {
    return new Promise(function (resolve, reject) {
        test.check('abc', {
            name: '用户名',
            tests: [
                {
                    regexp: /abc/,
                    be: false,
                    msg: '{{ name }}不能存在abc'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "rule": {
                                "be": false,
                                "msg": "{{ name }}不能存在abc",
                                "regexp": /abc/
                            },
                            "errorMsg": "用户名不能存在abc"
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('regexp be:false trim:true', function () {
    return new Promise(function (resolve, reject) {
        test.check(' abc ', {
            name: '用户名',
            tests: [
                {
                    regexp: /^abc$/,
                    be: false,
                    trim: true,
                    msg: '{{ name }}不能存在abc'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "rule": {
                                "be": false,
                                "trim": true,
                                "msg": "{{ name }}不能存在abc",
                                "regexp": /^abc$/
                            },
                            "errorMsg": "用户名不能存在abc"
                        }
                    ]
                )
                resolve()
            }
        })
    })
})
