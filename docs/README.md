# form-test

> The form data validation library.Does not contain UI.

````js
var Test = require('form-test')
test = new Test({
    rule: {
        'required': {
            regexp: /\S/,
            be: true,
            msg: '请输入{{name}}'
        },
        'number': {
            regexp: /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$|^0$/,
            be: true,
            msg: '{{name}}的格式错误'
        },
        'digits': {
            regexp: /^\s*\d+\s*$/,
            be: true,
            msg: '{{name}}的格式错误'
        },
        'email': {
            regexp: /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/,
            be: true,
            msg: '{{name}}的格式错误'
        },
        'url': {
            regexp: /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
            be: true,
            msg: '{{name}}的格式错误'
        },
        'easyurl': {
            regexp: /^(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
            be: true,
            msg: '{{name}}的格式错误'
        },
        'mobile': {
            regexp: /^1\d{10}$/,
            be: true,
            msg: '{{name}}的格式错误'
        }
    }
})

````

## required

````js
console.info('\n\n\n---------- required -----------')
test.check('some', {
    name: 'user',
    tests: [
        {
            rule: 'required'
        }
    ]
}, {
    always: function (stat) {
        console.log('stat', stat)
        console.log('"some"', 'always')
    },
    done: function () {
        console.info('"some"', 'done')
    },
    fail: function (errros) {
        console.error('"some"', errros[0].errorMsg)
    }
})

test.check('', {
    name: 'user',
    tests: [
        {
            rule: 'required'
        }
    ]
}, {
    always: function (stat) {
        console.log('stat', stat)
        console.log('""', 'always')
    },
    done: function () {
        console.log('""', 'done')
    },
    fail: function (errros) {
        console.error('""', errros[0].errorMsg)
    }
})
````

## email

````js
console.info('\n\n\n---------- email -----------')
test.check('', {
    name: 'user email',
    tests: [
        {
            rule: 'required'
        },
        {
            rule: 'email'
        }
    ]
}, {
    always: function () {
        console.log('""', 'always')
    },
    done: function () {
        console.log('""', 'done')
    },
    fail: function (errros) {
        console.error('""', errros[0].errorMsg)
    }
})
test.check('mail@qq', {
    name: 'user email',
    tests: [
        {
            rule: 'required'
        },
        {
            rule: 'email'
        }
    ]
}, {
    always: function () {
        console.log('"mail@qq"', 'always')
    },
    done: function () {
        console.info('"mail@qq"', 'done')
    },
    fail: function (errros) {
        console.error('"mail@qq"', errros[0].errorMsg)
    }
})
test.check('mail@qq.cc', {
    name: 'user email',
    tests: [
        {
            rule: 'required'
        },
        {
            rule: 'email'
        }
    ]
}, {
    always: function () {
        console.log('"mail@qq.cc"', 'always')
    },
    done: function () {
        console.info('"mail@qq.cc"', 'done')
    },
    fail: function (errros) {
        console.error('"mail@qq.cc"', errros[0].errorMsg)
    }
})
````

## abbr

````js
console.info('\n\n\n---------- abbr -----------')
test.check('123', {
    name: '邮箱',
    tests: [
        'required',
        'email'
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
````


## msg

````js
console.info('\n\n\n---------- msg -----------')
test.check('123', {
    name: '用户名',
    tests: [
        {
            regexp: /abc/,
            be: true,
            some: '123',
            msg: '{{ name }}必须存在abc {{self.some}}'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
````

## default rule

`required` `email` `url` `easyurl` `mobile` `number` `digits`

> 00123450 是 digits 但不是 number
> 1.23 是 number 但不是 digits
> url: http://www.baidu.com
> easyurl: www.baidu.com

## addRule

````js
console.info('\n\n\n---------- addRule -----------')
test.addRule('sensitiveWord', {
    regexp: /(yamadie|yikuyiku)/,
    be: false,
    msg: "{{name}}存在敏感词"
})

test.check('yamadie', {
    name: '昵称',
    tests: [
        {
            rule: 'sensitiveWord'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
````

## async

````js
console.info('\n\n\n---------- async -----------')
test.check('abc', {
    tests: [
        {
            async: function (done, fail) {
                // mock ajax
                setTimeout(function () {
                    fail('异步错误消息')
                }, 200)
            }
        }
    ]
}, {
    asyncFail: function (error) {
        console.error(error.errorMsg)
    },
    always: function () {
        console.log('async always')
    }
})
````

## equal

````js
console.info('\n\n\n---------- equal -----------')
test.check('123', {
    name: '重复密码',
    tests: [
        {
            equal: '1234',
            msg: '两次输入密码不一致'
        }
    ]
}, {
    fail: function (errors) {
        console.error(errors[0])
    }
})
test.check('123', {
    name: '重复密码',
    tests: [
        {
            equal: '123',
            msg: '两次输入密码不一致'
        }
    ]
}, {
    done: function () {
        console.info('重复密码验证通过')
    }
})
````

## every

````js
console.info('\n\n\n---------- every -----------')
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
            minLength: 5,
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
        console.error(error)
    },
    fail: function (errors) {
        console.error('every')
        console.table(errors)
    }
})
````


## fn

````js
console.info('\n\n\n---------- fn -----------')
test.check('123', {
    name: '函数校验',
    tests: [
        {
            fn: function (value) {
                if (/1/.test(value)){
                    // fail
                    return "{{name}} 错误消息"
                }
                else {
                    // done
                    return
                }
            }
        }
    ]
}, {
    fail: function (errors) {
        console.error(errors[0].errorMsg)
    }
})
````

## max min


````js
console.info('\n\n\n---------- min-max -----------')
test.check(1, {
    name: '数量',
    tests: [
        {
            rule: 'number'
        },
        {
            min: 2,
            msg: '{{name}}最小{{self.min}}'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})

test.check('aa', {
    name: '数量',
    tests: [
        {
            rule: 'number',
            msg: '{{name}}必须输入数字'
        },
        {
            min: 2,
            msg: '{{name}}最小{{self.min}}'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
test.check(6, {
    name: '数量',
    tests: [
        {
            rule: 'number'
        },
        {
            max: 5,
            msg: '{{name}}最大{{self.max}}'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
test.check(6, {
    name: '数量',
    tests: [
        {
            rule: 'number'
        },
        {
            max: 5,
            min: 2,
            msg: '{{name}}必须是{{self.min}}~{{self.max}}'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
````

## minLength-maxLength

````js
console.info('\n\n\n---------- minLength-maxLength -----------')
test.check('123', {
    name: '密码',
    tests: [
        {
            minLength: 5,
            msg: '{{name}}最少{{self.minLength}}位'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
test.check('1234', {
    name: '密码',
    tests: [
        {
            maxLength: 5,
            msg: '{{name}}最多{{self.maxLength}}位'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
test.check('1', {
    name: '密码',
    tests: [
        {
            maxLength: 5,
            minLength: 2,
            msg: '{{name}}请输入{{self.minLength}}~{{self.maxLength}}位'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
test.check('123456', {
    name: '密码',
    tests: [
        {
            maxLength: 5,
            minLength: 2,
            msg: '{{name}}请输入{{self.minLength}}~{{self.maxLength}}位'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})
test.check('123', {
    name: '密码',
    tests: [
        {
            maxLength: 5,
            minLength: 2,
            msg: '{{name}}请输入{{self.minLength}}~{{self.maxLength}}位'
        }
    ]
}, {
    done: function (errors) {
        console.info('value: 123 minLength maxLength pass')
    }
})
````

## minLengthByte-maxLengthByte

> like minLength maxLength

````js
test.check('123', {
    name: '密码',
    tests: [
        {
            minLengthByte: 5,
            msg: '{{name}}最少{{self.minLengthByte}}位英文，{{self.minLengthByteChinese}}位中文'
        }
    ]
}, {
    fail: function (errors) {
        console.log(errors[0])
    }
})

````

```js
{
    minLengthByte: 2,
    msg: '{{name}}请输入至少{{self.maxLengthByte}}个英文'
}
{
    maxLengthByte: 5,
    msg: '{{name}}最多允许{{self.maxLengthByte}}个英文'
}
{
    maxLengthByte: 5,
    minLengthByte: 2,
    msg: '{{name}}请输入{{self.maxLengthByte}}~{{self.maxLengthByte}}位字节'
}
```

## regexp

### be-true

````js
console.info('\n\n\n---------- regexp -----------')
test.check('123', {
    name: '用户名',
    tests: [
        {
            regexp: /abc/,
            be: true,
            msg: '{{ name }}必须存在abc'
        }
    ]
}, {
    fail: function (errors) {
        console.error(errors[0])
    }
})
````

### be-false

````js
test.check('123', {
    name: '用户名',
    tests: [
        {
            regexp: /abc/,
            be: false,
            msg: '{{ name }}必须存在abc'
        }
    ]
}, {
    done: function () {
        console.info('regexp be-false done')
    }
})
````

## replaceRule

````js
console.info('\n\n\n---------- replaceRule -----------')
var test = new FormTest()
test.replaceRule('email', {
    msg: "{{name}}不是正确的邮箱"
})
test.check('yamadie', {
    name: '个人邮箱',
    tests: [
        {
            rule: 'email'
        }
    ]
}, {
    fail: function (errors) {
        console.error(errors[0])
    }
})
````
