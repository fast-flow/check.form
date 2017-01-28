# form-check

> The form data validation library.Does not contain UI.

```js
var formCheck = require('formCheck')

formCheck([
    {
        rule: 'required',
        msg: '用户名必填'
    },
    {
        /*
            if (/\S/.test(value)) {done('用户名不能为空');return}
        */
        rule: /\S/,
        be: false,
        msg: '用户名不能为空'
    },
    {
        rule: {
            min: 5,
            max: 10
        },
        be: false,
        msg: '用户名最少有{{ min }}个字符,最多有{{ max }}个字符'
    },
    {
        rule: {
            fn: function (value) {
                if (value === 'admin') {
                    return "用户名不能是admin"
                }
                else {
                    return
                }
            }
        }
    },
    {
        rule: {
            equal: self.state.nickname,
            be: true
            msg: '用户名不能与昵称相同'
        }
    },
    {
        rule: {
            async: function (done, value) {
                setTimeout(function () {
                    done('错误消息');return
                }, 100)
            }
        }
    }
], {
    onError: function (errors) {
        /*
        errors = [
            {
                rule: {
                    equal: self.state.nickname,
                    be: true
                    msg: '用户名不能与昵称相同'
                },
                msg: '用户名不能与昵称相同'
            }
        ]
        */
    },
    onAsyncError: function (error) {
        /*
        error = {
            rule: {
                async: function (done, value) {
                        setTimeout(function () {
                            done('错误消息');return
                        }, 100)
                    }
                },
                msg: '错误消息'
            }
        }
        */
    },
    onCheckDone: function (data) {
        /*
            data = [
                {
                    type: 'error',
                    data: {
                        rule: {
                            equal: self.state.nickname,
                            be: true
                            msg: '用户名不能与昵称相同'
                        },
                        msg: '用户名不能与昵称相同'
                    }
                },
                {
                    type: 'pass',
                    data: {
                        rule: {
                            async: function (done, value) {
                                    setTimeout(function () {
                                        done('错误消息');return
                                    }, 100)
                                }
                            },
                            msg: '错误消息'
                        }
                    }
                }
            ]
        */
    }
})
```

````js
formCheck.addRule('sensitive-words', {
    rule: /(东京热|一库一库|亚麻跌)/,
    msg: '{{name}}包含敏感词'
})

formCheck({
    rule: 'sensitive-words',
    name: '标题'
})
````
