(()=>{var e={669:(e,t,r)=>{e.exports=r(609)},448:(e,t,r)=>{"use strict";var n=r(867),s=r(26),o=r(372),i=r(327),a=r(97),c=r(109),d=r(985),u=r(61);e.exports=function(e){return new Promise((function(t,r){var l=e.data,h=e.headers;n.isFormData(l)&&delete h["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var f=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";h.Authorization="Basic "+btoa(f+":"+m)}var y=a(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),i(y,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in p?c(p.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:n,config:e,request:p};s(t,r,o),p=null}},p.onabort=function(){p&&(r(u("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){r(u("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(u(t,e,"ECONNABORTED",p)),p=null},n.isStandardBrowserEnv()){var g=(e.withCredentials||d(y))&&e.xsrfCookieName?o.read(e.xsrfCookieName):void 0;g&&(h[e.xsrfHeaderName]=g)}if("setRequestHeader"in p&&n.forEach(h,(function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete h[t]:p.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),r(e),p=null)})),l||(l=null),p.send(l)}))}},609:(e,t,r)=>{"use strict";var n=r(867),s=r(849),o=r(321),i=r(185);function a(e){var t=new o(e),r=s(o.prototype.request,t);return n.extend(r,o.prototype,t),n.extend(r,t),r}var c=a(r(655));c.Axios=o,c.create=function(e){return a(i(c.defaults,e))},c.Cancel=r(263),c.CancelToken=r(972),c.isCancel=r(502),c.all=function(e){return Promise.all(e)},c.spread=r(713),c.isAxiosError=r(268),e.exports=c,e.exports.default=c},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,r)=>{"use strict";var n=r(263);function s(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}s.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},s.source=function(){var e;return{token:new s((function(t){e=t})),cancel:e}},e.exports=s},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var n=r(867),s=r(327),o=r(782),i=r(572),a=r(185);function c(e){this.defaults=e,this.interceptors={request:new o,response:new o}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=a(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(a(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,n){return this.request(a(n||{},{method:e,url:t,data:r}))}})),e.exports=c},782:(e,t,r)=>{"use strict";var n=r(867);function s(){this.handlers=[]}s.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},s.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},s.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=s},97:(e,t,r)=>{"use strict";var n=r(793),s=r(303);e.exports=function(e,t){return e&&!n(t)?s(e,t):t}},61:(e,t,r)=>{"use strict";var n=r(481);e.exports=function(e,t,r,s,o){var i=new Error(e);return n(i,t,r,s,o)}},572:(e,t,r)=>{"use strict";var n=r(867),s=r(527),o=r(502),i=r(655);function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return a(e),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return a(e),t.data=s(t.data,t.headers,e.transformResponse),t}),(function(t){return o(t)||(a(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,r,n,s){return e.config=t,r&&(e.code=r),e.request=n,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){t=t||{};var r={},s=["url","method","data"],o=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function c(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function d(s){n.isUndefined(t[s])?n.isUndefined(e[s])||(r[s]=c(void 0,e[s])):r[s]=c(e[s],t[s])}n.forEach(s,(function(e){n.isUndefined(t[e])||(r[e]=c(void 0,t[e]))})),n.forEach(o,d),n.forEach(i,(function(s){n.isUndefined(t[s])?n.isUndefined(e[s])||(r[s]=c(void 0,e[s])):r[s]=c(void 0,t[s])})),n.forEach(a,(function(n){n in t?r[n]=c(e[n],t[n]):n in e&&(r[n]=c(void 0,e[n]))}));var u=s.concat(o).concat(i).concat(a),l=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===u.indexOf(e)}));return n.forEach(l,d),r}},26:(e,t,r)=>{"use strict";var n=r(61);e.exports=function(e,t,r){var s=r.config.validateStatus;r.status&&s&&!s(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},527:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},655:(e,t,r)=>{"use strict";var n=r(867),s=r(16),o={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(a=r(448)),a),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(o)})),e.exports=c},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},327:(e,t,r)=>{"use strict";var n=r(867);function s(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var o;if(r)o=r(t);else if(n.isURLSearchParams(t))o=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(s(t)+"="+s(e))})))})),o=i.join("&")}if(o){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,s,o,i){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(s)&&a.push("path="+s),n.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function s(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=s(window.location.href),function(t){var r=n.isString(t)?s(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},16:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},109:(e,t,r)=>{"use strict";var n=r(867),s=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,o,i={};return e?(n.forEach(e.split("\n"),(function(e){if(o=e.indexOf(":"),t=n.trim(e.substr(0,o)).toLowerCase(),r=n.trim(e.substr(o+1)),t){if(i[t]&&s.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},867:(e,t,r)=>{"use strict";var n=r(849),s=Object.prototype.toString;function o(e){return"[object Array]"===s.call(e)}function i(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==s.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function d(e){return"[object Function]"===s.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),o(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}e.exports={isArray:o,isArrayBuffer:function(e){return"[object ArrayBuffer]"===s.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:i,isDate:function(e){return"[object Date]"===s.call(e)},isFile:function(e){return"[object File]"===s.call(e)},isBlob:function(e){return"[object Blob]"===s.call(e)},isFunction:d,isStream:function(e){return a(e)&&d(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function r(r,n){c(t[n])&&c(r)?t[n]=e(t[n],r):c(r)?t[n]=e({},r):o(r)?t[n]=r.slice():t[n]=r}for(var n=0,s=arguments.length;n<s;n++)u(arguments[n],r);return t},extend:function(e,t,r){return u(t,(function(t,s){e[s]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},241:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(645),s=r.n(n)()((function(e){return e[1]}));s.push([e.id,"* {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n}\r\n\r\n.app {\r\n    background-color: rgba(0, 16, 100, 0.78);\r\n    height: 100vh;\r\n}\r\n\r\n.app__game {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n}\r\n\r\n.game__dealer, .game__player {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    height: 40vh;\r\n    width: 50%;\r\n    position:relative;\r\n}\r\n\r\n.dealer__cards, .player__cards {\r\n    display: flex;\r\n    width: 100%;\r\n    height: 35vh;\r\n}\r\n\r\n.img__element {\r\n    background: center;\r\n    width: 10vw;\r\n}\r\n\r\n.dealer__cards .cards__img:first-of-type:after{\r\n    background-color: black;\r\n    border-radius: 5px;\r\n    content: \" \";\r\n    display: block;\r\n    height: 30vh;\r\n    position: absolute;\r\n    top: 45px;\r\n    left: 0;\r\n    width: 10vw;\r\n}\r\n\r\n.dealer__cards .cards__img.show:first-of-type:after {\r\n    display:none;\r\n    background: none;\r\n}\r\n\r\n.menu__buttons {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 50%;\r\n    height: 30vh;\r\n}\r\n\r\n.menu__casinoButtons {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 30vh;\r\n}\r\n\r\n.game__actions{\r\n    width: 50%;\r\n    height: 40vh;\r\n}\r\n\r\n.game__menu{\r\n    width: 100%;\r\n    height: 35vh;\r\n    display:flex;\r\n}\r\n.game__rounds {\r\n    height: 5vh;\r\n    width: 100%;\r\n    padding-left:2em;\r\n}\r\n\r\n.menu__credits {\r\n    display:flex;\r\n    flex-direction: column;\r\n    height: 35vh;\r\n    text-align: center;\r\n    width:25%;\r\n}\r\n\r\n\r\n.credits__title, .credits__value,.game__rounds,.credits__ranking, .credits__top {\r\n    color:white;\r\n    font-size:2em;\r\n    font-weight:bold;\r\n}\r\n\r\n.credits__top {\r\n    display:flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.game__history {\r\n    width: 50%;\r\n    height: 60vh;\r\n}\r\n\r\n.history__element {\r\n    display:flex;\r\n    justify-content: space-between;\r\n    padding:0.5em 0;\r\n}\r\n\r\n.history__element:nth-child(2n+1) {\r\n    background-color: rgba(53, 82, 255, 0.78)\r\n}\r\n\r\n.buttons__casinoChips {\r\n    display: flex;\r\n    padding-top: 2em;\r\n}\r\n\r\n.button {\r\n    background-color: white;\r\n    border: none;\r\n    border-radius: 5px;\r\n    color: #3C3B3B;\r\n    font-size: 1.5rem;\r\n    cursor: pointer;\r\n    margin: 0.5rem;\r\n    padding: 0.5rem;\r\n}\r\n\r\n.player__score, .dealer__score {\r\n    color: white;\r\n    display: flex;\r\n    align-items: center;\r\n    font-size: 2em;\r\n    font-weight: bold;\r\n    height: 5vh;\r\n    order: 0;\r\n    text-align: center;\r\n    width: 50vw;\r\n    justify-content: center;\r\n}\r\n\r\n.history__header {\r\n    color: white;\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    align-items: center;\r\n    font-size: 2em;\r\n    font-weight: bold;\r\n    height: 10vh;\r\n    order: 0;\r\n    width: 50vw;\r\n}\r\n\r\n.history__rounds {\r\n    height: 30vh;\r\n}\r\n\r\n.header__title {\r\n    padding: 0 2em;\r\n    text-align: center;\r\n    width: 100%;\r\n}\r\n\r\n.header__columnsTitle {\r\n    display:flex;\r\n    width: 100%;\r\n    justify-content: space-between;\r\n    font-size: 0.5em;\r\n    padding: 0 1em;\r\n}\r\n\r\n.history__round, .history__playerHand, .history__dealerHand, .history__credits {\r\n    color: white;\r\n    font-size: 1em;\r\n    text-align: center;\r\n    line-height: 1.4;\r\n}\r\n\r\n.history__round {\r\n    padding-left: 2em;\r\n}\r\n.history__credits {\r\n    padding-right: 1em;\r\n}\r\n\r\n\r\n.button:disabled, div[disabled], .button:hover {\r\n    opacity: 0.5;\r\n}\r\n\r\n\r\n.casino__chips {\r\n    border: 13px dashed white;\r\n    border-radius: 50%;\r\n    color: white;\r\n    cursor: pointer;\r\n    display: block;\r\n    font-family: Helvetica, serif;\r\n    font-weight: 700;\r\n    height: 100px;\r\n    line-height: 75px;\r\n    margin:0.3em;\r\n    position: relative;\r\n    text-align: center;\r\n    width: 100px;\r\n    z-index: 2;\r\n}\r\n\r\n.casino__chips:hover {\r\n    opacity: 0.5\r\n}\r\n\r\n.casino__chips:before {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    margin: -16px;\r\n    border-radius: 50%;\r\n    content: '';\r\n}\r\n\r\n.casino__chips:after {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    margin: 5px;\r\n    border: 3px dashed white;\r\n    border-radius: 50%;\r\n    background: rgba(0, 0, 0, 0.4);\r\n    content: '';\r\n}\r\n\r\n.blue {\r\n    background: blue;\r\n    content: '250';\r\n}\r\n\r\n.green {\r\n    background: green;\r\n    content: '500';\r\n}\r\n\r\n.red {\r\n    background: red;\r\n    content: '100';\r\n}\r\n\r\n",""]);const o=s},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r=e(t);return t[2]?"@media ".concat(t[2]," {").concat(r,"}"):r})).join("")},t.i=function(e,r,n){"string"==typeof e&&(e=[[null,e,""]]);var s={};if(n)for(var o=0;o<this.length;o++){var i=this[o][0];null!=i&&(s[i]=!0)}for(var a=0;a<e.length;a++){var c=[].concat(e[a]);n&&s[c[0]]||(r&&(c[2]?c[2]="".concat(r," and ").concat(c[2]):c[2]=r),t.push(c))}},t}},379:(e,t,r)=>{"use strict";var n,s=function(){var e={};return function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}e[t]=r}return e[t]}}(),o=[];function i(e){for(var t=-1,r=0;r<o.length;r++)if(o[r].identifier===e){t=r;break}return t}function a(e,t){for(var r={},n=[],s=0;s<e.length;s++){var a=e[s],c=t.base?a[0]+t.base:a[0],d=r[c]||0,u="".concat(c," ").concat(d);r[c]=d+1;var l=i(u),h={css:a[1],media:a[2],sourceMap:a[3]};-1!==l?(o[l].references++,o[l].updater(h)):o.push({identifier:u,updater:m(h,t),references:1}),n.push(u)}return n}function c(e){var t=document.createElement("style"),n=e.attributes||{};if(void 0===n.nonce){var o=r.nc;o&&(n.nonce=o)}if(Object.keys(n).forEach((function(e){t.setAttribute(e,n[e])})),"function"==typeof e.insert)e.insert(t);else{var i=s(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var d,u=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function l(e,t,r,n){var s=r?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(e.styleSheet)e.styleSheet.cssText=u(t,s);else{var o=document.createTextNode(s),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(o,i[t]):e.appendChild(o)}}function h(e,t,r){var n=r.css,s=r.media,o=r.sourceMap;if(s?e.setAttribute("media",s):e.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var p=null,f=0;function m(e,t){var r,n,s;if(t.singleton){var o=f++;r=p||(p=c(t)),n=l.bind(null,r,o,!1),s=l.bind(null,r,o,!0)}else r=c(t),n=h.bind(null,r,t),s=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(r)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else s()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n));var r=a(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var n=0;n<r.length;n++){var s=i(r[n]);o[s].references--}for(var c=a(e,t),d=0;d<r.length;d++){var u=i(r[d]);0===o[u].references&&(o[u].updater(),o.splice(u,1))}r=c}}}}},t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={id:n,exports:{}};return e[n](s,s.exports,r),s.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{"use strict";var e=r(379),t=r.n(e),n=r(241);t()(n.Z,{insert:"head",singleton:!1}),n.Z.locals,r.p;class s{constructor(e,t,r){this.type=e,this.id=t,this.className=r}create(){const e=document.createElement(`${this.type}`);return e.id=this.id,e.className=this.className,e}appendTo(e,t){document.querySelector(`${t}`).appendChild(e)}addClass(e){console.log(e),this.className+=e}}class o extends s{constructor(e,t,r,n,s){super(e,t,r),this.title=n,this.disabled=s}create(){const e=document.createElement(`${this.type}`);return e.id=this.id,e.className=this.className,e.innerHTML=this.title,e.disabled=this.disabled,e}}var i=r(669),a=r.n(i);class c{constructor(e,t){this.cards=t,this.deck=e,this.hasAce=!1}async startDeck(){try{const{data:e}=await a().get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${this.deck}`),{deck_id:t}=e;return t}catch(e){throw new Error(e)}}async drawCards(e,t){if(!t||!e)throw Error("Deck id or number of cards missing");try{const{data:r}=await a().get(`https://deckofcardsapi.com/api/deck/${e}/draw/?count=${t}`),{cards:n}=r;return this.replaceNamesOfCardsToValue(n)}catch(e){throw new Error(e)}}async shuffleDeck(e){try{const{data:t}=await a().get(`https://deckofcardsapi.com/api/deck/${e}/shuffle/`);return t}catch(e){throw new Error(e)}}replaceNamesOfCardsToValue(e){return this.hasAce=!1,e.map((e=>"KING"===e.value||"QUEEN"===e.value||"JACK"===e.value?(e.value=10,e.hasAce=this.hasAce,e):"ACE"===e.value?(e.value=1,e.hasAce=!0,e):(e.value=parseInt(e.value,10),e.hasAce=this.hasAce,e)))}}class d{constructor(e,t,r,n,s){this.id=e,this.name=t,this.credits=r,this.cards=n,this.score=s}fillProperties(e){const t=e;return t.id=this.id,t.firstElementChild.innerText=this.score,t}}class u extends s{constructor(e,t,r){super(e,t,r),this.deck="",this.cards="",this.firstCardOfDealer=!0}renderCard(e,t){e.forEach((e=>{if(e){const r=document.createElement("div");r.className="cards__img";const{images:{png:n},value:s}=e,o=this.create();o.src=n,o.id=s,r.appendChild(o),document.querySelector(`${t}`).appendChild(r)}}))}}class l{constructor(){this.wins=0,this.roundResult=[],this.historyResult=[],this.topAmountOfCredits=[],this.topScore=[]}getResults(e,t,r,n,s){return this.roundResult.unshift(e,t,r,n,s),this.roundResult}loadHistory(){return document.querySelector(".history__rounds").innerHTML="",this.historyResult.forEach(((e,t)=>{const r=document.createElement("div");r.id=`history__element--${t}`,r.className="history__element",r.innerHTML=e.innerHTML,document.querySelector(".history__rounds").appendChild(r)}))}sendTopScoreToStorage(){localStorage.setItem("topScore",JSON.stringify(this.topAmountOfCredits))}sendToStorage(){localStorage.setItem("gameResults",JSON.stringify(this.roundResult))}addCreditsTopRanking(e){this.topAmountOfCredits.push(e)}getFromStorage(){const e=localStorage.getItem("topScore");null!==e&&this.topScore.push(e)}async getTopCredits(){await this.getFromStorage(),console.log(this.topScore),this.topScore.length>0&&JSON.parse(this.topScore).sort().map(((e,t)=>{const r=document.createElement("span");return r.id=`${t+1}`,r.className="top__value",r.innerHTML=`${t+1}.${e}`,document.querySelector(".credits__top").appendChild(r)}))}saveToRoundHistory(){const[e,t,r]=this.roundResult,n=document.createElement("div");n.innerHTML+=`<span class="history__round">${e+1}</span>`;let s="";t.cards.forEach((e=>{if(e){const{suit:t,value:r,code:n}=e;s+=`${n}:${r} ${t} <br>`}return s})),n.innerHTML+=`<span class="history__playerHand">${s}</span>`;let o="";r.cards.forEach((e=>{if(e){const{suit:t,value:r,code:n}=e;o+=`${n}:${r} ${t}<br>`}return o})),n.innerHTML+=`<span class="history__dealerHand">${o}</span>`,n.innerHTML+=`<span class="history__credits">${t.credits}</span>`,this.historyResult.push(n)}clearHistory(){this.historyResult=[],document.querySelector(".history__rounds").innerHTML=""}}class h{constructor(e){this.rounds=e,this.round=0,this.gameStart=!1,this.bet=0,this.multipy=!1,this.gameOver=!1,this.playerWon=!1,this.draw=!1,this.deckId="",this.decks=new c(6,2),this.dealer=new d("0","Dealer",0,[],0),this.player=new d("1","Player",1e3,[],0),this.cards=new u("img","","img__element"),this.casinoChipsButtons=new o("div","casinoChip","casino__chips"),this.history=new l}async newGame(){return this.gameStart=!0,this.round=0,this.deckId=await this.decks.startDeck(),await this.decks.shuffleDeck(this.deckId),this.gameOver=!1,this.playerWon=!1,this.draw=!1,this.dealer=new d("0","Dealer",0,[],0),this.player=new d("1","Player",1e3,[],0),await this.history.clearHistory(),await this.clearContent(),await this.history.getTopCredits(),{player:this.player,dealer:this.dealer}}async prepare(){return this.round===this.rounds?(console.log("dupa"),this.history.addCreditsTopRanking(this.player.credits),this.history.sendTopScoreToStorage(),alert("Koniec gry"),void(document.querySelector("#newGame").disabled=!1)):0===this.player.credits?(alert("Not enough credits"),void(document.querySelector("#newGame").disabled=!1)):(this.player.cards=await this.decks.drawCards(this.deckId,2),this.dealer.cards=await this.decks.drawCards(this.deckId,2),this.player.score=this.playerCardSum(this.player.cards),this.dealer.score=this.playerCardSum(this.dealer.cards),this.cards.renderCard(this.dealer.cards,".dealer__cards"),this.cards.renderCard(this.player.cards,".player__cards"),document.querySelector(".credits__value").innerText=this.player.credits,document.querySelector(".player__score").innerHTML=this.player.score,document.querySelector(".dealer__score").innerHTML="?",void(document.querySelector(".rounds__value").innerHTML=this.getRound()))}playerCardSum(e){let t=0;return e.forEach((e=>{if(e){const{value:r,hasAce:n}=e;t+=!0===n&&t+11<22?r+10:r}})),t}async hitAction(){if(0!==this.bet){const e=await this.decks.drawCards(this.deckId,1);return this.player.cards.push(e[0]),await this.cards.renderCard(e,".player__cards"),this.player.score=this.playerCardSum(this.player.cards),document.querySelector(".player__score").innerHTML=this.player.score,this.checkForEndOfGame(this.player.score,this.dealer.score)}alert("You must make a bet")}async hitStand(){return this.gameOver=!0,this.checkForEndOfGame(this.player.score,this.dealer.score)}async checkForEndOfGame(){!0===this.gameOver&&(this.dealer.score=await this.dealerDrawCards()),this.player.score>21?(this.playerWon=!1,this.gameOver=!0,document.querySelector(".dealer__cards .cards__img").classList.add("show")):this.dealer.score>21?(this.playerWon=!0,this.gameOver=!0,document.querySelector(".dealer__cards .cards__img").classList.add("show")):!0===this.gameOver&&(this.player.score>this.dealer.score?this.playerWon=!0:this.player.score<this.dealer.score?this.playerWon=!1:this.draw=!0),await this.showResults()}async showResults(){!0===this.gameOver&&(!0===this.playerWon?(this.player.credits+=1.5*this.bet,window.alert("Player won")):!0===this.draw?(document.querySelector(".dealer__score").innerText=this.dealer.score,window.alert("Draw")):(document.querySelector(".dealer__score").innerText=this.dealer.score,window.alert("Dealer won"),this.bet=0),document.querySelector(".credits__value").innerHTML=this.player.credits,this.history.getResults(this.round,this.player,this.dealer,this.playerWon,this.bet),this.round+=1,this.history.saveToRoundHistory(),this.history.loadHistory(),await this.clearContent())}async dealerDrawCards(){for(;this.dealer.score<this.player.score&&this.dealer.score<17;){const e=await this.decks.drawCards(this.deckId,1);e&&(this.dealer.cards.push(e[0]),this.dealer.score=this.playerCardSum(this.dealer.cards),await this.cards.renderCard(e,".dealer__cards"))}return document.querySelector(".dealer__score").innerText=this.dealer.score,document.querySelector(".dealer__cards .cards__img").className+=" show",this.dealer.score}getRound(){return this.round}doubleBet(){this.player.cards.length<3?(this.multipy=!0,this.canBet(this.bet)):alert("Możesz podwoić tylko gdy posiadasz 2 karty")}prepareCasinoChips(e,t){const r=["red","green","blue"];t.forEach(((e,t)=>{const n=this.casinoChipsButtons.create();n.id+=`--${t}`,n.innerHTML=e,n.className+=` ${r[t]}`,n.setAttribute("data-value",e),n.addEventListener("click",(()=>{this.player.cards.length<3?this.canBet(e):document.querySelectorAll(".casino__chips").forEach((e=>e.disabled=!0))})),document.querySelector(".menu__casinoButton").appendChild(n)}))}canBet(e){!0===this.multipy&&0!==this.bet?e<=this.player.credits?(this.bet*=2,this.player.credits-=e,this.multipy=!1):alert("Nie posiadasz tyle kredytów"):!1===this.multipy&&e<=this.player.credits?(this.bet+=parseInt(e,10),this.player.credits-=e):alert("Nie posiadasz tyle kredytów"),document.querySelector(".credits__value").innerText=this.player.credits}async clearContent(){document.querySelector(".dealer__cards").innerHTML="",document.querySelector(".player__cards").innerHTML="",document.querySelector(".dealer__score").innerHTML="0",document.querySelector(".player__score").innerHTML="0",await this.updateRounds()}async updateRounds(){this.gameOver=!1;const e=this.getRound();document.querySelector(".credits__value").innerHTML=this.player.credits,document.querySelector(".rounds__value").innerHTML=e,await this.prepare()}async resetGame(){try{await Promise.all([this.history.clearHistory(),this.clearContent(),this.newGame()])}catch(e){throw new Error(e)}}}const p=new class extends s{constructor(e,t,r){super(e,t,r),this.game=new h(5),this.hitButton=new o("button","hit","button button--hit","Hit",!0),this.standButton=new o("button","stand","button button--stand","Stand",!0),this.doubleDownButton=new o("button","doubleDown","button button--doubleDown","Double down",!0),this.newGameButton=new o("button","newGame","button button--newGame","New game",!1),this.resetGameButton=new o("button","resetGame","button button-resetGame","Reset game",!0),this.history=new l}async init(){const e=this.newGameButton.create(),t=this.hitButton.create(),r=this.standButton.create(),n=this.doubleDownButton.create(),s=this.resetGameButton.create(),o=document.querySelector(".menu__buttons");e.addEventListener("click",(async()=>{await this.game.newGame(),t.removeAttribute("disabled"),r.removeAttribute("disabled"),n.removeAttribute("disabled"),e.disabled=!0,s.disabled=!1}));const i=document.querySelector(".game__dealer"),a=document.querySelector(".game__player");this.game.dealer.fillProperties(i),o.appendChild(e),this.resetGameButton.appendTo(s,".menu__buttons"),this.game.player.fillProperties(a),t.addEventListener("click",(async()=>{await this.game.hitAction()})),r.addEventListener("click",(async()=>{await this.game.hitStand()})),n.addEventListener("click",(async()=>{this.game.doubleBet()})),s.addEventListener("click",(async()=>{await this.game.resetGame()})),this.hitButton.appendTo(t,".menu__buttons"),this.standButton.appendTo(r,".menu__buttons"),this.doubleDownButton.appendTo(n,".menu__buttons"),this.game.prepareCasinoChips(3,["100","250","500"])}}("div","game","game");try{p.init()}catch(e){throw new Error(e)}})()})();