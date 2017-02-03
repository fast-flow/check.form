var test = require('../lib/index')
it('check every: default false', function () {
    return new Promise(function (resolve, reject) {
        test.check({
            value: '',
            rules: [
                {
                    rule: {
                        regexp: /abc/,
                        be: true,
                        msg: '必须存在abc'
                    }
                },
                {
                    rule: {
                        fn: function (value) {
                            if (!/abc/.test(value)) {
                                return "必须存在abc"
                            }
                            return
                        }
                    }
                }
            ],
            settings: {
                onError: function (error) {
                    expect(error).toEqual([
                        {
                            "errorMsg": "必须存在abc",
                            "rule": {
                                "be": true,
                                "msg": "必须存在abc",
                                "regexp": /abc/,
                                "trim": true
                            }
                        }
                    ])
                    resolve()
                }
            }
        })
    })
})
//
// it('check every: true', function () {
//     return new Promise(function (resolve, reject) {
//         test.check({
//             value: '',
//             rules: [
//                 {
//                     rule: {
//                         regexp: /abc/,
//                         be: true,
//                         msg: '必须存在abc'
//                     }
//                 },
//                 {
//                     rule: {
//                         fn: function (value) {
//                             if (!/abc/.test(value)) {
//                                 return "必须存在abc"
//                             }
//                             return
//                         }
//                     }
//                 }
//             ],
//             settings: {
//                 every: true,
//                 onError: function (error) {
//                     expect(JSON.stringify(error)).toEqual(
//                         '[{"errorMsg": "必须存在abc", "rule": {"be": true, "msg": "必须存在abc", "regexp": /abc/, "trim": true}}, {"errorMsg": "必须存在abc", "rule": {"be": true, "fn": [Function fn], "trim": true}}]'
//                     )
//                     resolve()
//                 }
//             }
//         })
//     })
// })
