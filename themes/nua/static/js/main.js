/******/ (function(modules) { // webpackBootstrap
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/vanilla-lazyload/dist/lazyload.es2015.js":
/*!***************************************************************!*\
  !*** ./node_modules/vanilla-lazyload/dist/lazyload.es2015.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst defaultSettings = {\n\telements_selector: \"img\",\n\tcontainer: document,\n\tthreshold: 300,\n\tthresholds: null,\n\tdata_src: \"src\",\n\tdata_srcset: \"srcset\",\n\tdata_sizes: \"sizes\",\n\tclass_loading: \"loading\",\n\tclass_loaded: \"loaded\",\n\tclass_error: \"error\",\n\tload_delay: 0,\n\tcallback_load: null,\n\tcallback_error: null,\n\tcallback_set: null,\n\tcallback_enter: null,\n\tto_webp: false\n};\n\nvar getInstanceSettings = customSettings => {\n\treturn Object.assign({}, defaultSettings, customSettings);\n};\n\nconst dataPrefix = \"data-\";\nconst processedDataName = \"was-processed\";\nconst timeoutDataName = \"ll-timeout\";\nconst trueString = \"true\";\n\nconst getData = (element, attribute) => {\n\treturn element.getAttribute(dataPrefix + attribute);\n};\n\nconst setData = (element, attribute, value) => {\n\tvar attrName = dataPrefix + attribute;\n\tif (value === null) {\n\t\telement.removeAttribute(attrName);\n\t\treturn;\n\t}\n\telement.setAttribute(attrName, value);\n};\n\nconst setWasProcessedData = element =>\n\tsetData(element, processedDataName, trueString);\n\nconst getWasProcessedData = element =>\n\tgetData(element, processedDataName) === trueString;\n\nconst setTimeoutData = (element, value) =>\n\tsetData(element, timeoutDataName, value);\n\nconst getTimeoutData = element => getData(element, timeoutDataName);\n\nfunction purgeElements(elements) {\n\treturn elements.filter(element => !getWasProcessedData(element));\n}\n\n/* Creates instance and notifies it through the window element */\nconst createInstance = function(classObj, options) {\n\tvar event;\n\tlet eventString = \"LazyLoad::Initialized\";\n\tlet instance = new classObj(options);\n\ttry {\n\t\t// Works in modern browsers\n\t\tevent = new CustomEvent(eventString, { detail: { instance } });\n\t} catch (err) {\n\t\t// Works in Internet Explorer (all versions)\n\t\tevent = document.createEvent(\"CustomEvent\");\n\t\tevent.initCustomEvent(eventString, false, false, { instance });\n\t}\n\twindow.dispatchEvent(event);\n};\n\n/* Auto initialization of one or more instances of lazyload, depending on the \n    options passed in (plain object or an array) */\nfunction autoInitialize(classObj, options) {\n\tif (!options) {\n\t\treturn;\n\t}\n\tif (!options.length) {\n\t\t// Plain object\n\t\tcreateInstance(classObj, options);\n\t} else {\n\t\t// Array of objects\n\t\tfor (let i = 0, optionsItem; (optionsItem = options[i]); i += 1) {\n\t\t\tcreateInstance(classObj, optionsItem);\n\t\t}\n\t}\n}\n\nconst replaceExtToWebp = (value, condition) =>\n\tcondition ? value.replace(/\\.(jpe?g|png)/gi, \".webp\") : value;\n\nconst detectWebp = () => {\n\tvar webpString = \"image/webp\";\n\tvar canvas = document.createElement(\"canvas\");\n\n\tif (canvas.getContext && canvas.getContext(\"2d\")) {\n\t\treturn canvas.toDataURL(webpString).indexOf(`data:${webpString}`) === 0;\n\t}\n\n\treturn false;\n};\n\nconst runningOnBrowser = typeof window !== \"undefined\";\n\nconst isBot =\n\t(runningOnBrowser && !(\"onscroll\" in window)) ||\n\t/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);\n\nconst supportsIntersectionObserver =\n\trunningOnBrowser && \"IntersectionObserver\" in window;\n\nconst supportsClassList =\n\trunningOnBrowser && \"classList\" in document.createElement(\"p\");\n\nconst supportsWebp = runningOnBrowser && detectWebp();\n\nconst setSourcesInChildren = function(\n\tparentTag,\n\tattrName,\n\tdataAttrName,\n\ttoWebpFlag\n) {\n\tfor (let i = 0, childTag; (childTag = parentTag.children[i]); i += 1) {\n\t\tif (childTag.tagName === \"SOURCE\") {\n\t\t\tlet attrValue = getData(childTag, dataAttrName);\n\t\t\tsetAttributeIfValue(childTag, attrName, attrValue, toWebpFlag);\n\t\t}\n\t}\n};\n\nconst setAttributeIfValue = function(\n\telement,\n\tattrName,\n\tvalue,\n\ttoWebpFlag\n) {\n\tif (!value) {\n\t\treturn;\n\t}\n\telement.setAttribute(attrName, replaceExtToWebp(value, toWebpFlag));\n};\n\nconst setSourcesImg = (element, settings) => {\n\tconst toWebpFlag = supportsWebp && settings.to_webp;\n\tconst srcsetDataName = settings.data_srcset;\n\tconst parent = element.parentNode;\n\n\tif (parent && parent.tagName === \"PICTURE\") {\n\t\tsetSourcesInChildren(parent, \"srcset\", srcsetDataName, toWebpFlag);\n\t}\n\tconst sizesDataValue = getData(element, settings.data_sizes);\n\tsetAttributeIfValue(element, \"sizes\", sizesDataValue);\n\tconst srcsetDataValue = getData(element, srcsetDataName);\n\tsetAttributeIfValue(element, \"srcset\", srcsetDataValue, toWebpFlag);\n\tconst srcDataValue = getData(element, settings.data_src);\n\tsetAttributeIfValue(element, \"src\", srcDataValue, toWebpFlag);\n};\n\nconst setSourcesIframe = (element, settings) => {\n\tconst srcDataValue = getData(element, settings.data_src);\n\n\tsetAttributeIfValue(element, \"src\", srcDataValue);\n};\n\nconst setSourcesVideo = (element, settings) => {\n\tconst srcDataName = settings.data_src;\n\tconst srcDataValue = getData(element, srcDataName);\n\n\tsetSourcesInChildren(element, \"src\", srcDataName);\n\tsetAttributeIfValue(element, \"src\", srcDataValue);\n\telement.load();\n};\n\nconst setSourcesBgImage = (element, settings) => {\n\tconst toWebpFlag = supportsWebp && settings.to_webp;\n\tconst srcDataValue = getData(element, settings.data_src);\n\n\tif (srcDataValue) {\n\t\tlet setValue = replaceExtToWebp(srcDataValue, toWebpFlag);\n\t\telement.style.backgroundImage = `url(\"${setValue}\")`;\n\t}\n};\n\nconst setSourcesFunctions = {\n\tIMG: setSourcesImg,\n\tIFRAME: setSourcesIframe,\n\tVIDEO: setSourcesVideo\n};\n\nconst setSources = (element, settings) => {\n\tconst tagName = element.tagName;\n\tconst setSourcesFunction = setSourcesFunctions[tagName];\n\tif (setSourcesFunction) {\n\t\tsetSourcesFunction(element, settings);\n\t\treturn;\n\t}\n\tsetSourcesBgImage(element, settings);\n};\n\nconst addClass = (element, className) => {\n\tif (supportsClassList) {\n\t\telement.classList.add(className);\n\t\treturn;\n\t}\n\telement.className += (element.className ? \" \" : \"\") + className;\n};\n\nconst removeClass = (element, className) => {\n\tif (supportsClassList) {\n\t\telement.classList.remove(className);\n\t\treturn;\n\t}\n\telement.className = element.className.\n\t\treplace(new RegExp(\"(^|\\\\s+)\" + className + \"(\\\\s+|$)\"), \" \").\n\t\treplace(/^\\s+/, \"\").\n\t\treplace(/\\s+$/, \"\");\n};\n\nconst callbackIfSet = (callback, argument) => {\n\tif (callback) {\n\t\tcallback(argument);\n\t}\n};\n\nconst genericLoadEventName = \"load\";\nconst mediaLoadEventName = \"loadeddata\";\nconst errorEventName = \"error\";\n\nconst addEventListener = (element, eventName, handler) => {\n\telement.addEventListener(eventName, handler);\n};\n\nconst removeEventListener = (element, eventName, handler) => {\n\telement.removeEventListener(eventName, handler);\n};\n\nconst addAllEventListeners = (element, loadHandler, errorHandler) => {\n\taddEventListener(element, genericLoadEventName, loadHandler);\n\taddEventListener(element, mediaLoadEventName, loadHandler);\n\taddEventListener(element, errorEventName, errorHandler);\n};\n\nconst removeAllEventListeners = (element, loadHandler, errorHandler) => {\n\tremoveEventListener(element, genericLoadEventName, loadHandler);\n\tremoveEventListener(element, mediaLoadEventName, loadHandler);\n\tremoveEventListener(element, errorEventName, errorHandler);\n};\n\nconst eventHandler = function(event, success, settings) {\n\tconst className = success ? settings.class_loaded : settings.class_error;\n\tconst callback = success ? settings.callback_load : settings.callback_error;\n\tconst element = event.target;\n\n\tremoveClass(element, settings.class_loading);\n\taddClass(element, className);\n\tcallbackIfSet(callback, element);\n};\n\nconst addOneShotEventListeners = (element, settings) => {\n\tconst loadHandler = event => {\n\t\teventHandler(event, true, settings);\n\t\tremoveAllEventListeners(element, loadHandler, errorHandler);\n\t};\n\tconst errorHandler = event => {\n\t\teventHandler(event, false, settings);\n\t\tremoveAllEventListeners(element, loadHandler, errorHandler);\n\t};\n\taddAllEventListeners(element, loadHandler, errorHandler);\n};\n\nconst managedTags = [\"IMG\", \"IFRAME\", \"VIDEO\"];\n\nconst loadAndUnobserve = (element, observer, settings) => {\n\trevealElement(element, settings);\n\tobserver.unobserve(element);\n};\n\nconst cancelDelayLoad = element => {\n\tvar timeoutId = getTimeoutData(element);\n\tif (!timeoutId) {\n\t\treturn; // do nothing if timeout doesn't exist\n\t}\n\tclearTimeout(timeoutId);\n\tsetTimeoutData(element, null);\n};\n\nconst delayLoad = (element, observer, settings) => {\n\tvar loadDelay = settings.load_delay;\n\tvar timeoutId = getTimeoutData(element);\n\tif (timeoutId) {\n\t\treturn; // do nothing if timeout already set\n\t}\n\ttimeoutId = setTimeout(function() {\n\t\tloadAndUnobserve(element, observer, settings);\n\t\tcancelDelayLoad(element);\n\t}, loadDelay);\n\tsetTimeoutData(element, timeoutId);\n};\n\nfunction revealElement(element, settings, force) {\n\tif (!force && getWasProcessedData(element)) {\n\t\treturn; // element has already been processed and force wasn't true\n\t}\n\tcallbackIfSet(settings.callback_enter, element);\n\tif (managedTags.indexOf(element.tagName) > -1) {\n\t\taddOneShotEventListeners(element, settings);\n\t\taddClass(element, settings.class_loading);\n\t}\n\tsetSources(element, settings);\n\tsetWasProcessedData(element);\n\tcallbackIfSet(settings.callback_set, element);\n}\n\n/* entry.isIntersecting needs fallback because is null on some versions of MS Edge, and\n   entry.intersectionRatio is not enough alone because it could be 0 on some intersecting elements */\nconst isIntersecting = entry =>\n\tentry.isIntersecting || entry.intersectionRatio > 0;\n\nconst getObserverSettings = settings => ({\n\troot: settings.container === document ? null : settings.container,\n\trootMargin: settings.thresholds || settings.threshold + \"px\"\n});\n\nconst LazyLoad = function(customSettings, elements) {\n\tthis._settings = getInstanceSettings(customSettings);\n\tthis._setObserver();\n\tthis.update(elements);\n};\n\nLazyLoad.prototype = {\n\t_manageIntersection: function(entry) {\n\t\tvar observer = this._observer;\n\t\tvar settings = this._settings;\n\t\tvar loadDelay = this._settings.load_delay;\n\t\tvar element = entry.target;\n\t\tif (isIntersecting(entry)) {\n\t\t\tif (!loadDelay) {\n\t\t\t\tloadAndUnobserve(element, observer, settings);\n\t\t\t} else {\n\t\t\t\tdelayLoad(element, observer, settings);\n\t\t\t}\n\t\t}\n\n\t\t// Writes in and outs in a data-attribute\n\t\tif (!isIntersecting(entry)) {\n\t\t\tcancelDelayLoad(element);\n\t\t}\n\t},\n\t_onIntersection: function(entries) {\n\t\tentries.forEach(this._manageIntersection.bind(this));\n\t\tthis._elements = purgeElements(this._elements);\n\t},\n\t_setObserver: function() {\n\t\tif (!supportsIntersectionObserver) {\n\t\t\treturn;\n\t\t}\n\t\tthis._observer = new IntersectionObserver(\n\t\t\tthis._onIntersection.bind(this),\n\t\t\tgetObserverSettings(this._settings)\n\t\t);\n\t},\n\n\tloadAll: function() {\n\t\tthis._elements.forEach(element => {\n\t\t\tthis.load(element);\n\t\t});\n\t\tthis._elements = purgeElements(this._elements);\n\t},\n\n\tupdate: function(elements) {\n\t\tconst settings = this._settings;\n\t\tconst nodeSet =\n\t\t\telements ||\n\t\t\tsettings.container.querySelectorAll(settings.elements_selector);\n\n\t\tthis._elements = purgeElements(Array.prototype.slice.call(nodeSet)); // nodeset to array for IE compatibility\n\n\t\tif (isBot || !this._observer) {\n\t\t\tthis.loadAll();\n\t\t\treturn;\n\t\t}\n\n\t\tthis._elements.forEach(element => {\n\t\t\tthis._observer.observe(element);\n\t\t});\n\t},\n\n\tdestroy: function() {\n\t\tif (this._observer) {\n\t\t\tpurgeElements(this._elements).forEach(element => {\n\t\t\t\tthis._observer.unobserve(element);\n\t\t\t});\n\t\t\tthis._observer = null;\n\t\t}\n\t\tthis._elements = null;\n\t\tthis._settings = null;\n\t},\n\n\tload: function(element, force) {\n\t\trevealElement(element, this._settings, force);\n\t}\n};\n\n/* Automatic instances creation if required (useful for async script loading) */\nif (runningOnBrowser) {\n\tautoInitialize(LazyLoad, window.lazyLoadOptions);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LazyLoad);\n\n\n//# sourceURL=webpack:///./node_modules/vanilla-lazyload/dist/lazyload.es2015.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vanilla-lazyload */ \"./node_modules/vanilla-lazyload/dist/lazyload.es2015.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n/* harmony import */ var _toc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toc */ \"./src/js/toc.js\");\n\n\n\n\nObject(_utils__WEBPACK_IMPORTED_MODULE_1__[\"ready\"])(async () => {\n  _toc__WEBPACK_IMPORTED_MODULE_2__[\"TableOfContents\"].init()\n\n  new vanilla_lazyload__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    elements_selector: '.lazy'\n  });\n})\n\nif (Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"env\"])() === 'production' && 'serviceWorker' in navigator) {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('/service-worker.js')\n  })\n}\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/js/toc.js":
/*!***********************!*\
  !*** ./src/js/toc.js ***!
  \***********************/
/*! exports provided: TableOfContents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TableOfContents\", function() { return TableOfContents; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\nconst TableOfContents = {\n  container: document.querySelector('.js-toc'),\n  listContainer: document.querySelector('.js-toc-list'),\n  links: null,\n  headings: null,\n  intersectionOptions: {\n    rootMargin: '0px',\n    threshold: 1\n  },\n  previousSection: null,\n  observer: null,\n  toggle: document.querySelector('.js-toc-toggle'),\n\n  init() {\n    if (!this.container) return\n\n    this.handleObserver = this.handleObserver.bind(this)\n\n    this.setUpObserver()\n    this.findLinksAndHeadings()\n    this.observeSections()\n\n    this.toggle.addEventListener('click', this.handleToggleClick.bind(this))\n    \n    this.links.forEach(link => {\n      link.addEventListener('click', this.handleLinkClick.bind(this))\n    })\n  },\n  \n  handleToggleClick() {\n    this.container.classList.toggle('is-active')\n\n    this.listContainer.addEventListener(\n      'transitionend',\n      () => {\n        if (this.container.classList.contains('is-active')) {\n          this.links[0].focus()\n        }\n      },\n      { once: true }\n    )\n  },\n\n  handleLinkClick(evt) {\n    evt.preventDefault()\n    let id = evt.target.getAttribute('href').replace('#', '')\n\n    let section = this.headings.find(heading => {\n      return heading.getAttribute('id') === id\n    })\n\n    section.setAttribute('tabindex', -1)\n    section.focus()\n\n    window.scroll({\n      behavior: _utils__WEBPACK_IMPORTED_MODULE_0__[\"motionQuery\"].matches ? 'instant' : 'smooth',\n      top: section.offsetTop - 15,\n      block: 'start'\n    })\n\n    if (this.container.classList.contains('is-active')) {\n      this.container.classList.remove('is-active')\n    }\n  },\n\n  handleObserver(entries, observer) {\n    entries.forEach(entry => {\n      let href = `#${entry.target.getAttribute('id')}`,\n        link = this.links.find(l => l.getAttribute('href') === href)\n\n      if (entry.isIntersecting && entry.intersectionRatio === 1) {\n        link.classList.add('is-visible')\n        this.previousSection = entry.target.getAttribute('id')\n      } else {\n        link.classList.remove('is-visible')\n      }\n\n      this.highlightFirstActive()\n    })\n  },\n\n  highlightFirstActive() {\n    let firstVisibleLink = this.container.querySelector('.is-visible')\n\n    this.links.forEach(link => {\n      link.classList.remove('is-active')\n    })\n\n    if (firstVisibleLink) {\n      firstVisibleLink.classList.add('is-active')\n    }\n\n    if (!firstVisibleLink && this.previousSection) {\n      this.container.querySelector(\n        `a[href=\"#${this.previousSection}\"]`\n      ).classList.add('is-active')\n    }\n  },\n\n  observeSections() {\n    this.headings.forEach(heading => {\n      this.observer.observe(heading)\n    })\n  },\n\n  setUpObserver() {\n    this.observer = new IntersectionObserver(\n      this.handleObserver,\n      this.intersectionOptions\n    )\n  },\n\n  findLinksAndHeadings() {\n    this.links = [...this.container.querySelectorAll('a')]\n    this.headings = this.links.map(link => {\n      let id = link.getAttribute('href')\n      return document.querySelector(id)\n    })\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/toc.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: ready, env, motionQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ready\", function() { return ready; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"env\", function() { return env; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"motionQuery\", function() { return motionQuery; });\nfunction ready(fn) {\n  document.addEventListener('DOMContentLoaded', fn, false)\n}\n\nfunction env() {\n  if (process && process.env && \"development\") {\n    return \"development\"\n  }\n\n  return 'production'\n}\n\nconst motionQuery = window.matchMedia('(prefers-reduced-motion)')\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./src/js/utils.js?");

/***/ })

/******/ });