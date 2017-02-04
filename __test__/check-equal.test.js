var test = require('form-test')
it('rule equal trim false', function () {
    return new Promise(function (resolve, reject) {
        test.check({
            value: '12345|4space',
            rules: [
                {
                    rule: {
                        trim: false,
                        equal: '12345|4space    ',
                        msg: '重复密码错误'
                    }
                }
            ],
            settings: {
                onPass: function () {
                    reject()
                },
                onError: function () {
                    resolve()
                }
            }
        })
    })
})

it('rule equal trim default true', function () {
    return new Promise(function (resolve, reject) {
        test.check({
            value: '12345|4space    ',
            rules: [
                {
                    rule: {
                        // trim: true, // default
                        equal: '12345|4space',
                        trim: true,
                        msg: '重复密码错误'
                    }
                }
            ],
            settings: {
                onPass: function () {
                    resolve()
                },
                onError: function (errors) {
                    reject()
                }
            }
        })
    })
})


it('rule equal trim default true (trim equal)', function () {
    return new Promise(function (resolve, reject) {
        test.check({
            value: '12345|4space ',
            rules: [
                {
                    rule: {
                        // trim: true, // default
                        equal: '12345|4space    ',
                        trim: true,
                        msg: '重复密码错误'
                    }
                }
            ],
            settings: {
                onPass: function () {
                    resolve()
                },
                onError: function (errors) {
                    reject()
                }
            }
        })
    })
})
