webpackHotUpdate("main",{

/***/ "./src/js/toc.js":
/*!***********************!*\
  !*** ./src/js/toc.js ***!
  \***********************/
/*! exports provided: TableOfContents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TableOfContents\", function() { return TableOfContents; });\nconst TableOfContents = {\n  container: document.querySelector('.js-toc'),\n\n  init() {\n    if (!this.container) return\n\n    this.getHeadings()\n  },\n\n  getHeadings() {\n    let links = this.container.querySelectorAll('a')\n        hashes = [...links].map(link => link.getAttribute('href')) \n    console.log({ links, hashes })\n  }\n}\n\n//# sourceURL=webpack:///./src/js/toc.js?");

/***/ })

})