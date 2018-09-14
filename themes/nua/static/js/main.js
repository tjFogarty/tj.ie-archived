!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=4)}([function(e,t,n){"use strict";(function(e){function i(e){document.addEventListener("DOMContentLoaded",e,!1)}function r(){return e&&e.env,"production"}n.d(t,"c",function(){return i}),n.d(t,"a",function(){return r}),n.d(t,"b",function(){return s});const s=window.matchMedia("(prefers-reduced-motion)")}).call(this,n(1))},function(e,t){var n,i,r=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===s||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:s}catch(e){n=s}try{i="function"==typeof clearTimeout?clearTimeout:o}catch(e){i=o}}();var c,l=[],u=!1,d=-1;function h(){u&&c&&(u=!1,c.length?l=c.concat(l):d=-1,l.length&&f())}function f(){if(!u){var e=a(h);u=!0;for(var t=l.length;t;){for(c=l,l=[];++d<t;)c&&c[d].run();d=-1,t=l.length}c=null,u=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===o||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function v(e,t){this.fun=e,this.array=t}function g(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new v(e,t)),1!==l.length||u||a(f)},v.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=g,r.addListener=g,r.once=g,r.off=g,r.removeListener=g,r.removeAllListeners=g,r.emit=g,r.prependListener=g,r.prependOnceListener=g,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},,,function(e,t,n){"use strict";n.r(t);const i={elements_selector:"img",container:document,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,callback_load:null,callback_error:null,callback_set:null,callback_enter:null,to_webp:!1};const r=(e,t)=>e.getAttribute("data-"+t),s=(e,t,n)=>{var i="data-"+t;null!==n?e.setAttribute(i,n):e.removeAttribute(i)},o=e=>s(e,"was-processed","true"),a=e=>"true"===r(e,"was-processed"),c=(e,t)=>s(e,"ll-timeout",t),l=e=>r(e,"ll-timeout");function u(e){return e.filter(e=>!a(e))}const d=function(e,t){var n;let i=new e(t);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:i}})}catch(e){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:i})}window.dispatchEvent(n)};const h=(e,t)=>t?e.replace(/\.(jpe?g|png)/gi,".webp"):e,f="undefined"!=typeof window,v=f&&!("onscroll"in window)||/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),g=f&&"IntersectionObserver"in window,b=f&&"classList"in document.createElement("p"),m=f&&(()=>{var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))&&0===e.toDataURL("image/webp").indexOf("data:image/webp")})(),p=function(e,t,n,i){for(let s,o=0;s=e.children[o];o+=1)if("SOURCE"===s.tagName){let e=r(s,n);_(s,t,e,i)}},_=function(e,t,n,i){n&&e.setAttribute(t,h(n,i))},y={IMG:(e,t)=>{const n=m&&t.to_webp,i=t.data_srcset,s=e.parentNode;s&&"PICTURE"===s.tagName&&p(s,"srcset",i,n);const o=r(e,t.data_sizes);_(e,"sizes",o);const a=r(e,i);_(e,"srcset",a,n);const c=r(e,t.data_src);_(e,"src",c,n)},IFRAME:(e,t)=>{const n=r(e,t.data_src);_(e,"src",n)},VIDEO:(e,t)=>{const n=t.data_src,i=r(e,n);p(e,"src",n),_(e,"src",i),e.load()}},w=(e,t)=>{const n=e.tagName,i=y[n];i?i(e,t):((e,t)=>{const n=m&&t.to_webp,i=r(e,t.data_src);if(i){let t=h(i,n);e.style.backgroundImage=`url("${t}")`}})(e,t)},L=(e,t)=>{b?e.classList.add(t):e.className+=(e.className?" ":"")+t},E=(e,t)=>{e&&e(t)},k=(e,t,n)=>{e.addEventListener(t,n)},O=(e,t,n)=>{e.removeEventListener(t,n)},A=(e,t,n)=>{O(e,"load",t),O(e,"loadeddata",t),O(e,"error",n)},T=function(e,t,n){const i=t?n.class_loaded:n.class_error,r=t?n.callback_load:n.callback_error,s=e.target;((e,t)=>{b?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")})(s,n.class_loading),L(s,i),E(r,s)},S=(e,t)=>{const n=r=>{T(r,!0,t),A(e,n,i)},i=r=>{T(r,!1,t),A(e,n,i)};((e,t,n)=>{k(e,"load",t),k(e,"loadeddata",t),k(e,"error",n)})(e,n,i)},I=["IMG","IFRAME","VIDEO"],j=(e,t,n)=>{C(e,n),t.unobserve(e)},x=e=>{var t=l(e);t&&(clearTimeout(t),c(e,null))};function C(e,t,n){!n&&a(e)||(E(t.callback_enter,e),I.indexOf(e.tagName)>-1&&(S(e,t),L(e,t.class_loading)),w(e,t),o(e),E(t.callback_set,e))}const M=e=>e.isIntersecting||e.intersectionRatio>0,z=function(e,t){this._settings=(e=>Object.assign({},i,e))(e),this._setObserver(),this.update(t)};z.prototype={_manageIntersection:function(e){var t=this._observer,n=this._settings,i=this._settings.load_delay,r=e.target;M(e)&&(i?((e,t,n)=>{var i=n.load_delay,r=l(e);r||(r=setTimeout(function(){j(e,t,n),x(e)},i),c(e,r))})(r,t,n):j(r,t,n)),M(e)||x(r)},_onIntersection:function(e){e.forEach(this._manageIntersection.bind(this)),this._elements=u(this._elements)},_setObserver:function(){g&&(this._observer=new IntersectionObserver(this._onIntersection.bind(this),(e=>({root:e.container===document?null:e.container,rootMargin:e.thresholds||e.threshold+"px"}))(this._settings)))},loadAll:function(){this._elements.forEach(e=>{this.load(e)}),this._elements=u(this._elements)},update:function(e){const t=this._settings,n=e||t.container.querySelectorAll(t.elements_selector);this._elements=u(Array.prototype.slice.call(n)),!v&&this._observer?this._elements.forEach(e=>{this._observer.observe(e)}):this.loadAll()},destroy:function(){this._observer&&(u(this._elements).forEach(e=>{this._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(e,t){C(e,this._settings,t)}},f&&function(e,t){if(t)if(t.length)for(let n,i=0;n=t[i];i+=1)d(e,n);else d(e,t)}(z,window.lazyLoadOptions);var N=z,q=n(0);const R={container:document.querySelector(".js-toc"),listContainer:document.querySelector(".js-toc-list"),links:null,headings:null,intersectionOptions:{rootMargin:"0px",threshold:1},previousSection:null,observer:null,toggle:document.querySelector(".js-toc-toggle"),init(){this.container&&(this.handleObserver=this.handleObserver.bind(this),this.setUpObserver(),this.findLinksAndHeadings(),this.observeSections(),this.toggle.addEventListener("click",this.handleToggleClick.bind(this)),this.links.forEach(e=>{e.addEventListener("click",this.handleLinkClick.bind(this))}))},handleToggleClick(){this.container.classList.toggle("is-active"),this.listContainer.addEventListener("transitionend",()=>{this.container.classList.contains("is-active")&&this.links[0].focus()},{once:!0})},handleLinkClick(e){e.preventDefault();let t=e.target.getAttribute("href").replace("#",""),n=this.headings.find(e=>e.getAttribute("id")===t);n.setAttribute("tabindex",-1),n.focus(),window.scroll({behavior:q.b.matches?"instant":"smooth",top:n.offsetTop-15,block:"start"}),this.container.classList.contains("is-active")&&this.container.classList.remove("is-active")},handleObserver(e,t){e.forEach(e=>{let t=`#${e.target.getAttribute("id")}`,n=this.links.find(e=>e.getAttribute("href")===t);e.isIntersecting&&1===e.intersectionRatio?(n.classList.add("is-visible"),this.previousSection=e.target.getAttribute("id")):n.classList.remove("is-visible"),this.highlightFirstActive()})},highlightFirstActive(){let e=this.container.querySelector(".is-visible");this.links.forEach(e=>{e.classList.remove("is-active")}),e&&e.classList.add("is-active"),!e&&this.previousSection&&this.container.querySelector(`a[href="#${this.previousSection}"]`).classList.add("is-active")},observeSections(){this.headings.forEach(e=>{this.observer.observe(e)})},setUpObserver(){this.observer=new IntersectionObserver(this.handleObserver,this.intersectionOptions)},findLinksAndHeadings(){this.links=[...this.container.querySelectorAll("a")],this.headings=this.links.map(e=>{let t=e.getAttribute("href");return document.querySelector(t)})}};Object(q.c)(async()=>{R.init(),new N({elements_selector:".lazy"})}),"production"===Object(q.a)()&&"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js")})}]);