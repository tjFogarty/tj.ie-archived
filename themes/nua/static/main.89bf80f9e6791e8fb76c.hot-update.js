webpackHotUpdate("main",{

/***/ "./src/js/toc.js":
/*!***********************!*\
  !*** ./src/js/toc.js ***!
  \***********************/
/*! exports provided: TableOfContents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TableOfContents\", function() { return TableOfContents; });\nconst TableOfContents = {\n  container: document.querySelector('.js-toc'),\n  links: null,\n  headings: null,\n  intersectionOptions: {\n    rootMargin: '0px',\n    threshold: 1\n  },\n  observer: null,\n\n  init() {\n    if (!this.container) return\n\n    this.handleObserver = this.handleObserver.bind(this)\n\n    this.setUpObserver()\n    this.findLinksAndHeadings()\n    this.observeSections()\n    this.handleLinkClick()\n  },\n\n  handleLinkClick() {\n    this.links.forEach(link => {\n      link.addEventListener('click', evt => {\n        evt.preventDefault()\n\n        let section = this.headings.find(heading => {\n          let id = evt.target.getAttribute('href').replace('#', '')\n          return heading.getAttribute('id') === id\n        })\n        section.scrollIntoView({\n          behavior: 'smooth',\n          top: 0,\n          block: 'start'\n        })\n        section.setAttribute('tab-index', -1).focus()\n        section.focus()\n      })\n    })\n  },\n\n  handleObserver(entries, observer) {\n    entries.forEach(entry => {\n      let href = `#${entry.target.getAttribute('id')}`,\n          link = this.links.find(l => l.getAttribute('href') === href)\n\n      if (entry.isIntersecting && entry.intersectionRatio === 1) {\n        link.classList.add('is-active')\n      } else {\n        link.classList.remove('is-active')\n      }\n    })\n  },\n\n  observeSections() {\n    this.headings.forEach(heading => {\n      this.observer.observe(heading)\n    })\n  },\n\n  setUpObserver() {\n    this.observer = new IntersectionObserver(\n      this.handleObserver, \n      this.intersectionOptions\n    )\n  },\n\n  findLinksAndHeadings() {\n    this.links = [...this.container.querySelectorAll('a')]\n    this.headings = this.links.map(link => {\n      let id = link.getAttribute('href')\n      return document.querySelector(id)\n    })\n  }\n}\n\n//# sourceURL=webpack:///./src/js/toc.js?");

/***/ })

})