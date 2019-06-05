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

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/tornis/dist/tornis.js":
/*!********************************************!*\
  !*** ./node_modules/tornis/dist/tornis.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,s){ true?s(exports):undefined}(this,function(t){"use strict";function s(t,s){let i=0;return function(...e){const h=(new Date).getTime();if(!(h-i<t))return i=h,s(...e)}}function i(t){return Math.floor(t.reduce((t,s)=>t+s,0)/t.length)}class e{constructor(){this.lastX=0,this.lastY=0,this.lastWidth=window.innerWidth,this.lastHeight=window.innerHeight,this.lastMouseX=0,this.lastMouseY=0,this.scrollHeight=document.body.scrollHeight,this.scrollChange=!1,this.sizeChange=!1,this.mouseChange=!1,this.currX=0,this.currY=0,this.currWidth=window.innerWidth,this.currHeight=window.innerHeight,this.currMouseX=0,this.currMouseY=0,this.mouseXVelocity=[],this.mouseYVelocity=[],this.lastMouseXVelocity=0,this.lastMouseYVelocity=0,this.updating=!1,this.callbacks=[],this.update=this.update.bind(this),this.handleResize=this.handleResize.bind(this),this.handleMouse=this.handleMouse.bind(this),this.formatData=this.formatData.bind(this),this.watch=this.watch.bind(this),this.unwatch=this.unwatch.bind(this),this.handleResize=s(110,this.handleResize),this.handleMouse=s(75,this.handleMouse),window.addEventListener("resize",this.handleResize),window.addEventListener("mousemove",this.handleMouse),requestAnimationFrame(this.update)}handleResize(t){this.currWidth=window.innerWidth,this.currHeight=window.innerHeight}handleMouse(t){this.currMouseX=t.clientX,this.currMouseY=t.clientY}formatData(){return{scroll:{changed:this.scrollChange,left:Math.floor(this.lastX),right:Math.floor(this.lastX+this.lastWidth),top:Math.floor(this.lastY),bottom:Math.floor(this.lastY+this.lastHeight),velocity:{x:Math.floor(this.scrollXVelocity)||0,y:Math.floor(this.scrollYVelocity)||0}},size:{changed:this.sizeChange,x:Math.floor(this.lastWidth),y:Math.floor(this.lastHeight),docY:Math.floor(this.scrollHeight)},mouse:{changed:this.mouseChange,x:Math.floor(this.lastMouseX),y:Math.floor(this.lastMouseY),velocity:{x:Math.floor(this.lastMouseXVelocity)||0,y:Math.floor(this.lastMouseYVelocity)||0}}}}updateSize(){}update(){const{currWidth:currWidth,currHeight:currHeight,currMouseX:currMouseX,currMouseY:currMouseY}=this;if(this.updating)return!1;this.scrollChange=this.sizeChange=this.mouseChange=!1,window.pageXOffset==this.lastX&&0!=this.scrollXVelocity&&(this.scrollXVelocity=0,this.scrollChange=!0),window.pageYOffset==this.lastY&&0!=this.scrollYVelocity&&(this.scrollYVelocity=0,this.scrollChange=!0),window.pageXOffset!=this.lastX&&(this.scrollChange=!0,this.scrollXVelocity=Math.floor(window.pageXOffset-this.lastX),this.lastX=window.pageXOffset),window.pageYOffset!=this.lastY&&(this.scrollChange=!0,this.scrollYVelocity=Math.floor(window.pageYOffset-this.lastY),this.lastY=window.pageYOffset),currWidth!=this.lastWidth&&(this.lastWidth=currWidth,this.scrollHeight=document.body.scrollHeight,this.sizeChange=!0),currHeight!=this.lastHeight&&(this.lastHeight=currHeight,this.sizeChange=!0),this.mouseXVelocity.length>5&&this.mouseXVelocity.shift(),this.mouseXVelocity.push(currMouseX-this.lastMouseX),i(this.mouseXVelocity)!=this.lastMouseXVelocity&&(this.lastMouseXVelocity=i(this.mouseXVelocity),this.mouseChange=!0),currMouseX!=this.lastMouseX&&(this.lastMouseX=currMouseX,this.mouseChange=!0),this.mouseYVelocity.length>5&&this.mouseYVelocity.shift(),this.mouseYVelocity.push(currMouseY-this.lastMouseY),i(this.mouseYVelocity)!=this.lastMouseYVelocity&&(this.lastMouseYVelocity=i(this.mouseYVelocity),this.mouseChange=!0),currMouseY==this.lastMouseY&&0==i(this.mouseYVelocity)||(this.lastMouseY=currMouseY,this.mouseChange=!0),(this.scrollChange||this.sizeChange||this.mouseChange)&&this.callbacks.forEach(t=>t(this.formatData())),this.updating=!1,requestAnimationFrame(this.update)}watch(t,s=!0){if("function"!=typeof t)throw new Error("Value passed to Watch is not a function");if(s){const s=this.formatData();s.scroll.changed=!0,s.mouse.changed=!0,s.size.changed=!0,t(s)}this.callbacks.push(t)}unwatch(t){if("function"!=typeof t)throw new Error("The value passed to unwatch is not a function");this.callbacks=this.callbacks.filter(s=>s!==t)}}const h=new e;window.__TORNIS={watchViewport:h.watch,unwatchViewport:h.unwatch,getViewportState:h.formatData};const o=h.watch,a=h.unwatch,l=h.formatData;t.getViewportState=l,t.unwatchViewport=a,t.watchViewport=o,Object.defineProperty(t,"__esModule",{value:!0})});


/***/ }),

/***/ "./src/js/cover-image.js":
/*!*******************************!*\
  !*** ./src/js/cover-image.js ***!
  \*******************************/
/*! exports provided: CoverImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoverImage", function() { return CoverImage; });
/* harmony import */ var tornis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tornis */ "./node_modules/tornis/dist/tornis.js");
/* harmony import */ var tornis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tornis__WEBPACK_IMPORTED_MODULE_0__);


const CoverImage = {
  async init() {
    this.coverImage = document.querySelector('.js-cover-image')

    if (!this.coverImage) return

    this.setVariables(0, 0)

    this.updateValues = this.updateValues.bind(this)

    Object(tornis__WEBPACK_IMPORTED_MODULE_0__["watchViewport"])(this.updateValues)
  },

  setVariables(blur, ty) {
    document.body.style.setProperty('--coverImageBlur', blur)
    document.body.style.setProperty('--coverImageTranslateY', ty)
  },

  updateValues({ scroll }) {
    if (scroll.changed && scroll.top) {
      let scrollOffset = scroll.top / this.coverImage.clientHeight

      scrollOffset = scrollOffset < 0 ? 0 : scrollOffset
      scrollOffset = scrollOffset > 1 ? 1 : scrollOffset

      const blur = `${(scrollOffset * 8).toFixed(1)}px`
      const ty = `${(scrollOffset * -150).toFixed(1)}px`

      this.setVariables(blur, ty)
    }
  }
}


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _toc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toc */ "./src/js/toc.js");
/* harmony import */ var _cover_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cover-image */ "./src/js/cover-image.js");




Object(_utils__WEBPACK_IMPORTED_MODULE_0__["ready"])(async () => {
  const selectNav = document.querySelector('.js-select-nav')

  if (selectNav) {
    selectNav.addEventListener('change', event => {
      window.location = event.target.value
    })
  }

  _cover_image__WEBPACK_IMPORTED_MODULE_2__["CoverImage"].init()
  _toc__WEBPACK_IMPORTED_MODULE_1__["TableOfContents"].init()
})


/***/ }),

/***/ "./src/js/toc.js":
/*!***********************!*\
  !*** ./src/js/toc.js ***!
  \***********************/
/*! exports provided: TableOfContents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableOfContents", function() { return TableOfContents; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");


const TableOfContents = {
  container: document.querySelector('.js-toc'),
  listContainer: document.querySelector('.js-toc-list'),
  links: null,
  headings: null,
  intersectionOptions: {
    rootMargin: '0px',
    threshold: 1
  },
  previousSection: null,
  observer: null,

  init() {
    if (!this.container || !('IntersectionObserver' in window)) return

    this.handleObserver = this.handleObserver.bind(this)

    this.setUpObserver()
    this.findLinksAndHeadings()
    this.observeSections()

    this.links.forEach(link => {
      link.addEventListener('click', this.handleLinkClick.bind(this))
    })
  },

  handleToggleClick() {
    this.container.classList.toggle('is-active')

    this.listContainer.addEventListener(
      'transitionend',
      () => {
        if (this.container.classList.contains('is-active')) {
          this.links[0].focus()
        }
      },
      { once: true }
    )
  },

  handleLinkClick(evt) {
    evt.preventDefault()
    let id = evt.target.getAttribute('href').replace('#', '')

    let section = this.headings.find(heading => {
      return heading.getAttribute('id') === id
    })

    section.setAttribute('tabindex', -1)
    section.focus()

    window.scroll({
      behavior: _utils__WEBPACK_IMPORTED_MODULE_0__["motionQuery"].matches ? 'instant' : 'smooth',
      top: section.offsetTop - 15,
      block: 'start'
    })

    if (this.container.classList.contains('is-active')) {
      this.container.classList.remove('is-active')
    }
  },

  handleObserver(entries, observer) {
    entries.forEach(entry => {
      let href = `#${entry.target.getAttribute('id')}`,
        link = this.links.find(l => l.getAttribute('href') === href)

      if (entry.isIntersecting && entry.intersectionRatio === 1) {
        link.classList.add('is-visible')
        this.previousSection = entry.target.getAttribute('id')
      } else {
        link.classList.remove('is-visible')
      }

      this.highlightFirstActive()
    })
  },

  highlightFirstActive() {
    let firstVisibleLink = this.container.querySelector('.is-visible')

    this.links.forEach(link => {
      link.classList.remove('is-active')
    })

    if (firstVisibleLink) {
      firstVisibleLink.classList.add('is-active')
    }

    if (!firstVisibleLink && this.previousSection) {
      this.container.querySelector(
        `a[href="#${this.previousSection}"]`
      ).classList.add('is-active')
    }
  },

  observeSections() {
    this.headings.forEach(heading => {
      this.observer.observe(heading)
    })
  },

  setUpObserver() {
    this.observer = new IntersectionObserver(
      this.handleObserver,
      this.intersectionOptions
    )
  },

  findLinksAndHeadings() {
    this.links = [...this.container.querySelectorAll('a')]
    this.headings = this.links.map(link => {
      let id = link.getAttribute('href')
      return document.querySelector(id)
    })
  }
}


/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: ready, env, motionQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ready", function() { return ready; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "env", function() { return env; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "motionQuery", function() { return motionQuery; });
function ready(fn) {
  document.addEventListener('DOMContentLoaded', fn, false)
}

function env() {
  if (process && process.env && "development") {
    return "development"
  }

  return 'production'
}

const motionQuery = window.matchMedia('(prefers-reduced-motion)')
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

/******/ });
//# sourceMappingURL=main.js.map