var Test = require('../lib/index')
var test = new Test()
it('function', function () {
    return new Promise(function (resolve, reject) {
        test.check('123', {
            name: '函数校验',
            tests: [
                {
                    fn: function (value) {
                        // fail
                        return "错误消息"
                        // done
                        // return
                    }
                }
            ]
        }, {
            done: function () {
                reject()
            },
            fail: function (errors) {
                expect(errors[0].msg).toEqual("错误消息")
                expect(typeof errors[0].rule.fn).toEqual('function')
                resolve()
            }
        })
    })
    // .then(function () {
    //     return new Promise(function(resolve, reject) {
    //         test.check('123', {
    //             name: '函数校验',
    //             tests: [
    //                 {
    //                     fn: function (value) {
    //                         // fail
    //                         // return "错误消息"
    //                         // done
    //                         return
    //                     }
    //                 }
    //             ]
    //         }, {
    //             done: function () {
    //                 resolve()
    //             },
    //             fail: function (errors) {
    //                 reject()
    //             }
    //         })
    //     })
    // })
})
