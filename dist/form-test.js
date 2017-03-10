(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FormTest", [], factory);
	else if(typeof exports === 'object')
		exports["FormTest"] = factory();
	else
		root["FormTest"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var extend = __webpack_require__(1)
	var Test = function (settings) {
	    var defaultSettings = {
	        rule: extend(true, {}, __webpack_require__(2))
	    }
	    extend(true, defaultSettings, settings)
	    settings = defaultSettings
	    this._rule = settings.rule
	}
	Test.prototype.check = __webpack_require__(3)
	Test.prototype.addRule = __webpack_require__(6)
	Test.prototype.replaceRule = __webpack_require__(7)
	Test.prototype.package = __webpack_require__(8)
	module.exports = Test


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	
	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}
	
		return toStr.call(arr) === '[object Array]';
	};
	
	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}
	
		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}
	
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}
	
		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};
	
	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}
	
		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];
	
					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}
	
							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);
	
						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	    'required': {
	        regexp: /\S/,
	        be: true,
	        msg: '请输入{{name}}'
	    },
	    'number': {
	        regexp: /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$|^0$/,
	        be: true,
	        msg: '{{name}}的格式不正确'
	    },
	    'digits': {
	        regexp: /^\s*\d+\s*$/,
	        be: true,
	        msg: '{{name}}的格式不正确'
	    },
	    'email': {
	        regexp: /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/,
	        be: true,
	        msg: '{{name}}的格式不正确'
	    },
	    'url': {
	        regexp: /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
	        be: true,
	        msg: '{{name}}的格式不正确'
	    },
	    'easyurl': {
	        regexp: /^(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
	        be: true,
	        msg: '{{name}}的格式不正确'
	    },
	    'mobile': {
	        regexp: /^1\d{10}$/,
	        be: true,
	        msg: '请输入正确的{{name}}'
	    }
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var extend = __webpack_require__(1)
	var test = __webpack_require__(4)
	/**
	 * @param value {string}
	 * @param settings {object}
	 * @param callback {object}
	 * @param callback.done {function}
	 * @param callback.fail {function}
	 * @param callback.always {function}
	 */
	module.exports = function (value, settings, callback) {
	    var self = this
	    if (typeof callback === 'function') {
	        callback = {
	            always: callback
	        }
	    }
	    var defaultCallback = {
	        done: function () {},
	        fail: function () {},
	        asyncFail: function () {},
	        always: function () {}
	    }
	    let callbackAlways = function (stat) {
	        let outputStat = extend(true, {}, stat)
	        outputStat.fail = outputStat.async.fail.concat(outputStat.sync.fail)
	        outputStat.done = outputStat.async.done.concat(outputStat.sync.done)
	        callback.always(outputStat)
	    }
	    extend(true, defaultCallback, callback)
	    callback = defaultCallback
	    var stat = {
	        sync: {
	            fail: [],
	            done: [],
	            count: 0
	        },
	        async: {
	            fail: [],
	            done: [],
	            count: 0
	        }
	    }
	    var checkAsyncTestDone = function () {
	        if (stat.async.count === stat.async.done.length) {
	            callback.done()
	        }
	        if (stat.async.count === stat.async.done.length + stat.async.fail.length) {
	            callbackAlways(stat)
	        }
	    }
	    var emit = function (action) {
	        switch (action.type) {
	            case 'SYNC_DONE':
	                stat.sync.done.push({
	                    rule: action.rule
	                })
	            break
	            case "ASYNC_DONE":
	                stat.async.done.push({
	                    rule: action.rule
	                })
	                checkAsyncTestDone()
	            break
	            case 'SYNC_FAIL':
	                stat.sync.fail.push({
	                    rule: action.rule,
	                    msg: action.errorMsg
	                })
	            break
	            case 'ASYNC_FAIL':
	                var errorData = {
	                    rule: action.rule,
	                    msg: action.errorMsg
	                }
	                stat.async.fail.push(errorData)
	                callback.asyncFail(errorData)
	                checkAsyncTestDone()
	            break
	            case 'SYNC_COUNT_INCREMENT':
	                stat.sync.count++
	            break
	            case 'ASYNC_COUNT_INCREMENT':
	                stat.async.count++
	            break
	        }
	    }
	    settings.tests.some(function (item, index) {
	        if (typeof item === 'string') {
	            item = {
	                rule: item
	            }
	        }
	        if (item.rule) {
	            test(value, settings, self._rule[item.rule], emit)
	        }
	        else {
	            test(value, settings, item, emit)
	        }
	        // 非 every 模式下出现一次错误就停止后续校验
	        if (!settings.every && stat.sync.fail.length !==0) {
	            return true
	        }
	    })
	    if (stat.sync.fail.length) {
	        callback.fail(stat.sync.fail)
	    }
	    // 不存在异步校验时，根据同步校验错误计数回调 fail 或 done
	    if (stat.async.count === 0) {
	        if (stat.sync.fail.length === 0) {
	            callback.done()
	        }
	        callbackAlways(stat)
	    }
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var extend = __webpack_require__(1)
	var Mustache = __webpack_require__(5)
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
	        min: function (value) {
	            if (value >= rule.min) {
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
	        max: function (value) {
	            if (value <= rule.max) {
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
	        },
	        minmax: function (value) {
	            if (value >= rule.min && value <= rule.max) {
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
	    else if (rule.max || rule.min) {
	        value = parseFloat(value)
	        if (isNaN(value)) {
	            emit({
	                type: 'SYNC_FAIL',
	                rule: rule,
	                errorMsg: renderMsg('Please enter the Numbers', errorMsgRenderData)
	            })
	            if (typeof window !== 'undefined') {
	                if (typeof window.log !== 'undefined') {
	                    console.log('value is NaN, please use the [{rule: "number"}, {max: 5}]. https://github.com/fast-flow/form-test/issues/6')
	                }
	            }
	            return
	        }
	        if (rule.min && !rule.max) {
	            hasMinMaxAttr.min(value)
	        }
	        else if (rule.max && !rule.min) {
	            hasMinMaxAttr.max(value)
	        }
	        // {min:5, max:10}
	        else {
	            hasMinMaxAttr.minmax(value)
	        }
	
	    }
	    // {minLengthByte:5} {maxLengthByte:10} {minLengthByte:5,maxLengthByte:10}
	    else if (rule.minLengthByte || rule.maxLengthByte) {
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */
	
	/*global define: false Mustache: true*/
	
	(function defineMustache (global, factory) {
	  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
	    factory(exports); // CommonJS
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	  } else {
	    global.Mustache = {};
	    factory(global.Mustache); // script, wsh, asp
	  }
	}(this, function mustacheFactory (mustache) {
	
	  var objectToString = Object.prototype.toString;
	  var isArray = Array.isArray || function isArrayPolyfill (object) {
	    return objectToString.call(object) === '[object Array]';
	  };
	
	  function isFunction (object) {
	    return typeof object === 'function';
	  }
	
	  /**
	   * More correct typeof string handling array
	   * which normally returns typeof 'object'
	   */
	  function typeStr (obj) {
	    return isArray(obj) ? 'array' : typeof obj;
	  }
	
	  function escapeRegExp (string) {
	    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	  }
	
	  /**
	   * Null safe way of checking whether or not an object,
	   * including its prototype, has a given property
	   */
	  function hasProperty (obj, propName) {
	    return obj != null && typeof obj === 'object' && (propName in obj);
	  }
	
	  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
	  // See https://github.com/janl/mustache.js/issues/189
	  var regExpTest = RegExp.prototype.test;
	  function testRegExp (re, string) {
	    return regExpTest.call(re, string);
	  }
	
	  var nonSpaceRe = /\S/;
	  function isWhitespace (string) {
	    return !testRegExp(nonSpaceRe, string);
	  }
	
	  var entityMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '/': '&#x2F;',
	    '`': '&#x60;',
	    '=': '&#x3D;'
	  };
	
	  function escapeHtml (string) {
	    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
	      return entityMap[s];
	    });
	  }
	
	  var whiteRe = /\s*/;
	  var spaceRe = /\s+/;
	  var equalsRe = /\s*=/;
	  var curlyRe = /\s*\}/;
	  var tagRe = /#|\^|\/|>|\{|&|=|!/;
	
	  /**
	   * Breaks up the given `template` string into a tree of tokens. If the `tags`
	   * argument is given here it must be an array with two string values: the
	   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
	   * course, the default is to use mustaches (i.e. mustache.tags).
	   *
	   * A token is an array with at least 4 elements. The first element is the
	   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
	   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
	   * all text that appears outside a symbol this element is "text".
	   *
	   * The second element of a token is its "value". For mustache tags this is
	   * whatever else was inside the tag besides the opening symbol. For text tokens
	   * this is the text itself.
	   *
	   * The third and fourth elements of the token are the start and end indices,
	   * respectively, of the token in the original template.
	   *
	   * Tokens that are the root node of a subtree contain two more elements: 1) an
	   * array of tokens in the subtree and 2) the index in the original template at
	   * which the closing tag for that section begins.
	   */
	  function parseTemplate (template, tags) {
	    if (!template)
	      return [];
	
	    var sections = [];     // Stack to hold section tokens
	    var tokens = [];       // Buffer to hold the tokens
	    var spaces = [];       // Indices of whitespace tokens on the current line
	    var hasTag = false;    // Is there a {{tag}} on the current line?
	    var nonSpace = false;  // Is there a non-space char on the current line?
	
	    // Strips all whitespace tokens array for the current line
	    // if there was a {{#tag}} on it and otherwise only space.
	    function stripSpace () {
	      if (hasTag && !nonSpace) {
	        while (spaces.length)
	          delete tokens[spaces.pop()];
	      } else {
	        spaces = [];
	      }
	
	      hasTag = false;
	      nonSpace = false;
	    }
	
	    var openingTagRe, closingTagRe, closingCurlyRe;
	    function compileTags (tagsToCompile) {
	      if (typeof tagsToCompile === 'string')
	        tagsToCompile = tagsToCompile.split(spaceRe, 2);
	
	      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
	        throw new Error('Invalid tags: ' + tagsToCompile);
	
	      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
	      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
	      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
	    }
	
	    compileTags(tags || mustache.tags);
	
	    var scanner = new Scanner(template);
	
	    var start, type, value, chr, token, openSection;
	    while (!scanner.eos()) {
	      start = scanner.pos;
	
	      // Match any text between tags.
	      value = scanner.scanUntil(openingTagRe);
	
	      if (value) {
	        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
	          chr = value.charAt(i);
	
	          if (isWhitespace(chr)) {
	            spaces.push(tokens.length);
	          } else {
	            nonSpace = true;
	          }
	
	          tokens.push([ 'text', chr, start, start + 1 ]);
	          start += 1;
	
	          // Check for whitespace on the current line.
	          if (chr === '\n')
	            stripSpace();
	        }
	      }
	
	      // Match the opening tag.
	      if (!scanner.scan(openingTagRe))
	        break;
	
	      hasTag = true;
	
	      // Get the tag type.
	      type = scanner.scan(tagRe) || 'name';
	      scanner.scan(whiteRe);
	
	      // Get the tag value.
	      if (type === '=') {
	        value = scanner.scanUntil(equalsRe);
	        scanner.scan(equalsRe);
	        scanner.scanUntil(closingTagRe);
	      } else if (type === '{') {
	        value = scanner.scanUntil(closingCurlyRe);
	        scanner.scan(curlyRe);
	        scanner.scanUntil(closingTagRe);
	        type = '&';
	      } else {
	        value = scanner.scanUntil(closingTagRe);
	      }
	
	      // Match the closing tag.
	      if (!scanner.scan(closingTagRe))
	        throw new Error('Unclosed tag at ' + scanner.pos);
	
	      token = [ type, value, start, scanner.pos ];
	      tokens.push(token);
	
	      if (type === '#' || type === '^') {
	        sections.push(token);
	      } else if (type === '/') {
	        // Check section nesting.
	        openSection = sections.pop();
	
	        if (!openSection)
	          throw new Error('Unopened section "' + value + '" at ' + start);
	
	        if (openSection[1] !== value)
	          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
	      } else if (type === 'name' || type === '{' || type === '&') {
	        nonSpace = true;
	      } else if (type === '=') {
	        // Set the tags for the next time around.
	        compileTags(value);
	      }
	    }
	
	    // Make sure there are no open sections when we're done.
	    openSection = sections.pop();
	
	    if (openSection)
	      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
	
	    return nestTokens(squashTokens(tokens));
	  }
	
	  /**
	   * Combines the values of consecutive text tokens in the given `tokens` array
	   * to a single token.
	   */
	  function squashTokens (tokens) {
	    var squashedTokens = [];
	
	    var token, lastToken;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];
	
	      if (token) {
	        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
	          lastToken[1] += token[1];
	          lastToken[3] = token[3];
	        } else {
	          squashedTokens.push(token);
	          lastToken = token;
	        }
	      }
	    }
	
	    return squashedTokens;
	  }
	
	  /**
	   * Forms the given array of `tokens` into a nested tree structure where
	   * tokens that represent a section have two additional items: 1) an array of
	   * all tokens that appear in that section and 2) the index in the original
	   * template that represents the end of that section.
	   */
	  function nestTokens (tokens) {
	    var nestedTokens = [];
	    var collector = nestedTokens;
	    var sections = [];
	
	    var token, section;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      token = tokens[i];
	
	      switch (token[0]) {
	        case '#':
	        case '^':
	          collector.push(token);
	          sections.push(token);
	          collector = token[4] = [];
	          break;
	        case '/':
	          section = sections.pop();
	          section[5] = token[2];
	          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
	          break;
	        default:
	          collector.push(token);
	      }
	    }
	
	    return nestedTokens;
	  }
	
	  /**
	   * A simple string scanner that is used by the template parser to find
	   * tokens in template strings.
	   */
	  function Scanner (string) {
	    this.string = string;
	    this.tail = string;
	    this.pos = 0;
	  }
	
	  /**
	   * Returns `true` if the tail is empty (end of string).
	   */
	  Scanner.prototype.eos = function eos () {
	    return this.tail === '';
	  };
	
	  /**
	   * Tries to match the given regular expression at the current position.
	   * Returns the matched text if it can match, the empty string otherwise.
	   */
	  Scanner.prototype.scan = function scan (re) {
	    var match = this.tail.match(re);
	
	    if (!match || match.index !== 0)
	      return '';
	
	    var string = match[0];
	
	    this.tail = this.tail.substring(string.length);
	    this.pos += string.length;
	
	    return string;
	  };
	
	  /**
	   * Skips all text until the given regular expression can be matched. Returns
	   * the skipped string, which is the entire tail if no match can be made.
	   */
	  Scanner.prototype.scanUntil = function scanUntil (re) {
	    var index = this.tail.search(re), match;
	
	    switch (index) {
	      case -1:
	        match = this.tail;
	        this.tail = '';
	        break;
	      case 0:
	        match = '';
	        break;
	      default:
	        match = this.tail.substring(0, index);
	        this.tail = this.tail.substring(index);
	    }
	
	    this.pos += match.length;
	
	    return match;
	  };
	
	  /**
	   * Represents a rendering context by wrapping a view object and
	   * maintaining a reference to the parent context.
	   */
	  function Context (view, parentContext) {
	    this.view = view;
	    this.cache = { '.': this.view };
	    this.parent = parentContext;
	  }
	
	  /**
	   * Creates a new context using the given view with this context
	   * as the parent.
	   */
	  Context.prototype.push = function push (view) {
	    return new Context(view, this);
	  };
	
	  /**
	   * Returns the value of the given name in this context, traversing
	   * up the context hierarchy if the value is absent in this context's view.
	   */
	  Context.prototype.lookup = function lookup (name) {
	    var cache = this.cache;
	
	    var value;
	    if (cache.hasOwnProperty(name)) {
	      value = cache[name];
	    } else {
	      var context = this, names, index, lookupHit = false;
	
	      while (context) {
	        if (name.indexOf('.') > 0) {
	          value = context.view;
	          names = name.split('.');
	          index = 0;
	
	          /**
	           * Using the dot notion path in `name`, we descend through the
	           * nested objects.
	           *
	           * To be certain that the lookup has been successful, we have to
	           * check if the last object in the path actually has the property
	           * we are looking for. We store the result in `lookupHit`.
	           *
	           * This is specially necessary for when the value has been set to
	           * `undefined` and we want to avoid looking up parent contexts.
	           **/
	          while (value != null && index < names.length) {
	            if (index === names.length - 1)
	              lookupHit = hasProperty(value, names[index]);
	
	            value = value[names[index++]];
	          }
	        } else {
	          value = context.view[name];
	          lookupHit = hasProperty(context.view, name);
	        }
	
	        if (lookupHit)
	          break;
	
	        context = context.parent;
	      }
	
	      cache[name] = value;
	    }
	
	    if (isFunction(value))
	      value = value.call(this.view);
	
	    return value;
	  };
	
	  /**
	   * A Writer knows how to take a stream of tokens and render them to a
	   * string, given a context. It also maintains a cache of templates to
	   * avoid the need to parse the same template twice.
	   */
	  function Writer () {
	    this.cache = {};
	  }
	
	  /**
	   * Clears all cached templates in this writer.
	   */
	  Writer.prototype.clearCache = function clearCache () {
	    this.cache = {};
	  };
	
	  /**
	   * Parses and caches the given `template` and returns the array of tokens
	   * that is generated from the parse.
	   */
	  Writer.prototype.parse = function parse (template, tags) {
	    var cache = this.cache;
	    var tokens = cache[template];
	
	    if (tokens == null)
	      tokens = cache[template] = parseTemplate(template, tags);
	
	    return tokens;
	  };
	
	  /**
	   * High-level method that is used to render the given `template` with
	   * the given `view`.
	   *
	   * The optional `partials` argument may be an object that contains the
	   * names and templates of partials that are used in the template. It may
	   * also be a function that is used to load partial templates on the fly
	   * that takes a single argument: the name of the partial.
	   */
	  Writer.prototype.render = function render (template, view, partials) {
	    var tokens = this.parse(template);
	    var context = (view instanceof Context) ? view : new Context(view);
	    return this.renderTokens(tokens, context, partials, template);
	  };
	
	  /**
	   * Low-level method that renders the given array of `tokens` using
	   * the given `context` and `partials`.
	   *
	   * Note: The `originalTemplate` is only ever used to extract the portion
	   * of the original template that was contained in a higher-order section.
	   * If the template doesn't use higher-order sections, this argument may
	   * be omitted.
	   */
	  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
	    var buffer = '';
	
	    var token, symbol, value;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      value = undefined;
	      token = tokens[i];
	      symbol = token[0];
	
	      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
	      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
	      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
	      else if (symbol === '&') value = this.unescapedValue(token, context);
	      else if (symbol === 'name') value = this.escapedValue(token, context);
	      else if (symbol === 'text') value = this.rawValue(token);
	
	      if (value !== undefined)
	        buffer += value;
	    }
	
	    return buffer;
	  };
	
	  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
	    var self = this;
	    var buffer = '';
	    var value = context.lookup(token[1]);
	
	    // This function is used to render an arbitrary template
	    // in the current context by higher-order sections.
	    function subRender (template) {
	      return self.render(template, context, partials);
	    }
	
	    if (!value) return;
	
	    if (isArray(value)) {
	      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
	        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
	      }
	    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
	      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
	    } else if (isFunction(value)) {
	      if (typeof originalTemplate !== 'string')
	        throw new Error('Cannot use higher-order sections without the original template');
	
	      // Extract the portion of the original template that the section contains.
	      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
	
	      if (value != null)
	        buffer += value;
	    } else {
	      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
	    }
	    return buffer;
	  };
	
	  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
	    var value = context.lookup(token[1]);
	
	    // Use JavaScript's definition of falsy. Include empty arrays.
	    // See https://github.com/janl/mustache.js/issues/186
	    if (!value || (isArray(value) && value.length === 0))
	      return this.renderTokens(token[4], context, partials, originalTemplate);
	  };
	
	  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
	    if (!partials) return;
	
	    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	    if (value != null)
	      return this.renderTokens(this.parse(value), context, partials, value);
	  };
	
	  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return value;
	  };
	
	  Writer.prototype.escapedValue = function escapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return mustache.escape(value);
	  };
	
	  Writer.prototype.rawValue = function rawValue (token) {
	    return token[1];
	  };
	
	  mustache.name = 'mustache.js';
	  mustache.version = '2.3.0';
	  mustache.tags = [ '{{', '}}' ];
	
	  // All high-level mustache.* functions use this writer.
	  var defaultWriter = new Writer();
	
	  /**
	   * Clears all cached templates in the default writer.
	   */
	  mustache.clearCache = function clearCache () {
	    return defaultWriter.clearCache();
	  };
	
	  /**
	   * Parses and caches the given template in the default writer and returns the
	   * array of tokens it contains. Doing this ahead of time avoids the need to
	   * parse templates on the fly as they are rendered.
	   */
	  mustache.parse = function parse (template, tags) {
	    return defaultWriter.parse(template, tags);
	  };
	
	  /**
	   * Renders the `template` with the given `view` and `partials` using the
	   * default writer.
	   */
	  mustache.render = function render (template, view, partials) {
	    if (typeof template !== 'string') {
	      throw new TypeError('Invalid template! Template should be a "string" ' +
	                          'but "' + typeStr(template) + '" was given as the first ' +
	                          'argument for mustache#render(template, view, partials)');
	    }
	
	    return defaultWriter.render(template, view, partials);
	  };
	
	  // This is here for backwards compatibility with 0.4.x.,
	  /*eslint-disable */ // eslint wants camel cased function name
	  mustache.to_html = function to_html (template, view, partials, send) {
	    /*eslint-enable*/
	
	    var result = mustache.render(template, view, partials);
	
	    if (isFunction(send)) {
	      send(result);
	    } else {
	      return result;
	    }
	  };
	
	  // Export the escaping function so that the user may override it.
	  // See https://github.com/janl/mustache.js/issues/244
	  mustache.escape = escapeHtml;
	
	  // Export these mainly for testing, but also for advanced usage.
	  mustache.Scanner = Scanner;
	  mustache.Context = Context;
	  mustache.Writer = Writer;
	
	  return mustache;
	}));


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function (ruleName, rule) {
	    var self = this
	    if (self._rule[ruleName]) {
	        throw new Error('node_modules/form.test: test.addRule("' + ruleName + '"), "' + ruleName + '" existing!')
	    }
	    self._rule[ruleName] = rule
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var extend = __webpack_require__(1)
	module.exports = function (ruleName, extendRule) {
	    var self = this
	    if (typeof self._rule[ruleName] === 'undefined') {
	        throw new Error('node_modules/form.test: test.replaceRule("' + ruleName + '"), "' + ruleName + '" not existing!')
	    }
	    self._rule[ruleName] = extend(true, self._rule[ruleName], extendRule)
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = {
		"name": "form-test",
		"version": "0.7.0",
		"description": "The form data validation library.Does not contain UI.",
		"main": "lib/index.js",
		"scripts": {
			"build": "webpack",
			"dev": "webpack --watch",
			"test-ci": "./node_modules/jest/bin/jest.js",
			"test": "./node_modules/jest/bin/jest.js --watch"
		},
		"repository": {
			"type": "git",
			"url": "git+https://github.com/fast-flow/form-check.git"
		},
		"keywords": [
			"form",
			"validation",
			"formcheck"
		],
		"author": "nimojs",
		"license": "MIT",
		"bugs": {
			"url": "https://github.com/fast-flow/form-check/issues"
		},
		"homepage": "https://github.com/fast-flow/form-check#readme",
		"devDependencies": {
			"jest": "^18.1.0",
			"json-loader": "^0.5.4"
		},
		"dependencies": {
			"extend": "^3.0.0",
			"mustache": "^2.3.0"
		},
		"jest": {
			"testRegex": "(/__test__/.*|\\.(test|spec))\\.(ts|tsx|js)$"
		}
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=form-test.js.map