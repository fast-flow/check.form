var Test = require('../lib/index')
var test = new Test()
it('minLength 5', function () {
    return new Promise(function (resolve, reject) {
        test.check('123', {
            name: '密码',
            tests: [
                {
                    minLength: 5,
                    msg: '密码最少{{self.minLength}}位'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最少5位",
                            "rule": {
                                "minLength": 5,
                                "msg": "密码最少{{self.minLength}}位"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('minLength 5 has sapce', function () {
    return new Promise(function (resolve, reject) {
        test.check('      123        ', {
            name: '密码',
            tests: [
                {
                    minLength: 5,
                    msg: '密码最少{{self.minLength}}位'
                }
            ]
        }, {
            done: function (errors) {
                resolve()
            }
        })
    })
})

it('minLength 5 trim:true', function () {
    return new Promise(function (resolve, reject) {
        test.check('     123     ', {
            name: '密码',
            tests: [
                {
                    minLength: 5,
                    trim: true,
                    msg: '密码最少{{self.minLength}}位'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最少5位",
                            "rule": {
                                "minLength": 5,
                                "trim": true,
                                "msg": "密码最少{{self.minLength}}位"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})


it('maxLength 10', function () {
    return new Promise(function (resolve, reject) {
        test.check('123456789012345678', {
            name: '密码',
            tests: [
                {
                    maxLength: 10,
                    msg: '密码最多{{self.maxLength}}位'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最多10位",
                            "rule": {
                                "maxLength": 10,
                                "msg": "密码最多{{self.maxLength}}位"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('maxLength 10 "1234"', function () {
    return new Promise(function (resolve, reject) {
        test.check('1234', {
            name: '密码',
            tests: [
                {
                    maxLength: 10,
                    msg: '密码最多{{self.maxLength}}位'
                }
            ]
        }, {
            done: function (errors) {
                resolve()
            }
        })
    })
})

it('maxLength 10 trim:false', function () {
    return new Promise(function (resolve, reject) {
        test.check('12343            ', {
            name: '密码',
            tests: [
                {
                    maxLength: 10,
                    msg: '密码最多{{self.maxLength}}位'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最多10位",
                            "rule": {
                                "maxLength": 10,
                                "msg": "密码最多{{self.maxLength}}位"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('maxLength 10 trim:true', function () {
    return new Promise(function (resolve, reject) {
        test.check('12343            ', {
            name: '密码',
            tests: [
                {
                    maxLength: 10,
                    trim: true,
                    msg: '密码最多{{self.maxLength}}位'
                }
            ]
        }, {
            done: function () {
                resolve()
            }
        })
    })
})

it('minLength maxLength', function () {
     return new Promise(function (resolve, reject) {
         test.check('123' ,{
             name: '密码',
             tests: [
                 {
                     minLength: 5,
                     maxLength: 10,
                     msg: '{{name}}最少{{self.minLength}}位，最多{{self.maxLength}}位'
                 }
             ]
         }, {
             fail: function (errors) {
                 expect(errors).toEqual(
                     [
                        {
                            "errorMsg": "密码最少5位，最多10位",
                            "rule": {
                                "maxLength": 10,
                                "minLength": 5,
                                "msg": "{{name}}最少{{self.minLength}}位，最多{{self.maxLength}}位"
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
                         minLength: 5,
                         maxLength: 10,
                         msg: '{{name}}最少{{self.minLength}}位，最多{{self.maxLength}}位'
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
it('minLengthByte 5', function () {
    return new Promise(function (resolve, reject) {
        test.check('12搜', {
            name: '密码',
            tests: [
                {
                    minLengthByte: 5,
                    msg: '密码最少{{self.minLengthByte}}位字节'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最少5位字节",
                            "rule": {
                                "minLengthByte": 5,
                                "minLengthByteChinese": 2,
                                "msg": "密码最少{{self.minLengthByte}}位字节"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('minLengthByte 5 has sapce', function () {
    return new Promise(function (resolve, reject) {
        test.check('      12是        ', {
            name: '密码',
            tests: [
                {
                    minLengthByte: 5,
                    "minLengthByteChinese": 2,
                    msg: '密码最少{{self.minLength}}位字节'
                }
            ]
        }, {
            done: function (errors) {
                resolve()
            }
        })
    })
})

it('minLengthByte 5 trim:true', function () {
    return new Promise(function (resolve, reject) {
        test.check('     12是     ', {
            name: '密码',
            tests: [
                {
                    minLengthByte: 5,
                    trim: true,
                    msg: '密码最少{{self.minLengthByte}}位字节'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最少5位字节",
                            "rule": {
                                "minLengthByte": 5,
                                "minLengthByteChinese": 2,
                                "trim": true,
                                "msg": "密码最少{{self.minLengthByte}}位字节"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})


it('maxLengthByte 10', function () {
    return new Promise(function (resolve, reject) {
        test.check('一二33四五六', {
            name: '密码',
            tests: [
                {
                    maxLengthByte: 10,
                    "maxLengthByteChinese": 5,
                    msg: '密码最多{{self.maxLengthByte}}位字节'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最多10位字节",
                            "rule": {
                                "maxLengthByte": 10,
                                "maxLengthByteChinese": 5,
                                "msg": "密码最多{{self.maxLengthByte}}位字节"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('maxLengthByte 10 "1234"', function () {
    return new Promise(function (resolve, reject) {
        test.check('1234', {
            name: '密码',
            tests: [
                {
                    maxLengthByte: 10,
                    msg: '密码最多{{self.maxLengthByte}}位字节'
                }
            ]
        }, {
            done: function (errors) {
                resolve()
            }
        })
    })
})

it('maxLengthByte 10 trim:false', function () {
    return new Promise(function (resolve, reject) {
        test.check('12343            ', {
            name: '密码',
            tests: [
                {
                    maxLengthByte: 10,
                    msg: '密码最多{{self.maxLengthByte}}位字节'
                }
            ]
        }, {
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            "errorMsg": "密码最多10位字节",
                            "rule": {
                                "maxLengthByte": 10,
                                "maxLengthByteChinese": 5,
                                "msg": "密码最多{{self.maxLengthByte}}位字节"
                            }
                        }
                    ]
                )
                resolve()
            }
        })
    })
})

it('maxLength 10 trim:true', function () {
    return new Promise(function (resolve, reject) {
        test.check('搜索搜索            ', {
            name: '密码',
            tests: [
                {
                    maxLengthByte: 10,
                    trim: true,
                    msg: '密码最多{{self.maxLength}}位字节'
                }
            ]
        }, {
            done: function () {
                resolve()
            }
        })
    })
})


it('minLengthByte maxLengthByte', function () {
     return new Promise(function (resolve, reject) {
         test.check('123' ,{
             name: '密码',
             tests: [
                 {
                     minLengthByte: 5,
                     maxLengthByte: 10,
                     msg: '{{name}}最少{{self.minLengthByte}}位字节，最多{{self.maxLengthByte}}位字节'
                 }
             ]
         }, {
             fail: function (errors) {
                 expect(errors).toEqual(
                     [
                        {
                            "errorMsg": "密码最少5位字节，最多10位字节",
                            "rule": {
                                "maxLengthByte": 10,
                                "minLengthByte": 5,
                                "minLengthByteChinese": 2,
                                "maxLengthByteChinese": 5,
                                "msg": "{{name}}最少{{self.minLengthByte}}位字节，最多{{self.maxLengthByte}}位字节"
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
                         minLengthByte: 5,
                         maxLengthByte: 10,
                         msg: '{{name}}最少{{self.minLengthByte}}位字节，最多{{self.maxLengthByte}}位字节'
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
