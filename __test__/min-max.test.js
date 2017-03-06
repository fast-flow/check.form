var Test = require('../lib/index')
var test = new Test()
it('min 5', function () {
    return new Promise(function (resolve, reject) {
        test.check('123', {
            name: '密码',
            tests: [
                {
                    min: 5,
                    msg: '密码最少{{self.min}}位'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最少5位",
                            "rule": {
                                "min": 5,
                                "msg": "密码最少{{self.min}}位"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('min 5 has sapce', function () {
    return new Promise(function (resolve, reject) {
        test.check('      123        ', {
            name: '密码',
            tests: [
                {
                    min: 5,
                    msg: '密码最少{{self.min}}位'
                }
            ]
        }, {
            done: function (errors) {
                resolve()
            }
        })
    })
})

it('min 5 trim:true', function () {
    return new Promise(function (resolve, reject) {
        test.check('     123     ', {
            name: '密码',
            tests: [
                {
                    min: 5,
                    trim: true,
                    msg: '密码最少{{self.min}}位'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最少5位",
                            "rule": {
                                "min": 5,
                                "trim": true,
                                "msg": "密码最少{{self.min}}位"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})


it('max 10', function () {
    return new Promise(function (resolve, reject) {
        test.check('123456789012345678', {
            name: '密码',
            tests: [
                {
                    max: 10,
                    msg: '密码最多{{self.max}}位'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最多10位",
                            "rule": {
                                "max": 10,
                                "msg": "密码最多{{self.max}}位"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('max 10 "1234"', function () {
    return new Promise(function (resolve, reject) {
        test.check('1234', {
            name: '密码',
            tests: [
                {
                    max: 10,
                    msg: '密码最多{{self.max}}位'
                }
            ]
        }, {
            done: function (errors) {
                resolve()
            }
        })
    })
})

it('max 10 trim:false', function () {
    return new Promise(function (resolve, reject) {
        test.check('12343            ', {
            name: '密码',
            tests: [
                {
                    max: 10,
                    msg: '密码最多{{self.max}}位'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最多10位",
                            "rule": {
                                "max": 10,
                                "msg": "密码最多{{self.max}}位"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('max 10 trim:true', function () {
    return new Promise(function (resolve, reject) {
        test.check('12343            ', {
            name: '密码',
            tests: [
                {
                    max: 10,
                    trim: true,
                    msg: '密码最多{{self.max}}位'
                }
            ]
        }, {
            done: function () {
                resolve()
            }
        })
    })
})

it('min max', function () {
     return new Promise(function (resolve, reject) {
         test.check('123' ,{
             name: '密码',
             tests: [
                 {
                     min: 5,
                     max: 10,
                     msg: '{{name}}最少{{self.min}}位，最多{{self.max}}位'
                 }
             ]
         }, {
             fail: function (errors) {
                 expect(errors).toEqual(
                     [
                        {
                            "errorMsg": "密码最少5位，最多10位",
                            "rule": {
                                "max": 10,
                                "min": 5,
                                "msg": "{{name}}最少{{self.min}}位，最多{{self.max}}位"
                            }
                        }
                    ]
                 )
                 resolve()
             }
         })
     }).then(function () {
         return new Promise(function(resolve, reject) {
             test.check('1234567' ,{
                 name: '密码',
                 tests: [
                     {
                         min: 5,
                         max: 10,
                         msg: '{{name}}最少{{self.min}}位，最多{{self.max}}位'
                     }
                 ]
             }, {
                 done: function (errors) {
                     resolve()
                 },
                 fail: function () {
                     reject()
                 }
             })
         })
     })
})
