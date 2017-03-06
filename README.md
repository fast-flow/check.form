# form-test

[Online Documents](https://fast-flow.github.io/form-test) or [docs/README.md](./docs/README.md)

> The form data validation library.Does not contain UI.

```js
var Test = require('form-test')
var test = new Test()

test.check('some', {
    name: '用户名',
    tests: [
        {
            rule: 'required'
        }
    ]
}, {
    always: function () {
        console.log('check done')
    },
    done: function () {
        console.log('done')
    },
    fail: function (errros) {
        console.log(errros[0].errorMsg)
    }
})
```
