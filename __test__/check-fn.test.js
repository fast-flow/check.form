var test = require('../lib/index')
it('check(value, {fn:function(){}})', function () {
    return new Promise(function (resolve, reject) {
        test.addRule('bansome', {
            fn: function (value) {
                if (value === 'some') {
                    return "错误"
                }
            }
        })
        test.check({
            value: 'some',
            rules: [
                {
                    rule: 'bansome'
                }
            ],
            settings: {
                onError: function (errors) {
                    expect(typeof errors[0].rule.fn).toEqual('function')
                    expect(JSON.stringify(errors)).toEqual("[{\"rule\":{\"trim\":true,\"be\":true,\"rule\":\"bansome\"},\"errorMsg\":\"错误\"}]")
                    resolve()
                }
            }
        })
    })
})
