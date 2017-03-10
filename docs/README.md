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
}, function (stat) {
    console.log('required "some"', stat)
})

test.check('', {
    name: 'user',
    tests: [
        {
            rule: 'required'
        }
    ]
}, function (stat) {
    console.log('required ""', stat)
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
}, function (stat) {
    console.log('email ""', stat)
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
}, function (stat) {
    console.log('email "mail@qq"', stat)
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
}, function (stat) {
    console.log('email "mail@qq.cc"', stat)
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
}, function (stat) {
    console.log('abbr "123"', stat)
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
}, function (stat) {
    console.log('msg "123"', stat)
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
}, function (stat) {
    console.log('addRule "123"', stat)
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
    always: function (stat) {
        console.log('async "123"', stat)
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
}, function (stat) {
    console.log('equal "123" "1234"', stat)
})
test.check('123', {
    name: '重复密码',
    tests: [
        {
            equal: '123',
            msg: '两次输入密码不一致'
        }
    ]
}, function (stat) {
    console.log('equal "123" "123"', stat)
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
}, function (stat) {
    console.log('every "abc"', stat)
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
}, function (stat) {
    console.log('fn "abc"', stat)
})
````

## max min


````js
console.info('\n\n\n---------- min-max -----------')
test.check('1', {
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
}, function (stat) {
    console.log('max min 1', stat)
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
}, function (stat) {
    console.log('max min 2 "aa"', stat)
})
test.check("6", {
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
}, function (stat) {
    console.log('max min "6"', stat)
})
test.check("6", {
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
}, function (stat) {
    console.log('max 5 min 2 "6"', stat)
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
