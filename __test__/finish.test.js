var Test = require('../lib/index')
var test = new Test()

it('finish sync pass 1 error 1', function () {
    return new Promise(function(resolve, reject) {
        test.check('abc', {
            tests: [
                {
                    regexp: /a/,
                    be: true,
                    msg: '必须存在a'
                },
                {
                    regexp: /\d/,
                    be: true,
                    msg: '必须存在数字'
                }
            ]
        }, {
            finish: function (stat) {
                expect(stat).toEqual(
                    {
                        "async": {
                            "count": 0,
                            "fail": [],
                            "pass": []
                        },
                        "sync": {
                            "count": 2,
                            "fail": [
                                {
                                    "errorMsg": "必须存在数字",
                                    "rule": {
                                        "be": true,
                                        "msg": "必须存在数字",
                                        "regexp": /\d/
                                    }
                                }
                            ],
                            "pass": [
                                {
                                    "rule": {
                                        "be": true,
                                        "msg": "必须存在a",
                                        "regexp": /a/
                                    }
                                }
                            ]
                        }
                    }
                )
                resolve()
            }
        })
    })
})

it('finish sync error 2', function () {
    return new Promise(function(resolve, reject) {
        test.check('abc', {
            tests: [
                {
                    regexp: /z/,
                    be: true,
                    msg: '必须存在z'
                },
                {
                    regexp: /\d/,
                    be: true,
                    msg: '必须存在数字'
                }
            ]
        }, {
            finish: function (stat) {
                expect(stat).toEqual(
                    {
                        "async": {
                            "count": 0,
                            "fail": [],
                            "pass": []
                        },
                        "sync": {
                            "count": 1,
                            "fail": [
                                {
                                    "errorMsg": "必须存在z",
                                    "rule": {
                                        "be": true,
                                        "msg": "必须存在z",
                                        "regexp": /z/
                                    }
                                }
                            ],
                            "pass": []
                        }
                    }
                )
                resolve()
            }
        })
    })
})

it('finish sync error 2 every', function () {
    return new Promise(function(resolve, reject) {
        test.check('abc', {
            every: true,
            tests: [
                {
                    regexp: /z/,
                    be: true,
                    msg: '必须存在z'
                },
                {
                    regexp: /\d/,
                    be: true,
                    msg: '必须存在数字'
                }
            ]
        }, {
            finish: function (stat) {
                expect(stat).toEqual(
                    {
                        "async": {
                            "count": 0,
                            "fail": [],
                            "pass": []
                        },
                        "sync": {
                            "count": 2,
                            "fail": [
                                {
                                    "errorMsg": "必须存在z",
                                    "rule": {
                                        "be": true,
                                        "msg": "必须存在z",
                                        "regexp": /z/
                                    }
                                },
                                {
                                    "errorMsg": "必须存在数字",
                                    "rule": {
                                        "be": true,
                                        "msg": "必须存在数字",
                                        "regexp": /\d/
                                    }
                                }
                            ],
                            "pass": []
                        }
                    }
                )
                resolve()
            }
        })
    })
})

it('finish async', function () {
    return new Promise(function(resolve, reject) {
        test.check('abc', {
            tests: [
                {
                    regexp: /z/,
                    msg: '不能存在z'
                },
                {
                    async: function (pass, fail) {
                        setTimeout(function () {
                            fail('异步错误消息')
                        }, 100)
                    }
                }
            ]
        }, {
            finish: function (stat) {
                expect(stat).toEqual(
                    {
                        "async": {
                            "count": 0,
                            "fail": [],
                            "pass": []
                        },
                        "sync": {
                            "count": 1,
                            "fail": [
                                {
                                    "errorMsg": "不能存在z",
                                    "rule": {
                                        "msg": "不能存在z",
                                        "regexp": /z/
                                    }
                                }
                            ],
                            "pass": []
                        }
                    }
                )
                resolve()
            }
        })
    }).then(function () {
        return new Promise(function(resolve, reject) {
            test.check('abc', {
                every: true,
                tests: [
                    {
                        regexp: /z/,
                        msg: '不能存在z'
                    },
                    {
                        async: function (pass, fail) {
                            setTimeout(function () {
                                fail('异步错误消息')
                            }, 100)
                        }
                    }
                ]
            }, {
                finish: function (stat) {
                    expect(JSON.stringify(stat)).toEqual(
                        "{\"sync\":{\"fail\":[{\"rule\":{\"regexp\":{},\"msg\":\"不能存在z\"},\"errorMsg\":\"不能存在z\"}],\"pass\":[],\"count\":1},\"async\":{\"fail\":[{\"rule\":{},\"errorMsg\":\"异步错误消息\"}],\"pass\":[],\"count\":1}}"
                    )
                    resolve()
                }
            })
        })
    })
})

it('finish multiple async', function () {
    return new Promise(function (resolve, reject) {
        test.check('abc', {
            tests: [
                {
                    async: function (pass, fail) {
                        setTimeout(function () {
                            fail('async error 1')
                        }, 100)
                    }
                },
                {
                    async: function (pass, fail) {
                        setTimeout(function () {
                            fail('async error 2')
                        }, 100)
                    }
                }
            ]
        }, {
            finish: function (stat) {
                expect(JSON.stringify(stat)).toEqual('{"sync":{"fail":[],"pass":[],"count":0},"async":{"fail":[{"rule":{},"errorMsg":"async error 1"},{"rule":{},"errorMsg":"async error 2"}],"pass":[],"count":2}}')
                resolve()
            }
        })
    })
})
