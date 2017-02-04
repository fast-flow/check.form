var test = require('../lib/')
it('basic sync 2 rule every false onCheckEnd', function () {
    return new Promise(function (resolve, reject) {
        test.check({
            value: '123',
            rules: [
                {
                    rule: 'required',
                    msg: '必填哦'
                },
                {
                    rule: {
                        regexp: /abc/,
                        be: true
                    },
                    msg: '必须存在 abc'
                },
            ],
            settings: {
                onCheckEnd: function (stat) {
                    expect(stat).toEqual(
                        {
                            "asyncErrors": [],
                            "asyncPasses": [],
                            "syncErors": [],
                            "syncPasses": [
                                {
                                    "be": true,
                                    "msg": "必填哦",
                                    "regexp": /\S/,
                                    "rule": "required",
                                    "trim": false
                                }
                            ]
                        }
                    )
                    resolve()
                }
            }
        })
    })
})

// it('basic sync 2 rule every true onCheckEnd', function () {
//     return new Promise(function (resolve, reject) {
//         test.check({
//             value: '123',
//             rules: [
//                 {
//                     rule: 'required',
//                     msg: '必填哦'
//                 },
//                 {
//                     rule: {
//                         regexp: /abc/,
//                         be: true
//                     },
//                     msg: '必须存在 abc'
//                 }
//             ],
//             settings: {
//                 every: true,
//                 onCheckEnd: function (stat) {
//                     expect(stat).toEqual(
//                         {
//                             "asyncErrors": [],
//                             "asyncPasses": [],
//                             "syncErors": [],
//                             "syncPasses": [
//                                 {
//                                     "be": true,
//                                     "msg": "必填哦",
//                                     "regexp": /\S/,
//                                     "rule": "required",
//                                     "trim": false
//                                 },
//                                 {
//                                     "be": true,
//                                     "regexp": /abc/,
//                                     "trim": false
//                                 }
//                             ]
//                         }
//                     )
//                     resolve()
//                 }
//             }
//         })
//     })
// })
