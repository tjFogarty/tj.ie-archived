!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=4)}([function(t,e,i){"use strict";(function(t){function n(t){document.addEventListener("DOMContentLoaded",t,!1)}i.d(e,"b",(function(){return n})),i.d(e,"a",(function(){return s}));const s=window.matchMedia("(prefers-reduced-motion)")}).call(this,i(2))},function(t,e,i){!function(t){"use strict";function e(t,e){let i=0;return function(...n){const s=(new Date).getTime();if(!(s-i<t))return i=s,e(...n)}}function i(t){return Math.floor(t.reduce((t,e)=>t+e,0)/t.length)}const n="undefined"==typeof window,s=new class{constructor(){n||(this.lastX=0,this.lastY=0,this.lastWidth=window.innerWidth,this.lastHeight=window.innerHeight,this.lastMouseX=0,this.lastMouseY=0,this.lastWindowX=window.screenX,this.lastWindowY=window.screenY,this.lastAlpha=0,this.lastBeta=0,this.lastGamma=0,this.currAlpha=0,this.currBeta=0,this.currGamma=0,this.scrollHeight=document.body.scrollHeight,this.scrollChange=!1,this.sizeChange=!1,this.mouseChange=!1,this.positionChange=!1,this.orientationChange=!1,this.currX=0,this.currY=0,this.currWidth=window.innerWidth,this.currHeight=window.innerHeight,this.currMouseX=0,this.currMouseY=0,this.currWindowX=0,this.mouseXVelocity=[],this.mouseYVelocity=[],this.lastMouseXVelocity=0,this.lastMouseYVelocity=0,this.windowXVelocity=[],this.windowYVelocity=[],this.lastWindowXVelocity=0,this.lastWindowYVelocity=0,this.updating=!1,this.callbacks=[],this.update=this.update.bind(this),this.handleResize=this.handleResize.bind(this),this.handleMouse=this.handleMouse.bind(this),this.handleOrientation=this.handleOrientation.bind(this),this.recalibrateOrientation=this.recalibrateOrientation.bind(this),this.formatData=this.formatData.bind(this),this.watch=this.watch.bind(this),this.unwatch=this.unwatch.bind(this),this.handleResize=e(110,this.handleResize),this.handleMouse=e(75,this.handleMouse),window.addEventListener("resize",this.handleResize),window.addEventListener("mousemove",this.handleMouse),window.addEventListener("deviceorientation",this.handleOrientation),requestAnimationFrame(this.update))}handleResize(t){this.currWidth=window.innerWidth,this.currHeight=window.innerHeight}handleMouse(t){this.currMouseX=t.clientX,this.currMouseY=t.clientY}handleOrientation(t){this.initialAlpha||(this.initialAlpha=t.alpha),this.initialBeta||(this.initialBeta=t.beta),this.initialGamma||(this.initialGamma=t.gamma),this.currAlpha=t.alpha,this.currBeta=t.beta,this.currGamma=t.gamma}recalibrateOrientation(){const t={prev:{alpha:this.initialAlpha,beta:this.initialBeta,gamma:this.initialGamma}};return this.initialAlpha=this.lastAlpha,this.initialBeta=this.lastBeta,this.initialGamma=this.lastGamma,t.current={alpha:this.initialAlpha,beta:this.initialBeta,gamma:this.initialGamma},t}formatData(){return{scroll:{changed:this.scrollChange,left:Math.floor(this.lastX),right:Math.floor(this.lastX+this.lastWidth),top:Math.floor(this.lastY),bottom:Math.floor(this.lastY+this.lastHeight),velocity:{x:Math.floor(this.scrollXVelocity)||0,y:Math.floor(this.scrollYVelocity)||0}},size:{changed:this.sizeChange,x:Math.floor(this.lastWidth),y:Math.floor(this.lastHeight),docY:Math.floor(this.scrollHeight)},mouse:{changed:this.mouseChange,x:Math.floor(this.lastMouseX),y:Math.floor(this.lastMouseY),velocity:{x:Math.floor(this.lastMouseXVelocity)||0,y:Math.floor(this.lastMouseYVelocity)||0}},position:{changed:this.positionChange,left:Math.floor(this.lastWindowX),right:Math.floor(this.lastWindowX+this.lastWidth),top:Math.floor(this.lastWindowY),bottom:Math.floor(this.lastWindowY+this.lastHeight),velocity:{x:Math.floor(this.lastWindowXVelocity)||0,y:Math.floor(this.lastWindowYVelocity)||0}},orientation:{changed:this.orientationChange,alpha:Math.floor(this.lastAlpha-this.initialAlpha)||0,beta:Math.floor(this.lastBeta-this.initialBeta)||0,gamma:Math.floor(this.lastGamma-this.initialGamma)||0}}}update(){const{currWidth:t,currHeight:e,currMouseX:n,currMouseY:s,currAlpha:o,currBeta:r,currGamma:a}=this;if(this.updating)return!1;this.scrollChange=this.sizeChange=this.mouseChange=this.positionChange=this.orientationChange=!1,this.windowXVelocity.length>5&&this.windowXVelocity.shift(),this.windowXVelocity.push(window.screenX-this.lastWindowX),i(this.windowXVelocity)!=this.lastWindowXVelocity&&(this.lastWindowXVelocity=i(this.windowXVelocity),this.positionChange=!0),window.screenX!=this.lastWindowX&&(this.positionChange=!0,this.lastWindowX=window.screenX),this.windowYVelocity.length>5&&this.windowYVelocity.shift(),this.windowYVelocity.push(window.screenY-this.lastWindowY),i(this.windowYVelocity)!=this.lastWindowYVelocity&&(this.lastWindowYVelocity=i(this.windowYVelocity),this.positionChange=!0),window.screenY!=this.lastWindowY&&(this.positionChange=!0,this.lastWindowY=window.screenY),window.pageXOffset==this.lastX&&0!=this.scrollXVelocity&&(this.scrollXVelocity=0,this.scrollChange=!0),window.pageYOffset==this.lastY&&0!=this.scrollYVelocity&&(this.scrollYVelocity=0,this.scrollChange=!0),window.pageXOffset!=this.lastX&&(this.scrollChange=!0,this.scrollXVelocity=Math.floor(window.pageXOffset-this.lastX),this.lastX=window.pageXOffset),window.pageYOffset!=this.lastY&&(this.scrollChange=!0,this.scrollYVelocity=Math.floor(window.pageYOffset-this.lastY),this.lastY=window.pageYOffset),t!=this.lastWidth&&(this.lastWidth=t,this.scrollHeight=document.body.scrollHeight,this.sizeChange=!0),e!=this.lastHeight&&(this.lastHeight=e,this.sizeChange=!0),this.mouseXVelocity.length>5&&this.mouseXVelocity.shift(),this.mouseXVelocity.push(n-this.lastMouseX),i(this.mouseXVelocity)!=this.lastMouseXVelocity&&(this.lastMouseXVelocity=i(this.mouseXVelocity),this.mouseChange=!0),n!=this.lastMouseX&&(this.lastMouseX=n,this.mouseChange=!0),this.mouseYVelocity.length>5&&this.mouseYVelocity.shift(),this.mouseYVelocity.push(s-this.lastMouseY),i(this.mouseYVelocity)!=this.lastMouseYVelocity&&(this.lastMouseYVelocity=i(this.mouseYVelocity),this.mouseChange=!0),s==this.lastMouseY&&0==i(this.mouseYVelocity)||(this.lastMouseY=s,this.mouseChange=!0),o!=this.lastAlpha&&(this.lastAlpha=o,this.orientationChange=!0),r!=this.lastBeta&&(this.lastBeta=r,this.orientationChange=!0),a!=this.lastGamma&&(this.lastGamma=a,this.orientationChange=!0),(this.scrollChange||this.sizeChange||this.mouseChange||this.positionChange||this.orientationChange)&&this.callbacks.forEach(t=>t(this.formatData())),this.updating=!1,requestAnimationFrame(this.update)}watch(t,e=!0){if("function"!=typeof t)throw new Error("Value passed to Watch is not a function");if(!n){if(e){const e=this.formatData();e.scroll.changed=!0,e.mouse.changed=!0,e.size.changed=!0,e.position.changed=!0,e.orientation.changed=!0,t(e)}this.callbacks.push(t)}}unwatch(t){if("function"!=typeof t)throw new Error("The value passed to unwatch is not a function");n||(this.callbacks=this.callbacks.filter(e=>e!==t))}};n||(window.__TORNIS={watchViewport:s.watch,unwatchViewport:s.unwatch,getViewportState:s.formatData,recalibrateOrientation:s.recalibrateOrientation});const o=s.watch,r=s.unwatch,a=s.formatData,h=s.recalibrateOrientation;t.getViewportState=a,t.recalibrateOrientation=h,t.unwatchViewport=r,t.watchViewport=o,Object.defineProperty(t,"__esModule",{value:!0})}(e)},function(t,e){var i,n,s=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function a(t){if(i===setTimeout)return setTimeout(t,0);if((i===o||!i)&&setTimeout)return i=setTimeout,setTimeout(t,0);try{return i(t,0)}catch(e){try{return i.call(null,t,0)}catch(e){return i.call(this,t,0)}}}!function(){try{i="function"==typeof setTimeout?setTimeout:o}catch(t){i=o}try{n="function"==typeof clearTimeout?clearTimeout:r}catch(t){n=r}}();var h,c=[],l=!1,u=-1;function d(){l&&h&&(l=!1,h.length?c=h.concat(c):u=-1,c.length&&f())}function f(){if(!l){var t=a(d);l=!0;for(var e=c.length;e;){for(h=c,c=[];++u<e;)h&&h[u].run();u=-1,e=c.length}h=null,l=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===r||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function m(){}s.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)e[i-1]=arguments[i];c.push(new p(t,e)),1!==c.length||l||a(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=m,s.addListener=m,s.once=m,s.off=m,s.removeListener=m,s.removeAllListeners=m,s.emit=m,s.prependListener=m,s.prependOnceListener=m,s.listeners=function(t){return[]},s.binding=function(t){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(t){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},,function(t,e,i){"use strict";i.r(e);var n=i(0);const s={container:document.querySelector(".js-toc"),listContainer:document.querySelector(".js-toc-list"),links:null,headings:null,intersectionOptions:{rootMargin:"0px",threshold:1},previousSection:null,observer:null,init(){this.container&&"IntersectionObserver"in window&&(this.handleObserver=this.handleObserver.bind(this),this.setUpObserver(),this.findLinksAndHeadings(),this.observeSections(),this.links.forEach(t=>{t.addEventListener("click",this.handleLinkClick.bind(this))}))},handleToggleClick(){this.container.classList.toggle("is-active"),this.listContainer.addEventListener("transitionend",()=>{this.container.classList.contains("is-active")&&this.links[0].focus()},{once:!0})},handleLinkClick(t){t.preventDefault();let e=t.target.getAttribute("href").replace("#",""),i=this.headings.find(t=>t.getAttribute("id")===e);i.setAttribute("tabindex",-1),i.focus(),window.scroll({behavior:n.a.matches?"instant":"smooth",top:i.offsetTop-15,block:"start"}),this.container.classList.contains("is-active")&&this.container.classList.remove("is-active")},handleObserver(t,e){t.forEach(t=>{let e=`#${t.target.getAttribute("id")}`,i=this.links.find(t=>t.getAttribute("href")===e);t.isIntersecting&&1===t.intersectionRatio?(i.classList.add("is-visible"),this.previousSection=t.target.getAttribute("id")):i.classList.remove("is-visible"),this.highlightFirstActive()})},highlightFirstActive(){let t=this.container.querySelector(".is-visible");this.links.forEach(t=>{t.classList.remove("is-active")}),t&&t.classList.add("is-active"),!t&&this.previousSection&&this.container.querySelector(`a[href="#${this.previousSection}"]`).classList.add("is-active")},observeSections(){this.headings.forEach(t=>{this.observer.observe(t)})},setUpObserver(){this.observer=new IntersectionObserver(this.handleObserver,this.intersectionOptions)},findLinksAndHeadings(){this.links=[...this.container.querySelectorAll("a")],this.headings=this.links.map(t=>{let e=t.getAttribute("href");return document.querySelector(e)})}};var o=i(1);const r={async init(){this.coverImage=document.querySelector(".js-cover-image"),this.coverImage&&(this.setVariables(0,0),this.updateValues=this.updateValues.bind(this),Object(o.watchViewport)(this.updateValues))},setVariables(t,e){document.body.style.setProperty("--coverImageBlur",t),document.body.style.setProperty("--coverImageTranslateY",e)},updateValues({scroll:t}){if(t.changed&&t.top){let e=t.top/this.coverImage.clientHeight;const i=`${(8*(e=(e=e<0?0:e)>1?1:e)).toFixed(1)}px`,n=`${(-150*e).toFixed(1)}px`;this.setVariables(i,n)}}};function a(){}function h(t){return t()}function c(){return Object.create(null)}function l(t){t.forEach(h)}function u(t){return"function"==typeof t}function d(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}new Set;function f(t,e){t.appendChild(e)}function p(t,e,i){t.insertBefore(e,i||null)}function m(t){t.parentNode.removeChild(t)}function g(t){return document.createElement(t)}function w(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function y(t){return document.createTextNode(t)}function b(){return y(" ")}function v(t,e,i,n){return t.addEventListener(e,i,n),()=>t.removeEventListener(e,i,n)}function M(t,e,i){null==i?t.removeAttribute(e):t.setAttribute(e,i)}function V(t,e,i){t.setAttributeNS("http://www.w3.org/1999/xlink",e,i)}function C(t,e){e=""+e,t.data!==e&&(t.data=e)}let $;function X(t){$=t}function Y(){if(!$)throw new Error("Function called outside component initialization");return $}const O=[],k=[],x=[],A=[],S=Promise.resolve();let W=!1;function L(){W||(W=!0,S.then(E))}function T(t){x.push(t)}function E(){const t=new Set;do{for(;O.length;){const t=O.shift();X(t),_(t.$$)}for(;k.length;)k.pop()();for(let e=0;e<x.length;e+=1){const i=x[e];t.has(i)||(i(),t.add(i))}x.length=0}while(O.length);for(;A.length;)A.pop()();W=!1}function _(t){t.fragment&&(t.update(t.dirty),l(t.before_update),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(T))}const B=new Set;function H(t,e){t&&t.i&&(B.delete(t),t.i(e))}"undefined"!=typeof window?window:global;let R;function j(t,e){t.$$.fragment&&(l(t.$$.on_destroy),t.$$.fragment.d(e),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={})}function I(t,e,i,n,s,o){const r=$;X(t);const d=e.props||{},f=t.$$={fragment:null,ctx:null,props:o,update:a,not_equal:s,bound:c(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(r?r.$$.context:[]),callbacks:c(),dirty:null};let p=!1;var m;f.ctx=i?i(t,d,(e,i,n=i)=>(f.ctx&&s(f.ctx[e],f.ctx[e]=n)&&(f.bound[e]&&f.bound[e](n),p&&function(t,e){t.$$.dirty||(O.push(t),L(),t.$$.dirty=c()),t.$$.dirty[e]=!0}(t,e)),i)):d,f.update(),p=!0,l(f.before_update),f.fragment=n(f.ctx),e.target&&(e.hydrate?f.fragment.l((m=e.target,Array.from(m.childNodes))):f.fragment.c(),e.intro&&H(t.$$.fragment),function(t,e,i){const{fragment:n,on_mount:s,on_destroy:o,after_update:r}=t.$$;n.m(e,i),T(()=>{const e=s.map(h).filter(u);o?o.push(...e):l(e),t.$$.on_mount=[]}),r.forEach(T)}(t,e.target,e.anchor),E()),X(r)}"undefined"!=typeof HTMLElement&&(R=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,i){this[t]=i}$destroy(){j(this,1),this.$destroy=a}$on(t,e){const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(e),()=>{const t=i.indexOf(e);-1!==t&&i.splice(t,1)}}$set(){}});class z{$destroy(){j(this,1),this.$destroy=a}$on(t,e){const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(e),()=>{const t=i.indexOf(e);-1!==t&&i.splice(t,1)}}$set(){}}const G=[];function q(t,e=a){let i;const n=[];function s(e){if(d(t,e)&&(t=e,i)){const e=!G.length;for(let e=0;e<n.length;e+=1){const i=n[e];i[1](),G.push(i,t)}if(e){for(let t=0;t<G.length;t+=2)G[t][0](G[t+1]);G.length=0}}}return{set:s,update:function(e){s(e(t))},subscribe:function(o,r=a){const h=[o,r];return n.push(h),1===n.length&&(i=e(s)||a),o(t),()=>{const t=n.indexOf(h);-1!==t&&n.splice(t,1),0===n.length&&(i(),i=null)}}}}const D=q([]),P=function(t,e,i){const n=!Array.isArray(t),s=n?[t]:t,o=e.length<2;return{subscribe:q(i,t=>{let i=!1;const r=[];let h=0,c=a;const d=()=>{if(h)return;c();const i=e(n?r[0]:r,t);o?t(i):c=u(i)?i:a},f=s.map((t,e)=>t.subscribe(t=>{r[e]=t,h&=~(1<<e),i&&d()},()=>{h|=1<<e}));return i=!0,d(),function(){l(f),c()}}).subscribe}}(D,t=>t.find(t=>t.url===document.location.pathname)),N="https://api.sheetson.com/v1/sheets/upvotes",F=new Headers({"X-Sheetson-Spreadsheet-Id":"1QvOEyvtjq0ByJ0TZDLJHECL0oKmlH4EAHGXde9AIqp8","Content-Type":"application/json"});function U(t="",e="GET",i){return new Request(`${N}${t}`,{method:e,headers:F,body:JSON.stringify(i)})}function J(t){var e,i,n,s,o;function r(t,e){return e.currentRecord?Z:Q}var a=r(0,t),h=a(t);return{c(){e=g("button"),i=w("svg"),n=w("use"),s=b(),h.c(),V(n,"xlink:href","#heart"),M(i,"class","c-upvote-button__icon"),M(e,"class","c-upvote-button"),M(e,"type","button"),M(e,"aria-label","Show your appreciation by tapping or clicking"),M(e,"title","Like this post"),o=v(e,"click",t.handleClickUpvote)},m(t,o){p(t,e,o),f(e,i),f(i,n),f(e,s),h.m(e,null)},p(t,i){a===(a=r(0,i))&&h?h.p(t,i):(h.d(1),(h=a(i))&&(h.c(),h.m(e,null)))},d(t){t&&m(e),h.d(),o()}}}function K(t){var e,i,n,s,o;function r(t,e){return e.currentRecord?et:tt}var a=r(0,t),h=a(t);return{c(){e=g("div"),i=w("svg"),n=w("use"),s=b(),o=g("span"),h.c(),V(n,"xlink:href","#heart"),M(i,"class","c-upvote-button__icon"),M(e,"class","c-upvote-button is-active")},m(t,r){p(t,e,r),f(e,i),f(i,n),f(e,s),f(e,o),h.m(o,null)},p(t,e){a===(a=r(0,e))&&h?h.p(t,e):(h.d(1),(h=a(e))&&(h.c(),h.m(o,null)))},d(t){t&&m(e),h.d()}}}function Q(t){var e;return{c(){(e=g("span")).textContent="Be the first to like this!"},m(t,i){p(t,e,i)},p:a,d(t){t&&m(e)}}}function Z(t){var e,i,n=t.currentRecord.votes+"";return{c(){e=g("span"),i=y(n)},m(t,n){p(t,e,n),f(e,i)},p(t,e){t.currentRecord&&n!==(n=e.currentRecord.votes+"")&&C(i,n)},d(t){t&&m(e)}}}function tt(t){var e;return{c(){e=y("1")},m(t,i){p(t,e,i)},p:a,d(t){t&&m(e)}}}function et(t){var e,i=t.parseInt(t.currentRecord.votes,10)+1+"";return{c(){e=y(i)},m(t,i){p(t,e,i)},p(t,n){t.currentRecord&&i!==(i=n.parseInt(n.currentRecord.votes,10)+1+"")&&C(e,i)},d(t){t&&m(e)}}}function it(t){var e;function i(t,e){return e.hasBeenClicked?K:J}var n=i(0,t),s=n(t);return{c(){s.c(),e=y("")},m(t,i){s.m(t,i),p(t,e,i)},p(t,o){n===(n=i(0,o))&&s?s.p(t,o):(s.d(1),(s=n(o))&&(s.c(),s.m(e.parentNode,e)))},i:a,o:a,d(t){s.d(t),t&&m(e)}}}function nt(t,e,i){let{currentRecord:n,hasBeenClicked:s=!1}=e;var o;return P.subscribe(t=>{i("currentRecord",n=t)}),o=async()=>{const t=await fetch(U("?limit=100")),{results:e}=await t.json();D.set(e)},Y().$$.on_mount.push(o),t.$set=t=>{"currentRecord"in t&&i("currentRecord",n=t.currentRecord),"hasBeenClicked"in t&&i("hasBeenClicked",s=t.hasBeenClicked)},{currentRecord:n,hasBeenClicked:s,handleClickUpvote:function(){const{pathname:t}=document.location;if(i("hasBeenClicked",s=!0),!n)return void fetch(U("/","POST",{url:t,votes:1}));const{rowIndex:e,votes:o}=n;!function({rowIndex:t,votes:e}){fetch(U(`/${t}`,"PUT",{votes:e}))}({rowIndex:e,votes:parseInt(o,10)+1})},parseInt:parseInt}}var st=class extends z{constructor(t){super(),I(this,t,nt,it,d,["currentRecord","hasBeenClicked"])}};Object(n.b)(async()=>{const t=document.querySelector(".js-select-nav");t&&t.addEventListener("change",t=>{window.location=t.target.value}),r.init(),s.init();const e=document.querySelector(".js-upvotes");e&&new st({target:e})})}]);
//# sourceMappingURL=main.js.map