!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=7)}([function(t,e,n){"use strict";(function(t){function r(t){document.addEventListener("DOMContentLoaded",t,!1)}n.d(e,"b",function(){return r}),n.d(e,"a",function(){return i});const i=window.matchMedia("(prefers-reduced-motion)")}).call(this,n(2))},function(t,e,n){t.exports=function(){"use strict";var t=document,e=t.createTextNode.bind(t);function n(t,e,n){t.style.setProperty(e,n)}function r(t,e){return t.appendChild(e)}function i(e,n,i,o){var s=t.createElement("span");return n&&(s.className=n),i&&(!o&&s.setAttribute("data-"+n,i),s.textContent=i),e&&r(e,s)||s}function o(t,e){return t.getAttribute("data-"+e)}function s(e,n){return e&&0!=e.length?e.nodeName?[e]:[].slice.call(e[0].nodeName?e:(n||t).querySelectorAll(e)):[]}function c(t){for(var e=[];t--;)e[t]=[];return e}function u(t,e){t&&t.some(e)}function a(t){return function(e){return t[e]}}var l={};function f(t,e,n,r){return{by:t,depends:e,key:n,split:r}}function h(t){return function t(e,n,r){var i=r.indexOf(e);if(-1==i)r.unshift(e),u(l[e].depends,function(n){t(n,e,r)});else{var o=r.indexOf(n);r.splice(i,1),r.splice(o,0,e)}return r}(t,0,[]).map(a(l))}function d(t){l[t.by]=t}function v(t,n,o,c,a){t.normalize();var l=[],f=document.createDocumentFragment();c&&l.push(t.previousSibling);var h=[];return s(t.childNodes).some(function(t){if(!t.tagName||t.hasChildNodes()){if(t.childNodes&&t.childNodes.length)return h.push(t),void l.push.apply(l,v(t,n,o,c,a));var r=t.wholeText||"",s=r.trim();s.length&&(" "===r[0]&&h.push(e(" ")),u(s.split(o),function(t,e){e&&a&&h.push(i(f,"whitespace"," ",a));var r=i(f,n,t);l.push(r),h.push(r)})," "===r[r.length-1]&&h.push(e(" ")))}else h.push(t)}),u(h,function(t){r(f,t)}),t.innerHTML="",r(t,f),l}var p=f("words",0,"word",function(t){return v(t,"word",/\s+/,0,1)}),g="chars",m=f(g,["words"],"char",function(t,e,n){var r=[];return u(n.words,function(t,n){r.push.apply(r,v(t,"char","",e.whitespace&&n))}),r});function b(t){var e=(t=t||{}).key;return s(t.target||"[data-splitting]").map(function(r){var i={el:r},s=h(t.by||o(r,"splitting")||g),c=function(t,e){for(var n in e)t[n]=e[n];return t}({},t);return u(s,function(t){if(t.split){var o=t.by,s=(e?"-"+e:"")+t.key,a=t.split(r,c,i);s&&function(t,e,r){var i="--"+e,o=i+"-index";u(r,function(t,e){Array.isArray(t)?u(t,function(t){n(t,o,e)}):n(t,o,e)}),n(t,i+"-total",r.length)}(r,s,a),i[o]=a,r.classList.add(o)}}),r.classList.add("splitting"),i})}function y(t,e,n){var r=s(e.matching||t.children,t),i={};return u(r,function(t){var e=Math.round(t[n]);(i[e]||(i[e]=[])).push(t)}),Object.keys(i).map(Number).sort().map(a(i))}b.html=function(t){var e=(t=t||{}).target=i();return e.innerHTML=t.content,b(t),e.outerHTML},b.add=d;var w=f("lines",["words"],"line",function(t,e,n){return y(t,{matching:n.words},"offsetTop")}),L=f("items",0,"item",function(t,e){return s(e.matching||t.children,t)}),T=f("rows",0,"row",function(t,e){return y(t,e,"offsetTop")}),k=f("cols",0,"col",function(t,e){return y(t,e,"offsetLeft")}),O=f("grid",["rows","cols"]),S=f("layout",0,0,function(t,e){var c=e.rows=+(e.rows||o(t,"rows")||1),u=e.columns=+(e.columns||o(t,"columns")||1);if(e.image=e.image||o(t,"image")||t.currentSrc||t.src,e.image){var a=s("img",t)[0];e.image=a&&(a.currentSrc||a.src)}e.image&&n(t,"background-image","url("+e.image+")");for(var l=c*u,f=[],h=i(0,"cell-grid");l--;){var d=i(h,"cell");i(d,"cell-inner"),f.push(d)}return r(t,h),f}),A=f("cellRows",["layout"],"row",function(t,e,n){var r=e.rows,i=c(r);return u(n.layout,function(t,e,n){i[Math.floor(e/(n.length/r))].push(t)}),i}),x=f("cellColumns",["layout"],"col",function(t,e,n){var r=e.columns,i=c(r);return u(n.layout,function(t,e){i[e%r].push(t)}),i}),E=f("cells",["cellRows","cellColumns"],"cell",function(t,e,n){return n.layout});return d(p),d(m),d(w),d(L),d(T),d(k),d(O),d(S),d(A),d(x),d(E),b}()},function(t,e){var n,r,i=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function c(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(t){n=o}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(t){r=s}}();var u,a=[],l=!1,f=-1;function h(){l&&u&&(l=!1,u.length?a=u.concat(a):f=-1,a.length&&d())}function d(){if(!l){var t=c(h);l=!0;for(var e=a.length;e;){for(u=a,a=[];++f<e;)u&&u[f].run();f=-1,e=a.length}u=null,l=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function v(t,e){this.fun=t,this.array=e}function p(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];a.push(new v(t,e)),1!==a.length||l||c(d)},v.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=p,i.addListener=p,i.once=p,i.off=p,i.removeListener=p,i.removeAllListeners=p,i.emit=p,i.prependListener=p,i.prependOnceListener=p,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},,,,,function(t,e,n){"use strict";n.r(e);var r=n(0);const i={container:document.querySelector(".js-toc"),listContainer:document.querySelector(".js-toc-list"),links:null,headings:null,intersectionOptions:{rootMargin:"0px",threshold:1},previousSection:null,observer:null,toggle:document.querySelector(".js-toc-toggle"),init(){this.container&&"IntersectionObserver"in window&&(this.handleObserver=this.handleObserver.bind(this),this.setUpObserver(),this.findLinksAndHeadings(),this.observeSections(),this.toggle.addEventListener("click",this.handleToggleClick.bind(this)),this.links.forEach(t=>{t.addEventListener("click",this.handleLinkClick.bind(this))}))},handleToggleClick(){this.container.classList.toggle("is-active"),this.listContainer.addEventListener("transitionend",()=>{this.container.classList.contains("is-active")&&this.links[0].focus()},{once:!0})},handleLinkClick(t){t.preventDefault();let e=t.target.getAttribute("href").replace("#",""),n=this.headings.find(t=>t.getAttribute("id")===e);n.setAttribute("tabindex",-1),n.focus(),window.scroll({behavior:r.a.matches?"instant":"smooth",top:n.offsetTop-15,block:"start"}),this.container.classList.contains("is-active")&&this.container.classList.remove("is-active")},handleObserver(t,e){t.forEach(t=>{let e=`#${t.target.getAttribute("id")}`,n=this.links.find(t=>t.getAttribute("href")===e);t.isIntersecting&&1===t.intersectionRatio?(n.classList.add("is-visible"),this.previousSection=t.target.getAttribute("id")):n.classList.remove("is-visible"),this.highlightFirstActive()})},highlightFirstActive(){let t=this.container.querySelector(".is-visible");this.links.forEach(t=>{t.classList.remove("is-active")}),t&&t.classList.add("is-active"),!t&&this.previousSection&&this.container.querySelector(`a[href="#${this.previousSection}"]`).classList.add("is-active")},observeSections(){this.headings.forEach(t=>{this.observer.observe(t)})},setUpObserver(){this.observer=new IntersectionObserver(this.handleObserver,this.intersectionOptions)},findLinksAndHeadings(){this.links=[...this.container.querySelectorAll("a")],this.headings=this.links.map(t=>{let e=t.getAttribute("href");return document.querySelector(e)})}};var o=n(1),s=n.n(o);Object(r.b)(async()=>{let t=document.querySelector(".js-select-nav");t&&t.addEventListener("change",t=>{window.location=t.target.value}),s()(),i.init()})}]);