(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EmojiMart"] = factory();
	else
		root["EmojiMart"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(75)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(33)('wks');
var uid = __webpack_require__(22);
var Symbol = __webpack_require__(5).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(49);
var toPrimitive = __webpack_require__(30);
var dP = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(15);
module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(54);
var defined = __webpack_require__(29);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(2);
var ctx = __webpack_require__(48);
var hide = __webpack_require__(8);
var has = __webpack_require__(7);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(53);
var enumBugKeys = __webpack_require__(34);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b41df26_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nimbleEmoji_vue__ = __webpack_require__(119);
function injectStyle (ssrContext) {
  __webpack_require__(84)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7b41df26"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b41df26_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nimbleEmoji_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Object = Object;

exports.default = _Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureScrollbar = exports.unifiedToNative = exports.deepMerge = exports.intersect = exports.uniq = exports.getSanitizedData = exports.getData = undefined;

var _typeof2 = __webpack_require__(86);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(111);

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__(58);

var _assign2 = _interopRequireDefault(_assign);

var _data = __webpack_require__(25);

var _stringFromCodePoint = __webpack_require__(118);

var _stringFromCodePoint2 = _interopRequireDefault(_stringFromCodePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _JSON = JSON;

var COLONS_REGEX = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;
var SKINS = ['1F3FA', '1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF'];

function unifiedToNative(unified) {
  var unicodes = unified.split('-'),
      codePoints = unicodes.map(function (u) {
    return '0x' + u;
  });

  return _stringFromCodePoint2.default.apply(null, codePoints);
}

function sanitize(emoji) {
  var name = emoji.name;
  var short_names = emoji.short_names;
  var skin_tone = emoji.skin_tone;
  var skin_variations = emoji.skin_variations;
  var emoticons = emoji.emoticons;
  var unified = emoji.unified;
  var custom = emoji.custom;
  var imageUrl = emoji.imageUrl;
  var id = emoji.id || short_names[0];
  var colons = ':' + id + ':';

  if (custom) {
    return {
      id: id,
      name: name,
      colons: colons,
      emoticons: emoticons,
      custom: custom,
      imageUrl: imageUrl
    };
  }

  if (skin_tone) {
    colons += ':skin-tone-' + skin_tone + ':';
  }

  return {
    id: id,
    name: name,
    colons: colons,
    emoticons: emoticons,
    unified: unified.toLowerCase(),
    skin: skin_tone || (skin_variations ? 1 : null),
    native: unifiedToNative(unified)
  };
}

function getSanitizedData() {
  return sanitize(getData.apply(undefined, arguments));
}

function cloneEmoji(emoji) {
  if (typeof emoji === 'string') {
    return emoji;
  }

  return (0, _assign2.default)({}, emoji);
}

function getData(_emoji, skin, set, data) {
  var emoji = cloneEmoji(_emoji);
  var emojiData = {};

  if (typeof emoji == 'string') {
    var matches = emoji.match(COLONS_REGEX);

    if (matches) {
      emoji = matches[1];

      if (matches[2]) {
        skin = parseInt(matches[2], 10);
      }
    }

    if (data.aliases.hasOwnProperty(emoji)) {
      emoji = data.aliases[emoji];
    }

    if (data.emojis.hasOwnProperty(emoji)) {
      emojiData = data.emojis[emoji];
    } else {
      return null;
    }
  } else if (emoji.id) {
    if (data.aliases.hasOwnProperty(emoji.id)) {
      emoji.id = data.aliases[emoji.id];
    }

    if (data.emojis.hasOwnProperty(emoji.id)) {
      emojiData = data.emojis[emoji.id];
      skin || (skin = emoji.skin);
    }
  }

  if (!(0, _keys2.default)(emojiData).length) {
    emojiData = emoji;
    emojiData.custom = true;

    if (!emojiData.search) {
      emojiData.search = (0, _data.buildSearch)(emoji);
    }
  }

  emojiData.emoticons || (emojiData.emoticons = []);
  emojiData.variations || (emojiData.variations = []);

  if (emojiData.skin_variations && skin > 1) {
    emojiData = JSON.parse(_JSON.stringify(emojiData));

    var skinKey = SKINS[skin - 1],
        variationData = emojiData.skin_variations[skinKey];

    if (!variationData.variations && emojiData.variations) {
      delete emojiData.variations;
    }

    if (set == 'native' || variationData['has_img_' + set] == undefined || variationData['has_img_' + set]) {
      emojiData.skin_tone = skin;

      for (var k in variationData) {
        var v = variationData[k];
        emojiData[k] = v;
      }
    }
  }

  if (emojiData.variations && emojiData.variations.length) {
    emojiData = JSON.parse(_JSON.stringify(emojiData));
    emojiData.unified = emojiData.variations.shift();
  }

  return emojiData;
}

function uniq(arr) {
  return arr.reduce(function (acc, item) {
    if (acc.indexOf(item) === -1) {
      acc.push(item);
    }
    return acc;
  }, []);
}

function intersect(a, b) {
  var uniqA = uniq(a);
  var uniqB = uniq(b);

  return uniqA.filter(function (item) {
    return uniqB.indexOf(item) >= 0;
  });
}

function deepMerge(a, b) {
  var o = {};

  for (var key in a) {
    var originalValue = a[key],
        value = originalValue;

    if (b.hasOwnProperty(key)) {
      value = b[key];
    }

    if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
      value = deepMerge(originalValue, value);
    }

    o[key] = value;
  }

  return o;
}

// https://github.com/sonicdoe/measure-scrollbar
function measureScrollbar() {
  if (typeof document == 'undefined') return 0;
  var div = document.createElement('div');

  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'scroll';
  div.style.position = 'absolute';
  div.style.top = '-9999px';

  document.body.appendChild(div);
  var scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  return scrollbarWidth;
}

exports.getData = getData;
exports.getSanitizedData = getSanitizedData;
exports.uniq = uniq;
exports.intersect = intersect;
exports.deepMerge = deepMerge;
exports.unifiedToNative = unifiedToNative;
exports.measureScrollbar = measureScrollbar;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(29);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mapping = {
  name: 'a',
  unified: 'b',
  non_qualified: 'c',
  has_img_apple: 'd',
  has_img_google: 'e',
  has_img_twitter: 'f',
  has_img_emojione: 'g',
  has_img_facebook: 'h',
  has_img_messenger: 'i',
  keywords: 'j',
  sheet: 'k',
  emoticons: 'l',
  text: 'm',
  short_names: 'n',
  added_in: 'o'
};

var buildSearch = function buildSearch(emoji) {
  var search = [];

  var addToSearch = function addToSearch(strings, split) {
    if (!strings) {
      return;
    }

    ;(Array.isArray(strings) ? strings : [strings]).forEach(function (string) {
      ;(split ? string.split(/[-|_|\s]+/) : [string]).forEach(function (s) {
        s = s.toLowerCase();

        if (search.indexOf(s) == -1) {
          search.push(s);
        }
      });
    });
  };

  addToSearch(emoji.short_names, true);
  addToSearch(emoji.name, true);
  addToSearch(emoji.keywords, false);
  addToSearch(emoji.emoticons, false);

  return search.join(',');
};

var compress = function compress(emoji) {
  emoji.short_names = emoji.short_names.filter(function (short_name) {
    return short_name !== emoji.short_name;
  });
  delete emoji.short_name;

  emoji.sheet = [emoji.sheet_x, emoji.sheet_y];
  delete emoji.sheet_x;
  delete emoji.sheet_y;

  emoji.added_in = parseInt(emoji.added_in);
  if (emoji.added_in === 6) {
    delete emoji.added_in;
  }

  for (var key in mapping) {
    emoji[mapping[key]] = emoji[key];
    delete emoji[key];
  }

  for (var _key in emoji) {
    var value = emoji[_key];

    if (Array.isArray(value) && !value.length) {
      delete emoji[_key];
    } else if (typeof value === 'string' && !value.length) {
      delete emoji[_key];
    } else if (value === null) {
      delete emoji[_key];
    }
  }
};

var uncompress = function uncompress(data) {
  data.compressed = false;

  for (var id in data.emojis) {
    var emoji = data.emojis[id];

    for (var key in mapping) {
      emoji[key] = emoji[mapping[key]];
      delete emoji[mapping[key]];
    }

    if (!emoji.short_names) emoji.short_names = [];
    emoji.short_names.unshift(id);

    emoji.sheet_x = emoji.sheet[0];
    emoji.sheet_y = emoji.sheet[1];
    delete emoji.sheet;

    if (!emoji.text) emoji.text = '';

    if (!emoji.added_in) emoji.added_in = 6;
    emoji.added_in = emoji.added_in.toFixed(1);

    emoji.search = buildSearch(emoji);
  }
};

module.exports = { buildSearch: buildSearch, compress: compress, uncompress: uncompress };

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EmojiProps = {
  backgroundImageFn: {
    type: Function,
    default: function _default(set, sheetSize) {
      return 'https://unpkg.com/emoji-datasource-' + set + '@' + '4.0.4' + '/img/' + set + '/sheets-256/' + sheetSize + '.png';
    }
  },
  native: {
    type: Boolean,
    default: false
  },
  forceSize: {
    type: Boolean,
    default: false
  },
  tooltip: {
    type: Boolean,
    default: false
  },
  fallback: {
    type: Function
  },
  skin: {
    type: Number,
    default: 1
  },
  sheetSize: {
    type: Number,
    default: 64
  },
  set: {
    type: String,
    default: 'apple'
  },
  size: {
    type: Number,
    default: 24
  },
  emoji: {
    type: [String, Object],
    required: true
  }
};

var PickerProps = {
  perLine: {
    type: Number,
    default: 9
  },
  emojiSize: {
    type: Number,
    default: 24
  },
  title: {
    type: String,
    default: 'Emoji Mart™'
  },
  emoji: {
    type: String,
    default: 'department_store'
  },
  color: {
    type: String,
    default: '#ae65c5'
  },
  set: {
    type: String,
    default: 'apple'
  },
  skin: {
    type: Number,
    default: null
  },
  defaultSkin: {
    type: Number,
    default: 1
  },
  native: {
    type: Boolean,
    default: false
  },
  backgroundImageFn: {
    type: Function
  },
  sheetSize: {
    type: Number,
    default: 64
  },
  emojisToShowFilter: {
    type: Function
  },
  emojiTooltip: {
    type: Boolean,
    default: false
  },
  include: {
    type: Array
  },
  exclude: {
    type: Array
  },
  recent: {
    type: Array
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  custom: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  i18n: {
    type: Object,
    default: function _default() {
      return {};
    }
  },
  showPreview: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  showCategories: {
    type: Boolean,
    default: true
  },
  showSkinTones: {
    type: Boolean,
    default: true
  },
  infiniteScroll: {
    type: Boolean,
    default: true
  },
  pickerStyles: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};

exports.EmojiProps = EmojiProps;
exports.PickerProps = PickerProps;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(89)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(47)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(33)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(21) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(7);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(21);
var wksExt = __webpack_require__(36);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(129);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(130);

var _createClass3 = _interopRequireDefault(_createClass2);

var _ = __webpack_require__(20);

var _data = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NimbleEmojiIndex = function () {
  function NimbleEmojiIndex(data) {
    (0, _classCallCheck3.default)(this, NimbleEmojiIndex);

    if (data.compressed) {
      data = (0, _data.uncompress)(data);
    }

    this.data = data || {};
    this.originalPool = {};
    this.index = {};
    this.emojis = {};
    this.emoticons = {};
    this.customEmojisList = [];

    this.buildIndex();
  }

  (0, _createClass3.default)(NimbleEmojiIndex, [{
    key: 'buildIndex',
    value: function buildIndex() {
      var _this = this;

      var _loop = function _loop(emoji) {
        var emojiData = _this.data.emojis[emoji];
        var short_names = emojiData.short_names;
        var emoticons = emojiData.emoticons;
        var id = short_names[0];

        if (emoticons) {
          emoticons.forEach(function (emoticon) {
            if (_this.emoticons[emoticon]) {
              return;
            }

            _this.emoticons[emoticon] = id;
          });
        }

        _this.emojis[id] = (0, _.getSanitizedData)(id, null, null, _this.data);
        _this.originalPool[id] = emojiData;
      };

      for (var emoji in this.data.emojis) {
        _loop(emoji);
      }
    }
  }, {
    key: 'clearCustomEmojis',
    value: function clearCustomEmojis(pool) {
      var _this2 = this;

      this.customEmojisList.forEach(function (emoji) {
        var emojiId = emoji.id || emoji.short_names[0];

        delete pool[emojiId];
        delete _this2.emojis[emojiId];
      });
    }
  }, {
    key: 'addCustomToPool',
    value: function addCustomToPool(custom, pool) {
      var _this3 = this;

      if (this.customEmojisList.length) this.clearCustomEmojis(pool);

      custom.forEach(function (emoji) {
        var emojiId = emoji.id || emoji.short_names[0];

        if (emojiId && !pool[emojiId]) {
          pool[emojiId] = (0, _.getData)(emoji, null, null, _this3.data);
          _this3.emojis[emojiId] = (0, _.getSanitizedData)(emoji, null, null, _this3.data);
        }
      });

      this.customEmojisList = custom;
      this.index = {};
    }
  }, {
    key: 'search',
    value: function search(value) {
      var _this4 = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var emojisToShowFilter = _ref.emojisToShowFilter;
      var maxResults = _ref.maxResults;
      var include = _ref.include;
      var exclude = _ref.exclude;
      var _ref$custom = _ref.custom;
      var custom = _ref$custom === undefined ? [] : _ref$custom;

      if (this.customEmojisList != custom) this.addCustomToPool(custom, this.originalPool);

      maxResults || (maxResults = 75);
      include || (include = []);
      exclude || (exclude = []);

      var results = null,
          pool = this.originalPool;

      if (value.length) {
        if (value == '-' || value == '-1') {
          return [this.emojis['-1']];
        }

        var values = value.toLowerCase().split(/[\s|,|\-|_]+/),
            allResults = [];

        if (values.length > 2) {
          values = [values[0], values[1]];
        }

        if (include.length || exclude.length) {
          pool = {};

          this.data.categories.forEach(function (category) {
            var isIncluded = include && include.length ? include.indexOf(category.id) > -1 : true;
            var isExcluded = exclude && exclude.length ? exclude.indexOf(category.id) > -1 : false;
            if (!isIncluded || isExcluded) {
              return;
            }

            category.emojis.forEach(function (emojiId) {
              return pool[emojiId] = _this4.data.emojis[emojiId];
            });
          });

          if (custom.length) {
            var customIsIncluded = include && include.length ? include.indexOf('custom') > -1 : true;
            var customIsExcluded = exclude && exclude.length ? exclude.indexOf('custom') > -1 : false;
            if (customIsIncluded && !customIsExcluded) {
              this.addCustomToPool(custom, pool);
            }
          }
        }

        allResults = values.map(function (value) {
          var aPool = pool,
              aIndex = _this4.index,
              length = 0;

          for (var charIndex = 0; charIndex < value.length; charIndex++) {
            var char = value[charIndex];
            length++;

            aIndex[char] || (aIndex[char] = {});
            aIndex = aIndex[char];

            if (!aIndex.results) {
              (function () {
                var scores = {};

                aIndex.results = [];
                aIndex.pool = {};

                for (var _id in aPool) {
                  var emoji = aPool[_id];
                  var search = emoji.search;
                  var sub = value.substr(0, length);
                  var subIndex = search.indexOf(sub);

                  if (subIndex != -1) {
                    var score = subIndex + 1;
                    if (sub == _id) score = 0;

                    aIndex.results.push(_this4.emojis[_id]);
                    aIndex.pool[_id] = emoji;

                    scores[_id] = score;
                  }
                }

                aIndex.results.sort(function (a, b) {
                  var aScore = scores[a.id],
                      bScore = scores[b.id];

                  return aScore - bScore;
                });
              })();
            }

            aPool = aIndex.pool;
          }

          return aIndex.results;
        }).filter(function (a) {
          return a;
        });

        if (allResults.length > 1) {
          results = _.intersect.apply(null, allResults);
        } else if (allResults.length) {
          results = allResults[0];
        } else {
          results = [];
        }
      }

      if (results) {
        if (emojisToShowFilter) {
          results = results.filter(function (result) {
            return emojisToShowFilter(pool[result.id]);
          });
        }

        if (results && results.length > maxResults) {
          results = results.slice(0, maxResults);
        }
      }

      return results;
    }
  }]);
  return NimbleEmojiIndex;
}();

exports.default = NimbleEmojiIndex;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = {"compressed":true,"categories":[{"id":"people","name":"Smileys & People","emojis":["grinning","grin","joy","smiley","smile","sweat_smile","wink","blush","yum","sunglasses","heart_eyes","kissing_heart","kissing","kissing_smiling_eyes","kissing_closed_eyes","relaxed","neutral_face","expressionless","no_mouth","smirk","persevere","disappointed_relieved","open_mouth","hushed","sleepy","tired_face","sleeping","relieved","stuck_out_tongue","stuck_out_tongue_winking_eye","stuck_out_tongue_closed_eyes","unamused","sweat","pensive","confused","astonished","confounded","disappointed","worried","triumph","cry","sob","frowning","anguished","fearful","weary","grimacing","cold_sweat","scream","flushed","dizzy_face","rage","angry","mask","innocent","smiling_imp","imp","japanese_ogre","japanese_goblin","skull","ghost","alien","space_invader","hankey","smiley_cat","smile_cat","joy_cat","heart_eyes_cat","smirk_cat","kissing_cat","scream_cat","crying_cat_face","pouting_cat","see_no_evil","hear_no_evil","speak_no_evil","baby","boy","girl","man","woman","older_man","older_woman","cop","guardsman","construction_worker","princess","man_with_turban","man_with_gua_pi_mao","person_with_blond_hair","bride_with_veil","angel","santa","person_frowning","person_with_pouting_face","no_good","ok_woman","information_desk_person","raising_hand","bow","massage","haircut","walking","runner","dancer","dancers","bath","bust_in_silhouette","busts_in_silhouette","horse_racing","snowboarder","surfer","rowboat","swimmer","bicyclist","mountain_bicyclist","couple","two_men_holding_hands","two_women_holding_hands","couplekiss","couple_with_heart","muscle","point_left","point_right","point_up","point_up_2","point_down","v","hand","ok_hand","+1","-1","fist","facepunch","wave","clap","open_hands","raised_hands","pray","nail_care","ear","nose","footprints","eyes","tongue","lips","kiss","cupid","heart","heartbeat","broken_heart","two_hearts","sparkling_heart","heartpulse","blue_heart","green_heart","yellow_heart","purple_heart","gift_heart","revolving_hearts","heart_decoration","love_letter","zzz","anger","bomb","boom","sweat_drops","dash","dizzy","speech_balloon","thought_balloon","eyeglasses","necktie","shirt","jeans","dress","kimono","bikini","womans_clothes","purse","handbag","pouch","school_satchel","mans_shoe","athletic_shoe","high_heel","sandal","boot","crown","womans_hat","tophat","mortar_board","lipstick","ring","gem"]},{"id":"nature","name":"Animals & Nature","emojis":["monkey_face","monkey","dog","dog2","poodle","wolf","cat","cat2","tiger","tiger2","leopard","horse","racehorse","cow","ox","water_buffalo","cow2","pig","pig2","boar","pig_nose","ram","sheep","goat","dromedary_camel","camel","elephant","mouse","mouse2","rat","hamster","rabbit","rabbit2","bear","koala","panda_face","feet","chicken","rooster","hatching_chick","baby_chick","hatched_chick","bird","penguin","frog","crocodile","turtle","snake","dragon_face","dragon","whale","whale2","dolphin","fish","tropical_fish","blowfish","octopus","shell","snail","bug","ant","bee","beetle","bouquet","cherry_blossom","white_flower","rose","hibiscus","sunflower","blossom","tulip","seedling","evergreen_tree","deciduous_tree","palm_tree","cactus","ear_of_rice","herb","four_leaf_clover","maple_leaf","fallen_leaf","leaves"]},{"id":"foods","name":"Food & Drink","emojis":[]},{"id":"activity","name":"Activities","emojis":["jack_o_lantern","christmas_tree","fireworks","sparkler","sparkles","balloon","tada","confetti_ball","tanabata_tree","bamboo","dolls","flags","wind_chime","rice_scene","ribbon","gift","ticket","trophy","soccer","baseball","basketball","football","rugby_football","tennis","8ball","bowling","dart","golf","fishing_pole_and_fish","running_shirt_with_sash","ski","video_game","game_die","spades","hearts","diamonds","clubs","black_joker","mahjong","flower_playing_cards"]},{"id":"places","name":"Travel & Places","emojis":["earth_africa","earth_americas","earth_asia","globe_with_meridians","japan","volcano","mount_fuji","house","house_with_garden","office","post_office","european_post_office","hospital","bank","hotel","love_hotel","convenience_store","school","department_store","factory","japanese_castle","european_castle","wedding","tokyo_tower","statue_of_liberty","church","fountain","tent","foggy","night_with_stars","sunrise_over_mountains","sunrise","city_sunset","city_sunrise","bridge_at_night","hotsprings","milky_way","carousel_horse","ferris_wheel","roller_coaster","barber","circus_tent","performing_arts","art","slot_machine","steam_locomotive","railway_car","bullettrain_side","bullettrain_front","train2","metro","light_rail","station","tram","monorail","mountain_railway","train","bus","oncoming_bus","trolleybus","minibus","ambulance","fire_engine","police_car","oncoming_police_car","taxi","oncoming_taxi","car","oncoming_automobile","blue_car","truck","articulated_lorry","tractor","bike","busstop","fuelpump","rotating_light","traffic_light","vertical_traffic_light","construction","anchor","boat","speedboat","ship","airplane","seat","helicopter","suspension_railway","mountain_cableway","aerial_tramway","satellite","rocket","door","toilet","shower","bathtub","hourglass","hourglass_flowing_sand","watch","alarm_clock","clock12","clock1230","clock1","clock130","clock2","clock230","clock3","clock330","clock4","clock430","clock5","clock530","clock6","clock630","clock7","clock730","clock8","clock830","clock9","clock930","clock10","clock1030","clock11","clock1130","new_moon","waxing_crescent_moon","first_quarter_moon","moon","full_moon","waning_gibbous_moon","last_quarter_moon","waning_crescent_moon","crescent_moon","new_moon_with_face","first_quarter_moon_with_face","last_quarter_moon_with_face","sunny","full_moon_with_face","sun_with_face","star","star2","stars","cloud","partly_sunny","cyclone","rainbow","closed_umbrella","umbrella","zap","snowflake","snowman","fire","droplet","ocean"]},{"id":"objects","name":"Objects","emojis":[]},{"id":"symbols","name":"Symbols","emojis":["atm","put_litter_in_its_place","potable_water","wheelchair","mens","womens","restroom","baby_symbol","wc","passport_control","customs","baggage_claim","left_luggage","warning","children_crossing","no_entry","no_entry_sign","no_bicycles","no_smoking","do_not_litter","non-potable_water","no_pedestrians","no_mobile_phones","underage","arrow_up","arrow_upper_right","arrow_right","arrow_lower_right","arrow_down","arrow_lower_left","arrow_left","arrow_upper_left","arrow_up_down","left_right_arrow","leftwards_arrow_with_hook","arrow_right_hook","arrow_heading_up","arrow_heading_down","arrows_clockwise","arrows_counterclockwise","back","end","on","soon","top","six_pointed_star","aries","taurus","gemini","cancer","leo","virgo","libra","scorpius","sagittarius","capricorn","aquarius","pisces","ophiuchus","twisted_rightwards_arrows","repeat","repeat_one","arrow_forward","fast_forward","arrow_backward","rewind","arrow_up_small","arrow_double_up","arrow_down_small","arrow_double_down","cinema","low_brightness","high_brightness","signal_strength","vibration_mode","mobile_phone_off","recycle","trident","name_badge","beginner","o","white_check_mark","ballot_box_with_check","heavy_check_mark","heavy_multiplication_x","x","negative_squared_cross_mark","heavy_plus_sign","heavy_minus_sign","heavy_division_sign","curly_loop","loop","part_alternation_mark","eight_spoked_asterisk","eight_pointed_black_star","sparkle","bangbang","interrobang","question","grey_question","grey_exclamation","exclamation","wavy_dash","copyright","registered","tm","hash","zero","one","two","three","four","five","six","seven","eight","nine","keycap_ten","100","capital_abcd","abcd","1234","symbols","abc","a","ab","b","cl","cool","free","information_source","id","m","new","ng","o2","ok","parking","sos","up","vs","koko","sa","u6708","u6709","u6307","ideograph_advantage","u5272","u7121","u7981","accept","u7533","u5408","u7a7a","congratulations","secret","u55b6","u6e80","black_small_square","white_small_square","white_medium_square","black_medium_square","white_medium_small_square","black_medium_small_square","black_large_square","white_large_square","large_orange_diamond","large_blue_diamond","small_orange_diamond","small_blue_diamond","small_red_triangle","small_red_triangle_down","diamond_shape_with_a_dot_inside","radio_button","black_square_button","white_square_button","white_circle","black_circle","red_circle","large_blue_circle"]},{"id":"flags","name":"Flags","emojis":["checkered_flag","cn","crossed_flags","de","es","fr","gb","it","jp","kr","ru","triangular_flag_on_post","us"]}],"emojis":{"100":{"a":"Hundred Points Symbol","b":"1F4AF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["score","perfect","numbers","century","exam","quiz","test","pass","hundred"],"k":[25,26]},"1234":{"a":"Input Symbol for Numbers","b":"1F522","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["numbers","blue-square"],"k":[27,36]},"monkey_face":{"a":"Monkey Face","b":"1F435","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","circus"],"k":[13,31],"l":[":o)"]},"grinning":{"a":"Grinning Face","b":"1F600","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","smile","happy","joy",":D","grin"],"k":[30,24],"m":":D"},"earth_africa":{"a":"Earth Globe Europe-Africa","b":"1F30D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["globe","world","international"],"k":[6,5]},"checkered_flag":{"a":"Chequered Flag","b":"1F3C1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["contest","finishline","race","gokart"],"k":[9,27]},"jack_o_lantern":{"a":"Jack-O-Lantern","b":"1F383","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["halloween","light","pumpkin","creepy","fall"],"k":[8,17]},"atm":{"a":"Automated Teller Machine","b":"1F3E7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["money","sales","cash","blue-square","payment","bank"],"k":[12,4]},"earth_americas":{"a":"Earth Globe Americas","b":"1F30E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["globe","world","USA","international"],"k":[6,6]},"grin":{"a":"Grinning Face with Smiling Eyes","b":"1F601","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","happy","smile","joy","kawaii"],"k":[30,25]},"triangular_flag_on_post":{"a":"Triangular Flag on Post","b":"1F6A9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mark","milestone","place"],"k":[35,14]},"monkey":{"a":"Monkey","b":"1F412","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","banana","circus"],"k":[12,48]},"christmas_tree":{"a":"Christmas Tree","b":"1F384","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["festival","vacation","december","xmas","celebration"],"k":[8,18]},"put_litter_in_its_place":{"a":"Put Litter in Its Place Symbol","b":"1F6AE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","sign","human","info"],"k":[35,19]},"earth_asia":{"a":"Earth Globe Asia-Australia","b":"1F30F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["globe","world","east","international"],"k":[6,7]},"crossed_flags":{"a":"Crossed Flags","b":"1F38C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","nation","country","border"],"k":[8,31]},"joy":{"a":"Face with Tears of Joy","b":"1F602","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","cry","tears","weep","happy","happytears","haha"],"k":[30,26]},"fireworks":{"a":"Fireworks","b":"1F386","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","festival","carnival","congratulations"],"k":[8,25]},"potable_water":{"a":"Potable Water Symbol","b":"1F6B0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","liquid","restroom","cleaning","faucet"],"k":[35,21]},"wheelchair":{"a":"Wheelchair Symbol","b":"267F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","disabled","a11y","accessibility"],"k":[48,10],"o":4},"dog":{"a":"Dog Face","b":"1F436","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","friend","nature","woof","puppy","pet","faithful"],"k":[13,32]},"sparkler":{"a":"Firework Sparkler","b":"1F387","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stars","night","shine"],"k":[8,26]},"globe_with_meridians":{"a":"Globe with Meridians","b":"1F310","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["earth","international","world","internet","interweb","i18n"],"k":[6,8]},"smiley":{"a":"Smiling Face with Open Mouth","b":"1F603","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","happy","joy","haha",":D",":)","smile","funny"],"k":[30,27],"l":["=)","=-)"],"m":":)"},"sparkles":{"a":"Sparkles","b":"2728","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stars","shine","shiny","cool","awesome","good","magic"],"k":[49,48]},"dog2":{"a":"Dog","b":"1F415","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","friend","doge","pet","faithful"],"k":[12,51]},"mens":{"a":"Mens Symbol","b":"1F6B9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["toilet","restroom","wc","blue-square","gender","male"],"k":[36,29]},"womens":{"a":"Womens Symbol","b":"1F6BA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","woman","female","toilet","loo","restroom","gender"],"k":[36,30]},"smile":{"a":"Smiling Face with Open Mouth and Smiling Eyes","b":"1F604","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","happy","joy","funny","haha","laugh","like",":D",":)"],"k":[30,28],"l":["C:","c:",":D",":-D"],"m":":)"},"japan":{"a":"Silhouette of Japan","b":"1F5FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nation","country","japanese","asia"],"k":[30,22]},"poodle":{"a":"Poodle","b":"1F429","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dog","animal","101","nature","pet"],"k":[13,19]},"balloon":{"a":"Balloon","b":"1F388","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["party","celebration","birthday","circus"],"k":[8,27]},"sweat_smile":{"a":"Smiling Face with Open Mouth and Cold Sweat","b":"1F605","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","hot","happy","laugh","sweat","smile","relief"],"k":[30,29]},"restroom":{"a":"Restroom","b":"1F6BB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","toilet","refresh","wc","gender"],"k":[36,31]},"wolf":{"a":"Wolf Face","b":"1F43A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","wild"],"k":[13,36]},"tada":{"a":"Party Popper","b":"1F389","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["party","congratulations","birthday","magic","circus","celebration"],"k":[8,28]},"confetti_ball":{"a":"Confetti Ball","b":"1F38A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["festival","party","birthday","circus"],"k":[8,29]},"baby_symbol":{"a":"Baby Symbol","b":"1F6BC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["orange-square","child"],"k":[36,32]},"wc":{"a":"Water Closet","b":"1F6BE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["toilet","restroom","blue-square"],"k":[36,34]},"wink":{"a":"Winking Face","b":"1F609","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","happy","mischievous","secret",";)","smile","eye"],"k":[30,33],"l":[";)",";-)"],"m":";)"},"tanabata_tree":{"a":"Tanabata Tree","b":"1F38B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature","branch","summer"],"k":[8,30]},"volcano":{"a":"Volcano","b":"1F30B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","nature","disaster"],"k":[6,3]},"cat":{"a":"Cat Face","b":"1F431","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","meow","nature","pet","kitten"],"k":[13,27]},"blush":{"a":"Smiling Face with Smiling Eyes","b":"1F60A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","smile","happy","flushed","crush","embarrassed","shy","joy"],"k":[30,34],"m":":)"},"bamboo":{"a":"Pine Decoration","b":"1F38D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature","vegetable","panda","pine_decoration"],"k":[8,32]},"passport_control":{"a":"Passport Control","b":"1F6C2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["custom","blue-square"],"k":[36,43]},"mount_fuji":{"a":"Mount Fuji","b":"1F5FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","mountain","nature","japanese"],"k":[30,19]},"cat2":{"a":"Cat","b":"1F408","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","meow","pet","cats"],"k":[12,38]},"dolls":{"a":"Japanese Dolls","b":"1F38E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","toy","kimono"],"k":[8,33]},"customs":{"a":"Customs","b":"1F6C3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["passport","border","blue-square"],"k":[36,44]},"yum":{"a":"Face Savouring Delicious Food","b":"1F60B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["happy","joy","tongue","smile","face","silly","yummy","nom","delicious","savouring"],"k":[30,35]},"tiger":{"a":"Tiger Face","b":"1F42F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cat","danger","wild","nature","roar"],"k":[13,25]},"flags":{"a":"Carp Streamer","b":"1F38F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fish","japanese","koinobori","carp","banner"],"k":[8,34]},"baggage_claim":{"a":"Baggage Claim","b":"1F6C4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","airport","transport"],"k":[36,45]},"sunglasses":{"a":"Smiling Face with Sunglasses","b":"1F60E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","cool","smile","summer","beach","sunglass"],"k":[30,38],"l":["8)"]},"left_luggage":{"a":"Left Luggage","b":"1F6C5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","travel"],"k":[36,46]},"wind_chime":{"a":"Wind Chime","b":"1F390","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","ding","spring","bell"],"k":[8,35]},"tiger2":{"a":"Tiger","b":"1F405","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","roar"],"k":[12,35]},"heart_eyes":{"a":"Smiling Face with Heart-Shaped Eyes","b":"1F60D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","love","like","affection","valentines","infatuation","crush","heart"],"k":[30,37]},"rice_scene":{"a":"Moon Viewing Ceremony","b":"1F391","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","japan","asia","tsukimi"],"k":[8,36]},"kissing_heart":{"a":"Face Throwing a Kiss","b":"1F618","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","love","like","affection","valentines","infatuation","kiss"],"k":[30,48],"l":[":*",":-*"]},"warning":{"a":"Warning Sign","b":"26A0-FE0F","c":"26A0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["exclamation","wip","alert","error","problem","issue"],"k":[48,20],"o":4},"leopard":{"a":"Leopard","b":"1F406","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[12,36]},"horse":{"a":"Horse Face","b":"1F434","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","brown","nature"],"k":[13,30]},"children_crossing":{"a":"Children Crossing","b":"1F6B8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["school","warning","danger","sign","driving","yellow-diamond"],"k":[36,28]},"ribbon":{"a":"Ribbon","b":"1F380","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["decoration","pink","girl","bowtie"],"k":[8,14]},"kissing":{"a":"Kissing Face","b":"1F617","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","face","3","valentines","infatuation","kiss"],"k":[30,47]},"gift":{"a":"Wrapped Present","b":"1F381","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["present","birthday","christmas","xmas"],"k":[8,15]},"no_entry":{"a":"No Entry","b":"26D4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["limit","security","privacy","bad","denied","stop","circle"],"k":[48,35],"o":5},"kissing_smiling_eyes":{"a":"Kissing Face with Smiling Eyes","b":"1F619","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","affection","valentines","infatuation","kiss"],"k":[30,49]},"racehorse":{"a":"Horse","b":"1F40E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","gamble","luck"],"k":[12,44]},"no_entry_sign":{"a":"No Entry Sign","b":"1F6AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["forbid","stop","limit","denied","disallow","circle"],"k":[35,16]},"kissing_closed_eyes":{"a":"Kissing Face with Closed Eyes","b":"1F61A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","love","like","affection","valentines","infatuation","kiss"],"k":[30,50]},"relaxed":{"a":"White Smiling Face","b":"263A-FE0F","c":"263A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","blush","massage","happiness"],"k":[47,41],"o":1},"no_bicycles":{"a":"No Bicycles","b":"1F6B3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cyclist","prohibited","circle"],"k":[35,24]},"no_smoking":{"a":"No Smoking Symbol","b":"1F6AD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cigarette","blue-square","smell","smoke"],"k":[35,18]},"ticket":{"a":"Ticket","b":"1F3AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["event","concert","pass"],"k":[9,5]},"do_not_litter":{"a":"Do Not Litter Symbol","b":"1F6AF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["trash","bin","garbage","circle"],"k":[35,20]},"cow":{"a":"Cow Face","b":"1F42E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["beef","ox","animal","nature","moo","milk"],"k":[13,24]},"non-potable_water":{"a":"Non-Potable Water Symbol","b":"1F6B1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["drink","faucet","tap","circle"],"k":[35,22]},"trophy":{"a":"Trophy","b":"1F3C6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["win","award","contest","place","ftw","ceremony"],"k":[10,19]},"ox":{"a":"Ox","b":"1F402","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cow","beef"],"k":[12,32]},"water_buffalo":{"a":"Water Buffalo","b":"1F403","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","ox","cow"],"k":[12,33]},"no_pedestrians":{"a":"No Pedestrians","b":"1F6B7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["rules","crossing","walking","circle"],"k":[36,27]},"house":{"a":"House Building","b":"1F3E0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","home"],"k":[11,49]},"no_mobile_phones":{"a":"No Mobile Phones","b":"1F4F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["iphone","mute","circle"],"k":[26,44]},"house_with_garden":{"a":"House with Garden","b":"1F3E1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["home","plant","nature"],"k":[11,50]},"cow2":{"a":"Cow","b":"1F404","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["beef","ox","animal","nature","moo","milk"],"k":[12,34]},"pig":{"a":"Pig Face","b":"1F437","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","oink","nature"],"k":[13,33]},"underage":{"a":"No One Under Eighteen Symbol","b":"1F51E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["18","drink","pub","night","minor","circle"],"k":[27,32]},"office":{"a":"Office Building","b":"1F3E2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","bureau","work"],"k":[11,51]},"neutral_face":{"a":"Neutral Face","b":"1F610","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["indifference","meh",":|","neutral"],"k":[30,40],"l":[":|",":-|"]},"pig2":{"a":"Pig","b":"1F416","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,0]},"expressionless":{"a":"Expressionless Face","b":"1F611","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","indifferent","-_-","meh","deadpan"],"k":[30,41]},"post_office":{"a":"Japanese Post Office","b":"1F3E3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","envelope","communication"],"k":[12,0]},"european_post_office":{"a":"European Post Office","b":"1F3E4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","email"],"k":[12,1]},"soccer":{"a":"Soccer Ball","b":"26BD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","football"],"k":[48,26],"o":5},"boar":{"a":"Boar","b":"1F417","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,1]},"no_mouth":{"a":"Face Without Mouth","b":"1F636","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","hellokitty"],"k":[31,26]},"pig_nose":{"a":"Pig Nose","b":"1F43D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","oink"],"k":[13,39]},"arrow_up":{"a":"Upwards Black Arrow","b":"2B06-FE0F","c":"2B06","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","continue","top","direction"],"k":[50,18],"o":4},"hospital":{"a":"Hospital","b":"1F3E5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","health","surgery","doctor"],"k":[12,2]},"baseball":{"a":"Baseball","b":"26BE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","balls"],"k":[48,27],"o":5},"smirk":{"a":"Smirking Face","b":"1F60F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","smile","mean","prank","smug","sarcasm"],"k":[30,39]},"arrow_upper_right":{"a":"North East Arrow","b":"2197-FE0F","c":"2197","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","point","direction","diagonal","northeast"],"k":[46,36],"o":1},"basketball":{"a":"Basketball and Hoop","b":"1F3C0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","balls","NBA"],"k":[9,26]},"ram":{"a":"Ram","b":"1F40F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","sheep","nature"],"k":[12,45]},"bank":{"a":"Bank","b":"1F3E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","money","sales","cash","business","enterprise"],"k":[12,3]},"sheep":{"a":"Sheep","b":"1F411","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","wool","shipit"],"k":[12,47]},"arrow_right":{"a":"Black Rightwards Arrow","b":"27A1-FE0F","c":"27A1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","next"],"k":[50,12],"o":1},"persevere":{"a":"Persevering Face","b":"1F623","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","sick","no","upset","oops"],"k":[31,7]},"hotel":{"a":"Hotel","b":"1F3E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","accomodation","checkin"],"k":[12,5]},"arrow_lower_right":{"a":"South East Arrow","b":"2198-FE0F","c":"2198","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","diagonal","southeast"],"k":[46,37],"o":1},"goat":{"a":"Goat","b":"1F410","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[12,46]},"love_hotel":{"a":"Love Hotel","b":"1F3E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["like","affection","dating"],"k":[12,6]},"disappointed_relieved":{"a":"Disappointed but Relieved Face","b":"1F625","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","phew","sweat","nervous"],"k":[31,9]},"football":{"a":"American Football","b":"1F3C8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","balls","NFL"],"k":[10,26]},"convenience_store":{"a":"Convenience Store","b":"1F3EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","shopping","groceries"],"k":[12,7]},"dromedary_camel":{"a":"Dromedary Camel","b":"1F42A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","hot","desert","hump"],"k":[13,20]},"arrow_down":{"a":"Downwards Black Arrow","b":"2B07-FE0F","c":"2B07","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","bottom"],"k":[50,19],"o":4},"rugby_football":{"a":"Rugby Football","b":"1F3C9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","team"],"k":[10,27]},"open_mouth":{"a":"Face with Open Mouth","b":"1F62E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","surprise","impressed","wow","whoa",":O"],"k":[31,18],"l":[":o",":-o",":O",":-O"]},"school":{"a":"School","b":"1F3EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","student","education","learn","teach"],"k":[12,8]},"tennis":{"a":"Tennis Racquet and Ball","b":"1F3BE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","balls","green"],"k":[9,24]},"camel":{"a":"Bactrian Camel","b":"1F42B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","hot","desert","hump"],"k":[13,21]},"arrow_lower_left":{"a":"South West Arrow","b":"2199-FE0F","c":"2199","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","diagonal","southwest"],"k":[46,38],"o":1},"hushed":{"a":"Hushed Face","b":"1F62F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","woo","shh"],"k":[31,19]},"8ball":{"a":"Billiards","b":"1F3B1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["pool","hobby","game","luck","magic"],"k":[9,11]},"arrow_left":{"a":"Leftwards Black Arrow","b":"2B05-FE0F","c":"2B05","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","previous","back"],"k":[50,17],"o":4},"department_store":{"a":"Department Store","b":"1F3EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","shopping","mall"],"k":[12,9]},"arrow_upper_left":{"a":"North West Arrow","b":"2196-FE0F","c":"2196","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","point","direction","diagonal","northwest"],"k":[46,35],"o":1},"sleepy":{"a":"Sleepy Face","b":"1F62A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","tired","rest","nap"],"k":[31,14]},"bowling":{"a":"Bowling","b":"1F3B3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","fun","play"],"k":[9,13]},"factory":{"a":"Factory","b":"1F3ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","industry","pollution","smoke"],"k":[12,10]},"elephant":{"a":"Elephant","b":"1F418","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","nose","th","circus"],"k":[13,2]},"arrow_up_down":{"a":"Up Down Arrow","b":"2195-FE0F","c":"2195","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","way","vertical"],"k":[46,34],"o":1},"tired_face":{"a":"Tired Face","b":"1F62B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sick","whine","upset","frustrated"],"k":[31,15]},"japanese_castle":{"a":"Japanese Castle","b":"1F3EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","building"],"k":[12,12]},"sleeping":{"a":"Sleeping Face","b":"1F634","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","tired","sleepy","night","zzz"],"k":[31,24]},"left_right_arrow":{"a":"Left Right Arrow","b":"2194-FE0F","c":"2194","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","direction","horizontal","sideways"],"k":[46,33],"o":1},"european_castle":{"a":"European Castle","b":"1F3F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","royalty","history"],"k":[12,13]},"mouse":{"a":"Mouse Face","b":"1F42D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","cheese_wedge","rodent"],"k":[13,23]},"mouse2":{"a":"Mouse","b":"1F401","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","rodent"],"k":[12,31]},"leftwards_arrow_with_hook":{"a":"Leftwards Arrow with Hook","b":"21A9-FE0F","c":"21A9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["back","return","blue-square","undo","enter"],"k":[46,39],"o":1},"relieved":{"a":"Relieved Face","b":"1F60C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","relaxed","phew","massage","happiness"],"k":[30,36]},"wedding":{"a":"Wedding","b":"1F492","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","couple","marriage","bride","groom"],"k":[24,44]},"tokyo_tower":{"a":"Tokyo Tower","b":"1F5FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","japanese"],"k":[30,20]},"arrow_right_hook":{"a":"Rightwards Arrow with Hook","b":"21AA-FE0F","c":"21AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","return","rotate","direction"],"k":[46,40],"o":1},"stuck_out_tongue":{"a":"Face with Stuck-out Tongue","b":"1F61B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","prank","childish","playful","mischievous","smile","tongue"],"k":[30,51],"l":[":p",":-p",":P",":-P",":b",":-b"],"m":":p"},"rat":{"a":"Rat","b":"1F400","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","mouse","rodent"],"k":[12,30]},"stuck_out_tongue_winking_eye":{"a":"Face with Stuck-out Tongue and Winking Eye","b":"1F61C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","prank","childish","playful","mischievous","smile","wink","tongue"],"k":[31,0],"l":[";p",";-p",";b",";-b",";P",";-P"],"m":";p"},"statue_of_liberty":{"a":"Statue of Liberty","b":"1F5FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["american","newyork"],"k":[30,21]},"arrow_heading_up":{"a":"Arrow Pointing Rightwards Then Curving Upwards","b":"2934-FE0F","c":"2934","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","top"],"k":[50,15],"o":3},"hamster":{"a":"Hamster Face","b":"1F439","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,35]},"stuck_out_tongue_closed_eyes":{"a":"Face with Stuck-out Tongue and Tightly-Closed Eyes","b":"1F61D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","prank","playful","mischievous","smile","tongue"],"k":[31,1]},"arrow_heading_down":{"a":"Arrow Pointing Rightwards Then Curving Downwards","b":"2935-FE0F","c":"2935","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","bottom"],"k":[50,16],"o":3},"rabbit":{"a":"Rabbit Face","b":"1F430","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","pet","spring","magic","bunny"],"k":[13,26]},"church":{"a":"Church","b":"26EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","religion","christ"],"k":[48,37],"o":5},"rabbit2":{"a":"Rabbit","b":"1F407","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","pet","magic","spring"],"k":[12,37]},"arrows_clockwise":{"a":"Clockwise Downwards and Upwards Open Circle Arrows","b":"1F503","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sync","cycle","round","repeat"],"k":[27,5]},"arrows_counterclockwise":{"a":"Anticlockwise Downwards and Upwards Open Circle Arrows","b":"1F504","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","sync","cycle"],"k":[27,6]},"unamused":{"a":"Unamused Face","b":"1F612","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["indifference","bored","straight face","serious","sarcasm","unimpressed","skeptical","dubious","side_eye"],"k":[30,42],"m":":("},"dart":{"a":"Direct Hit","b":"1F3AF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["game","play","bar","target","bullseye"],"k":[9,9]},"back":{"a":"Back with Leftwards Arrow Above","b":"1F519","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arrow","words","return"],"k":[27,27]},"sweat":{"a":"Face with Cold Sweat","b":"1F613","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","hot","sad","tired","exercise"],"k":[30,43]},"pensive":{"a":"Pensive Face","b":"1F614","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","sad","depressed","upset"],"k":[30,44]},"golf":{"a":"Flag in Hole","b":"26F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","business","flag","hole","summer"],"k":[48,41],"o":5},"end":{"a":"End with Leftwards Arrow Above","b":"1F51A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["words","arrow"],"k":[27,28]},"bear":{"a":"Bear Face","b":"1F43B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","wild"],"k":[13,37]},"fountain":{"a":"Fountain","b":"26F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","summer","water","fresh"],"k":[48,40],"o":5},"confused":{"a":"Confused Face","b":"1F615","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","indifference","huh","weird","hmmm",":/"],"k":[30,45],"l":[":\\",":-\\",":/",":-/"]},"on":{"a":"On with Exclamation Mark with Left Right Arrow Above","b":"1F51B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arrow","words"],"k":[27,29]},"soon":{"a":"Soon with Rightwards Arrow Above","b":"1F51C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arrow","words"],"k":[27,30]},"fishing_pole_and_fish":{"a":"Fishing Pole and Fish","b":"1F3A3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","hobby","summer"],"k":[8,49]},"tent":{"a":"Tent","b":"26FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","camping","outdoors"],"k":[49,12],"o":5},"koala":{"a":"Koala","b":"1F428","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,18]},"foggy":{"a":"Foggy","b":"1F301","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","mountain"],"k":[5,45]},"panda_face":{"a":"Panda Face","b":"1F43C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","panda"],"k":[13,38]},"top":{"a":"Top with Upwards Arrow Above","b":"1F51D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["words","blue-square"],"k":[27,31]},"running_shirt_with_sash":{"a":"Running Shirt with Sash","b":"1F3BD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["play","pageant"],"k":[9,23]},"astonished":{"a":"Astonished Face","b":"1F632","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","xox","surprised","poisoned"],"k":[31,22]},"feet":{"a":"Paw Prints","b":"1F43E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[13,40],"n":["paw_prints"]},"night_with_stars":{"a":"Night with Stars","b":"1F303","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["evening","city","downtown"],"k":[5,47]},"ski":{"a":"Ski and Ski Boot","b":"1F3BF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","winter","cold","snow"],"k":[9,25]},"sunrise_over_mountains":{"a":"Sunrise over Mountains","b":"1F304","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["view","vacation","photo"],"k":[5,48]},"sunrise":{"a":"Sunrise","b":"1F305","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["morning","view","vacation","photo"],"k":[5,49]},"chicken":{"a":"Chicken","b":"1F414","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cluck","nature","bird"],"k":[12,50]},"video_game":{"a":"Video Game","b":"1F3AE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["play","console","PS4","controller"],"k":[9,8]},"rooster":{"a":"Rooster","b":"1F413","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","chicken"],"k":[12,49]},"city_sunset":{"a":"Cityscape at Dusk","b":"1F306","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","evening","sky","buildings"],"k":[5,50]},"confounded":{"a":"Confounded Face","b":"1F616","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","confused","sick","unwell","oops",":S"],"k":[30,46]},"city_sunrise":{"a":"Sunset over Buildings","b":"1F307","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","good morning","dawn"],"k":[5,51]},"disappointed":{"a":"Disappointed Face","b":"1F61E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","sad","upset","depressed",":("],"k":[31,2],"l":["):",":(",":-("],"m":":("},"hatching_chick":{"a":"Hatching Chick","b":"1F423","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","chicken","egg","born","baby","bird"],"k":[13,13]},"worried":{"a":"Worried Face","b":"1F61F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","concern","nervous",":("],"k":[31,3]},"baby_chick":{"a":"Baby Chick","b":"1F424","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","chicken","bird"],"k":[13,14]},"game_die":{"a":"Game Die","b":"1F3B2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dice","random","tabletop","play","luck"],"k":[9,12]},"bridge_at_night":{"a":"Bridge at Night","b":"1F309","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","sanfrancisco"],"k":[6,1]},"spades":{"a":"Black Spade Suit","b":"2660-FE0F","c":"2660","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","suits","magic"],"k":[48,4],"o":1},"hatched_chick":{"a":"Front-Facing Baby Chick","b":"1F425","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","chicken","baby","bird"],"k":[13,15]},"triumph":{"a":"Face with Look of Triumph","b":"1F624","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","gas","phew","proud","pride"],"k":[31,8]},"hotsprings":{"a":"Hot Springs","b":"2668-FE0F","c":"2668","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bath","warm","relax"],"k":[48,8],"o":1},"cry":{"a":"Crying Face","b":"1F622","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","tears","sad","depressed","upset",":'("],"k":[31,6],"l":[":'("],"m":":'("},"bird":{"a":"Bird","b":"1F426","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","fly","tweet","spring"],"k":[13,16]},"cn":{"a":"China Flag","b":"1F1E8-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["china","chinese","prc","flag","country","nation","banner"],"k":[1,27],"n":["flag-cn"]},"hearts":{"a":"Black Heart Suit","b":"2665-FE0F","c":"2665","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","magic","suits"],"k":[48,6],"o":1},"milky_way":{"a":"Milky Way","b":"1F30C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","space","stars"],"k":[6,4]},"carousel_horse":{"a":"Carousel Horse","b":"1F3A0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","carnival"],"k":[8,46]},"sob":{"a":"Loudly Crying Face","b":"1F62D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","cry","tears","sad","upset","depressed"],"k":[31,17],"m":":'("},"diamonds":{"a":"Black Diamond Suit","b":"2666-FE0F","c":"2666","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","magic","suits"],"k":[48,7],"o":1},"penguin":{"a":"Penguin","b":"1F427","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,17]},"ferris_wheel":{"a":"Ferris Wheel","b":"1F3A1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","carnival","londoneye"],"k":[8,47]},"clubs":{"a":"Black Club Suit","b":"2663-FE0F","c":"2663","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","magic","suits"],"k":[48,5],"o":1},"frowning":{"a":"Frowning Face with Open Mouth","b":"1F626","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","aw","what"],"k":[31,10]},"roller_coaster":{"a":"Roller Coaster","b":"1F3A2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["carnival","playground","photo","fun"],"k":[8,48]},"black_joker":{"a":"Playing Card Black Joker","b":"1F0CF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","game","play","magic"],"k":[0,15]},"anguished":{"a":"Anguished Face","b":"1F627","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","stunned","nervous"],"k":[31,11],"l":["D:"]},"barber":{"a":"Barber Pole","b":"1F488","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hair","salon","style"],"k":[24,34]},"six_pointed_star":{"a":"Six Pointed Star with Middle Dot","b":"1F52F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","religion","jewish","hexagram"],"k":[27,49]},"mahjong":{"a":"Mahjong Tile Red Dragon","b":"1F004","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["game","play","chinese","kanji"],"k":[0,14],"o":5},"fearful":{"a":"Fearful Face","b":"1F628","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","scared","terrified","nervous","oops","huh"],"k":[31,12]},"aries":{"a":"Aries","b":"2648","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","zodiac","astrology"],"k":[47,44],"o":1},"circus_tent":{"a":"Circus Tent","b":"1F3AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["festival","carnival","party"],"k":[9,4]},"weary":{"a":"Weary Face","b":"1F629","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","tired","sleepy","sad","frustrated","upset"],"k":[31,13]},"flower_playing_cards":{"a":"Flower Playing Cards","b":"1F3B4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["game","sunset","red"],"k":[9,14]},"performing_arts":{"a":"Performing Arts","b":"1F3AD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["acting","theater","drama"],"k":[9,7]},"frog":{"a":"Frog Face","b":"1F438","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","croak","toad"],"k":[13,34]},"taurus":{"a":"Taurus","b":"2649","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","sign","zodiac","astrology"],"k":[47,45],"o":1},"gemini":{"a":"Gemini","b":"264A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[47,46],"o":1},"grimacing":{"a":"Grimacing Face","b":"1F62C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","grimace","teeth"],"k":[31,16]},"crocodile":{"a":"Crocodile","b":"1F40A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","reptile","lizard","alligator"],"k":[12,40]},"turtle":{"a":"Turtle","b":"1F422","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","slow","nature","tortoise"],"k":[13,12]},"art":{"a":"Artist Palette","b":"1F3A8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["design","paint","draw","colors"],"k":[9,2]},"cold_sweat":{"a":"Face with Open Mouth and Cold Sweat","b":"1F630","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","nervous","sweat"],"k":[31,20]},"cancer":{"a":"Cancer","b":"264B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[47,47],"o":1},"slot_machine":{"a":"Slot Machine","b":"1F3B0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bet","gamble","vegas","fruit machine","luck","casino"],"k":[9,10]},"scream":{"a":"Face Screaming in Fear","b":"1F631","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","munch","scared","omg"],"k":[31,21]},"leo":{"a":"Leo","b":"264C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","zodiac","astrology"],"k":[47,48],"o":1},"virgo":{"a":"Virgo","b":"264D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[47,49],"o":1},"steam_locomotive":{"a":"Steam Locomotive","b":"1F682","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","train"],"k":[34,10]},"de":{"a":"Germany Flag","b":"1F1E9-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["german","nation","flag","country","banner"],"k":[1,37],"n":["flag-de"]},"flushed":{"a":"Flushed Face","b":"1F633","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","blush","shy","flattered"],"k":[31,23]},"snake":{"a":"Snake","b":"1F40D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","evil","nature","hiss","python"],"k":[12,43]},"railway_car":{"a":"Railway Car","b":"1F683","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,11]},"libra":{"a":"Libra","b":"264E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","zodiac","astrology"],"k":[47,50],"o":1},"dragon_face":{"a":"Dragon Face","b":"1F432","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","myth","nature","chinese","green"],"k":[13,28]},"dragon":{"a":"Dragon","b":"1F409","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","myth","nature","chinese","green"],"k":[12,39]},"dizzy_face":{"a":"Dizzy Face","b":"1F635","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["spent","unconscious","xox","dizzy"],"k":[31,25]},"scorpius":{"a":"Scorpius","b":"264F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology","scorpio"],"k":[47,51],"o":1},"bullettrain_side":{"a":"High-Speed Train","b":"1F684","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,12]},"bullettrain_front":{"a":"High-Speed Train with Bullet Nose","b":"1F685","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","speed","fast","public","travel"],"k":[34,13]},"sagittarius":{"a":"Sagittarius","b":"2650","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[48,0],"o":1},"rage":{"a":"Pouting Face","b":"1F621","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["angry","mad","hate","despise"],"k":[31,5]},"angry":{"a":"Angry Face","b":"1F620","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mad","face","annoyed","frustrated"],"k":[31,4],"l":[">:(",">:-("]},"capricorn":{"a":"Capricorn","b":"2651","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[48,1],"o":1},"train2":{"a":"Train","b":"1F686","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,14]},"whale":{"a":"Spouting Whale","b":"1F433","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","sea","ocean"],"k":[13,29]},"metro":{"a":"Metro","b":"1F687","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","blue-square","mrt","underground","tube"],"k":[34,15]},"aquarius":{"a":"Aquarius","b":"2652","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","zodiac","astrology"],"k":[48,2],"o":1},"whale2":{"a":"Whale","b":"1F40B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","sea","ocean"],"k":[12,41]},"mask":{"a":"Face with Medical Mask","b":"1F637","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","sick","ill","disease"],"k":[31,27]},"pisces":{"a":"Pisces","b":"2653","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","sign","zodiac","astrology"],"k":[48,3],"o":1},"light_rail":{"a":"Light Rail","b":"1F688","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,16]},"dolphin":{"a":"Dolphin","b":"1F42C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","fish","sea","ocean","flipper","fins","beach"],"k":[13,22],"n":["flipper"]},"ophiuchus":{"a":"Ophiuchus","b":"26CE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","constellation","astrology"],"k":[48,31]},"station":{"a":"Station","b":"1F689","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","public"],"k":[34,17]},"fish":{"a":"Fish","b":"1F41F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","food","nature"],"k":[13,9]},"tram":{"a":"Tram","b":"1F68A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,18]},"twisted_rightwards_arrows":{"a":"Twisted Rightwards Arrows","b":"1F500","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","shuffle","music","random"],"k":[27,2]},"monorail":{"a":"Monorail","b":"1F69D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,37]},"tropical_fish":{"a":"Tropical Fish","b":"1F420","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","swim","ocean","beach","nemo"],"k":[13,10]},"repeat":{"a":"Clockwise Rightwards and Leftwards Open Circle Arrows","b":"1F501","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["loop","record"],"k":[27,3]},"repeat_one":{"a":"Clockwise Rightwards and Leftwards Open Circle Arrows with Circled One Overlay","b":"1F502","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","loop"],"k":[27,4]},"mountain_railway":{"a":"Mountain Railway","b":"1F69E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,38]},"blowfish":{"a":"Blowfish","b":"1F421","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","food","sea","ocean"],"k":[13,11]},"arrow_forward":{"a":"Black Right-Pointing Triangle","b":"25B6-FE0F","c":"25B6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","right","direction","play"],"k":[47,10],"o":1},"train":{"a":"Tram Car","b":"1F68B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","carriage","public","travel"],"k":[34,19]},"bus":{"a":"Bus","b":"1F68C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["car","vehicle","transportation"],"k":[34,20]},"innocent":{"a":"Smiling Face with Halo","b":"1F607","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","angel","heaven","halo"],"k":[30,31]},"fast_forward":{"a":"Black Right-Pointing Double Triangle","b":"23E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","play","speed","continue"],"k":[46,45]},"octopus":{"a":"Octopus","b":"1F419","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","creature","ocean","sea","nature","beach"],"k":[13,3]},"oncoming_bus":{"a":"Oncoming Bus","b":"1F68D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","transportation"],"k":[34,21]},"shell":{"a":"Spiral Shell","b":"1F41A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","sea","beach"],"k":[13,4]},"es":{"a":"Spain Flag","b":"1F1EA-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["spain","flag","nation","country","banner"],"k":[1,50],"n":["flag-es"]},"trolleybus":{"a":"Trolleybus","b":"1F68E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bart","transportation","vehicle"],"k":[34,22]},"arrow_backward":{"a":"Black Left-Pointing Triangle","b":"25C0-FE0F","c":"25C0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","left","direction"],"k":[47,11],"o":1},"minibus":{"a":"Minibus","b":"1F690","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","car","transportation"],"k":[34,24]},"ambulance":{"a":"Ambulance","b":"1F691","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["health","911","hospital"],"k":[34,25]},"rewind":{"a":"Black Left-Pointing Double Triangle","b":"23EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["play","blue-square"],"k":[46,46]},"snail":{"a":"Snail","b":"1F40C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["slow","animal","shell"],"k":[12,42]},"fire_engine":{"a":"Fire Engine","b":"1F692","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","cars","vehicle"],"k":[34,26]},"police_car":{"a":"Police Car","b":"1F693","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","cars","transportation","law","legal","enforcement"],"k":[34,27]},"arrow_up_small":{"a":"Up-Pointing Small Red Triangle","b":"1F53C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","triangle","direction","point","forward","top"],"k":[28,10]},"oncoming_police_car":{"a":"Oncoming Police Car","b":"1F694","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","law","legal","enforcement","911"],"k":[34,28]},"bug":{"a":"Bug","b":"1F41B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","insect","nature","worm"],"k":[13,5]},"arrow_double_up":{"a":"Black Up-Pointing Double Triangle","b":"23EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","top"],"k":[46,47]},"ant":{"a":"Ant","b":"1F41C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","insect","nature","bug"],"k":[13,6]},"arrow_down_small":{"a":"Down-Pointing Small Red Triangle","b":"1F53D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","bottom"],"k":[28,11]},"smiling_imp":{"a":"Smiling Face with Horns","b":"1F608","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["devil","horns"],"k":[30,32]},"taxi":{"a":"Taxi","b":"1F695","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["uber","vehicle","cars","transportation"],"k":[34,29]},"fr":{"a":"France Flag","b":"1F1EB-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["banner","flag","nation","france","french","country"],"k":[2,6],"n":["flag-fr"]},"oncoming_taxi":{"a":"Oncoming Taxi","b":"1F696","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","cars","uber"],"k":[34,30]},"arrow_double_down":{"a":"Black Down-Pointing Double Triangle","b":"23EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","bottom"],"k":[46,48]},"imp":{"a":"Imp","b":"1F47F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["devil","angry","horns"],"k":[22,51]},"bee":{"a":"Honeybee","b":"1F41D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[13,7],"n":["honeybee"]},"car":{"a":"Automobile","b":"1F697","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[34,31],"n":["red_car"]},"beetle":{"a":"Lady Beetle","b":"1F41E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","insect","nature","ladybug"],"k":[13,8]},"japanese_ogre":{"a":"Japanese Ogre","b":"1F479","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["monster","red","mask","halloween","scary","creepy","devil","demon","japanese","ogre"],"k":[22,40]},"japanese_goblin":{"a":"Japanese Goblin","b":"1F47A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["red","evil","mask","monster","scary","creepy","japanese","goblin"],"k":[22,41]},"oncoming_automobile":{"a":"Oncoming Automobile","b":"1F698","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["car","vehicle","transportation"],"k":[34,32]},"gb":{"a":"United Kingdom Flag","b":"1F1EC-1F1E7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,8],"n":["uk","flag-gb"]},"blue_car":{"a":"Recreational Vehicle","b":"1F699","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,33]},"skull":{"a":"Skull","b":"1F480","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dead","skeleton","creepy","death"],"k":[23,0]},"truck":{"a":"Delivery Truck","b":"1F69A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cars","transportation"],"k":[34,34]},"cinema":{"a":"Cinema","b":"1F3A6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","record","film","movie","curtain","stage","theater"],"k":[9,0]},"articulated_lorry":{"a":"Articulated Lorry","b":"1F69B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","cars","transportation","express"],"k":[34,35]},"ghost":{"a":"Ghost","b":"1F47B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["halloween","spooky","scary"],"k":[22,42]},"bouquet":{"a":"Bouquet","b":"1F490","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["flowers","nature","spring"],"k":[24,42]},"tractor":{"a":"Tractor","b":"1F69C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","car","farming","agriculture"],"k":[34,36]},"low_brightness":{"a":"Low Brightness Symbol","b":"1F505","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sun","afternoon","warm","summer"],"k":[27,7]},"alien":{"a":"Extraterrestrial Alien","b":"1F47D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["UFO","paul","weird","outer_space"],"k":[22,49]},"cherry_blossom":{"a":"Cherry Blossom","b":"1F338","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","spring","flower"],"k":[6,46]},"bike":{"a":"Bicycle","b":"1F6B2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","bicycle","exercise","hipster"],"k":[35,23]},"space_invader":{"a":"Alien Monster","b":"1F47E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["game","arcade","play"],"k":[22,50]},"high_brightness":{"a":"High Brightness Symbol","b":"1F506","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sun","light"],"k":[27,8]},"white_flower":{"a":"White Flower","b":"1F4AE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","spring"],"k":[25,25]},"signal_strength":{"a":"Antenna with Bars","b":"1F4F6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","reception","phone","internet","connection","wifi","bluetooth","bars"],"k":[26,45]},"vibration_mode":{"a":"Vibration Mode","b":"1F4F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["orange-square","phone"],"k":[26,42]},"hankey":{"a":"Pile of Poo","b":"1F4A9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[25,15],"n":["poop","shit"]},"mobile_phone_off":{"a":"Mobile Phone off","b":"1F4F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mute","orange-square","silence","quiet"],"k":[26,43]},"busstop":{"a":"Bus Stop","b":"1F68F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","wait"],"k":[34,23]},"smiley_cat":{"a":"Smiling Cat Face with Open Mouth","b":"1F63A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","happy","smile"],"k":[31,30]},"rose":{"a":"Rose","b":"1F339","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["flowers","valentines","love","spring"],"k":[6,47]},"smile_cat":{"a":"Grinning Cat Face with Smiling Eyes","b":"1F638","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","smile"],"k":[31,28]},"hibiscus":{"a":"Hibiscus","b":"1F33A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","vegetable","flowers","beach"],"k":[6,48]},"joy_cat":{"a":"Cat Face with Tears of Joy","b":"1F639","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","haha","happy","tears"],"k":[31,29]},"fuelpump":{"a":"Fuel Pump","b":"26FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["gas station","petroleum"],"k":[49,13],"o":5},"sunflower":{"a":"Sunflower","b":"1F33B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","fall"],"k":[6,49]},"heart_eyes_cat":{"a":"Smiling Cat Face with Heart-Shaped Eyes","b":"1F63B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","love","like","affection","cats","valentines","heart"],"k":[31,31]},"recycle":{"a":"Black Universal Recycling Symbol","b":"267B-FE0F","c":"267B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arrow","environment","garbage","trash"],"k":[48,9],"o":3},"blossom":{"a":"Blossom","b":"1F33C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","flowers","yellow"],"k":[6,50]},"rotating_light":{"a":"Police Cars Revolving Light","b":"1F6A8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["police","ambulance","911","emergency","alert","error","pinged","law","legal"],"k":[35,13]},"smirk_cat":{"a":"Cat Face with Wry Smile","b":"1F63C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","smirk"],"k":[31,32]},"kissing_cat":{"a":"Kissing Cat Face with Closed Eyes","b":"1F63D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","kiss"],"k":[31,33]},"traffic_light":{"a":"Horizontal Traffic Light","b":"1F6A5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","signal"],"k":[35,10]},"tulip":{"a":"Tulip","b":"1F337","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["flowers","plant","nature","summer","spring"],"k":[6,45]},"seedling":{"a":"Seedling","b":"1F331","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature","grass","lawn","spring"],"k":[6,39]},"scream_cat":{"a":"Weary Cat Face","b":"1F640","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","munch","scared","scream"],"k":[31,36]},"vertical_traffic_light":{"a":"Vertical Traffic Light","b":"1F6A6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","driving"],"k":[35,11]},"trident":{"a":"Trident Emblem","b":"1F531","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weapon","spear"],"k":[27,51]},"name_badge":{"a":"Name Badge","b":"1F4DB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fire","forbid"],"k":[26,18]},"construction":{"a":"Construction Sign","b":"1F6A7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["wip","progress","caution","warning"],"k":[35,12]},"evergreen_tree":{"a":"Evergreen Tree","b":"1F332","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature"],"k":[6,40]},"crying_cat_face":{"a":"Crying Cat Face","b":"1F63F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","tears","weep","sad","cats","upset","cry"],"k":[31,35]},"pouting_cat":{"a":"Pouting Cat Face","b":"1F63E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats"],"k":[31,34]},"deciduous_tree":{"a":"Deciduous Tree","b":"1F333","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature"],"k":[6,41]},"beginner":{"a":"Japanese Symbol for Beginner","b":"1F530","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["badge","shield"],"k":[27,50]},"o":{"a":"Heavy Large Circle","b":"2B55","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["circle","round"],"k":[50,23],"o":5},"palm_tree":{"a":"Palm Tree","b":"1F334","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","vegetable","nature","summer","beach","mojito","tropical"],"k":[6,42]},"anchor":{"a":"Anchor","b":"2693","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ship","ferry","sea","boat"],"k":[48,12],"o":4},"see_no_evil":{"a":"See-No-Evil Monkey","b":"1F648","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["monkey","animal","nature","haha"],"k":[32,43]},"boat":{"a":"Sailboat","b":"26F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[48,43],"n":["sailboat"],"o":5},"white_check_mark":{"a":"White Heavy Check Mark","b":"2705","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["green-square","ok","agree","vote","election","answer","tick"],"k":[49,15]},"hear_no_evil":{"a":"Hear-No-Evil Monkey","b":"1F649","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","monkey","nature"],"k":[32,44]},"cactus":{"a":"Cactus","b":"1F335","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vegetable","plant","nature"],"k":[6,43]},"ear_of_rice":{"a":"Ear of Rice","b":"1F33E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant"],"k":[7,0]},"speak_no_evil":{"a":"Speak-No-Evil Monkey","b":"1F64A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["monkey","animal","nature","omg"],"k":[32,45]},"ballot_box_with_check":{"a":"Ballot Box with Check","b":"2611-FE0F","c":"2611","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ok","agree","confirm","black-square","vote","election","yes","tick"],"k":[47,22],"o":1},"herb":{"a":"Herb","b":"1F33F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vegetable","plant","medicine","weed","grass","lawn"],"k":[7,1]},"heavy_check_mark":{"a":"Heavy Check Mark","b":"2714-FE0F","c":"2714","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ok","nike","answer","yes","tick"],"k":[49,44],"o":1},"speedboat":{"a":"Speedboat","b":"1F6A4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ship","transportation","vehicle","summer"],"k":[35,9]},"baby":{"skin_variations":{"1F3FB":{"unified":"1F476-1F3FB","non_qualified":null,"image":"1f476-1f3fb.png","sheet_x":22,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F476-1F3FC","non_qualified":null,"image":"1f476-1f3fc.png","sheet_x":22,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F476-1F3FD","non_qualified":null,"image":"1f476-1f3fd.png","sheet_x":22,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F476-1F3FE","non_qualified":null,"image":"1f476-1f3fe.png","sheet_x":22,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F476-1F3FF","non_qualified":null,"image":"1f476-1f3ff.png","sheet_x":22,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Baby","b":"1F476","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["child","boy","girl","toddler"],"k":[22,10]},"heavy_multiplication_x":{"a":"Heavy Multiplication X","b":"2716-FE0F","c":"2716","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["math","calculation"],"k":[49,45],"o":1},"x":{"a":"Cross Mark","b":"274C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["no","delete","remove","cancel"],"k":[50,1]},"four_leaf_clover":{"a":"Four Leaf Clover","b":"1F340","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vegetable","plant","nature","lucky","irish"],"k":[7,2]},"boy":{"skin_variations":{"1F3FB":{"unified":"1F466-1F3FB","non_qualified":null,"image":"1f466-1f3fb.png","sheet_x":15,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F466-1F3FC","non_qualified":null,"image":"1f466-1f3fc.png","sheet_x":15,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F466-1F3FD","non_qualified":null,"image":"1f466-1f3fd.png","sheet_x":15,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F466-1F3FE","non_qualified":null,"image":"1f466-1f3fe.png","sheet_x":15,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F466-1F3FF","non_qualified":null,"image":"1f466-1f3ff.png","sheet_x":15,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Boy","b":"1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["man","male","guy","teenager"],"k":[15,42]},"girl":{"skin_variations":{"1F3FB":{"unified":"1F467-1F3FB","non_qualified":null,"image":"1f467-1f3fb.png","sheet_x":15,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F467-1F3FC","non_qualified":null,"image":"1f467-1f3fc.png","sheet_x":15,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F467-1F3FD","non_qualified":null,"image":"1f467-1f3fd.png","sheet_x":15,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F467-1F3FE","non_qualified":null,"image":"1f467-1f3fe.png","sheet_x":16,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F467-1F3FF","non_qualified":null,"image":"1f467-1f3ff.png","sheet_x":16,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Girl","b":"1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["female","woman","teenager"],"k":[15,48]},"negative_squared_cross_mark":{"a":"Negative Squared Cross Mark","b":"274E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["x","green-square","no","deny"],"k":[50,2]},"maple_leaf":{"a":"Maple Leaf","b":"1F341","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","vegetable","ca","fall"],"k":[7,3]},"fallen_leaf":{"a":"Fallen Leaf","b":"1F342","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","vegetable","leaves"],"k":[7,4]},"ship":{"a":"Ship","b":"1F6A2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","titanic","deploy"],"k":[34,42]},"heavy_plus_sign":{"a":"Heavy Plus Sign","b":"2795","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["math","calculation","addition","more","increase"],"k":[50,9]},"man":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB","non_qualified":null,"image":"1f468-1f3fb.png","sheet_x":18,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F468-1F3FC","non_qualified":null,"image":"1f468-1f3fc.png","sheet_x":18,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F468-1F3FD","non_qualified":null,"image":"1f468-1f3fd.png","sheet_x":18,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F468-1F3FE","non_qualified":null,"image":"1f468-1f3fe.png","sheet_x":18,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F468-1F3FF","non_qualified":null,"image":"1f468-1f3ff.png","sheet_x":18,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Man","b":"1F468","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mustache","father","dad","guy","classy","sir","moustache"],"k":[18,11]},"leaves":{"a":"Leaf Fluttering in Wind","b":"1F343","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","tree","vegetable","grass","lawn","spring"],"k":[7,5]},"heavy_minus_sign":{"a":"Heavy Minus Sign","b":"2796","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["math","calculation","subtract","less"],"k":[50,10]},"airplane":{"a":"Airplane","b":"2708-FE0F","c":"2708","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","transportation","flight","fly"],"k":[49,16],"o":1},"heavy_division_sign":{"a":"Heavy Division Sign","b":"2797","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["divide","math","calculation"],"k":[50,11]},"woman":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB","non_qualified":null,"image":"1f469-1f3fb.png","sheet_x":20,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F469-1F3FC","non_qualified":null,"image":"1f469-1f3fc.png","sheet_x":20,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F469-1F3FD","non_qualified":null,"image":"1f469-1f3fd.png","sheet_x":20,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F469-1F3FE","non_qualified":null,"image":"1f469-1f3fe.png","sheet_x":20,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F469-1F3FF","non_qualified":null,"image":"1f469-1f3ff.png","sheet_x":20,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Woman","b":"1F469","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["female","girls","lady"],"k":[20,23]},"curly_loop":{"a":"Curly Loop","b":"27B0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["scribble","draw","shape","squiggle"],"k":[50,13]},"loop":{"a":"Double Curly Loop","b":"27BF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["tape","cassette"],"k":[50,14]},"older_man":{"skin_variations":{"1F3FB":{"unified":"1F474-1F3FB","non_qualified":null,"image":"1f474-1f3fb.png","sheet_x":21,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F474-1F3FC","non_qualified":null,"image":"1f474-1f3fc.png","sheet_x":22,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F474-1F3FD","non_qualified":null,"image":"1f474-1f3fd.png","sheet_x":22,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F474-1F3FE","non_qualified":null,"image":"1f474-1f3fe.png","sheet_x":22,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F474-1F3FF","non_qualified":null,"image":"1f474-1f3ff.png","sheet_x":22,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Older Man","b":"1F474","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["human","male","men","old","elder","senior"],"k":[21,50]},"part_alternation_mark":{"a":"Part Alternation Mark","b":"303D-FE0F","c":"303D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["graph","presentation","stats","business","economics","bad"],"k":[50,25],"o":3},"seat":{"a":"Seat","b":"1F4BA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sit","airplane","transport","bus","flight","fly"],"k":[25,37]},"older_woman":{"skin_variations":{"1F3FB":{"unified":"1F475-1F3FB","non_qualified":null,"image":"1f475-1f3fb.png","sheet_x":22,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F475-1F3FC","non_qualified":null,"image":"1f475-1f3fc.png","sheet_x":22,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F475-1F3FD","non_qualified":null,"image":"1f475-1f3fd.png","sheet_x":22,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F475-1F3FE","non_qualified":null,"image":"1f475-1f3fe.png","sheet_x":22,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F475-1F3FF","non_qualified":null,"image":"1f475-1f3ff.png","sheet_x":22,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Older Woman","b":"1F475","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["human","female","women","lady","old","elder","senior"],"k":[22,4]},"eight_spoked_asterisk":{"a":"Eight Spoked Asterisk","b":"2733-FE0F","c":"2733","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["star","sparkle","green-square"],"k":[49,49],"o":1},"helicopter":{"a":"Helicopter","b":"1F681","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","fly"],"k":[34,9]},"suspension_railway":{"a":"Suspension Railway","b":"1F69F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","transportation"],"k":[34,39]},"eight_pointed_black_star":{"a":"Eight Pointed Black Star","b":"2734-FE0F","c":"2734","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["orange-square","shape","polygon"],"k":[49,50],"o":1},"mountain_cableway":{"a":"Mountain Cableway","b":"1F6A0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","ski"],"k":[34,40]},"sparkle":{"a":"Sparkle","b":"2747-FE0F","c":"2747","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stars","green-square","awesome","good","fireworks"],"k":[50,0],"o":1},"aerial_tramway":{"a":"Aerial Tramway","b":"1F6A1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","ski"],"k":[34,41]},"bangbang":{"a":"Double Exclamation Mark","b":"203C-FE0F","c":"203C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["exclamation","surprise"],"k":[46,29],"o":1},"interrobang":{"a":"Exclamation Question Mark","b":"2049-FE0F","c":"2049","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["wat","punctuation","surprise"],"k":[46,30],"o":3},"satellite":{"a":"Satellite","b":"1F6F0-FE0F","c":"1F6F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["communication","future","radio","space"],"k":[37,17],"o":7},"it":{"a":"Italy Flag","b":"1F1EE-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["italy","flag","nation","country","banner"],"k":[2,42],"n":["flag-it"]},"question":{"a":"Black Question Mark Ornament","b":"2753","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["doubt","confused"],"k":[50,3]},"rocket":{"a":"Rocket","b":"1F680","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["launch","ship","staffmode","NASA","outer space","outer_space","fly"],"k":[34,8]},"grey_question":{"a":"White Question Mark Ornament","b":"2754","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["doubts","gray","huh","confused"],"k":[50,4]},"grey_exclamation":{"a":"White Exclamation Mark Ornament","b":"2755","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["surprise","punctuation","gray","wow","warning"],"k":[50,5]},"door":{"a":"Door","b":"1F6AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["house","entry","exit"],"k":[35,15]},"jp":{"a":"Japan Flag","b":"1F1EF-1F1F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","nation","flag","country","banner"],"k":[2,46],"n":["flag-jp"]},"exclamation":{"a":"Heavy Exclamation Mark Symbol","b":"2757","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["heavy_exclamation_mark","danger","surprise","punctuation","wow","warning"],"k":[50,6],"n":["heavy_exclamation_mark"],"o":5},"wavy_dash":{"a":"Wavy Dash","b":"3030-FE0F","c":"3030","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["draw","line","moustache","mustache","squiggle","scribble"],"k":[50,24],"o":1},"copyright":{"a":"Copyright Sign","b":"00A9-FE0F","c":"00A9","d":true,"e":true,"f":false,"g":true,"h":false,"i":false,"j":["ip","license","circle","law","legal"],"k":[0,12],"o":1},"registered":{"a":"Registered Sign","b":"00AE-FE0F","c":"00AE","d":true,"e":true,"f":false,"g":true,"h":false,"i":false,"j":["alphabet","circle"],"k":[0,13],"o":1},"toilet":{"a":"Toilet","b":"1F6BD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["restroom","wc","washroom","bathroom","potty"],"k":[36,33]},"shower":{"a":"Shower","b":"1F6BF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["clean","water","bathroom"],"k":[36,35]},"tm":{"a":"Trade Mark Sign","b":"2122-FE0F","c":"2122","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["trademark","brand","law","legal"],"k":[46,31],"o":1},"hash":{"a":"Hash Key","b":"0023-FE0F-20E3","c":"0023-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["symbol","blue-square","twitter"],"k":[0,0],"o":3},"bathtub":{"a":"Bathtub","b":"1F6C1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["clean","shower","bathroom"],"k":[36,42]},"hourglass":{"a":"Hourglass","b":"231B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","clock","oldschool","limit","exam","quiz","test"],"k":[46,42],"o":1},"zero":{"a":"Keycap 0","b":"0030-FE0F-20E3","c":"0030-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["0","numbers","blue-square","null"],"k":[0,2],"o":3},"hourglass_flowing_sand":{"a":"Hourglass with Flowing Sand","b":"23F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["oldschool","time","countdown"],"k":[47,3]},"one":{"a":"Keycap 1","b":"0031-FE0F-20E3","c":"0031-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["blue-square","numbers","1"],"k":[0,3],"o":3},"kr":{"a":"South Korea Flag","b":"1F1F0-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["south","korea","nation","flag","country","banner"],"k":[3,2],"n":["flag-kr"]},"watch":{"a":"Watch","b":"231A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","accessories"],"k":[46,41],"o":1},"two":{"a":"Keycap 2","b":"0032-FE0F-20E3","c":"0032-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["numbers","2","prime","blue-square"],"k":[0,4],"o":3},"alarm_clock":{"a":"Alarm Clock","b":"23F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","wake"],"k":[47,0]},"three":{"a":"Keycap 3","b":"0033-FE0F-20E3","c":"0033-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["3","numbers","prime","blue-square"],"k":[0,5],"o":3},"four":{"a":"Keycap 4","b":"0034-FE0F-20E3","c":"0034-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["4","numbers","blue-square"],"k":[0,6],"o":3},"five":{"a":"Keycap 5","b":"0035-FE0F-20E3","c":"0035-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["5","numbers","blue-square","prime"],"k":[0,7],"o":3},"clock12":{"a":"Clock Face Twelve Oclock","b":"1F55B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","noon","midnight","midday","late","early","schedule"],"k":[28,29]},"six":{"a":"Keycap 6","b":"0036-FE0F-20E3","c":"0036-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["6","numbers","blue-square"],"k":[0,8],"o":3},"clock1230":{"a":"Clock Face Twelve-Thirty","b":"1F567","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,41]},"seven":{"a":"Keycap 7","b":"0037-FE0F-20E3","c":"0037-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["7","numbers","blue-square","prime"],"k":[0,9],"o":3},"eight":{"a":"Keycap 8","b":"0038-FE0F-20E3","c":"0038-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["8","blue-square","numbers"],"k":[0,10],"o":3},"clock1":{"a":"Clock Face One Oclock","b":"1F550","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,18]},"nine":{"a":"Keycap 9","b":"0039-FE0F-20E3","c":"0039-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["blue-square","numbers","9"],"k":[0,11],"o":3},"clock130":{"a":"Clock Face One-Thirty","b":"1F55C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,30]},"clock2":{"a":"Clock Face Two Oclock","b":"1F551","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,19]},"keycap_ten":{"a":"Keycap Ten","b":"1F51F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["numbers","10","blue-square"],"k":[27,33]},"clock230":{"a":"Clock Face Two-Thirty","b":"1F55D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,31]},"capital_abcd":{"a":"Input Symbol for Latin Capital Letters","b":"1F520","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["alphabet","words","blue-square"],"k":[27,34]},"clock3":{"a":"Clock Face Three Oclock","b":"1F552","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,20]},"abcd":{"a":"Input Symbol for Latin Small Letters","b":"1F521","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","alphabet"],"k":[27,35]},"clock330":{"a":"Clock Face Three-Thirty","b":"1F55E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,32]},"clock4":{"a":"Clock Face Four Oclock","b":"1F553","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,21]},"symbols":{"a":"Input Symbol for Symbols","b":"1F523","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","music","note","ampersand","percent","glyphs","characters"],"k":[27,37]},"clock430":{"a":"Clock Face Four-Thirty","b":"1F55F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,33]},"abc":{"a":"Input Symbol for Latin Letters","b":"1F524","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","alphabet"],"k":[27,38]},"clock5":{"a":"Clock Face Five Oclock","b":"1F554","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,22]},"clock530":{"a":"Clock Face Five-Thirty","b":"1F560","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,34]},"a":{"a":"Negative Squared Latin Capital Letter a","b":"1F170-FE0F","c":"1F170","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["red-square","alphabet","letter"],"k":[0,16]},"cop":{"skin_variations":{"1F3FB":{"unified":"1F46E-1F3FB","non_qualified":null,"image":"1f46e-1f3fb.png","sheet_x":20,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F46E-1F3FC","non_qualified":null,"image":"1f46e-1f3fc.png","sheet_x":20,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F46E-1F3FD","non_qualified":null,"image":"1f46e-1f3fd.png","sheet_x":20,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F46E-1F3FE","non_qualified":null,"image":"1f46e-1f3fe.png","sheet_x":20,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F46E-1F3FF","non_qualified":null,"image":"1f46e-1f3ff.png","sheet_x":20,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F46E-200D-2642-FE0F","a":"Police Officer","b":"1F46E","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[20,45]},"clock6":{"a":"Clock Face Six Oclock","b":"1F555","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule","dawn","dusk"],"k":[28,23]},"ab":{"a":"Negative Squared Ab","b":"1F18E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["red-square","alphabet"],"k":[0,20]},"clock630":{"a":"Clock Face Six-Thirty","b":"1F561","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,35]},"b":{"a":"Negative Squared Latin Capital Letter B","b":"1F171-FE0F","c":"1F171","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["red-square","alphabet","letter"],"k":[0,17]},"clock7":{"a":"Clock Face Seven Oclock","b":"1F556","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,24]},"cl":{"a":"Squared Cl","b":"1F191","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["alphabet","words","red-square"],"k":[0,21]},"cool":{"a":"Squared Cool","b":"1F192","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["words","blue-square"],"k":[0,22]},"clock730":{"a":"Clock Face Seven-Thirty","b":"1F562","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,36]},"free":{"a":"Squared Free","b":"1F193","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","words"],"k":[0,23]},"clock8":{"a":"Clock Face Eight Oclock","b":"1F557","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,25]},"clock830":{"a":"Clock Face Eight-Thirty","b":"1F563","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,37]},"guardsman":{"skin_variations":{"1F3FB":{"unified":"1F482-1F3FB","non_qualified":null,"image":"1f482-1f3fb.png","sheet_x":23,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F482-1F3FC","non_qualified":null,"image":"1f482-1f3fc.png","sheet_x":23,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F482-1F3FD","non_qualified":null,"image":"1f482-1f3fd.png","sheet_x":23,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F482-1F3FE","non_qualified":null,"image":"1f482-1f3fe.png","sheet_x":23,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F482-1F3FF","non_qualified":null,"image":"1f482-1f3ff.png","sheet_x":23,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F482-200D-2642-FE0F","a":"Guardsman","b":"1F482","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"j":["uk","gb","british","male","guy","royal"],"k":[23,31]},"information_source":{"a":"Information Source","b":"2139-FE0F","c":"2139","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","alphabet","letter"],"k":[46,32],"o":3},"id":{"a":"Squared Id","b":"1F194","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","words"],"k":[0,24]},"clock9":{"a":"Clock Face Nine Oclock","b":"1F558","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,26]},"m":{"a":"Circled Latin Capital Letter M","b":"24C2-FE0F","c":"24C2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["alphabet","blue-circle","letter"],"k":[47,7],"o":1},"clock930":{"a":"Clock Face Nine-Thirty","b":"1F564","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,38]},"new":{"a":"Squared New","b":"1F195","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","words","start"],"k":[0,25]},"construction_worker":{"skin_variations":{"1F3FB":{"unified":"1F477-1F3FB","non_qualified":null,"image":"1f477-1f3fb.png","sheet_x":22,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F477-1F3FC","non_qualified":null,"image":"1f477-1f3fc.png","sheet_x":22,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F477-1F3FD","non_qualified":null,"image":"1f477-1f3fd.png","sheet_x":22,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F477-1F3FE","non_qualified":null,"image":"1f477-1f3fe.png","sheet_x":22,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F477-1F3FF","non_qualified":null,"image":"1f477-1f3ff.png","sheet_x":22,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F477-200D-2642-FE0F","a":"Construction Worker","b":"1F477","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[22,28]},"clock10":{"a":"Clock Face Ten Oclock","b":"1F559","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,27]},"clock1030":{"a":"Clock Face Ten-Thirty","b":"1F565","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,39]},"ng":{"a":"Squared Ng","b":"1F196","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","words","shape","icon"],"k":[0,26]},"o2":{"a":"Negative Squared Latin Capital Letter O","b":"1F17E-FE0F","c":"1F17E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["alphabet","red-square","letter"],"k":[0,18]},"clock11":{"a":"Clock Face Eleven Oclock","b":"1F55A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,28]},"ok":{"a":"Squared Ok","b":"1F197","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["good","agree","yes","blue-square"],"k":[0,27]},"clock1130":{"a":"Clock Face Eleven-Thirty","b":"1F566","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,40]},"princess":{"skin_variations":{"1F3FB":{"unified":"1F478-1F3FB","non_qualified":null,"image":"1f478-1f3fb.png","sheet_x":22,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F478-1F3FC","non_qualified":null,"image":"1f478-1f3fc.png","sheet_x":22,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F478-1F3FD","non_qualified":null,"image":"1f478-1f3fd.png","sheet_x":22,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F478-1F3FE","non_qualified":null,"image":"1f478-1f3fe.png","sheet_x":22,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F478-1F3FF","non_qualified":null,"image":"1f478-1f3ff.png","sheet_x":22,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Princess","b":"1F478","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["girl","woman","female","blond","crown","royal","queen"],"k":[22,34]},"new_moon":{"a":"New Moon Symbol","b":"1F311","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,9]},"parking":{"a":"Negative Squared Latin Capital Letter P","b":"1F17F-FE0F","c":"1F17F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cars","blue-square","alphabet","letter"],"k":[0,19],"o":5},"sos":{"a":"Squared Sos","b":"1F198","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["help","red-square","words","emergency","911"],"k":[0,28]},"man_with_turban":{"skin_variations":{"1F3FB":{"unified":"1F473-1F3FB","non_qualified":null,"image":"1f473-1f3fb.png","sheet_x":21,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F473-1F3FC","non_qualified":null,"image":"1f473-1f3fc.png","sheet_x":21,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F473-1F3FD","non_qualified":null,"image":"1f473-1f3fd.png","sheet_x":21,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F473-1F3FE","non_qualified":null,"image":"1f473-1f3fe.png","sheet_x":21,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F473-1F3FF","non_qualified":null,"image":"1f473-1f3ff.png","sheet_x":21,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F473-200D-2642-FE0F","a":"Man with Turban","b":"1F473","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"j":["male","indian","hinduism","arabs"],"k":[21,44]},"waxing_crescent_moon":{"a":"Waxing Crescent Moon Symbol","b":"1F312","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,10]},"up":{"a":"Squared Up with Exclamation Mark","b":"1F199","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","above","high"],"k":[0,29]},"first_quarter_moon":{"a":"First Quarter Moon Symbol","b":"1F313","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,11]},"moon":{"a":"Waxing Gibbous Moon Symbol","b":"1F314","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[6,12],"n":["waxing_gibbous_moon"]},"vs":{"a":"Squared Vs","b":"1F19A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["words","orange-square"],"k":[0,30]},"man_with_gua_pi_mao":{"skin_variations":{"1F3FB":{"unified":"1F472-1F3FB","non_qualified":null,"image":"1f472-1f3fb.png","sheet_x":21,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F472-1F3FC","non_qualified":null,"image":"1f472-1f3fc.png","sheet_x":21,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F472-1F3FD","non_qualified":null,"image":"1f472-1f3fd.png","sheet_x":21,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F472-1F3FE","non_qualified":null,"image":"1f472-1f3fe.png","sheet_x":21,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F472-1F3FF","non_qualified":null,"image":"1f472-1f3ff.png","sheet_x":21,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Man with Gua Pi Mao","b":"1F472","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["male","boy","chinese"],"k":[21,26]},"koko":{"a":"Squared Katakana Koko","b":"1F201","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","here","katakana","japanese","destination"],"k":[5,29]},"full_moon":{"a":"Full Moon Symbol","b":"1F315","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","yellow","twilight","planet","space","night","evening","sleep"],"k":[6,13]},"waning_gibbous_moon":{"a":"Waning Gibbous Moon Symbol","b":"1F316","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep","waxing_gibbous_moon"],"k":[6,14]},"sa":{"a":"Squared Katakana Sa","b":"1F202-FE0F","c":"1F202","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","blue-square","katakana"],"k":[5,30]},"last_quarter_moon":{"a":"Last Quarter Moon Symbol","b":"1F317","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,15]},"u6708":{"a":"Squared Cjk Unified Ideograph-6708","b":"1F237-FE0F","c":"1F237","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","month","moon","japanese","orange-square","kanji"],"k":[5,38]},"u6709":{"a":"Squared Cjk Unified Ideograph-6709","b":"1F236","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["orange-square","chinese","have","kanji"],"k":[5,37]},"person_with_blond_hair":{"skin_variations":{"1F3FB":{"unified":"1F471-1F3FB","non_qualified":null,"image":"1f471-1f3fb.png","sheet_x":21,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F471-1F3FC","non_qualified":null,"image":"1f471-1f3fc.png","sheet_x":21,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F471-1F3FD","non_qualified":null,"image":"1f471-1f3fd.png","sheet_x":21,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F471-1F3FE","non_qualified":null,"image":"1f471-1f3fe.png","sheet_x":21,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F471-1F3FF","non_qualified":null,"image":"1f471-1f3ff.png","sheet_x":21,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F471-200D-2642-FE0F","a":"Person with Blond Hair","b":"1F471","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[21,20]},"waning_crescent_moon":{"a":"Waning Crescent Moon Symbol","b":"1F318","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,16]},"u6307":{"a":"Squared Cjk Unified Ideograph-6307","b":"1F22F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","point","green-square","kanji"],"k":[5,32],"o":5},"crescent_moon":{"a":"Crescent Moon","b":"1F319","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["night","sleep","sky","evening","magic"],"k":[6,17]},"new_moon_with_face":{"a":"New Moon with Face","b":"1F31A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,18]},"ideograph_advantage":{"a":"Circled Ideograph Advantage","b":"1F250","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","kanji","obtain","get","circle"],"k":[5,42]},"first_quarter_moon_with_face":{"a":"First Quarter Moon with Face","b":"1F31B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,19]},"u5272":{"a":"Squared Cjk Unified Ideograph-5272","b":"1F239","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cut","divide","chinese","kanji","pink-square"],"k":[5,40]},"last_quarter_moon_with_face":{"a":"Last Quarter Moon with Face","b":"1F31C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,20]},"u7121":{"a":"Squared Cjk Unified Ideograph-7121","b":"1F21A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nothing","chinese","kanji","japanese","orange-square"],"k":[5,31],"o":5},"bride_with_veil":{"skin_variations":{"1F3FB":{"unified":"1F470-1F3FB","non_qualified":null,"image":"1f470-1f3fb.png","sheet_x":21,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F470-1F3FC","non_qualified":null,"image":"1f470-1f3fc.png","sheet_x":21,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F470-1F3FD","non_qualified":null,"image":"1f470-1f3fd.png","sheet_x":21,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F470-1F3FE","non_qualified":null,"image":"1f470-1f3fe.png","sheet_x":21,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F470-1F3FF","non_qualified":null,"image":"1f470-1f3ff.png","sheet_x":21,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Bride with Veil","b":"1F470","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["couple","marriage","wedding","woman","bride"],"k":[21,2]},"u7981":{"a":"Squared Cjk Unified Ideograph-7981","b":"1F232","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["kanji","japanese","chinese","forbidden","limit","restricted","red-square"],"k":[5,33]},"sunny":{"a":"Black Sun with Rays","b":"2600-FE0F","c":"2600","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","nature","brightness","summer","beach","spring"],"k":[47,16],"o":1},"accept":{"a":"Circled Ideograph Accept","b":"1F251","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ok","good","chinese","kanji","agree","yes","orange-circle"],"k":[5,43]},"full_moon_with_face":{"a":"Full Moon with Face","b":"1F31D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,21]},"u7533":{"a":"Squared Cjk Unified Ideograph-7533","b":"1F238","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","japanese","kanji","orange-square"],"k":[5,39]},"angel":{"skin_variations":{"1F3FB":{"unified":"1F47C-1F3FB","non_qualified":null,"image":"1f47c-1f3fb.png","sheet_x":22,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F47C-1F3FC","non_qualified":null,"image":"1f47c-1f3fc.png","sheet_x":22,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F47C-1F3FD","non_qualified":null,"image":"1f47c-1f3fd.png","sheet_x":22,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F47C-1F3FE","non_qualified":null,"image":"1f47c-1f3fe.png","sheet_x":22,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F47C-1F3FF","non_qualified":null,"image":"1f47c-1f3ff.png","sheet_x":22,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Baby Angel","b":"1F47C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["heaven","wings","halo"],"k":[22,43]},"sun_with_face":{"a":"Sun with Face","b":"1F31E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","morning","sky"],"k":[6,22]},"santa":{"skin_variations":{"1F3FB":{"unified":"1F385-1F3FB","non_qualified":null,"image":"1f385-1f3fb.png","sheet_x":8,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F385-1F3FC","non_qualified":null,"image":"1f385-1f3fc.png","sheet_x":8,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F385-1F3FD","non_qualified":null,"image":"1f385-1f3fd.png","sheet_x":8,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F385-1F3FE","non_qualified":null,"image":"1f385-1f3fe.png","sheet_x":8,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F385-1F3FF","non_qualified":null,"image":"1f385-1f3ff.png","sheet_x":8,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Father Christmas","b":"1F385","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["festival","man","male","xmas","father christmas"],"k":[8,19]},"u5408":{"a":"Squared Cjk Unified Ideograph-5408","b":"1F234","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","chinese","join","kanji","red-square"],"k":[5,35]},"u7a7a":{"a":"Squared Cjk Unified Ideograph-7a7a","b":"1F233","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["kanji","japanese","chinese","empty","sky","blue-square"],"k":[5,34]},"star":{"a":"White Medium Star","b":"2B50","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["night","yellow"],"k":[50,22],"o":5},"star2":{"a":"Glowing Star","b":"1F31F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["night","sparkle","awesome","good","magic"],"k":[6,23]},"congratulations":{"a":"Circled Ideograph Congratulation","b":"3297-FE0F","c":"3297","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","kanji","japanese","red-circle"],"k":[50,26],"o":1},"stars":{"a":"Shooting Star","b":"1F320","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["night","photo"],"k":[6,24]},"secret":{"a":"Circled Ideograph Secret","b":"3299-FE0F","c":"3299","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["privacy","chinese","sshh","kanji","red-circle"],"k":[50,27],"o":1},"u55b6":{"a":"Squared Cjk Unified Ideograph-55b6","b":"1F23A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","opening hours","orange-square"],"k":[5,41]},"cloud":{"a":"Cloud","b":"2601-FE0F","c":"2601","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","sky"],"k":[47,17],"o":1},"partly_sunny":{"a":"Sun Behind Cloud","b":"26C5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","nature","cloudy","morning","fall","spring"],"k":[48,29],"o":5},"u6e80":{"a":"Squared Cjk Unified Ideograph-6e80","b":"1F235","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["full","chinese","japanese","red-square","kanji"],"k":[5,36]},"black_small_square":{"a":"Black Small Square","b":"25AA-FE0F","c":"25AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon"],"k":[47,8],"o":1},"white_small_square":{"a":"White Small Square","b":"25AB-FE0F","c":"25AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon"],"k":[47,9],"o":1},"white_medium_square":{"a":"White Medium Square","b":"25FB-FE0F","c":"25FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","stone","icon"],"k":[47,12],"o":3},"black_medium_square":{"a":"Black Medium Square","b":"25FC-FE0F","c":"25FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","button","icon"],"k":[47,13],"o":3},"white_medium_small_square":{"a":"White Medium Small Square","b":"25FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","stone","icon","button"],"k":[47,14],"o":3},"black_medium_small_square":{"a":"Black Medium Small Square","b":"25FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["icon","shape","button"],"k":[47,15],"o":3},"black_large_square":{"a":"Black Large Square","b":"2B1B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon","button"],"k":[50,20],"o":5},"white_large_square":{"a":"White Large Square","b":"2B1C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon","stone","button"],"k":[50,21],"o":5},"large_orange_diamond":{"a":"Large Orange Diamond","b":"1F536","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","jewel","gem"],"k":[28,4]},"large_blue_diamond":{"a":"Large Blue Diamond","b":"1F537","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","jewel","gem"],"k":[28,5]},"small_orange_diamond":{"a":"Small Orange Diamond","b":"1F538","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","jewel","gem"],"k":[28,6]},"cyclone":{"a":"Cyclone","b":"1F300","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","swirl","blue","cloud","vortex","spiral","whirlpool","spin","tornado","hurricane","typhoon"],"k":[5,44]},"rainbow":{"a":"Rainbow","b":"1F308","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","happy","unicorn_face","photo","sky","spring"],"k":[6,0]},"small_blue_diamond":{"a":"Small Blue Diamond","b":"1F539","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","jewel","gem"],"k":[28,7]},"small_red_triangle":{"a":"Up-Pointing Red Triangle","b":"1F53A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","direction","up","top"],"k":[28,8]},"closed_umbrella":{"a":"Closed Umbrella","b":"1F302","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","rain","drizzle"],"k":[5,46]},"small_red_triangle_down":{"a":"Down-Pointing Red Triangle","b":"1F53B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","direction","bottom"],"k":[28,9]},"umbrella":{"a":"Umbrella","b":"2602-FE0F","c":"2602","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["rainy","weather","spring"],"k":[47,18],"o":1},"diamond_shape_with_a_dot_inside":{"a":"Diamond Shape with a Dot Inside","b":"1F4A0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["jewel","blue","gem","crystal","fancy"],"k":[25,6]},"radio_button":{"a":"Radio Button","b":"1F518","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["input","old","music","circle"],"k":[27,26]},"black_square_button":{"a":"Black Square Button","b":"1F532","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","input","frame"],"k":[28,0]},"zap":{"a":"High Voltage Sign","b":"26A1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["thunder","weather","lightning bolt","fast"],"k":[48,21],"o":4},"snowflake":{"a":"Snowflake","b":"2744-FE0F","c":"2744","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["winter","season","cold","weather","christmas","xmas"],"k":[49,51],"o":1},"white_square_button":{"a":"White Square Button","b":"1F533","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","input"],"k":[28,1]},"person_frowning":{"skin_variations":{"1F3FB":{"unified":"1F64D-1F3FB","non_qualified":null,"image":"1f64d-1f3fb.png","sheet_x":33,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F64D-1F3FC","non_qualified":null,"image":"1f64d-1f3fc.png","sheet_x":33,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F64D-1F3FD","non_qualified":null,"image":"1f64d-1f3fd.png","sheet_x":33,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F64D-1F3FE","non_qualified":null,"image":"1f64d-1f3fe.png","sheet_x":33,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F64D-1F3FF","non_qualified":null,"image":"1f64d-1f3ff.png","sheet_x":33,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F64D-200D-2640-FE0F","a":"Person Frowning","b":"1F64D","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[33,30]},"white_circle":{"a":"Medium White Circle","b":"26AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","round"],"k":[48,22],"o":4},"snowman":{"a":"Snowman","b":"2603-FE0F","c":"2603","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["winter","season","cold","weather","christmas","xmas","frozen","without_snow"],"k":[47,19],"o":1},"ru":{"a":"Russia Flag","b":"1F1F7-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["russian","federation","flag","nation","country","banner"],"k":[4,19],"n":["flag-ru"]},"black_circle":{"a":"Medium Black Circle","b":"26AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","button","round"],"k":[48,23],"o":4},"person_with_pouting_face":{"skin_variations":{"1F3FB":{"unified":"1F64E-1F3FB","non_qualified":null,"image":"1f64e-1f3fb.png","sheet_x":33,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F64E-1F3FC","non_qualified":null,"image":"1f64e-1f3fc.png","sheet_x":33,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F64E-1F3FD","non_qualified":null,"image":"1f64e-1f3fd.png","sheet_x":33,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F64E-1F3FE","non_qualified":null,"image":"1f64e-1f3fe.png","sheet_x":34,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F64E-1F3FF","non_qualified":null,"image":"1f64e-1f3ff.png","sheet_x":34,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F64E-200D-2640-FE0F","a":"Person with Pouting Face","b":"1F64E","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[33,48]},"red_circle":{"a":"Large Red Circle","b":"1F534","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","error","danger"],"k":[28,2]},"large_blue_circle":{"a":"Large Blue Circle","b":"1F535","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon","button"],"k":[28,3]},"fire":{"a":"Fire","b":"1F525","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hot","cook","flame"],"k":[27,39]},"droplet":{"a":"Droplet","b":"1F4A7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["water","drip","faucet","spring"],"k":[25,13]},"no_good":{"skin_variations":{"1F3FB":{"unified":"1F645-1F3FB","non_qualified":null,"image":"1f645-1f3fb.png","sheet_x":32,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F645-1F3FC","non_qualified":null,"image":"1f645-1f3fc.png","sheet_x":32,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F645-1F3FD","non_qualified":null,"image":"1f645-1f3fd.png","sheet_x":32,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F645-1F3FE","non_qualified":null,"image":"1f645-1f3fe.png","sheet_x":32,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F645-1F3FF","non_qualified":null,"image":"1f645-1f3ff.png","sheet_x":32,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F645-200D-2640-FE0F","a":"Face with No Good Gesture","b":"1F645","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[32,1]},"ocean":{"a":"Water Wave","b":"1F30A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sea","water","wave","nature","tsunami","disaster"],"k":[6,2]},"ok_woman":{"skin_variations":{"1F3FB":{"unified":"1F646-1F3FB","non_qualified":null,"image":"1f646-1f3fb.png","sheet_x":32,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F646-1F3FC","non_qualified":null,"image":"1f646-1f3fc.png","sheet_x":32,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F646-1F3FD","non_qualified":null,"image":"1f646-1f3fd.png","sheet_x":32,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F646-1F3FE","non_qualified":null,"image":"1f646-1f3fe.png","sheet_x":32,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F646-1F3FF","non_qualified":null,"image":"1f646-1f3ff.png","sheet_x":32,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F646-200D-2640-FE0F","a":"Face with Ok Gesture","b":"1F646","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"j":["women","girl","female","pink","human","woman"],"k":[32,19]},"information_desk_person":{"skin_variations":{"1F3FB":{"unified":"1F481-1F3FB","non_qualified":null,"image":"1f481-1f3fb.png","sheet_x":23,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F481-1F3FC","non_qualified":null,"image":"1f481-1f3fc.png","sheet_x":23,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F481-1F3FD","non_qualified":null,"image":"1f481-1f3fd.png","sheet_x":23,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F481-1F3FE","non_qualified":null,"image":"1f481-1f3fe.png","sheet_x":23,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F481-1F3FF","non_qualified":null,"image":"1f481-1f3ff.png","sheet_x":23,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F481-200D-2640-FE0F","a":"Information Desk Person","b":"1F481","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[23,13]},"raising_hand":{"skin_variations":{"1F3FB":{"unified":"1F64B-1F3FB","non_qualified":null,"image":"1f64b-1f3fb.png","sheet_x":33,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F64B-1F3FC","non_qualified":null,"image":"1f64b-1f3fc.png","sheet_x":33,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F64B-1F3FD","non_qualified":null,"image":"1f64b-1f3fd.png","sheet_x":33,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F64B-1F3FE","non_qualified":null,"image":"1f64b-1f3fe.png","sheet_x":33,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F64B-1F3FF","non_qualified":null,"image":"1f64b-1f3ff.png","sheet_x":33,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F64B-200D-2640-FE0F","a":"Happy Person Raising One Hand","b":"1F64B","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[33,6]},"bow":{"skin_variations":{"1F3FB":{"unified":"1F647-1F3FB","non_qualified":null,"image":"1f647-1f3fb.png","sheet_x":32,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F647-1F3FC","non_qualified":null,"image":"1f647-1f3fc.png","sheet_x":32,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F647-1F3FD","non_qualified":null,"image":"1f647-1f3fd.png","sheet_x":32,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F647-1F3FE","non_qualified":null,"image":"1f647-1f3fe.png","sheet_x":32,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F647-1F3FF","non_qualified":null,"image":"1f647-1f3ff.png","sheet_x":32,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F647-200D-2642-FE0F","a":"Person Bowing Deeply","b":"1F647","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[32,37]},"massage":{"skin_variations":{"1F3FB":{"unified":"1F486-1F3FB","non_qualified":null,"image":"1f486-1f3fb.png","sheet_x":24,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F486-1F3FC","non_qualified":null,"image":"1f486-1f3fc.png","sheet_x":24,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F486-1F3FD","non_qualified":null,"image":"1f486-1f3fd.png","sheet_x":24,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F486-1F3FE","non_qualified":null,"image":"1f486-1f3fe.png","sheet_x":24,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F486-1F3FF","non_qualified":null,"image":"1f486-1f3ff.png","sheet_x":24,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F486-200D-2640-FE0F","a":"Face Massage","b":"1F486","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[24,10]},"haircut":{"skin_variations":{"1F3FB":{"unified":"1F487-1F3FB","non_qualified":null,"image":"1f487-1f3fb.png","sheet_x":24,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F487-1F3FC","non_qualified":null,"image":"1f487-1f3fc.png","sheet_x":24,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F487-1F3FD","non_qualified":null,"image":"1f487-1f3fd.png","sheet_x":24,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F487-1F3FE","non_qualified":null,"image":"1f487-1f3fe.png","sheet_x":24,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F487-1F3FF","non_qualified":null,"image":"1f487-1f3ff.png","sheet_x":24,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F487-200D-2640-FE0F","a":"Haircut","b":"1F487","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[24,28]},"walking":{"skin_variations":{"1F3FB":{"unified":"1F6B6-1F3FB","non_qualified":null,"image":"1f6b6-1f3fb.png","sheet_x":36,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F6B6-1F3FC","non_qualified":null,"image":"1f6b6-1f3fc.png","sheet_x":36,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F6B6-1F3FD","non_qualified":null,"image":"1f6b6-1f3fd.png","sheet_x":36,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F6B6-1F3FE","non_qualified":null,"image":"1f6b6-1f3fe.png","sheet_x":36,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F6B6-1F3FF","non_qualified":null,"image":"1f6b6-1f3ff.png","sheet_x":36,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F6B6-200D-2642-FE0F","a":"Pedestrian","b":"1F6B6","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[36,21]},"runner":{"skin_variations":{"1F3FB":{"unified":"1F3C3-1F3FB","non_qualified":null,"image":"1f3c3-1f3fb.png","sheet_x":9,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F3C3-1F3FC","non_qualified":null,"image":"1f3c3-1f3fc.png","sheet_x":9,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F3C3-1F3FD","non_qualified":null,"image":"1f3c3-1f3fd.png","sheet_x":9,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F3C3-1F3FE","non_qualified":null,"image":"1f3c3-1f3fe.png","sheet_x":9,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F3C3-1F3FF","non_qualified":null,"image":"1f3c3-1f3ff.png","sheet_x":9,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F3C3-200D-2642-FE0F","a":"Runner","b":"1F3C3","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[9,46],"n":["running"]},"dancer":{"skin_variations":{"1F3FB":{"unified":"1F483-1F3FB","non_qualified":null,"image":"1f483-1f3fb.png","sheet_x":23,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F483-1F3FC","non_qualified":null,"image":"1f483-1f3fc.png","sheet_x":23,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F483-1F3FD","non_qualified":null,"image":"1f483-1f3fd.png","sheet_x":23,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F483-1F3FE","non_qualified":null,"image":"1f483-1f3fe.png","sheet_x":23,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F483-1F3FF","non_qualified":null,"image":"1f483-1f3ff.png","sheet_x":23,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Dancer","b":"1F483","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["female","girl","woman","fun"],"k":[23,37]},"dancers":{"obsoleted_by":"1F46F-200D-2640-FE0F","a":"Woman with Bunny Ears","b":"1F46F","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[21,1]},"us":{"a":"United States Flag","b":"1F1FA-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["united","states","america","flag","nation","country","banner"],"k":[5,11],"n":["flag-us"]},"bath":{"skin_variations":{"1F3FB":{"unified":"1F6C0-1F3FB","non_qualified":null,"image":"1f6c0-1f3fb.png","sheet_x":36,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F6C0-1F3FC","non_qualified":null,"image":"1f6c0-1f3fc.png","sheet_x":36,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F6C0-1F3FD","non_qualified":null,"image":"1f6c0-1f3fd.png","sheet_x":36,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F6C0-1F3FE","non_qualified":null,"image":"1f6c0-1f3fe.png","sheet_x":36,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F6C0-1F3FF","non_qualified":null,"image":"1f6c0-1f3ff.png","sheet_x":36,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Bath","b":"1F6C0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["clean","shower","bathroom"],"k":[36,36]},"bust_in_silhouette":{"a":"Bust in Silhouette","b":"1F464","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["user","person","human"],"k":[15,40]},"busts_in_silhouette":{"a":"Busts in Silhouette","b":"1F465","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["user","person","human","group","team"],"k":[15,41]},"horse_racing":{"skin_variations":{"1F3FB":{"unified":"1F3C7-1F3FB","non_qualified":null,"image":"1f3c7-1f3fb.png","sheet_x":10,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F3C7-1F3FC","non_qualified":null,"image":"1f3c7-1f3fc.png","sheet_x":10,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F3C7-1F3FD","non_qualified":null,"image":"1f3c7-1f3fd.png","sheet_x":10,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F3C7-1F3FE","non_qualified":null,"image":"1f3c7-1f3fe.png","sheet_x":10,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F3C7-1F3FF","non_qualified":null,"image":"1f3c7-1f3ff.png","sheet_x":10,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Horse Racing","b":"1F3C7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","betting","competition","gambling","luck"],"k":[10,20]},"snowboarder":{"skin_variations":{"1F3FB":{"unified":"1F3C2-1F3FB","non_qualified":null,"image":"1f3c2-1f3fb.png","sheet_x":9,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F3C2-1F3FC","non_qualified":null,"image":"1f3c2-1f3fc.png","sheet_x":9,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F3C2-1F3FD","non_qualified":null,"image":"1f3c2-1f3fd.png","sheet_x":9,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F3C2-1F3FE","non_qualified":null,"image":"1f3c2-1f3fe.png","sheet_x":9,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F3C2-1F3FF","non_qualified":null,"image":"1f3c2-1f3ff.png","sheet_x":9,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Snowboarder","b":"1F3C2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","winter"],"k":[9,28]},"surfer":{"skin_variations":{"1F3FB":{"unified":"1F3C4-1F3FB","non_qualified":null,"image":"1f3c4-1f3fb.png","sheet_x":10,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F3C4-1F3FC","non_qualified":null,"image":"1f3c4-1f3fc.png","sheet_x":10,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F3C4-1F3FD","non_qualified":null,"image":"1f3c4-1f3fd.png","sheet_x":10,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F3C4-1F3FE","non_qualified":null,"image":"1f3c4-1f3fe.png","sheet_x":10,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F3C4-1F3FF","non_qualified":null,"image":"1f3c4-1f3ff.png","sheet_x":10,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F3C4-200D-2642-FE0F","a":"Surfer","b":"1F3C4","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[10,12]},"rowboat":{"skin_variations":{"1F3FB":{"unified":"1F6A3-1F3FB","non_qualified":null,"image":"1f6a3-1f3fb.png","sheet_x":35,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6A3-1F3FC","non_qualified":null,"image":"1f6a3-1f3fc.png","sheet_x":35,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6A3-1F3FD","non_qualified":null,"image":"1f6a3-1f3fd.png","sheet_x":35,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6A3-1F3FE","non_qualified":null,"image":"1f6a3-1f3fe.png","sheet_x":35,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6A3-1F3FF","non_qualified":null,"image":"1f6a3-1f3ff.png","sheet_x":35,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoleted_by":"1F6A3-200D-2642-FE0F","a":"Rowboat","b":"1F6A3","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[35,3]},"swimmer":{"skin_variations":{"1F3FB":{"unified":"1F3CA-1F3FB","non_qualified":null,"image":"1f3ca-1f3fb.png","sheet_x":10,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F3CA-1F3FC","non_qualified":null,"image":"1f3ca-1f3fc.png","sheet_x":10,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F3CA-1F3FD","non_qualified":null,"image":"1f3ca-1f3fd.png","sheet_x":10,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F3CA-1F3FE","non_qualified":null,"image":"1f3ca-1f3fe.png","sheet_x":10,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F3CA-1F3FF","non_qualified":null,"image":"1f3ca-1f3ff.png","sheet_x":10,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F3CA-200D-2642-FE0F","a":"Swimmer","b":"1F3CA","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[10,40]},"bicyclist":{"skin_variations":{"1F3FB":{"unified":"1F6B4-1F3FB","non_qualified":null,"image":"1f6b4-1f3fb.png","sheet_x":35,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F6B4-1F3FC","non_qualified":null,"image":"1f6b4-1f3fc.png","sheet_x":35,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F6B4-1F3FD","non_qualified":null,"image":"1f6b4-1f3fd.png","sheet_x":35,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F6B4-1F3FE","non_qualified":null,"image":"1f6b4-1f3fe.png","sheet_x":35,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F6B4-1F3FF","non_qualified":null,"image":"1f6b4-1f3ff.png","sheet_x":35,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F6B4-200D-2642-FE0F","a":"Bicyclist","b":"1F6B4","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[35,37]},"mountain_bicyclist":{"skin_variations":{"1F3FB":{"unified":"1F6B5-1F3FB","non_qualified":null,"image":"1f6b5-1f3fb.png","sheet_x":36,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F6B5-1F3FC","non_qualified":null,"image":"1f6b5-1f3fc.png","sheet_x":36,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F6B5-1F3FD","non_qualified":null,"image":"1f6b5-1f3fd.png","sheet_x":36,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F6B5-1F3FE","non_qualified":null,"image":"1f6b5-1f3fe.png","sheet_x":36,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F6B5-1F3FF","non_qualified":null,"image":"1f6b5-1f3ff.png","sheet_x":36,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F6B5-200D-2642-FE0F","a":"Mountain Bicyclist","b":"1F6B5","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[36,3]},"couple":{"a":"Man and Woman Holding Hands","b":"1F46B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["pair","people","human","love","date","dating","like","affection","valentines","marriage"],"k":[20,30],"n":["man_and_woman_holding_hands"]},"two_men_holding_hands":{"a":"Two Men Holding Hands","b":"1F46C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["pair","couple","love","like","bromance","friendship","people","human"],"k":[20,31]},"two_women_holding_hands":{"a":"Two Women Holding Hands","b":"1F46D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["pair","friendship","couple","love","like","female","people","human"],"k":[20,32]},"couplekiss":{"obsoleted_by":"1F469-200D-2764-FE0F-200D-1F48B-200D-1F468","a":"Kiss","b":"1F48F","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[24,41]},"couple_with_heart":{"obsoleted_by":"1F469-200D-2764-FE0F-200D-1F468","a":"Couple with Heart","b":"1F491","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[24,43]},"muscle":{"skin_variations":{"1F3FB":{"unified":"1F4AA-1F3FB","non_qualified":null,"image":"1f4aa-1f3fb.png","sheet_x":25,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F4AA-1F3FC","non_qualified":null,"image":"1f4aa-1f3fc.png","sheet_x":25,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F4AA-1F3FD","non_qualified":null,"image":"1f4aa-1f3fd.png","sheet_x":25,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F4AA-1F3FE","non_qualified":null,"image":"1f4aa-1f3fe.png","sheet_x":25,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F4AA-1F3FF","non_qualified":null,"image":"1f4aa-1f3ff.png","sheet_x":25,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Flexed Biceps","b":"1F4AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arm","flex","hand","summer","strong","biceps"],"k":[25,16]},"point_left":{"skin_variations":{"1F3FB":{"unified":"1F448-1F3FB","non_qualified":null,"image":"1f448-1f3fb.png","sheet_x":14,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F448-1F3FC","non_qualified":null,"image":"1f448-1f3fc.png","sheet_x":14,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F448-1F3FD","non_qualified":null,"image":"1f448-1f3fd.png","sheet_x":14,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F448-1F3FE","non_qualified":null,"image":"1f448-1f3fe.png","sheet_x":14,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F448-1F3FF","non_qualified":null,"image":"1f448-1f3ff.png","sheet_x":14,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Left Pointing Backhand Index","b":"1F448","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["direction","fingers","hand","left"],"k":[14,19]},"point_right":{"skin_variations":{"1F3FB":{"unified":"1F449-1F3FB","non_qualified":null,"image":"1f449-1f3fb.png","sheet_x":14,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F449-1F3FC","non_qualified":null,"image":"1f449-1f3fc.png","sheet_x":14,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F449-1F3FD","non_qualified":null,"image":"1f449-1f3fd.png","sheet_x":14,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F449-1F3FE","non_qualified":null,"image":"1f449-1f3fe.png","sheet_x":14,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F449-1F3FF","non_qualified":null,"image":"1f449-1f3ff.png","sheet_x":14,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Right Pointing Backhand Index","b":"1F449","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","hand","direction","right"],"k":[14,25]},"point_up":{"skin_variations":{"1F3FB":{"unified":"261D-1F3FB","non_qualified":null,"image":"261d-1f3fb.png","sheet_x":47,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"261D-1F3FC","non_qualified":null,"image":"261d-1f3fc.png","sheet_x":47,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"261D-1F3FD","non_qualified":null,"image":"261d-1f3fd.png","sheet_x":47,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"261D-1F3FE","non_qualified":null,"image":"261d-1f3fe.png","sheet_x":47,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"261D-1F3FF","non_qualified":null,"image":"261d-1f3ff.png","sheet_x":47,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Up Pointing Index","b":"261D-FE0F","c":"261D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hand","fingers","direction","up"],"k":[47,26],"o":1},"point_up_2":{"skin_variations":{"1F3FB":{"unified":"1F446-1F3FB","non_qualified":null,"image":"1f446-1f3fb.png","sheet_x":14,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F446-1F3FC","non_qualified":null,"image":"1f446-1f3fc.png","sheet_x":14,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F446-1F3FD","non_qualified":null,"image":"1f446-1f3fd.png","sheet_x":14,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F446-1F3FE","non_qualified":null,"image":"1f446-1f3fe.png","sheet_x":14,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F446-1F3FF","non_qualified":null,"image":"1f446-1f3ff.png","sheet_x":14,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Up Pointing Backhand Index","b":"1F446","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","hand","direction","up"],"k":[14,7]},"point_down":{"skin_variations":{"1F3FB":{"unified":"1F447-1F3FB","non_qualified":null,"image":"1f447-1f3fb.png","sheet_x":14,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F447-1F3FC","non_qualified":null,"image":"1f447-1f3fc.png","sheet_x":14,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F447-1F3FD","non_qualified":null,"image":"1f447-1f3fd.png","sheet_x":14,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F447-1F3FE","non_qualified":null,"image":"1f447-1f3fe.png","sheet_x":14,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F447-1F3FF","non_qualified":null,"image":"1f447-1f3ff.png","sheet_x":14,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Down Pointing Backhand Index","b":"1F447","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","hand","direction","down"],"k":[14,13]},"v":{"skin_variations":{"1F3FB":{"unified":"270C-1F3FB","non_qualified":null,"image":"270c-1f3fb.png","sheet_x":49,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"270C-1F3FC","non_qualified":null,"image":"270c-1f3fc.png","sheet_x":49,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"270C-1F3FD","non_qualified":null,"image":"270c-1f3fd.png","sheet_x":49,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"270C-1F3FE","non_qualified":null,"image":"270c-1f3fe.png","sheet_x":49,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"270C-1F3FF","non_qualified":null,"image":"270c-1f3ff.png","sheet_x":49,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Victory Hand","b":"270C-FE0F","c":"270C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","ohyeah","hand","peace","victory","two"],"k":[49,30],"o":1},"hand":{"skin_variations":{"1F3FB":{"unified":"270B-1F3FB","non_qualified":null,"image":"270b-1f3fb.png","sheet_x":49,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"270B-1F3FC","non_qualified":null,"image":"270b-1f3fc.png","sheet_x":49,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"270B-1F3FD","non_qualified":null,"image":"270b-1f3fd.png","sheet_x":49,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"270B-1F3FE","non_qualified":null,"image":"270b-1f3fe.png","sheet_x":49,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"270B-1F3FF","non_qualified":null,"image":"270b-1f3ff.png","sheet_x":49,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Raised Hand","b":"270B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[49,24],"n":["raised_hand"]},"ok_hand":{"skin_variations":{"1F3FB":{"unified":"1F44C-1F3FB","non_qualified":null,"image":"1f44c-1f3fb.png","sheet_x":14,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44C-1F3FC","non_qualified":null,"image":"1f44c-1f3fc.png","sheet_x":14,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44C-1F3FD","non_qualified":null,"image":"1f44c-1f3fd.png","sheet_x":14,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44C-1F3FE","non_qualified":null,"image":"1f44c-1f3fe.png","sheet_x":14,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44C-1F3FF","non_qualified":null,"image":"1f44c-1f3ff.png","sheet_x":14,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Ok Hand Sign","b":"1F44C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","limbs","perfect","ok","okay"],"k":[14,43]},"+1":{"skin_variations":{"1F3FB":{"unified":"1F44D-1F3FB","non_qualified":null,"image":"1f44d-1f3fb.png","sheet_x":14,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44D-1F3FC","non_qualified":null,"image":"1f44d-1f3fc.png","sheet_x":14,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44D-1F3FD","non_qualified":null,"image":"1f44d-1f3fd.png","sheet_x":15,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44D-1F3FE","non_qualified":null,"image":"1f44d-1f3fe.png","sheet_x":15,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44D-1F3FF","non_qualified":null,"image":"1f44d-1f3ff.png","sheet_x":15,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Thumbs Up Sign","b":"1F44D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["thumbsup","yes","awesome","good","agree","accept","cool","hand","like"],"k":[14,49],"n":["thumbsup"]},"-1":{"skin_variations":{"1F3FB":{"unified":"1F44E-1F3FB","non_qualified":null,"image":"1f44e-1f3fb.png","sheet_x":15,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44E-1F3FC","non_qualified":null,"image":"1f44e-1f3fc.png","sheet_x":15,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44E-1F3FD","non_qualified":null,"image":"1f44e-1f3fd.png","sheet_x":15,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44E-1F3FE","non_qualified":null,"image":"1f44e-1f3fe.png","sheet_x":15,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44E-1F3FF","non_qualified":null,"image":"1f44e-1f3ff.png","sheet_x":15,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Thumbs Down Sign","b":"1F44E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["thumbsdown","no","dislike","hand"],"k":[15,3],"n":["thumbsdown"]},"fist":{"skin_variations":{"1F3FB":{"unified":"270A-1F3FB","non_qualified":null,"image":"270a-1f3fb.png","sheet_x":49,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"270A-1F3FC","non_qualified":null,"image":"270a-1f3fc.png","sheet_x":49,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"270A-1F3FD","non_qualified":null,"image":"270a-1f3fd.png","sheet_x":49,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"270A-1F3FE","non_qualified":null,"image":"270a-1f3fe.png","sheet_x":49,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"270A-1F3FF","non_qualified":null,"image":"270a-1f3ff.png","sheet_x":49,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Raised Fist","b":"270A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","hand","grasp"],"k":[49,18]},"facepunch":{"skin_variations":{"1F3FB":{"unified":"1F44A-1F3FB","non_qualified":null,"image":"1f44a-1f3fb.png","sheet_x":14,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44A-1F3FC","non_qualified":null,"image":"1f44a-1f3fc.png","sheet_x":14,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44A-1F3FD","non_qualified":null,"image":"1f44a-1f3fd.png","sheet_x":14,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44A-1F3FE","non_qualified":null,"image":"1f44a-1f3fe.png","sheet_x":14,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44A-1F3FF","non_qualified":null,"image":"1f44a-1f3ff.png","sheet_x":14,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Fisted Hand Sign","b":"1F44A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["angry","violence","fist","hit","attack","hand"],"k":[14,31],"n":["punch"]},"wave":{"skin_variations":{"1F3FB":{"unified":"1F44B-1F3FB","non_qualified":null,"image":"1f44b-1f3fb.png","sheet_x":14,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44B-1F3FC","non_qualified":null,"image":"1f44b-1f3fc.png","sheet_x":14,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44B-1F3FD","non_qualified":null,"image":"1f44b-1f3fd.png","sheet_x":14,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44B-1F3FE","non_qualified":null,"image":"1f44b-1f3fe.png","sheet_x":14,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44B-1F3FF","non_qualified":null,"image":"1f44b-1f3ff.png","sheet_x":14,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Waving Hand Sign","b":"1F44B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hands","gesture","goodbye","solong","farewell","hello","hi","palm"],"k":[14,37]},"clap":{"skin_variations":{"1F3FB":{"unified":"1F44F-1F3FB","non_qualified":null,"image":"1f44f-1f3fb.png","sheet_x":15,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44F-1F3FC","non_qualified":null,"image":"1f44f-1f3fc.png","sheet_x":15,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44F-1F3FD","non_qualified":null,"image":"1f44f-1f3fd.png","sheet_x":15,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44F-1F3FE","non_qualified":null,"image":"1f44f-1f3fe.png","sheet_x":15,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44F-1F3FF","non_qualified":null,"image":"1f44f-1f3ff.png","sheet_x":15,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Clapping Hands Sign","b":"1F44F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hands","praise","applause","congrats","yay"],"k":[15,9]},"open_hands":{"skin_variations":{"1F3FB":{"unified":"1F450-1F3FB","non_qualified":null,"image":"1f450-1f3fb.png","sheet_x":15,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F450-1F3FC","non_qualified":null,"image":"1f450-1f3fc.png","sheet_x":15,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F450-1F3FD","non_qualified":null,"image":"1f450-1f3fd.png","sheet_x":15,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F450-1F3FE","non_qualified":null,"image":"1f450-1f3fe.png","sheet_x":15,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F450-1F3FF","non_qualified":null,"image":"1f450-1f3ff.png","sheet_x":15,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Open Hands Sign","b":"1F450","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","butterfly","hands","open"],"k":[15,15]},"raised_hands":{"skin_variations":{"1F3FB":{"unified":"1F64C-1F3FB","non_qualified":null,"image":"1f64c-1f3fb.png","sheet_x":33,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F64C-1F3FC","non_qualified":null,"image":"1f64c-1f3fc.png","sheet_x":33,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F64C-1F3FD","non_qualified":null,"image":"1f64c-1f3fd.png","sheet_x":33,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F64C-1F3FE","non_qualified":null,"image":"1f64c-1f3fe.png","sheet_x":33,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F64C-1F3FF","non_qualified":null,"image":"1f64c-1f3ff.png","sheet_x":33,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Person Raising Both Hands in Celebration","b":"1F64C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["gesture","hooray","yea","celebration","hands"],"k":[33,12]},"pray":{"skin_variations":{"1F3FB":{"unified":"1F64F-1F3FB","non_qualified":null,"image":"1f64f-1f3fb.png","sheet_x":34,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F64F-1F3FC","non_qualified":null,"image":"1f64f-1f3fc.png","sheet_x":34,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F64F-1F3FD","non_qualified":null,"image":"1f64f-1f3fd.png","sheet_x":34,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F64F-1F3FE","non_qualified":null,"image":"1f64f-1f3fe.png","sheet_x":34,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F64F-1F3FF","non_qualified":null,"image":"1f64f-1f3ff.png","sheet_x":34,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Person with Folded Hands","b":"1F64F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["please","hope","wish","namaste","highfive"],"k":[34,2]},"nail_care":{"skin_variations":{"1F3FB":{"unified":"1F485-1F3FB","non_qualified":null,"image":"1f485-1f3fb.png","sheet_x":23,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F485-1F3FC","non_qualified":null,"image":"1f485-1f3fc.png","sheet_x":23,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F485-1F3FD","non_qualified":null,"image":"1f485-1f3fd.png","sheet_x":23,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F485-1F3FE","non_qualified":null,"image":"1f485-1f3fe.png","sheet_x":23,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F485-1F3FF","non_qualified":null,"image":"1f485-1f3ff.png","sheet_x":23,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Nail Polish","b":"1F485","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["beauty","manicure","finger","fashion","nail"],"k":[23,44]},"ear":{"skin_variations":{"1F3FB":{"unified":"1F442-1F3FB","non_qualified":null,"image":"1f442-1f3fb.png","sheet_x":13,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F442-1F3FC","non_qualified":null,"image":"1f442-1f3fc.png","sheet_x":13,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F442-1F3FD","non_qualified":null,"image":"1f442-1f3fd.png","sheet_x":13,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F442-1F3FE","non_qualified":null,"image":"1f442-1f3fe.png","sheet_x":13,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F442-1F3FF","non_qualified":null,"image":"1f442-1f3ff.png","sheet_x":13,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Ear","b":"1F442","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","hear","sound","listen"],"k":[13,45]},"nose":{"skin_variations":{"1F3FB":{"unified":"1F443-1F3FB","non_qualified":null,"image":"1f443-1f3fb.png","sheet_x":14,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F443-1F3FC","non_qualified":null,"image":"1f443-1f3fc.png","sheet_x":14,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F443-1F3FD","non_qualified":null,"image":"1f443-1f3fd.png","sheet_x":14,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F443-1F3FE","non_qualified":null,"image":"1f443-1f3fe.png","sheet_x":14,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F443-1F3FF","non_qualified":null,"image":"1f443-1f3ff.png","sheet_x":14,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Nose","b":"1F443","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["smell","sniff"],"k":[13,51]},"footprints":{"a":"Footprints","b":"1F463","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["feet","tracking","walking","beach"],"k":[15,39]},"eyes":{"a":"Eyes","b":"1F440","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["look","watch","stalk","peek","see"],"k":[13,42]},"tongue":{"a":"Tongue","b":"1F445","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mouth","playful"],"k":[14,6]},"lips":{"a":"Mouth","b":"1F444","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mouth","kiss"],"k":[14,5]},"kiss":{"a":"Kiss Mark","b":"1F48B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","lips","love","like","affection","valentines"],"k":[24,37]},"cupid":{"a":"Heart with Arrow","b":"1F498","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","heart","affection","valentines"],"k":[24,50]},"heart":{"a":"Heavy Black Heart","b":"2764-FE0F","c":"2764","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","valentines"],"k":[50,8],"l":["<3"],"m":"<3","o":1},"heartbeat":{"a":"Beating Heart","b":"1F493","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines","pink","heart"],"k":[24,45]},"broken_heart":{"a":"Broken Heart","b":"1F494","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sad","sorry","break","heart","heartbreak"],"k":[24,46],"l":["</3"],"m":"</3"},"two_hearts":{"a":"Two Hearts","b":"1F495","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines","heart"],"k":[24,47]},"sparkling_heart":{"a":"Sparkling Heart","b":"1F496","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[24,48]},"heartpulse":{"a":"Growing Heart","b":"1F497","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["like","love","affection","valentines","pink"],"k":[24,49]},"blue_heart":{"a":"Blue Heart","b":"1F499","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[24,51],"m":"<3"},"green_heart":{"a":"Green Heart","b":"1F49A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[25,0],"m":"<3"},"yellow_heart":{"a":"Yellow Heart","b":"1F49B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[25,1],"m":"<3"},"purple_heart":{"a":"Purple Heart","b":"1F49C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[25,2],"m":"<3"},"gift_heart":{"a":"Heart with Ribbon","b":"1F49D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","valentines"],"k":[25,3]},"revolving_hearts":{"a":"Revolving Hearts","b":"1F49E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[25,4]},"heart_decoration":{"a":"Heart Decoration","b":"1F49F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","love","like"],"k":[25,5]},"love_letter":{"a":"Love Letter","b":"1F48C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","like","affection","envelope","valentines"],"k":[24,38]},"zzz":{"a":"Sleeping Symbol","b":"1F4A4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sleepy","tired","dream"],"k":[25,10]},"anger":{"a":"Anger Symbol","b":"1F4A2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["angry","mad"],"k":[25,8]},"bomb":{"a":"Bomb","b":"1F4A3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["boom","explode","explosion","terrorism"],"k":[25,9]},"boom":{"a":"Collision Symbol","b":"1F4A5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bomb","explode","explosion","collision","blown"],"k":[25,11],"n":["collision"]},"sweat_drops":{"a":"Splashing Sweat Symbol","b":"1F4A6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["water","drip","oops"],"k":[25,12]},"dash":{"a":"Dash Symbol","b":"1F4A8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["wind","air","fast","shoo","fart","smoke","puff"],"k":[25,14]},"dizzy":{"a":"Dizzy Symbol","b":"1F4AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["star","sparkle","shoot","magic"],"k":[25,22]},"speech_balloon":{"a":"Speech Balloon","b":"1F4AC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bubble","words","message","talk","chatting"],"k":[25,23]},"thought_balloon":{"a":"Thought Balloon","b":"1F4AD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bubble","cloud","speech","thinking","dream"],"k":[25,24]},"eyeglasses":{"a":"Eyeglasses","b":"1F453","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","accessories","eyesight","nerdy","dork","geek"],"k":[15,23]},"necktie":{"a":"Necktie","b":"1F454","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shirt","suitup","formal","fashion","cloth","business"],"k":[15,24]},"shirt":{"a":"T-Shirt","b":"1F455","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[15,25],"n":["tshirt"]},"jeans":{"a":"Jeans","b":"1F456","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","shopping"],"k":[15,26]},"dress":{"a":"Dress","b":"1F457","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["clothes","fashion","shopping"],"k":[15,27]},"kimono":{"a":"Kimono","b":"1F458","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dress","fashion","women","female","japanese"],"k":[15,28]},"bikini":{"a":"Bikini","b":"1F459","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["swimming","female","woman","girl","fashion","beach","summer"],"k":[15,29]},"womans_clothes":{"a":"Womans Clothes","b":"1F45A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","shopping_bags","female"],"k":[15,30]},"purse":{"a":"Purse","b":"1F45B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","accessories","money","sales","shopping"],"k":[15,31]},"handbag":{"a":"Handbag","b":"1F45C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","accessory","accessories","shopping"],"k":[15,32]},"pouch":{"a":"Pouch","b":"1F45D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bag","accessories","shopping"],"k":[15,33]},"school_satchel":{"a":"School Satchel","b":"1F392","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["student","education","bag","backpack"],"k":[8,37]},"mans_shoe":{"a":"Mans Shoe","b":"1F45E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","male"],"k":[15,34],"n":["shoe"]},"athletic_shoe":{"a":"Athletic Shoe","b":"1F45F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shoes","sports","sneakers"],"k":[15,35]},"high_heel":{"a":"High-Heeled Shoe","b":"1F460","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","shoes","female","pumps","stiletto"],"k":[15,36]},"sandal":{"a":"Womans Sandal","b":"1F461","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shoes","fashion","flip flops"],"k":[15,37]},"boot":{"a":"Womans Boots","b":"1F462","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shoes","fashion"],"k":[15,38]},"crown":{"a":"Crown","b":"1F451","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["king","kod","leader","royalty","lord"],"k":[15,21]},"womans_hat":{"a":"Womans Hat","b":"1F452","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","accessories","female","lady","spring"],"k":[15,22]},"tophat":{"a":"Top Hat","b":"1F3A9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["magic","gentleman","classy","circus"],"k":[9,3]},"mortar_board":{"a":"Graduation Cap","b":"1F393","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["school","college","degree","university","graduation","cap","hat","legal","learn","education"],"k":[8,38]},"lipstick":{"a":"Lipstick","b":"1F484","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["female","girl","fashion","woman"],"k":[23,43]},"ring":{"a":"Ring","b":"1F48D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["wedding","propose","marriage","valentines","diamond","fashion","jewelry","gem","engagement"],"k":[24,39]},"gem":{"a":"Gem Stone","b":"1F48E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue","ruby","diamond","jewelry"],"k":[24,40]}},"aliases":{"satisfied":"laughing","grinning_face_with_star_eyes":"star-struck","face_with_one_eyebrow_raised":"face_with_raised_eyebrow","telephone":"phone","cooking":"fried_egg","paw_prints":"feet","flag-cn":"cn","lantern":"izakaya_lantern","shocked_face_with_exploding_head":"exploding_head","open_book":"book","flag-de":"de","grinning_face_with_one_large_and_one_small_eye":"zany_face","serious_face_with_symbols_covering_mouth":"face_with_symbols_on_mouth","flipper":"dolphin","face_with_open_mouth_vomiting":"face_vomiting","flag-es":"es","face_with_finger_covering_closed_lips":"shushing_face","smiling_face_with_smiling_eyes_and_hand_covering_mouth":"face_with_hand_over_mouth","flag-fr":"fr","honeybee":"bee","red_car":"car","envelope":"email","uk":"gb","flag-gb":"gb","poop":"hankey","shit":"hankey","staff_of_aesculapius":"medical_symbol","knife":"hocho","sailboat":"boat","pencil":"memo","flag-it":"it","flag-jp":"jp","heavy_exclamation_mark":"exclamation","flag-kr":"kr","waxing_gibbous_moon":"moon","mother_christmas":"mrs_claus","sun_small_cloud":"mostly_sunny","sun_behind_cloud":"barely_sunny","sun_behind_rain_cloud":"partly_sunny_rain","lightning_cloud":"lightning","tornado_cloud":"tornado","flag-ru":"ru","running":"runner","flag-us":"us","man_and_woman_holding_hands":"couple","man-woman-boy":"family","family":"man-woman-boy","reversed_hand_with_middle_finger_extended":"middle_finger","hand_with_index_and_middle_fingers_crossed":"crossed_fingers","sign_of_the_horns":"the_horns","raised_hand":"hand","thumbsup":"+1","thumbsdown":"-1","punch":"facepunch","collision":"boom","tshirt":"shirt","shoe":"mans_shoe"}}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAMESPACE = 'emoji-mart';

var _JSON = JSON;

var isLocalStorageSupported = typeof window !== 'undefined' && 'localStorage' in window;

var getter = void 0;
var setter = void 0;

function setHandlers(handlers) {
  handlers || (handlers = {});

  getter = handlers.getter;
  setter = handlers.setter;
}

function setNamespace(namespace) {
  NAMESPACE = namespace;
}

function update(state) {
  for (var key in state) {
    var value = state[key];
    set(key, value);
  }
}

function set(key, value) {
  if (setter) {
    setter(key, value);
  } else {
    if (!isLocalStorageSupported) return;
    try {
      window.localStorage[NAMESPACE + '.' + key] = _JSON.stringify(value);
    } catch (e) {}
  }
}

function get(key) {
  if (getter) {
    return getter(key);
  } else {
    if (!isLocalStorageSupported) return;
    try {
      var value = window.localStorage[NAMESPACE + '.' + key];
    } catch (e) {
      return;
    }

    if (value) {
      return JSON.parse(value);
    }
  }
}

exports.default = { update: update, set: set, get: get, setNamespace: setNamespace, setHandlers: setHandlers };

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_451ecadb_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_anchors_vue__ = __webpack_require__(79);
function injectStyle (ssrContext) {
  __webpack_require__(73)
  __webpack_require__(76)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-451ecadb"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_451ecadb_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_anchors_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _svgs = __webpack_require__(78);

var _svgs2 = _interopRequireDefault(_svgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    i18n: {
      type: Object,
      required: true
    },
    color: {
      type: String
    },
    categories: {
      type: Array,
      required: true
    },
    activeCategory: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  created: function created() {
    this.svgs = _svgs2.default;
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ad42887_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_category_vue__ = __webpack_require__(120);
function injectStyle (ssrContext) {
  __webpack_require__(80)
  __webpack_require__(82)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5ad42887"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ad42887_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_category_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nimbleEmoji = __webpack_require__(18);

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    data: {
      type: Object,
      required: true
    },
    i18n: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    emojis: {
      type: Array
    },
    emojiProps: {
      type: Object,
      required: true
    }
  },
  computed: {
    isVisible: function isVisible() {
      return !!this.emojis;
    },
    isSearch: function isSearch() {
      return this.name == 'Search';
    },
    hasResults: function hasResults() {
      return this.emojis.length > 0;
    }
  },
  components: {
    NimbleEmoji: _nimbleEmoji2.default
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _utils = __webpack_require__(20);

var _data = __webpack_require__(25);

var _sharedProps = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHEET_COLUMNS = 52; //
//
//
//
//
//
//
//
//
//
//


exports.default = {
  props: (0, _extends3.default)({}, _sharedProps.EmojiProps, {
    data: {
      type: Object,
      required: true
    }
  }),
  data: function data() {
    return {
      mutableData: this.data.compressed ? (0, _data.uncompress)(this.data) : this.data
    };
  },

  computed: {
    emojiData: function emojiData() {
      return (0, _utils.getData)(this.emoji, this.skin, this.set, this.mutableData);
    },
    sanitizedData: function sanitizedData() {
      return (0, _utils.getSanitizedData)(this.emoji, this.skin, this.set, this.mutableData);
    },
    canRender: function canRender() {
      return this.isCustom || this.isNative || this.hasEmoji || this.fallback;
    },
    isNative: function isNative() {
      return this.native;
    },
    isCustom: function isCustom() {
      return this.emojiData.custom;
    },
    hasEmoji: function hasEmoji() {
      return this.emojiData['has_img_' + this.set];
    },
    nativeEmoji: function nativeEmoji() {
      if (this.emojiData.unified) {
        return (0, _utils.unifiedToNative)(this.emojiData.unified);
      } else {
        return '';
      }
    },
    fallbackEmoji: function fallbackEmoji() {
      return this.fallback ? this.fallback(this.emoji) : null;
    },
    nativeEmojiStyles: function nativeEmojiStyles() {
      var styles = { fontSize: this.size + 'px' };

      if (this.forceSize) {
        styles.display = 'inline-block';
        styles.width = this.size + 'px';
        styles.height = this.size + 'px';
      }

      return styles;
    },
    fallbackEmojiStyles: function fallbackEmojiStyles() {
      if (this.isCustom) {
        return this.customEmojiStyles;
      } else if (this.hasEmoji) {
        return {
          display: 'inline-block',
          width: this.size + 'px',
          height: this.size + 'px',
          backgroundImage: 'url(' + this.backgroundImageFn(this.set, this.sheetSize) + ')',
          backgroundSize: 100 * SHEET_COLUMNS + '%',
          backgroundPosition: this.getPosition()
        };
      } else {
        return null;
      }
    },
    customEmojiStyles: function customEmojiStyles() {
      return {
        display: 'inline-block',
        width: this.size + 'px',
        height: this.size + 'px',
        backgroundImage: 'url(' + this.emojiData.imageUrl + ')',
        backgroundSize: '100%'
      };
    },
    title: function title() {
      return this.tooltip ? this.emojiData.short_names[0] : null;
    }
  },
  methods: {
    getPosition: function getPosition() {
      var multiply = 100 / (SHEET_COLUMNS - 1),
          x = multiply * this.emojiData.sheet_x,
          y = multiply * this.emojiData.sheet_y;

      return x + '% ' + y + '%';
    },
    onClick: function onClick() {
      this.$emit('click', this.sanitizedData);
    },
    onMouseEnter: function onMouseEnter() {
      this.$emit('mouseenter', this.sanitizedData);
    },
    onMouseLeave: function onMouseLeave() {
      this.$emit('mouseleave', this.sanitizedData);
    }
  }
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(21);
var $export = __webpack_require__(13);
var redefine = __webpack_require__(51);
var hide = __webpack_require__(8);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(91);
var setToStringTag = __webpack_require__(35);
var getPrototypeOf = __webpack_require__(96);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(90);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(50)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var dPs = __webpack_require__(92);
var enumBugKeys = __webpack_require__(34);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(50)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(95).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(93)(false);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(31);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(28);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
var global = __webpack_require__(5);
var hide = __webpack_require__(8);
var Iterators = __webpack_require__(16);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(53);
var hiddenKeys = __webpack_require__(34).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2eeff201_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_preview_vue__ = __webpack_require__(126);
function injectStyle (ssrContext) {
  __webpack_require__(121)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2eeff201"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2eeff201_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_preview_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nimbleEmoji = __webpack_require__(18);

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _skins = __webpack_require__(61);

var _skins2 = _interopRequireDefault(_skins);

var _utils = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    data: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    emoji: {
      type: [String, Object]
    },
    idleEmoji: {
      type: [String, Object],
      required: true
    },
    showSkinTones: {
      type: Boolean,
      default: true
    },
    emojiProps: {
      type: Object,
      required: true
    },
    skinProps: {
      type: Object,
      required: true
    }
  },
  computed: {
    emojiData: function emojiData() {
      if (this.emoji && this.emoji.custom) {
        return this.emoji;
      } else if (this.emoji) {
        return (0, _utils.getData)(this.emoji, null, null, this.data);
      } else {
        return {};
      }
    },
    emojiShortNames: function emojiShortNames() {
      return this.emojiData.short_names;
    },
    emojiEmoticons: function emojiEmoticons() {
      return this.emojiData.emoticons;
    }
  },
  components: {
    NimbleEmoji: _nimbleEmoji2.default,
    Skins: _skins2.default
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_08917036_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_skins_vue__ = __webpack_require__(125);
function injectStyle (ssrContext) {
  __webpack_require__(123)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-08917036"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_08917036_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_skins_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//


exports.default = {
  props: {
    skin: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      opened: false
    };
  },

  methods: {
    onClick: function onClick(skinTone) {
      if (this.opened) {
        if (skinTone != this.skin) {
          this.$emit('change', skinTone);
        }
      }

      this.opened = !this.opened;
    }
  }
};

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f5190ba_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__ = __webpack_require__(131);
function injectStyle (ssrContext) {
  __webpack_require__(127)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4f5190ba"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f5190ba_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nimbleEmojiIndex = __webpack_require__(39);

var _nimbleEmojiIndex2 = _interopRequireDefault(_nimbleEmojiIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    data: {
      type: Object,
      required: true
    },
    i18n: {
      type: Object,
      required: true
    },
    maxResults: {
      type: Number,
      default: 75
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    emojisToShowFilter: {
      type: Function
    },
    include: {
      type: Array
    },
    exclude: {
      type: Array
    },
    custom: {
      type: Array
    }
  },
  data: function data() {
    return {
      value: ''
    };
  },

  computed: {
    emojiIndex: function emojiIndex() {
      return new _nimbleEmojiIndex2.default(this.data);
    }
  },
  watch: {
    value: function value() {
      var emojis = this.emojiIndex.search(this.value, {
        emojisToShowFilter: this.emojisToShowFilter,
        maxResults: this.maxResults,
        include: this.include,
        exclude: this.exclude,
        custom: this.custom
      });

      this.$emit('search', emojis);
    }
  },
  methods: {
    clear: function clear() {
      this.value = '';
    }
  },
  mounted: function mounted() {
    var $input = this.$el.querySelector('input');

    if (this.autoFocus) {
      $input.focus();
    }
  }
}; //
//
//
//
//
//
//
//

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _all = __webpack_require__(40);

var _all2 = _interopRequireDefault(_all);

var _nimbleEmoji = __webpack_require__(18);

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _sharedProps = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  functional: true,
  props: (0, _extends3.default)({}, _sharedProps.EmojiProps, {
    data: {
      type: Object,
      default: function _default() {
        return _all2.default;
      }
    }
  }),
  render: function render(h, ctx) {
    var data = ctx.data;
    var props = ctx.props;
    var children = ctx.children;


    return h(_nimbleEmoji2.default, (0, _extends3.default)({}, data, { props: props }), children);
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _all = __webpack_require__(40);

var _all2 = _interopRequireDefault(_all);

var _nimblePicker = __webpack_require__(67);

var _nimblePicker2 = _interopRequireDefault(_nimblePicker);

var _sharedProps = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  functional: true,
  props: (0, _extends3.default)({}, _sharedProps.PickerProps, {
    data: {
      type: Object,
      default: function _default() {
        return _all2.default;
      }
    }
  }),
  render: function render(h, ctx) {
    var data = ctx.data;
    var props = ctx.props;
    var children = ctx.children;


    return h(_nimblePicker2.default, (0, _extends3.default)({}, data, { props: props }), children);
  }
};

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_882f1706_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nimblePicker_vue__ = __webpack_require__(151);
function injectStyle (ssrContext) {
  __webpack_require__(134)
  __webpack_require__(136)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-882f1706"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_882f1706_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nimblePicker_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(138);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = __webpack_require__(147);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = __webpack_require__(19);

var _extends3 = _interopRequireDefault(_extends2);

var _assign = __webpack_require__(58);

var _assign2 = _interopRequireDefault(_assign);

__webpack_require__(150);

var _store = __webpack_require__(41);

var _store2 = _interopRequireDefault(_store);

var _frequently = __webpack_require__(70);

var _frequently2 = _interopRequireDefault(_frequently);

var _utils = __webpack_require__(20);

var _data = __webpack_require__(25);

var _sharedProps = __webpack_require__(26);

var _anchors = __webpack_require__(42);

var _anchors2 = _interopRequireDefault(_anchors);

var _category = __webpack_require__(44);

var _category2 = _interopRequireDefault(_category);

var _preview = __webpack_require__(59);

var _preview2 = _interopRequireDefault(_preview);

var _search = __webpack_require__(63);

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var RECENT_CATEGORY = { id: 'recent', name: 'Recent', emojis: null };
var CUSTOM_CATEGORY = { id: 'custom', name: 'Custom', emojis: [] };

var I18N = {
  search: 'Search',
  notfound: 'No Emoji Found',
  categories: {
    search: 'Search Results',
    recent: 'Frequently Used',
    people: 'Smileys & People',
    nature: 'Animals & Nature',
    foods: 'Food & Drink',
    activity: 'Activity',
    places: 'Travel & Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags',
    custom: 'Custom'
  }
};

function makeCustomEmoji(emoji) {
  return (0, _assign2.default)({}, emoji, {
    id: emoji.short_names[0],
    custom: true
  });
}

exports.default = {
  props: (0, _extends3.default)({}, _sharedProps.PickerProps, {
    data: {
      type: Object,
      required: true
    }
  }),
  data: function data() {
    var _this = this;

    var customEmojis = this.custom.map(makeCustomEmoji),
        recentEmojis = this.recent || _frequently2.default.get(this.perLine);

    if (recentEmojis.length) {
      recentEmojis = recentEmojis.map(function (id) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(customEmojis), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var customEmoji = _step.value;

            if (customEmoji.id === id) {
              return customEmoji;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return id;
      });
    }

    if (this.emojisToShowFilter) {
      customEmojis = customEmojis.filter(function (e) {
        return _this.emojisToShowFilter(_this.mutableData.emojis[e] || e);
      });
      recentEmojis = recentEmojis.filter(function (e) {
        return _this.emojisToShowFilter(_this.mutableData.emojis[e] || e);
      });
    }

    return {
      mutableData: this.data.compressed ? (0, _data.uncompress)(this.data) : this.data,
      mutableI18n: (0, _utils.deepMerge)(I18N, this.i18n),
      activeSkin: this.skin || _store2.default.get('skin') || this.defaultSkin,
      categories: [],
      activeCategory: null,
      previewEmoji: null,
      searchEmojis: null,
      customEmojis: customEmojis,
      recentEmojis: recentEmojis
    };
  },

  computed: {
    customStyles: function customStyles() {
      return (0, _extends3.default)({
        width: this.calculateWidth + 'px'
      }, this.pickerStyles);
    },
    emojiProps: function emojiProps() {
      return {
        native: this.native,
        skin: this.activeSkin,
        size: this.emojiSize,
        set: this.set,
        sheetSize: this.sheetSize,
        forceSize: this.native,
        tooltip: this.emojiTooltip,
        backgroundImageFn: this.backgroundImageFn,
        onEnter: this.onEmojiEnter.bind(this),
        onLeave: this.onEmojiLeave.bind(this),
        onClick: this.onEmojiClick.bind(this)
      };
    },
    skinProps: function skinProps() {
      return {
        skin: this.activeSkin
      };
    },
    calculateWidth: function calculateWidth() {
      return this.perLine * (this.emojiSize + 12) + 12 + 2 + (0, _utils.measureScrollbar)();
    },
    filteredCategories: function filteredCategories() {
      var _this2 = this;

      return this.categories.filter(function (category) {
        var isIncluded = _this2.include && _this2.include.length ? _this2.include.indexOf(category.id) > -1 : true;
        var isExcluded = _this2.exclude && _this2.exclude.length ? _this2.exclude.indexOf(category.id) > -1 : false;
        var hasEmojis = category.emojis.length > 0;

        if (_this2.emojisToShowFilter) {
          hasEmojis = category.emojis.some(function (emoji) {
            return _this2.emojisToShowFilter(_this2.mutableData.emojis[emoji] || emoji);
          });
        }

        return isIncluded && !isExcluded && hasEmojis;
      });
    }
  },
  created: function created() {
    var _this3 = this,
        _categories;

    var categories = this.mutableData.categories.map(function (c) {
      var id = c.id;
      var name = c.name;
      var emojis = c.emojis;


      if (_this3.emojisToShowFilter) {
        emojis = c.emojis.filter(function (e) {
          return _this3.emojisToShowFilter(_this3.data.emojis[e] || e);
        });
      }

      return { id: id, name: name, emojis: emojis };
    });

    RECENT_CATEGORY.emojis = this.recentEmojis;
    CUSTOM_CATEGORY.emojis = this.customEmojis;

    this.categories.push(RECENT_CATEGORY);
    (_categories = this.categories).push.apply(_categories, (0, _toConsumableArray3.default)(categories));
    this.categories.push(CUSTOM_CATEGORY);

    this.categories[0].first = true;
    this.activeCategory = this.filteredCategories[0];
  },

  methods: {
    onScroll: function onScroll() {
      if (this.infiniteScroll && !this.waitingForPaint) {
        this.waitingForPaint = true;
        window.requestAnimationFrame(this.onScrollPaint.bind(this));
      }
    },
    onScrollPaint: function onScrollPaint() {
      this.waitingForPaint = false;

      var scrollTop = this.$refs.scroll.scrollTop,
          activeCategory = this.filteredCategories[0];

      for (var i = 0, l = this.filteredCategories.length; i < l; i++) {
        var category = this.filteredCategories[i],
            component = this.$refs.categories[i];

        if (component && component.$el.offsetTop > scrollTop) {
          break;
        }

        activeCategory = category;
      }

      this.activeCategory = activeCategory;
    },
    onAnchorClick: function onAnchorClick(category) {
      var _this4 = this;

      var i = this.filteredCategories.indexOf(category),
          component = this.$refs.categories[i],
          scrollToComponent = function scrollToComponent() {
        if (component) {
          var top = component.$el.offsetTop;

          if (category.first) {
            top = 0;
          }

          _this4.$refs.scroll.scrollTop = top;
        }
      };

      if (this.searchEmojis) {
        this.onSearch(null);
        this.$refs.search.clear();

        this.$nextTick(scrollToComponent);
      } else if (this.infiniteScroll) {
        scrollToComponent();
      } else {
        this.activeCategory = this.filteredCategories[i];
      }
    },
    onSearch: function onSearch(emojis) {
      this.searchEmojis = emojis;
    },
    onEmojiEnter: function onEmojiEnter(emoji) {
      if (emoji.custom) {
        // Use Array.prototype.find() when it is more widely supported.
        var customEmoji = this.customEmojis.filter(function (_emoji) {
          return _emoji.id === emoji.id;
        })[0];
        emoji = (0, _assign2.default)({}, emoji, customEmoji);
      }

      this.previewEmoji = emoji;
    },
    onEmojiLeave: function onEmojiLeave(emoji) {
      this.previewEmoji = null;
    },
    onEmojiClick: function onEmojiClick(emoji) {
      this.$emit('select', emoji);
      _frequently2.default.add(emoji);
    },
    onSkinChange: function onSkinChange(skin) {
      this.activeSkin = skin;
      _store2.default.update({ skin: skin });

      this.$emit('skin-change', skin);
    }
  },
  components: {
    Anchors: _anchors2.default,
    Category: _category2.default,
    Preview: _preview2.default,
    Search: _search2.default
  }
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(145);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = __webpack_require__(41);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULTS = ["+1", "grinning", "kissing_heart", "heart_eyes", "stuck_out_tongue_winking_eye", "sweat_smile", "joy", "scream", "disappointed", "unamused", "weary", "sob", "sunglasses", "heart"];

var frequently = void 0,
    initialized = void 0;
var defaults = {};

function init() {
  initialized = true;
  frequently = _store2.default.get("frequently");
}

function add(emoji) {
  if (!initialized) init();
  var id = emoji.id;


  frequently || (frequently = defaults);
  frequently[id] || (frequently[id] = 0);
  frequently[id] += 1;

  _store2.default.set("last", id);
  _store2.default.set("frequently", frequently);
}

function get(perLine) {
  if (!initialized) init();
  if (!frequently) {
    defaults = {};

    var result = [];

    for (var i = 0; i < perLine; i++) {
      defaults[DEFAULTS[i]] = perLine - i;
      result.push(DEFAULTS[i]);
    }

    return result;
  }

  var quantity = perLine * 4;
  var frequentlyKeys = [];

  for (var key in frequently) {
    if (frequently.hasOwnProperty(key)) {
      frequentlyKeys.push(key);
    }
  }

  var sorted = frequentlyKeys.sort(function (a, b) {
    return frequently[a] - frequently[b];
  }).reverse();
  var sliced = sorted.slice(0, quantity);

  var last = _store2.default.get("last");

  if (last && sliced.indexOf(last) == -1) {
    sliced.pop();
    sliced.push(last);
  }

  return sliced;
}

exports.default = { add: add, get: get };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frequently = exports.store = exports.emojiIndex = exports.NimbleEmojiIndex = exports.Category = exports.NimbleEmoji = exports.Emoji = exports.NimblePicker = exports.Picker = undefined;

var _components = __webpack_require__(72);

Object.defineProperty(exports, 'Picker', {
  enumerable: true,
  get: function get() {
    return _components.Picker;
  }
});
Object.defineProperty(exports, 'NimblePicker', {
  enumerable: true,
  get: function get() {
    return _components.NimblePicker;
  }
});
Object.defineProperty(exports, 'Emoji', {
  enumerable: true,
  get: function get() {
    return _components.Emoji;
  }
});
Object.defineProperty(exports, 'NimbleEmoji', {
  enumerable: true,
  get: function get() {
    return _components.NimbleEmoji;
  }
});
Object.defineProperty(exports, 'Category', {
  enumerable: true,
  get: function get() {
    return _components.Category;
  }
});

var _nimbleEmojiIndex = __webpack_require__(39);

Object.defineProperty(exports, 'NimbleEmojiIndex', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nimbleEmojiIndex).default;
  }
});

var _emojiIndex = __webpack_require__(152);

var _emojiIndex2 = _interopRequireDefault(_emojiIndex);

var _store = __webpack_require__(41);

var _store2 = _interopRequireDefault(_store);

var _frequently = __webpack_require__(70);

var _frequently2 = _interopRequireDefault(_frequently);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.emojiIndex = _emojiIndex2.default;
exports.store = _store2.default;
exports.frequently = _frequently2.default;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _anchors = __webpack_require__(42);

Object.defineProperty(exports, 'Anchors', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_anchors).default;
  }
});

var _category = __webpack_require__(44);

Object.defineProperty(exports, 'Category', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_category).default;
  }
});

var _preview = __webpack_require__(59);

Object.defineProperty(exports, 'Preview', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_preview).default;
  }
});

var _search = __webpack_require__(63);

Object.defineProperty(exports, 'Search', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_search).default;
  }
});

var _skins = __webpack_require__(61);

Object.defineProperty(exports, 'Skins', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_skins).default;
  }
});

var _emoji = __webpack_require__(132);

Object.defineProperty(exports, 'Emoji', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_emoji).default;
  }
});

var _nimbleEmoji = __webpack_require__(18);

Object.defineProperty(exports, 'NimbleEmoji', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nimbleEmoji).default;
  }
});

var _picker = __webpack_require__(133);

Object.defineProperty(exports, 'Picker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_picker).default;
  }
});

var _nimblePicker = __webpack_require__(67);

Object.defineProperty(exports, 'NimblePicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nimblePicker).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("fc477ddc", content, true, {});

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart-anchors[data-v-451ecadb]{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;padding:0 6px;color:#858585;line-height:0}.emoji-mart-anchor[data-v-451ecadb]{position:relative;display:block;-ms-flex:1 1 auto;flex:1 1 auto;text-align:center;padding:12px 4px;overflow:hidden;transition:color .1s ease-out}.emoji-mart-anchor-selected[data-v-451ecadb],.emoji-mart-anchor[data-v-451ecadb]:hover{color:#464646}.emoji-mart-anchor-selected .emoji-mart-anchor-bar[data-v-451ecadb]{bottom:0}.emoji-mart-anchor-bar[data-v-451ecadb]{position:absolute;bottom:-3px;left:0;width:100%;height:3px;background-color:#464646}.emoji-mart-anchors i[data-v-451ecadb]{display:inline-block;width:100%;max-width:22px}", ""]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("9e122220", content, true, {});

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart-anchors svg{fill:currentColor;max-height:18px}", ""]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SVGs = {
  activity: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113\"/></svg>",

  custom: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><g transform=\"translate(2.000000, 1.000000)\"><rect id=\"Rectangle\" x=\"8\" y=\"0\" width=\"3\" height=\"21\" rx=\"1.5\"></rect><rect id=\"Rectangle\" transform=\"translate(9.843, 10.549) rotate(60) translate(-9.843, -10.549) \" x=\"8.343\" y=\"0.049\" width=\"3\" height=\"21\" rx=\"1.5\"></rect><rect id=\"Rectangle\" transform=\"translate(9.843, 10.549) rotate(-60) translate(-9.843, -10.549) \" x=\"8.343\" y=\"0.049\" width=\"3\" height=\"21\" rx=\"1.5\"></rect></g></svg>",

  flags: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z\"/></svg>",

  foods: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9\"/></svg>",

  nature: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8\"/><path d=\"M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235\"/></svg>",

  objects: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z\"/><path d=\"M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789\"/></svg>",

  people: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10\"/><path d=\"M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0\"/></svg>",

  places: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5\"/><path d=\"M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z\"/></svg>",

  recent: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M13 4h-2l-.001 7H9v2h2v2h2v-2h4v-2h-4z\"/><path d=\"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10\"/></svg>",

  symbols: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76\"/></svg>"
};

exports.default = SVGs;

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"emoji-mart-anchors"},_vm._l((_vm.categories),function(category){return _c('span',{key:category.id,class:{ 'emoji-mart-anchor': true, 'emoji-mart-anchor-selected': category.id == _vm.activeCategory.id },style:({ 'color': (category.id == _vm.activeCategory.id ? _vm.color : '') }),attrs:{"title":_vm.i18n.categories[category.id]},on:{"click":function($event){_vm.$emit('click', category)}}},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.svgs[category.id])}}),_vm._v(" "),_c('span',{staticClass:"emoji-mart-anchor-bar",style:({ backgroundColor: _vm.color })})])}))}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("d5b1a6f4", content, true, {});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart-category[data-v-5ad42887]{position:relative}.emoji-mart-category .emoji-mart-emoji[data-v-5ad42887]:before{z-index:0;content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#f4f4f4;border-radius:100%;opacity:0}.emoji-mart-category .emoji-mart-emoji[data-v-5ad42887]:hover:before{opacity:1}.emoji-mart-category-label[data-v-5ad42887]{z-index:2;position:relative;position:-webkit-sticky;position:sticky;top:0}.emoji-mart-category-label span[data-v-5ad42887]{display:block;width:100%;font-weight:500;padding:5px 6px;background-color:#fff;background-color:hsla(0,0%,100%,.95)}.emoji-mart-no-results[data-v-5ad42887]{font-size:14px;text-align:center;padding-top:70px;color:#858585}.emoji-mart-no-results .emoji-mart-category-label[data-v-5ad42887]{display:none}.emoji-mart-no-results .emoji-mart-no-results-label[data-v-5ad42887]{margin-top:.2em}.emoji-mart-no-results .emoji-mart-emoji[data-v-5ad42887]:hover:before{content:none}", ""]);

// exports


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(83);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("e470d7f8", content, true, {});

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart-category .emoji-mart-emoji span{z-index:1;position:relative;text-align:center;cursor:default}", ""]);

// exports


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(85);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("29ae24ee", content, true, {});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart-emoji[data-v-7b41df26]{position:relative;display:inline-block;font-size:0}", ""]);

// exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(87);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(100);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(56);
module.exports = __webpack_require__(36).f('iterator');


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28);
var defined = __webpack_require__(29);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(52);
var descriptor = __webpack_require__(15);
var setToStringTag = __webpack_require__(35);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(8)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(9);
var getKeys = __webpack_require__(17);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(55);
var toAbsoluteIndex = __webpack_require__(94);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7);
var toObject = __webpack_require__(23);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(98);
var step = __webpack_require__(99);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(47)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
__webpack_require__(108);
__webpack_require__(109);
__webpack_require__(110);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(5);
var has = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(10);
var $export = __webpack_require__(13);
var redefine = __webpack_require__(51);
var META = __webpack_require__(103).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(33);
var setToStringTag = __webpack_require__(35);
var uid = __webpack_require__(22);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(36);
var wksDefine = __webpack_require__(37);
var enumKeys = __webpack_require__(104);
var isArray = __webpack_require__(105);
var anObject = __webpack_require__(9);
var isObject = __webpack_require__(14);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(30);
var createDesc = __webpack_require__(15);
var _create = __webpack_require__(52);
var gOPNExt = __webpack_require__(106);
var $GOPD = __webpack_require__(107);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(17);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(57).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(24).f = $propertyIsEnumerable;
  __webpack_require__(38).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(21)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(14);
var has = __webpack_require__(7);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(38);
var pIE = __webpack_require__(24);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(31);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(57).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(24);
var createDesc = __webpack_require__(15);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(30);
var has = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(49);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {



/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37)('asyncIterator');


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37)('observable');


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113);
module.exports = __webpack_require__(2).Object.keys;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(23);
var $keys = __webpack_require__(17);

__webpack_require__(114)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(13);
var core = __webpack_require__(2);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(116);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(13);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(117) });


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(38);
var pIE = __webpack_require__(24);
var toObject = __webpack_require__(23);
var IObject = __webpack_require__(54);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _String = String;

exports.default = _String.fromCodePoint || function stringFromCodePoint() {
  var MAX_SIZE = 0x4000;
  var codeUnits = [];
  var highSurrogate;
  var lowSurrogate;
  var index = -1;
  var length = arguments.length;
  if (!length) {
    return '';
  }
  var result = '';
  while (++index < length) {
    var codePoint = Number(arguments[index]);
    if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
    codePoint < 0 || // not a valid Unicode code point
    codePoint > 0x10ffff || // not a valid Unicode code point
    Math.floor(codePoint) != codePoint // not an integer
    ) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
    if (codePoint <= 0xffff) {
      // BMP code point
      codeUnits.push(codePoint);
    } else {
      // Astral code point; split in surrogate halves
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      codePoint -= 0x10000;
      highSurrogate = (codePoint >> 10) + 0xd800;
      lowSurrogate = codePoint % 0x400 + 0xdc00;
      codeUnits.push(highSurrogate, lowSurrogate);
    }
    if (index + 1 === length || codeUnits.length > MAX_SIZE) {
      result += String.fromCharCode.apply(null, codeUnits);
      codeUnits.length = 0;
    }
  }
  return result;
};

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.canRender)?_c('span',{staticClass:"emoji-mart-emoji",on:{"mouseenter":_vm.onMouseEnter,"mouseleave":_vm.onMouseLeave,"click":_vm.onClick}},[(_vm.isCustom)?_c('span',{style:(_vm.customEmojiStyles),attrs:{"title":_vm.title}}):(_vm.isNative)?_c('span',{style:(_vm.nativeEmojiStyles),attrs:{"title":_vm.title}},[_vm._v(_vm._s(_vm.nativeEmoji))]):(_vm.hasEmoji)?_c('span',{style:(_vm.fallbackEmojiStyles),attrs:{"title":_vm.title}}):_c('span',[_vm._v(_vm._s(_vm.fallbackEmoji))])]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isVisible && (_vm.isSearch || _vm.hasResults))?_c('div',{class:{ 'emoji-mart-category': true, 'emoji-mart-no-results': !_vm.hasResults }},[_c('div',{staticClass:"emoji-mart-category-label"},[_c('span',[_vm._v(_vm._s(_vm.i18n.categories[_vm.id]))])]),_vm._v(" "),_vm._l((_vm.emojis),function(emoji){return _c('nimble-emoji',{key:emoji.id || emoji,attrs:{"data":_vm.data,"emoji":emoji,"native":_vm.emojiProps.native,"skin":_vm.emojiProps.skin,"set":_vm.emojiProps.set,"size":_vm.emojiProps.size,"sheet-size":_vm.emojiProps.sheetSize,"force-size":_vm.emojiProps.forceSize,"tooltip":_vm.emojiProps.tooltip,"background-image-fn":_vm.emojiProps.backgroundImageFn},on:{"click":_vm.emojiProps.onClick,"mouseenter":_vm.emojiProps.onEnter,"mouseleave":_vm.emojiProps.onLeave}})}),_vm._v(" "),(!_vm.hasResults)?_c('div',[_c('nimble-emoji',{attrs:{"data":_vm.data,"size":_vm.emojiProps.size,"emoji":"sleuth_or_spy","native":_vm.emojiProps.native,"skin":_vm.emojiProps.skin,"set":_vm.emojiProps.set,"sheet-size":_vm.emojiProps.sheetSize,"background-image-fn":_vm.emojiProps.backgroundImageFn}}),_vm._v(" "),_c('div',{staticClass:"emoji-mart-no-results-label"},[_vm._v(_vm._s(_vm.i18n.notfound))])],1):_vm._e()],2):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(122);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("24e3c642", content, true, {});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart-preview[data-v-2eeff201]{position:relative;height:70px}.emoji-mart-preview-data[data-v-2eeff201],.emoji-mart-preview-emoji[data-v-2eeff201],.emoji-mart-preview-skins[data-v-2eeff201]{position:absolute;top:50%;-ms-transform:translateY(-50%);transform:translateY(-50%)}.emoji-mart-preview-emoji[data-v-2eeff201]{left:12px}.emoji-mart-preview-data[data-v-2eeff201]{left:68px;right:12px;word-break:break-all}.emoji-mart-preview-skins[data-v-2eeff201]{right:30px;text-align:right}.emoji-mart-preview-name[data-v-2eeff201]{font-size:14px}.emoji-mart-preview-shortname[data-v-2eeff201]{font-size:12px;color:#888}.emoji-mart-preview-emoticon+.emoji-mart-preview-emoticon[data-v-2eeff201],.emoji-mart-preview-shortname+.emoji-mart-preview-emoticon[data-v-2eeff201],.emoji-mart-preview-shortname+.emoji-mart-preview-shortname[data-v-2eeff201]{margin-left:.5em}.emoji-mart-preview-emoticon[data-v-2eeff201]{font-size:11px;color:#bbb}.emoji-mart-title span[data-v-2eeff201]{display:inline-block;vertical-align:middle}.emoji-mart-title .emoji-mart-emoji[data-v-2eeff201]{padding:0}.emoji-mart-title-label[data-v-2eeff201]{color:#999a9c;font-size:21px;font-weight:300}", ""]);

// exports


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(124);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("18dc0586", content, true, {});

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart-skin-swatches[data-v-08917036]{font-size:0;padding:2px 0;border:1px solid #d9d9d9;border-radius:12px;background-color:#fff}.emoji-mart-skin-swatches-opened .emoji-mart-skin-swatch[data-v-08917036]{width:16px;padding:0 2px}.emoji-mart-skin-swatches-opened .emoji-mart-skin-swatch-selected[data-v-08917036]:after{opacity:.75}.emoji-mart-skin-swatch[data-v-08917036]{display:inline-block;width:0;vertical-align:middle;transition-property:width,padding;transition-duration:.125s;transition-timing-function:ease-out}.emoji-mart-skin-swatch[data-v-08917036]:first-child{transition-delay:0s}.emoji-mart-skin-swatch[data-v-08917036]:nth-child(2){transition-delay:.03s}.emoji-mart-skin-swatch[data-v-08917036]:nth-child(3){transition-delay:.06s}.emoji-mart-skin-swatch[data-v-08917036]:nth-child(4){transition-delay:.09s}.emoji-mart-skin-swatch[data-v-08917036]:nth-child(5){transition-delay:.12s}.emoji-mart-skin-swatch[data-v-08917036]:nth-child(6){transition-delay:.15s}.emoji-mart-skin-swatch-selected[data-v-08917036]{position:relative;width:16px;padding:0 2px}.emoji-mart-skin-swatch-selected[data-v-08917036]:after{content:\"\";position:absolute;top:50%;left:50%;width:4px;height:4px;margin:-2px 0 0 -2px;background-color:#fff;border-radius:100%;pointer-events:none;opacity:0;transition:opacity .2s ease-out}.emoji-mart-skin[data-v-08917036]{display:inline-block;width:100%;padding-top:100%;max-width:12px;border-radius:100%}.emoji-mart-skin-tone-1[data-v-08917036]{background-color:#ffc93a}.emoji-mart-skin-tone-2[data-v-08917036]{background-color:#fadcbc}.emoji-mart-skin-tone-3[data-v-08917036]{background-color:#e0bb95}.emoji-mart-skin-tone-4[data-v-08917036]{background-color:#bf8f68}.emoji-mart-skin-tone-5[data-v-08917036]{background-color:#9b643d}.emoji-mart-skin-tone-6[data-v-08917036]{background-color:#594539}", ""]);

// exports


/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'emoji-mart-skin-swatches': true, 'emoji-mart-skin-swatches-opened': _vm.opened }},_vm._l((6),function(skinTone){return _c('span',{key:skinTone,class:{ 'emoji-mart-skin-swatch': true, 'emoji-mart-skin-swatch-selected': _vm.skin == skinTone }},[_c('span',{class:'emoji-mart-skin emoji-mart-skin-tone-' + skinTone,on:{"click":function($event){_vm.onClick(skinTone)}}})])}))}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"emoji-mart-preview"},[(_vm.emoji)?[_c('div',{staticClass:"emoji-mart-preview-emoji"},[_c('nimble-emoji',{attrs:{"data":_vm.data,"emoji":_vm.emoji,"native":_vm.emojiProps.native,"skin":_vm.emojiProps.skin,"set":_vm.emojiProps.set,"size":38,"sheet-size":_vm.emojiProps.sheetSize,"force-size":_vm.emojiProps.forceSize,"background-image-fn":_vm.emojiProps.backgroundImageFn}})],1),_vm._v(" "),_c('div',{staticClass:"emoji-mart-preview-data"},[_c('div',{staticClass:"emoji-mart-preview-name"},[_vm._v(_vm._s(_vm.emoji.name))]),_vm._v(" "),_c('div',{staticClass:"emoji-mart-preview-shortnames"},_vm._l((_vm.emojiShortNames),function(shortName){return _c('span',{key:shortName,staticClass:"emoji-mart-preview-shortname"},[_vm._v(":"+_vm._s(shortName)+":")])})),_vm._v(" "),_c('div',{staticClass:"emoji-mart-preview-emoticons"},_vm._l((_vm.emojiEmoticons),function(emoticon){return _c('span',{key:emoticon,staticClass:"emoji-mart-preview-emoticon"},[_vm._v(_vm._s(emoticon))])}))])]:[_c('div',{staticClass:"emoji-mart-preview-emoji"},[_c('nimble-emoji',{attrs:{"data":_vm.data,"emoji":_vm.idleEmoji,"native":_vm.emojiProps.native,"skin":_vm.emojiProps.skin,"set":_vm.emojiProps.set,"size":38,"sheet-size":_vm.emojiProps.sheetSize,"force-size":_vm.emojiProps.forceSize,"background-image-fn":_vm.emojiProps.backgroundImageFn}})],1),_vm._v(" "),_c('div',{staticClass:"emoji-mart-preview-data"},[_c('span',{staticClass:"emoji-mart-title-label"},[_vm._v(_vm._s(_vm.title))])]),_vm._v(" "),(_vm.showSkinTones)?_c('div',{staticClass:"emoji-mart-preview-skins"},[_c('skins',{attrs:{"skin":_vm.skinProps.skin},on:{"change":function($event){_vm.$emit('change', $event)}}})],1):_vm._e()]],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(128);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("b5b9dec6", content, true, {});

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart-search[data-v-4f5190ba]{margin-top:6px;padding:0 6px}.emoji-mart-search input[data-v-4f5190ba]{font-size:16px;display:block;width:100%;padding:.2em .6em;border-radius:25px;border:1px solid #d9d9d9;outline:0}", ""]);

// exports


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Object = Object;

exports.default = function createClass() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      _Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"emoji-mart-search"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],attrs:{"type":"text","placeholder":_vm.i18n.search},domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value}}})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(135);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("7e82b9e2", content, true, {});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart,.emoji-mart *{box-sizing:border-box;line-height:1.15}.emoji-mart .emoji-mart-emoji{padding:6px}", ""]);

// exports


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(137);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("f59ba26c", content, true, {});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".emoji-mart[data-v-882f1706]{font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,sans-serif;font-size:16px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:420px;color:#222427;border:1px solid #d9d9d9;border-radius:5px;background:#fff}.emoji-mart-bar[data-v-882f1706]{border:0 solid #d9d9d9}.emoji-mart-bar[data-v-882f1706]:first-child{border-bottom-width:1px;border-top-left-radius:5px;border-top-right-radius:5px}.emoji-mart-bar[data-v-882f1706]:last-child{border-top-width:1px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.emoji-mart-scroll[data-v-882f1706]{position:relative;overflow-y:scroll;-ms-flex:1;flex:1;padding:0 6px 6px;z-index:0;will-change:transform;-webkit-overflow-scrolling:touch}", ""]);

// exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(139);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(141);
module.exports = __webpack_require__(2).Array.from;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(48);
var $export = __webpack_require__(13);
var toObject = __webpack_require__(23);
var call = __webpack_require__(142);
var isArrayIter = __webpack_require__(143);
var toLength = __webpack_require__(55);
var createProperty = __webpack_require__(144);
var getIterFn = __webpack_require__(69);

$export($export.S + $export.F * !__webpack_require__(146)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(16);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(6);
var createDesc = __webpack_require__(15);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(31);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(148), __esModule: true };

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
__webpack_require__(27);
module.exports = __webpack_require__(149);


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var get = __webpack_require__(69);
module.exports = __webpack_require__(2).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

var isWindowAvailable = typeof window !== 'undefined';

isWindowAvailable && function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);

    lastTime = currTime + timeToCall;
    return id;
  };

  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}();

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"emoji-mart",style:(_vm.customStyles)},[(_vm.showCategories)?_c('div',{staticClass:"emoji-mart-bar"},[_c('anchors',{attrs:{"data":_vm.mutableData,"i18n":_vm.mutableI18n,"color":_vm.color,"categories":_vm.filteredCategories,"active-category":_vm.activeCategory},on:{"click":_vm.onAnchorClick}})],1):_vm._e(),_vm._v(" "),(_vm.showSearch)?_c('search',{ref:"search",attrs:{"data":_vm.mutableData,"i18n":_vm.mutableI18n,"emojis-to-show-filter":_vm.emojisToShowFilter,"include":_vm.include,"exclude":_vm.exclude,"custom":_vm.customEmojis,"recent":_vm.recentEmojis,"auto-focus":_vm.autoFocus},on:{"search":_vm.onSearch}}):_vm._e(),_vm._v(" "),_c('div',{ref:"scroll",staticClass:"emoji-mart-scroll",on:{"scroll":_vm.onScroll}},[_c('category',{directives:[{name:"show",rawName:"v-show",value:(_vm.searchEmojis),expression:"searchEmojis"}],attrs:{"data":_vm.mutableData,"i18n":_vm.mutableI18n,"id":"search","name":"Search","emojis":_vm.searchEmojis,"emoji-props":_vm.emojiProps}}),_vm._v(" "),_vm._l((_vm.filteredCategories),function(category){return _c('category',{directives:[{name:"show",rawName:"v-show",value:(!_vm.searchEmojis && (_vm.infiniteScroll || category == _vm.activeCategory)),expression:"!searchEmojis && (infiniteScroll || category == activeCategory)"}],key:category.id,ref:"categories",refInFor:true,attrs:{"data":_vm.mutableData,"i18n":_vm.mutableI18n,"id":category.id,"name":category.name,"emojis":category.emojis,"emoji-props":_vm.emojiProps}})})],2),_vm._v(" "),(_vm.showPreview)?_c('div',{staticClass:"emoji-mart-bar"},[_c('preview',{attrs:{"data":_vm.mutableData,"title":_vm.title,"emoji":_vm.previewEmoji,"idle-emoji":_vm.emoji,"show-skin-tones":_vm.showSkinTones,"emoji-props":_vm.emojiProps,"skin-props":_vm.skinProps},on:{"change":_vm.onSkinChange}})],1):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _all = __webpack_require__(40);

var _all2 = _interopRequireDefault(_all);

var _nimbleEmojiIndex = __webpack_require__(39);

var _nimbleEmojiIndex2 = _interopRequireDefault(_nimbleEmojiIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emojiIndex = new _nimbleEmojiIndex2.default(_all2.default);
var emojis = emojiIndex.emojis;
var emoticons = emojiIndex.emoticons;


function search() {
  return emojiIndex.search.apply(emojiIndex, arguments);
}

exports.default = { search: search, emojis: emojis, emoticons: emoticons };

/***/ })
/******/ ]);
});