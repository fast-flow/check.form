var test = require('form-test')
it('check(value,rules, {onPass())', function () {
    return new Promise(function (resolve, reject) {
        test.check({
            value: '12345',
            rules: [
                {
                    rule: 'required'
                }
            ],
            settings: {
                onPass: function () {
                    resolve()
                },
                onError: function () {
                    reject()
                }
            }
        })
    })
})
it('check(value,rules, {onError:())', function () {
    return new Promise(function (resolve, reject) {
        test.check({
            value: '',
            rules: [
                {
                    rule: 'required'
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
