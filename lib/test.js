var extend = require('extend')
var Mustache = require('mustache')
/**
 * @param value {string}
 * @param rule {object}
 * @param settings {object} test.check(value, settings, callback)
 * @param emit {function} ./check.js: emeit function () {}
 */
var renderMsg = function (template, data) {
     template = template || ''
     // 不要删除此段代码，永远保持向前兼容
     if (data.self.maxLengthByte) {
         data.self.maxLengthByteChinese = Math.floor(data.self.maxLengthByte / 2)
     }
     if (data.self.minLengthByte) {
         data.self.minLengthByteChinese = Math.floor(data.self.minLengthByte / 2)
     }
     return Mustache.render(template, data)
}
var byteLength = function(str) {
	var byteLen = 0
	for(var i = 0; i<str.length; i++){
		if(str.charCodeAt(i)>255){
			byteLen += 2
		}else{
			byteLen++
		}
　　 }
	return byteLen
}
module.exports = function test (value, settings, rule, emit) {
    if (rule.trim) {
        value = value.trim()
    }
    var errorMsgRenderData = {}
    extend(true, errorMsgRenderData, settings)
    errorMsgRenderData.self = rule
    var attrs = [
        {
            key: 'regexp',
            test: function () {
                if (rule.regexp.test(value) === rule.be) {
                    emit({
                        type: 'SYNC_DONE',
                        rule: rule
                    })
                }
                else {
                    emit({
                        type: 'SYNC_FAIL',
                        rule: rule,
                        errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                    })
                }
            }
        },
        {
            key: 'equal',
            test: function () {
                if (rule.equal === value) {
                    emit({
                        type: 'SYNC_DONE',
                        rule: rule
                    })
                }
                else {
                    emit({
                        type: 'SYNC_FAIL',
                        rule: rule,
                        errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                    })
                }
            }
        },
        {
            key: 'fn',
            test: function () {
                var errorMsg = rule.fn(value)
                if (!errorMsg) {
                    emit({
                        type: 'SYNC_DONE',
                        rule: rule
                    })
                }
                else {
                    emit({
                        type: 'SYNC_FAIL',
                        rule: rule,
                        errorMsg: renderMsg(errorMsg, errorMsgRenderData)
                    })
                }
            }
        },
        {
            key: 'async',
            test: function () {
                var p = new Promise(rule.async)
                p.then(function () {
                    emit({
                        type: 'ASYNC_DONE',
                        rule: rule
                    })
                }, function (errorMsg) {
                    emit({
                        type: 'ASYNC_FAIL',
                        rule: rule,
                        errorMsg: renderMsg(errorMsg, errorMsgRenderData)
                    })
                })
            }
        }
    ]
    var hasMinMaxAttr = {
        minLengthByte: function () {
            let length = byteLength(value)
            if (length >= rule.minLengthByte) {
                emit({
                    type: 'SYNC_DONE',
                    rule: rule
                })
            }
            else {
                emit({
                    type: 'SYNC_FAIL',
                    rule: rule,
                    errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                })
            }
        },
        minLength: function () {
            if (value.length >= rule.minLength) {
                emit({
                    type: 'SYNC_DONE',
                    rule: rule
                })
            }
            else {
                emit({
                    type: 'SYNC_FAIL',
                    rule: rule,
                    errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                })
            }
        },
        maxLengthByte: function () {
            let length = byteLength(value)
            if (length <= rule.maxLengthByte) {
                emit({
                    type: 'SYNC_DONE',
                    rule: rule
                })
            }
            else {
                emit({
                    type: 'SYNC_FAIL',
                    rule: rule,
                    errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                })
            }
        },
        maxLength: function () {
            if (value.length <= rule.maxLength) {
                emit({
                    type: 'SYNC_DONE',
                    rule: rule
                })
            }
            else {
                emit({
                    type: 'SYNC_FAIL',
                    rule: rule,
                    errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                })
            }
        },
        minmaxLengthByte: function () {
            let length = byteLength(value)
            if (length >= rule.minLengthByte && length <= rule.maxLengthByte) {
                emit({
                    type: 'SYNC_DONE',
                    rule: rule
                })
            }
            else {
                emit({
                    type: 'SYNC_FAIL',
                    rule: rule,
                    errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                })
            }
        },
        minmaxLength: function () {
            if (value.length >= rule.minLength && value.length <= rule.maxLength) {
                emit({
                    type: 'SYNC_DONE',
                    rule: rule
                })
            }
            else {
                emit({
                    type: 'SYNC_FAIL',
                    rule: rule,
                    errorMsg: renderMsg(rule.msg, errorMsgRenderData)
                })
            }
        }
    }

    if (rule.async) {
        emit({
            type: 'ASYNC_COUNT_INCREMENT'
        })
    }
    else {
        emit({
            type: 'SYNC_COUNT_INCREMENT'
        })
    }

    // {minLength:5} {maxLength:10} {minLength:5,maxLength:10}
    if (rule.minLength || rule.maxLength) {
        match = true
        if (rule.minLength && !rule.maxLength) {
            hasMinMaxAttr.minLength()
        }
        else if (rule.maxLength && !rule.minLength) {
            hasMinMaxAttr.maxLength()
        }
        // {minLength:5, maxLength:10}
        else {
            hasMinMaxAttr.minmaxLength()
        }
    }
    // {minLengthByte:5} {maxLengthByte:10} {minLengthByte:5,maxLengthByte:10}
    else if (rule.minLengthByte || rule.maxLengthByte) {
        match = true
        if (rule.minLengthByte && !rule.maxLengthByte) {
            hasMinMaxAttr.minLengthByte()
        }
        else if (rule.maxLengthByte && !rule.minLengthByte) {
            hasMinMaxAttr.maxLengthByte()
        }
        // {minLengthByte:5, maxLengthByte:10}
        else {
            hasMinMaxAttr.minmaxLengthByte()
        }
    }
    else {
        var findAttr = false
        attrs.some(function (item) {
            var match = rule[item.key]
            if (match) {
                findAttr = true
                item.test()
                return true
            }
        })
        if (!findAttr) {
            throw new Error('node_modules/form-test: Invalid format of rules https://github.com/fast-flow/form-check/issues/1')
        }
    }
}
