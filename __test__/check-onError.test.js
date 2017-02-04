var test = require('../lib/index')

it('error array every:true', function () {
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
                        regexp: /ab/,
                        be: true,
                        msg: '必须存在ab'
                    }
                }
            ],
            settings: {
                every: true,
                onError: function (errors) {
                    expect(errors).toEqual([
                        {
                            rule: {
                                trim: false,
                                be: true,
                                regexp: /abc/,
                                msg: '必须存在abc'
                            },
                            errorMsg: '必须存在abc'
                        },
                        {
                            rule: {
                                trim: false,
                                be: true,
                                regexp: /ab/,
                                msg: '必须存在ab'
                            },
                            errorMsg: '必须存在ab'
                        }
                    ])
                    resolve()
                }
            }
        })
    })
})

it('error array every: default false', function () {
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
                        regexp: /ab/,
                        be: true,
                        msg: '必须存在ab'
                    }
                }
            ],
            settings: {
                onError: function (errors) {
                    expect(errors).toEqual([
                        {
                            rule: {
                                trim: false,
                                be: true,
                                regexp: /abc/,
                                msg: '必须存在abc'
                            },
                            errorMsg: '必须存在abc'
                        }
                    ])
                    resolve()
                }
            }
        })
    })
})
