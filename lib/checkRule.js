require('babel-polyfill')
var Mustache = require('mustache')
/**
 * @param value {string}
 * @param rule {object}
 * @param formCheckSettings {object}
 */
module.exports = function checkRule (value, rule, syncErors, onAsync) {
    if (rule.trim) {
        value = value.trim()
    }
    var errorData = {
        rule: rule,
        errorMsg: ''
    }
    if (rule.regexp) {
        var testResult = rule.regexp.test(value)
        var error =  (testResult !== rule.be)
        if (error) {
            errorData.errorMsg = Mustache.render(rule.msg, rule)
            syncErors.push(errorData)
        }
        return
    }
    if (rule.fn) {
        var errorMsg = rule.fn(value)
        if (errorMsg) {
            errorData.errorMsg = Mustache.render(errorMsg, rule)
            syncErors.push(errorData)
        }
        return
    }
    if (rule.min && rule.max) {
        if (value.length < rule.min || value.length > rule.max) {
            errorData.errorMsg = Mustache.render(rule.msg, rule)
            syncErors.push(errorData)
        }
        return
    }
    if (rule.min && !rule.max) {
        if (value.length < rule.min) {
            errorData.errorMsg = Mustache.render(rule.msg, rule)
            syncErors.push(errorData)
        }
        return
    }
    if (rule.max && !rule.min) {
        if (value.length > rule.max) {
            errorData.errorMsg = Mustache.render(rule.msg, rule)
            syncErors.push(errorData)
        }
        return
    }
    if (rule.equal) {
        if (value !== rule.equal) {
            errorData.errorMsg = Mustache.render(rule.msg, rule)
            syncErors.push(errorData)
        }
        return
    }
    if (rule.async) {
        onAsync({
            type: 'begin-to-check',
            rule: rule
        })
        var triggerDone = false
        rule.async(function done (errorMsg) {
            if (triggerDone) {
                var logMessage = "Asynchronous only trigger once done (node_modules/form-test/checkRule.js)"
                console.log(logMessage)
                throw new Error(logMessage)
            }
            triggerDone = true
            if (errorMsg) {
                errorData.errorMsg = Mustache.render(errorMsg, rule)
                onAsync({
                    type: 'error',
                    errorData: errorData,
                    rule: rule
                })
            }
            else {
                onAsync({
                    type: 'pass',
                    rule: rule
                })
            }
        }, value)
        return
    }

}
