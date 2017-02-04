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

                )
                resolve()
            }
        })
    })
})
