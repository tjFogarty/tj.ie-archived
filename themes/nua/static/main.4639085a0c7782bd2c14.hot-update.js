webpackHotUpdate("main",{

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n/* harmony import */ var _hero__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hero */ \"./src/js/hero.js\");\n\n\n\nObject(_utils__WEBPACK_IMPORTED_MODULE_0__[\"ready\"])(async () => {\n  new _hero__WEBPACK_IMPORTED_MODULE_1__[\"Hero\"]()\n})\n\nif (true) {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('/sw.js')\n  })\n}\n\nif (true) {\n  module.hot.accept(/*! ./hero.js */ \"./src/js/hero.js\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _hero__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hero.js */ \"./src/js/hero.js\");\n(() => {\n    console.log('Accepting the updated hero module') \n    new _hero__WEBPACK_IMPORTED_MODULE_1__[\"Hero\"]()\n  })(__WEBPACK_OUTDATED_DEPENDENCIES__); })\n}\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

})