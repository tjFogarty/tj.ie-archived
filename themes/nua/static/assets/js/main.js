/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "assets/js/chunks/" + ({"microlight":"microlight","vendors~basicscroll":"vendors~basicscroll","vendors~focus-trap":"vendors~focus-trap","vendors~search":"vendors~search"}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-libs-browser/node_modules/process/browser.js":
/*!************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/process/browser.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/node-libs-browser/node_modules/process/browser.js?");

/***/ }),

/***/ "./src/js/intro.js":
/*!*************************!*\
  !*** ./src/js/intro.js ***!
  \*************************/
/*! exports provided: Intro */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Intro\", function() { return Intro; });\nconst Intro = {\n  hero: document.querySelector('.c-hero'),\n\n  init() {\n    if (this.hero) {\n      this.loadBasicScroll()\n      this.registerWorklet()\n    }\n  },\n\n  async loadBasicScroll() {\n    let {\n      create\n      // @ts-ignore\n    } = await __webpack_require__.e(/*! import() | basicscroll */ \"vendors~basicscroll\").then(__webpack_require__.t.bind(null, /*! basicscroll */ \"./node_modules/basicscroll/dist/basicScroll.min.js\", 7))\n\n    const instance = create({\n      elem: this.hero,\n      from: '0',\n      to: '300px',\n      props: {\n        '--hero-position-y': {\n          from: '0%',\n          to: '5%'\n        }\n      }\n    })\n\n    instance.start()\n  },\n\n  async registerWorklet() {\n    // @ts-ignore\n    if ('paintWorklet' in window.CSS) {\n      // @ts-ignore\n      await window.CSS.paintWorklet.addModule('/paint/separator.js')\n      this.hero.setAttribute(\n        'style',\n        '--separator-shape:curve-right; --separator-size: 35px;'\n      )\n      this.hero.classList.add('is-loaded')\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/intro.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search */ \"./src/js/search.js\");\n/* harmony import */ var _page_visibility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-visibility */ \"./src/js/page-visibility.js\");\n/* harmony import */ var _intro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./intro */ \"./src/js/intro.js\");\n\n\n\n\n\nObject(_utils__WEBPACK_IMPORTED_MODULE_0__[\"ready\"])(async () => {\n  // Search.init()\n  _page_visibility__WEBPACK_IMPORTED_MODULE_2__[\"PageVisibility\"].init()\n  _intro__WEBPACK_IMPORTED_MODULE_3__[\"Intro\"].init()\n\n  Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"showDeveloperMessage\"])()\n\n  if (document.querySelector('pre')) {\n    let codeBlocks = document.querySelectorAll('pre')\n    // @ts-ignore\n    let microlight = await __webpack_require__.e(/*! import() | microlight */ \"microlight\").then(__webpack_require__.t.bind(null, /*! microlight */ \"./node_modules/microlight/microlight.js\", 7))\n\n    codeBlocks.forEach(block => block.classList.add('microlight'))\n\n    microlight.reset()\n  }\n})\n\nif ('serviceWorker' in navigator && Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"env\"])() === 'production') {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('/sw.js').catch(registrationError => {\n      console.log('SW registration failed: ', registrationError)\n    })\n  })\n}\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/js/page-visibility.js":
/*!***********************************!*\
  !*** ./src/js/page-visibility.js ***!
  \***********************************/
/*! exports provided: PageVisibility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PageVisibility\", function() { return PageVisibility; });\nconst PageVisibility = {\n  asleepEmoji: '💤',\n  originalTitle: document.title,\n\n  init () {\n    if (typeof document.hidden === 'undefined') return\n\n    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)\n\n    document.addEventListener('visibilitychange', this.handleVisibilityChange, false)\n  },\n\n  handleVisibilityChange () {\n    let title = this.originalTitle\n\n    if (document.hidden) {\n      title = `${this.asleepEmoji} ${title}`\n    }\n\n    document.title = title\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/page-visibility.js?");

/***/ }),

/***/ "./src/js/search.js":
/*!**************************!*\
  !*** ./src/js/search.js ***!
  \**************************/
/*! exports provided: Search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Search\", function() { return Search; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\nconst Search = {\n  trigger: document.querySelectorAll('.js-search'),\n  input: document.querySelector('.js-search-input'),\n  container: document.querySelector('.js-search-container'),\n  resultsContainer: document.querySelector('.js-search-results'),\n  focusTrap: null,\n  body: document.body,\n  index: null,\n\n  init() {\n    this.handleTriggerClick = this.handleTriggerClick.bind(this)\n    this.performSearch = this.performSearch.bind(this)\n\n    document.addEventListener('keyup', e => {\n      if (e.keyCode === 27) {\n        this.container.classList.remove('is-open')\n        this.resetSearch()\n      }\n    })\n\n    this.trigger.forEach(trigger => {\n      trigger.addEventListener('click', this.handleTriggerClick)\n    })\n\n    this.input.addEventListener('keyup', this.performSearch)\n  },\n\n  async performSearch(event) {\n    if (!this.index) return\n\n    let { hits } = await this.index.search({ query: event.target.value })\n\n    if (!hits || !hits.length) return this.displayNoResults()\n\n    this.displayResults(hits)\n  },\n\n  resetSearch() {\n    this.body.style.overflow = ''\n    // @ts-ignore\n    this.input.value = ''\n    this.focusTrap.deactivate()\n    this.emptyResultContainer()\n  },\n\n  showSearch() {\n    this.body.style.overflow = 'hidden'\n    // @ts-ignore\n    this.input.focus()\n    this.focusTrap.activate()\n  },\n\n  async handleTriggerClick(e) {\n    e.preventDefault()\n    this.container.classList.toggle('is-open')\n\n    let createFocusTrap = await __webpack_require__.e(/*! import() | focus-trap */ \"vendors~focus-trap\").then(__webpack_require__.t.bind(null, /*! focus-trap */ \"./node_modules/focus-trap/index.js\", 7))\n\n    this.focusTrap = createFocusTrap.default('#search-dialog')\n\n    if (this.container.classList.contains('is-open')) {\n      this.showSearch()\n    } else {\n      this.resetSearch()\n    }\n\n    this.loadSearchClient()\n  },\n\n  async loadSearchClient() {\n    let algoliasearch = await __webpack_require__.e(/*! import() | search */ \"vendors~search\").then(__webpack_require__.t.bind(null, /*! algoliasearch/lite */ \"./node_modules/algoliasearch/src/browser/builds/algoliasearchLite.js\", 7))\n\n    let client = algoliasearch.default(\n      'B5ZTA540XE',\n      '5760522b641a5ab4334c5a2806c4aa67'\n    )\n\n    this.index = client.initIndex(\n      Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"env\"])() === 'development' ? 'dev_posts' : 'prod_posts'\n    )\n  },\n\n  displayResults(results) {\n    this.emptyResultContainer()\n\n    results.forEach(result => {\n      let resultLink = this.getResultLink(result)\n      this.resultsContainer.appendChild(resultLink)\n    })\n  },\n\n  emptyResultContainer() {\n    while (this.resultsContainer.firstChild) {\n      this.resultsContainer.removeChild(this.resultsContainer.firstChild)\n    }\n  },\n\n  getResultLink(result) {\n    let link = document.createElement('a')\n    let title = document.createElement('h4')\n\n    link.setAttribute('class', 'no-underline block mb-6')\n    link.setAttribute('href', result.url)\n\n    title.setAttribute('class', 'hover:text-primary')\n    title.innerText = result.title\n\n    link.appendChild(title)\n\n    return link\n  },\n\n  displayNoResults() {\n    this.resultsContainer.innerHTML = `<h3>No results found</h3>`\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/search.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: ready, env, showDeveloperMessage, hasDoNotTrackEnabled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ready\", function() { return ready; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"env\", function() { return env; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"showDeveloperMessage\", function() { return showDeveloperMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasDoNotTrackEnabled\", function() { return hasDoNotTrackEnabled; });\nfunction ready(fn) {\n  document.addEventListener('DOMContentLoaded', fn)\n}\n\nfunction env() {\n  if (process && process.env && \"development\") {\n    return \"development\"\n  }\n\n  return 'production'\n}\n\nfunction showDeveloperMessage() {\n  console.log(\n    '%c Howdy, looking for the source? https://github.com/tjFogarty/personal-site',\n    'color: #ac3b61'\n  )\n}\n\n// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack\nfunction hasDoNotTrackEnabled() {\n  let doNotTrack = navigator.doNotTrack || window.doNotTrack\n\n  return doNotTrack === '1'\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/node-libs-browser/node_modules/process/browser.js */ \"./node_modules/node-libs-browser/node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./src/js/utils.js?");

/***/ })

/******/ });