var Test = require('../lib/index')
var test = new Test()
it('required', function () {
    return new Promise(function (resolve, reject){
        test.check('a', {
            name: '用户名',
            tests: [
                {
                    rule: 'required'
                }
            ]
        }, {
            pass: function () {
                resolve()
            },
            fail: function () {
                reject()
            }
        })
    })
    .then(function () {
        return new Promise(function (resolve, reject) {
            test.check('   ', {
                name: '用户名',
                tests: [
                    {
                        rule: 'required'
                    }
                ]
            }, {
                pass: function () {
                    reject()
                },
                fail: function () {
                    resolve()
                }
            })
        })
    })
    .then(function () {
        return new Promise(function (resolve, reject) {
            test.check('   a  ', {
                name: '用户名',
                tests: [
                    {
                        rule: 'required'
                    }
                ]
            }, {
                pass: function () {
                    resolve()
                },
                fail: function () {
                    reject()
                }
            })
        })
    })
})

it('email', function () {
    return new Promise(function(resolve, reject) {
        test.check('email@qq.com', {
            tests: [
                {
                    rule: "email"
                }
            ]
        }, {
            pass: function () {
                resolve()
            },
            fail: function () {
                reject()
            }
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            test.check('email@qq', {
                tests: [
                    {
                        rule: "email"
                    }
                ]
            }, {
                pass: function () {
                    reject()
                },
                fail: function (errors) {
                    expect(errors).toEqual(
                        [
                            {
                                "errorMsg": "的格式不正确",
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
})

it('url', function () {
    return new Promise(function(resolve, reject) {
        test.check('http://www.baidu.com', {
            tests: [
                {
                    rule: "url"
                }
            ]
        }, {
            pass: function () {
                resolve()
            },
            fail: function () {
                reject()
            }
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            test.check('www.com', {
                tests: [
                    {
                        rule: "url"
                    }
                ]
            }, {
                pass: function () {
                    reject()
                },
                fail: function (errors) {
                    expect(errors).toEqual(
                        [{"errorMsg": "的格式不正确", "rule": {"be": true, "msg": "{{name}}的格式不正确", "regexp": /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/}}]
                    )
                    resolve()
                }
            })
        })
    })
})

it('easyurl', function () {
    return new Promise(function(resolve, reject) {
        test.check('http://www.baidu.com', {
            tests: [
                {
                    rule: "easyurl"
                }
            ]
        }, {
            pass: function () {
                resolve()
            },
            fail: function () {
                reject()
            }
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            test.check('www.com', {
                tests: [
                    {
                        rule: "easyurl"
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

it('mobile', function () {
    return new Promise(function(resolve, reject) {
        test.check('13612341234', {
            tests: [
                {
                    rule: "mobile"
                }
            ]
        }, {
            pass: function () {
                resolve()
            },
            fail: function () {
                reject()
            }
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            test.check('1361234123', {
                name: '手机号码',
                tests: [
                    {
                        rule: "mobile"
                    }
                ]
            }, {
                pass: function () {
                    reject()
                },
                fail: function (errors) {
                    expect(errors).toEqual(
                        [{"errorMsg": "请输入正确的手机号码", "rule": {"be": true, "msg": "请输入正确的{{name}}", "regexp": /^1\d{10}$/}}]
                    )
                    resolve()
                }
            })
        })
    })
})
