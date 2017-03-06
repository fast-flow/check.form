var Test = require('../lib/index')
var test = new Test()
// it('regexp + min every', function () {
//     return new Promise(function(resolve, reject) {
//         test.check('abc', {
//             name: '用户名',
//             tests: [
//                 {
//                     regexp: /\d/,
//                     be: true,
//                     msg: '{{name}}必须存在数字'
//                 },
//                 {
//                     min: 5,
//                     msg: '{{name}}必须大于或等于5位'
//                 }
//             ]
//         }, {
//             fail: function (errors) {
//                 expect(errors).toEqual(
//                     [
//                         {
//                             "errorMsg": "用户名必须存在数字",
//                             "rule": {
//                                 "be": true,
//                                 "msg": "{{name}}必须存在数字",
//                                 "regexp": /\d/
//                             }
//                         }
//                     ]
//                 )
//                 resolve()
//             }
//         })
//     }).then(function () {
//         return new Promise(function(resolve, reject) {
//             test.check('abc', {
//                 name: '用户名',
//                 every: true,
//                 tests: [
//                     {
//                         regexp: /\d/,
//                         be: true,
//                         msg: '{{name}}必须存在数字'
//                     },
//                     {
//                         min: 5,
//                         msg: '{{name}}必须大于或等于5位'
//                     }
//                 ]
//             }, {
//                 fail: function (errors) {
//                     expect(errors).toEqual(
//                         [
//                             {
//                                 "errorMsg": "用户名必须存在数字",
//                                 "rule": {
//                                     "be": true,
//                                     "msg": "{{name}}必须存在数字",
//                                     "regexp": /\d/
//                                 }
//                             },
//                             {
//                                 "errorMsg": "用户名必须大于或等于5位",
//                                 "rule": {
//                                     "min": 5,
//                                     "msg": "{{name}}必须大于或等于5位"
//                                 }
//                             }
//                         ]
//                     )
//                     resolve()
//                 }
//             })
//         })
//     })
// })
//
// it('regexp + min + async every', function () {
//     return new Promise(function(resolve, reject) {
//         test.check('abc', {
//             name: '用户名',
//             tests: [
//                 {
//                     regexp: /\d/,
//                     be: true,
//                     msg: '{{name}}必须存在数字'
//                 },
//                 {
//                     min: 5,
//                     msg: '{{name}}必须大于或等于5位'
//                 },
//                 {
//                     async: function (done, fail) {
//                         setTimeout(function () {
//                             fail('异步错误消息')
//                         }, 200)
//                     }
//                 }
//             ]
//         }, {
//             fail: function (errors) {
//                 expect(errors).toEqual(
//                     [
//                         {
//                             "errorMsg": "用户名必须存在数字",
//                             "rule": {
//                                 "be": true,
//                                 "msg": "{{name}}必须存在数字",
//                                 "regexp": /\d/
//                             }
//                         }
//                     ]
//                 )
//                 resolve()
//             }
//         })
//     }).then(function () {
//
//     })
// })

it('debug', function () {
    return new Promise(function(resolve, reject) {
        test.check('abc', {
            name: '用户名',
            every: true,
            tests: [
                {
                    regexp: /\d/,
                    be: true,
                    msg: '{{name}}必须存在数字'
                },
                {
                    min: 5,
                    msg: '{{name}}必须大于或等于5位'
                },
                {
                    async: function (done, fail) {
                        setTimeout(function () {
                            fail('异步错误消息')
                        }, 200)
                    }
                }
            ]
        }, {
            asyncFail: function (error) {
                expect(error.errorMsg).toEqual("异步错误消息")
                expect(typeof error.rule.async).toEqual('function')
                resolve()
            },
            fail: function (errors) {
                expect(errors).toEqual(
                    [
                        {
                            rule: {
                                regexp: /\d/,
                                be: true,
                                msg: '{{name}}必须存在数字'
                            },
                            errorMsg: '用户名必须存在数字'
                        },
                        {
                            rule: {
                                min: 5,
                                msg: '{{name}}必须大于或等于5位'
                            },
                            errorMsg: '用户名必须大于或等于5位'
                        }
                    ]
                )
                resolve()
            }
        })
    })
})
