var Test = require('../lib/index')
var test = new Test()

it('always sync done 1 error 1', function () {
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
            always: function (stat) {
                expect(stat).toEqual(
                    {
                        "done": [
                            {
                                "rule": {
                                    "be": true,
                                    "msg": "必须存在a",
                                    "regexp": /a/
                                }
                            }
                        ],
                        "fail": [
                            {
                                "msg": "必须存在数字",
                                "rule": {
                                    "be": true,
                                    "msg": "必须存在数字",
                                    "regexp": /\d/
                                }
                            }
                        ],
                        "async": {
                            "count": 0,
                            "fail": [],
                            "done": []
                        },
                        "sync": {
                            "count": 2,
                            "fail": [
                                {
                                    "msg": "必须存在数字",
                                    "rule": {
                                        "be": true,
                                        "msg": "必须存在数字",
                                        "regexp": /\d/
                                    }
                                }
                            ],
                            "done": [
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

it('always func', function () {
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
        }, function (stat) {
            expect(stat).toEqual(
                {
                    "fail": [
                        {
                            "msg": "必须存在z",
                            "rule": {
                                "be": true,
                                "msg": "必须存在z",
                                "regexp": /z/
                            }
                        }
                    ],
                    "done": [],
                    "async": {
                        "count": 0,
                        "fail": [],
                        "done": []
                    },
                    "sync": {
                        "count": 1,
                        "fail": [
                            {
                                "msg": "必须存在z",
                                "rule": {
                                    "be": true,
                                    "msg": "必须存在z",
                                    "regexp": /z/
                                }
                            }
                        ],
                        "done": []
                    }
                }
            )
            resolve()
        })
    })
})


it('always sync error 2', function () {
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
            always: function (stat) {
                expect(stat).toEqual(
                    {
                        "fail": [
                            {
                                "msg": "必须存在z",
                                "rule": {
                                    "be": true,
                                    "msg": "必须存在z",
                                    "regexp": /z/
                                }
                            }
                        ],
                        "done": [],
                        "async": {
                            "count": 0,
                            "fail": [],
                            "done": []
                        },
                        "sync": {
                            "count": 1,
                            "fail": [
                                {
                                    "msg": "必须存在z",
                                    "rule": {
                                        "be": true,
                                        "msg": "必须存在z",
                                        "regexp": /z/
                                    }
                                }
                            ],
                            "done": []
                        }
                    }
                )
                resolve()
            }
        })
    })
})

it('always sync error 2 every', function () {
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
            always: function (stat) {
                expect(stat).toEqual(
                    {
                        "fail": [
                            {
                                "msg": "必须存在z",
                                "rule": {
                                    "be": true,
                                    "msg": "必须存在z",
                                    "regexp": /z/
                                }
                            },
                            {
                                "msg": "必须存在数字",
                                "rule": {
                                    "be": true,
                                    "msg": "必须存在数字",
                                    "regexp": /\d/
                                }
                            }
                        ],
                        "done": [],
                        "async": {
                            "count": 0,
                            "fail": [],
                            "done": []
                        },
                        "sync": {
                            "count": 2,
                            "fail": [
                                {
                                    "msg": "必须存在z",
                                    "rule": {
                                        "be": true,
                                        "msg": "必须存在z",
                                        "regexp": /z/
                                    }
                                },
                                {
                                    "msg": "必须存在数字",
                                    "rule": {
                                        "be": true,
                                        "msg": "必须存在数字",
                                        "regexp": /\d/
                                    }
                                }
                            ],
                            "done": []
                        }
                    }
                )
                resolve()
            }
        })
    })
})

it('always async', function () {
    return new Promise(function(resolve, reject) {
        test.check('abc', {
            tests: [
                {
                    regexp: /z/,
                    msg: '不能存在z'
                },
                {
                    async: function (done, fail) {
                        setTimeout(function () {
                            fail('异步错误消息')
                        }, 100)
                    }
                }
            ]
        }, {
            always: function (stat) {
                expect(JSON.stringify(stat)).toEqual(
                    '{\"sync\":{\"fail\":[{\"rule\":{\"regexp\":{},\"msg\":\"不能存在z\"},\"msg\":\"不能存在z\"}],\"done\":[],\"count\":1},\"async\":{\"fail\":[],\"done\":[],\"count\":0},\"fail\":[{\"rule\":{\"regexp\":{},\"msg\":\"不能存在z\"},\"msg\":\"不能存在z\"}],\"done\":[]}'
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
                        async: function (done, fail) {
                            setTimeout(function () {
                                fail('异步错误消息')
                            }, 100)
                        }
                    }
                ]
            }, {
                always: function (stat) {
                    expect(JSON.stringify(stat)).toEqual(
                        '{"sync":{"fail":[{"rule":{"regexp":{},"msg":"不能存在z"},"msg":"不能存在z"}],"done":[],"count":1},"async":{"fail":[{"rule":{},"msg":"异步错误消息"}],"done":[],"count":1},"fail":[{"rule":{},"msg":"异步错误消息"},{"rule":{"regexp":{},"msg":"不能存在z"},"msg":"不能存在z"}],"done":[]}'
                    )
                    resolve()
                }
            })
        })
    })
})

it('always multiple async', function () {
    return new Promise(function (resolve, reject) {
        test.check('abc', {
            every: true,
            tests: [
                {
                    async: function (done, fail) {
                        setTimeout(function () {
                            fail('async error 1')
                        }, 100)
                    }
                },
                {
                    async: function (done, fail) {
                        setTimeout(function () {
                            fail('async error 2')
                        }, 100)
                    }
                }
            ]
        }, {
            always: function (stat) {
                expect(JSON.stringify(stat)).toEqual('{"sync":{"fail":[],"done":[],"count":0},"async":{"fail":[{"rule":{},"msg":"async error 1"},{"rule":{},"msg":"async error 2"}],"done":[],"count":2},"fail":[{"rule":{},"msg":"async error 1"},{"rule":{},"msg":"async error 2"}],"done":[]}')
                resolve()
            }
        })
    })
})
