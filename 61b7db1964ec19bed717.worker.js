/*! For license information please see 61b7db1964ec19bed717.worker.js.LICENSE.txt */
!function(){var n={61:function(n,t,e){var r=e(698).default;function o(){"use strict";n.exports=o=function(){return t},n.exports.__esModule=!0,n.exports.default=n.exports;var t={},e=Object.prototype,i=e.hasOwnProperty,a=Object.defineProperty||function(n,t,e){n[t]=e.value},u="function"==typeof Symbol?Symbol:{},l=u.iterator||"@@iterator",c=u.asyncIterator||"@@asyncIterator",d=u.toStringTag||"@@toStringTag";function s(n,t,e){return Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}),n[t]}try{s({},"")}catch(F){s=function(n,t,e){return n[t]=e}}function v(n,t,e,r){var o=t&&t.prototype instanceof y?t:y,i=Object.create(o.prototype),u=new M(r||[]);return a(i,"_invoke",{value:S(n,e,u)}),i}function f(n,t,e){try{return{type:"normal",arg:n.call(t,e)}}catch(F){return{type:"throw",arg:F}}}t.wrap=v;var h={};function y(){}function p(){}function g(){}var m={};s(m,l,(function(){return this}));var b=Object.getPrototypeOf,_=b&&b(b(T([])));_&&_!==e&&i.call(_,l)&&(m=_);var w=g.prototype=y.prototype=Object.create(m);function x(n){["next","throw","return"].forEach((function(t){s(n,t,(function(n){return this._invoke(t,n)}))}))}function N(n,t){function e(o,a,u,l){var c=f(n[o],n,a);if("throw"!==c.type){var d=c.arg,s=d.value;return s&&"object"==r(s)&&i.call(s,"__await")?t.resolve(s.__await).then((function(n){e("next",n,u,l)}),(function(n){e("throw",n,u,l)})):t.resolve(s).then((function(n){d.value=n,u(d)}),(function(n){return e("throw",n,u,l)}))}l(c.arg)}var o;a(this,"_invoke",{value:function(n,r){function i(){return new t((function(t,o){e(n,r,t,o)}))}return o=o?o.then(i,i):i()}})}function S(n,t,e){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return E()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var u=k(a,e);if(u){if(u===h)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===r)throw r="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);r="executing";var l=f(n,t,e);if("normal"===l.type){if(r=e.done?"completed":"suspendedYield",l.arg===h)continue;return{value:l.arg,done:e.done}}"throw"===l.type&&(r="completed",e.method="throw",e.arg=l.arg)}}}function k(n,t){var e=t.method,r=n.iterator[e];if(void 0===r)return t.delegate=null,"throw"===e&&n.iterator.return&&(t.method="return",t.arg=void 0,k(n,t),"throw"===t.method)||"return"!==e&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+e+"' method")),h;var o=f(r,n.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,h;var i=o.arg;return i?i.done?(t[n.resultName]=i.value,t.next=n.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,h):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function D(n){var t={tryLoc:n[0]};1 in n&&(t.catchLoc=n[1]),2 in n&&(t.finallyLoc=n[2],t.afterLoc=n[3]),this.tryEntries.push(t)}function j(n){var t=n.completion||{};t.type="normal",delete t.arg,n.completion=t}function M(n){this.tryEntries=[{tryLoc:"root"}],n.forEach(D,this),this.reset(!0)}function T(n){if(n){var t=n[l];if(t)return t.call(n);if("function"==typeof n.next)return n;if(!isNaN(n.length)){var e=-1,r=function t(){for(;++e<n.length;)if(i.call(n,e))return t.value=n[e],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:E}}function E(){return{value:void 0,done:!0}}return p.prototype=g,a(w,"constructor",{value:g,configurable:!0}),a(g,"constructor",{value:p,configurable:!0}),p.displayName=s(g,d,"GeneratorFunction"),t.isGeneratorFunction=function(n){var t="function"==typeof n&&n.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(n){return Object.setPrototypeOf?Object.setPrototypeOf(n,g):(n.__proto__=g,s(n,d,"GeneratorFunction")),n.prototype=Object.create(w),n},t.awrap=function(n){return{__await:n}},x(N.prototype),s(N.prototype,c,(function(){return this})),t.AsyncIterator=N,t.async=function(n,e,r,o,i){void 0===i&&(i=Promise);var a=new N(v(n,e,r,o),i);return t.isGeneratorFunction(e)?a:a.next().then((function(n){return n.done?n.value:a.next()}))},x(w),s(w,d,"Generator"),s(w,l,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),t.keys=function(n){var t=Object(n),e=[];for(var r in t)e.push(r);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=T,M.prototype={constructor:M,reset:function(n){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!n)for(var t in this)"t"===t.charAt(0)&&i.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var n=this.tryEntries[0].completion;if("throw"===n.type)throw n.arg;return this.rval},dispatchException:function(n){if(this.done)throw n;var t=this;function e(e,r){return a.type="throw",a.arg=n,t.next=e,r&&(t.method="next",t.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],a=o.completion;if("root"===o.tryLoc)return e("end");if(o.tryLoc<=this.prev){var u=i.call(o,"catchLoc"),l=i.call(o,"finallyLoc");if(u&&l){if(this.prev<o.catchLoc)return e(o.catchLoc,!0);if(this.prev<o.finallyLoc)return e(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return e(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return e(o.finallyLoc)}}}},abrupt:function(n,t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===n||"continue"===n)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=n,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,h):this.complete(a)},complete:function(n,t){if("throw"===n.type)throw n.arg;return"break"===n.type||"continue"===n.type?this.next=n.arg:"return"===n.type?(this.rval=this.arg=n.arg,this.method="return",this.next="end"):"normal"===n.type&&t&&(this.next=t),h},finish:function(n){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.finallyLoc===n)return this.complete(e.completion,e.afterLoc),j(e),h}},catch:function(n){for(var t=this.tryEntries.length-1;t>=0;--t){var e=this.tryEntries[t];if(e.tryLoc===n){var r=e.completion;if("throw"===r.type){var o=r.arg;j(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(n,t,e){return this.delegate={iterator:T(n),resultName:t,nextLoc:e},"next"===this.method&&(this.arg=void 0),h}},t}n.exports=o,n.exports.__esModule=!0,n.exports.default=n.exports},698:function(n){function t(e){return n.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},n.exports.__esModule=!0,n.exports.default=n.exports,t(e)}n.exports=t,n.exports.__esModule=!0,n.exports.default=n.exports},687:function(n,t,e){var r=e(61)();n.exports=r;try{regeneratorRuntime=r}catch(o){"object"===typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}}},t={};function e(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return n[r](i,i.exports,e),i.exports}e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,{a:t}),t},e.d=function(n,t){for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)};var r={};!function(){"use strict";function n(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function t(t,e){var r="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t))||e&&t&&"number"===typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(n){throw n},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,l=!1;return{s:function(){r=r.call(t)},n:function(){var n=r.next();return u=n.done,n},e:function(n){l=!0,a=n},f:function(){try{u||null==r.return||r.return()}finally{if(l)throw a}}}}function o(n,t,e,r,o,i,a){try{var u=n[i](a),l=u.value}catch(c){return void e(c)}u.done?t(l):Promise.resolve(l).then(r,o)}function i(n){return function(){var t=this,e=arguments;return new Promise((function(r,i){var a=n.apply(t,e);function u(n){o(a,r,i,u,l,"next",n)}function l(n){o(a,r,i,u,l,"throw",n)}u(void 0)}))}}e.d(r,{evaluate:function(){return jt},getAchievementWrappers:function(){return St},reset:function(){return kt}});var a=e(687),u=e.n(a);function l(n){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},l(n)}function c(n){var t=function(n,t){if("object"!==l(n)||null===n)return n;var e=n[Symbol.toPrimitive];if(void 0!==e){var r=e.call(n,t||"default");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(n)}(n,"string");return"symbol"===l(t)?t:String(t)}function d(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,c(r.key),r)}}var s=function(){function n(t,e,r,o,i){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.data=void 0,this.getTaxa=void 0,this.evalFunc=void 0,this.resetFunc=void 0,this.data={icon:t,title:"achievement".concat(t,"Title"),details:"achievement".concat(t,"Details"),goal:e,count:0,observations:[]},this.getTaxa=r,this.evalFunc=o,this.resetFunc=i}var t,e,r;return t=n,(e=[{key:"getData",value:function(){return this.data}},{key:"evaluate",value:function(n,t){var e,r=this.evalFunc(n,t);r>0&&this.updateCount(null!==(e=n.id)&&void 0!==e?e:0,r)}},{key:"updateCount",value:function(n,t){this.data.count=this.data.count+t,this.data.observations.push(n)}},{key:"reset",value:function(){this.data.count=0,this.data.observations=[],this.resetFunc&&this.resetFunc()}}])&&d(t.prototype,e),r&&d(t,r),Object.defineProperty(t,"prototype",{writable:!1}),n}(),v=[6544,11853,559244,5362,5425,5391,5400],f=new s("AirLovers",30,(function(){return v}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){var a=o.value;if(v.includes(a))return 1}}catch(u){i.e(u)}finally{i.f()}return 0})),h=!1,y=!1,p=!1,g=!1,m=new s("AllCorners",4,(function(){return[]}),(function(n){if(n.geojson&&n.geojson.coordinates){var t=parseFloat(n.geojson.coordinates[0]),e=parseFloat(n.geojson.coordinates[1]);if(!h&&e>0&&t<0)return h=!0,1;if(!y&&e>0&&t>0)return y=!0,1;if(!p&&e<0&&t<0)return p=!0,1;if(!g&&e<0&&t>0)return g=!0,1}return 0}),(function(){h=!1,y=!1,p=!1,g=!1})),b=10;function _(n,t,e,r){if(n===e&&t===r)return 0;var o=Math.PI*n/180,i=Math.PI*e/180,a=t-r,u=Math.PI*a/180,l=Math.sin(o)*Math.sin(i)+Math.cos(o)*Math.cos(i)*Math.cos(u);return l>1&&(l=1),l=60*(l=180*(l=Math.acos(l))/Math.PI)*1.1515,l*=1.609344}var w=new Date(Date.UTC(1980,1,1)).toISOString().split("T")[0],x=0,N=0,S=new s("AlwaysOn",120,(function(){return[]}),(function(n){var t,e,r=null!==(t=null===n||void 0===n||null===(e=n.observed_on_details)||void 0===e?void 0:e.date)&&void 0!==t?t:w,o=new Date(Number(w.substring(0,4)),Number(w.substring(5,7)),Number(w.substring(8,10))),i=new Date(Number(r.substring(0,4)),Number(r.substring(5,7)),Number(r.substring(8,10)));return Math.ceil(Math.abs(o.getTime()-i.getTime())/864e5)>=5&&(x=0),w!==r&&(x++,w=r),N<x?(N=x,1):0}),(function(){w=new Date(Date.UTC(1980,1,1)).toISOString().split("T")[0],x=0,N=0})),k=(Math.pow(10,8),36e5);function D(n,t){if(t.length<n)throw new TypeError(n+" argument"+(n>1?"s":"")+" required, but only "+t.length+" present")}function j(n){if(null===n||!0===n||!1===n)return NaN;var t=Number(n);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function M(n,t){var e;D(1,arguments);var r=j(null!==(e=null===t||void 0===t?void 0:t.additionalDigits)&&void 0!==e?e:2);if(2!==r&&1!==r&&0!==r)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!==typeof n&&"[object String]"!==Object.prototype.toString.call(n))return new Date(NaN);var o,i=O(n);if(i.date){var a=P(i.date,r);o=C(a.restDateString,a.year)}if(!o||isNaN(o.getTime()))return new Date(NaN);var u,l=o.getTime(),c=0;if(i.time&&(c=A(i.time),isNaN(c)))return new Date(NaN);if(!i.timezone){var d=new Date(l+c),s=new Date(0);return s.setFullYear(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()),s.setHours(d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds(),d.getUTCMilliseconds()),s}return u=U(i.timezone),isNaN(u)?new Date(NaN):new Date(l+c+u)}var T={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},E=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,F=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,L=/^([+-])(\d{2})(?::?(\d{2}))?$/;function O(n){var t,e={},r=n.split(T.dateTimeDelimiter);if(r.length>2)return e;if(/:/.test(r[0])?t=r[0]:(e.date=r[0],t=r[1],T.timeZoneDelimiter.test(e.date)&&(e.date=n.split(T.timeZoneDelimiter)[0],t=n.substr(e.date.length,n.length))),t){var o=T.timezone.exec(t);o?(e.time=t.replace(o[1],""),e.timezone=o[1]):e.time=t}return e}function P(n,t){var e=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),r=n.match(e);if(!r)return{year:NaN,restDateString:""};var o=r[1]?parseInt(r[1]):null,i=r[2]?parseInt(r[2]):null;return{year:null===i?o:100*i,restDateString:n.slice((r[1]||r[2]).length)}}function C(n,t){if(null===t)return new Date(NaN);var e=n.match(E);if(!e)return new Date(NaN);var r=!!e[4],o=I(e[1]),i=I(e[2])-1,a=I(e[3]),u=I(e[4]),l=I(e[5])-1;if(r)return function(n,t,e){return t>=1&&t<=53&&e>=0&&e<=6}(0,u,l)?function(n,t,e){var r=new Date(0);r.setUTCFullYear(n,0,4);var o=r.getUTCDay()||7,i=7*(t-1)+e+1-o;return r.setUTCDate(r.getUTCDate()+i),r}(t,u,l):new Date(NaN);var c=new Date(0);return function(n,t,e){return t>=0&&t<=11&&e>=1&&e<=(G[t]||(Y(n)?29:28))}(t,i,a)&&function(n,t){return t>=1&&t<=(Y(n)?366:365)}(t,o)?(c.setUTCFullYear(t,i,Math.max(o,a)),c):new Date(NaN)}function I(n){return n?parseInt(n):1}function A(n){var t=n.match(F);if(!t)return NaN;var e=R(t[1]),r=R(t[2]),o=R(t[3]);return function(n,t,e){if(24===n)return 0===t&&0===e;return e>=0&&e<60&&t>=0&&t<60&&n>=0&&n<25}(e,r,o)?e*k+6e4*r+1e3*o:NaN}function R(n){return n&&parseFloat(n.replace(",","."))||0}function U(n){if("Z"===n)return 0;var t=n.match(L);if(!t)return 0;var e="+"===t[1]?-1:1,r=parseInt(t[2]),o=t[3]&&parseInt(t[3])||0;return function(n,t){return t>=0&&t<=59}(0,o)?e*(r*k+6e4*o):NaN}var G=[31,null,31,30,31,30,31,31,30,31,30,31];function Y(n){return n%400===0||n%4===0&&n%100!==0}function H(n){return H="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"===typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},H(n)}function Z(n){D(1,arguments);var t=Object.prototype.toString.call(n);return n instanceof Date||"object"===H(n)&&"[object Date]"===t?new Date(n.getTime()):"number"===typeof n||"[object Number]"===t?new Date(n):("string"!==typeof n&&"[object String]"!==t||"undefined"===typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function $(n){return $="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"===typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},$(n)}function z(n){return D(1,arguments),n instanceof Date||"object"===$(n)&&"[object Date]"===Object.prototype.toString.call(n)}function B(n){if(D(1,arguments),!z(n)&&"number"!==typeof n)return!1;var t=Z(n);return!isNaN(Number(t))}function W(n,t){for(var e=n<0?"-":"",r=Math.abs(n).toString();r.length<t;)r="0"+r;return e+r}function q(n,t){var e,r;if(arguments.length<1)throw new TypeError("1 argument required, but only ".concat(arguments.length," present"));var o=Z(n);if(!B(o))throw new RangeError("Invalid time value");var i=String(null!==(e=null===t||void 0===t?void 0:t.format)&&void 0!==e?e:"extended"),a=String(null!==(r=null===t||void 0===t?void 0:t.representation)&&void 0!==r?r:"complete");if("extended"!==i&&"basic"!==i)throw new RangeError("format must be 'extended' or 'basic'");if("date"!==a&&"time"!==a&&"complete"!==a)throw new RangeError("representation must be 'date', 'time', or 'complete'");var u="",l="extended"===i?"-":"",c="extended"===i?":":"";if("time"!==a){var d=W(o.getDate(),2),s=W(o.getMonth()+1,2),v=W(o.getFullYear(),4);u="".concat(v).concat(l).concat(s).concat(l).concat(d)}if("date"!==a){var f=W(o.getHours(),2),h=W(o.getMinutes(),2),y=W(o.getSeconds(),2),p=""===u?"":" ";u="".concat(u).concat(p).concat(f).concat(c).concat(h).concat(c).concat(y)}return u}function K(n,t){D(2,arguments);var e=Z(n),r=j(t);return isNaN(r)?new Date(NaN):r?(e.setDate(e.getDate()+r),e):e}var J=[47178,85497,47273],Q=0,V=[],X=new s("CatchOfTheDay",5,(function(){return J}),(function(n){var e;if(null!==n&&void 0!==n&&null!==(e=n.observed_on_details)&&void 0!==e&&e.date){var r,o,i,a=t(null!==(r=null===n||void 0===n||null===(o=n.taxon)||void 0===o?void 0:o.ancestor_ids)&&void 0!==r?r:[]);try{for(a.s();!(i=a.n()).done;){var u=i.value;if(J.includes(u)){var l=n.observed_on_details.date;if(!V.includes(l)){if(V.push(l),1===V.length)return Q=1,1;for(var c=M(l),d=1;V.includes(q(K(c,d),{representation:"date"}));)d++;if(d>Q)return Q=d,1}}}}catch(s){a.e(s)}finally{a.f()}}return 0}),(function(){Q=0,V=[]})),nn=[],tn=[],en=new s("CatsAndDogs",9,(function(){return[41944,42043]}),(function(n){var e;if(null!==(e=n.observed_on_details)&&void 0!==e&&e.date){var r,o,i,a=t(null!==(r=null===n||void 0===n||null===(o=n.taxon)||void 0===o?void 0:o.ancestor_ids)&&void 0!==r?r:[]);try{for(a.s();!(i=a.n()).done;){var u=i.value;if(41944===u){var l=rn(n);if(!nn.includes(l)&&(nn.push(l),tn.includes(l)))return 1}else if(42043===u){var c=rn(n);if(!tn.includes(c)&&(tn.push(c),nn.includes(c)))return 1}}}catch(d){a.e(d)}finally{a.f()}}return 0}),(function(){nn=[],tn=[]}));function rn(n){var t,e;return null!==(t=n.observed_on_details)&&void 0!==t&&t.date?null===(e=n.observed_on_details)||void 0===e?void 0:e.date:"unknown"}var on=[3726,23,4929],an=new s("CraneyStorker",24,(function(){return on}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){var a=o.value;if(on.includes(a))return 1}}catch(u){i.e(u)}finally{i.f()}return 0})),un=[],ln=null,cn=null,dn=new s("DailyLife",24,(function(){return[]}),(function(n){var t,e,r,o,i=null!==(t=null===n||void 0===n||null===(e=n.observed_on_details)||void 0===e?void 0:e.date)&&void 0!==t?t:ln;ln!==i&&(ln=i,un=[]);var a,u=void 0;if((null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.rank_level)===b)u=null!==(a=n.taxon.id)&&void 0!==a?a:0;else if(5===(null===n||void 0===n||null===(o=n.taxon)||void 0===o?void 0:o.rank_level)){var l,c;u=null!==(l=null===n||void 0===n||null===(c=n.taxon)||void 0===c?void 0:c.parent_id)&&void 0!==l?l:0}return u&&(un.includes(u)||un.push(u),un.length>=24&&cn!==ln)?(cn=ln,1):0}),(function(){un=[],ln=null,cn=null})),sn=new s("DaisyTown",77,(function(){return[47604]}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){if(47604===o.value)return 1}}catch(a){i.e(a)}finally{i.f()}return 0})),vn=[],fn=null,hn=null,yn=new s("EarlyBird",7,(function(){return[3,47491]}),(function(n){var e,r;if((null!==(e=null===n||void 0===n||null===(r=n.observed_on_details)||void 0===r?void 0:r.hour)&&void 0!==e?e:99)<=7){var o,i,a,u=t(null!==(o=null===n||void 0===n||null===(i=n.taxon)||void 0===i?void 0:i.ancestor_ids)&&void 0!==o?o:[]);try{for(u.s();!(a=u.n()).done;){var l,c,d=a.value;if(3===d)fn=null!==(l=null===n||void 0===n||null===(c=n.observed_on_details)||void 0===c?void 0:c.date)&&void 0!==l?l:null;else if(47491===d){var s,v;hn=null!==(s=null===n||void 0===n||null===(v=n.observed_on_details)||void 0===v?void 0:v.date)&&void 0!==s?s:null}if(fn&&hn&&fn===hn&&!vn.includes(fn))return vn.push(fn),1}}catch(f){u.e(f)}finally{u.f()}}return 0}),(function(){vn=[],fn=null,hn=null})),pn=[118903,47336,538904],gn="-1|-1",mn=0,bn=0,_n=new s("EmployeeOfTheMonth",31,(function(){return pn}),(function(n){var e,r,o,i,a,u,l="".concat(null!==(e=null===(r=n.observed_on_details)||void 0===r?void 0:r.year)&&void 0!==e?e:-1,"|").concat(null!==(o=null===(i=n.observed_on_details)||void 0===i?void 0:i.month)&&void 0!==o?o:-1);gn!==l&&(gn=l,mn=0);var c,d=t(null!==(a=null===n||void 0===n||null===(u=n.taxon)||void 0===u?void 0:u.ancestor_ids)&&void 0!==a?a:[]);try{for(d.s();!(c=d.n()).done;){var s=c.value;if(pn.includes(s)&&++mn>bn)return bn=mn,1}}catch(v){d.e(v)}finally{d.f()}return 0}),(function(){gn="-1|-1",mn=0,bn=0})),wn=[],xn=new s("FlowerChild",25,(function(){return[47125]}),(function(n,e){var r,o,i;if((null!==(r=null===n||void 0===n||null===(o=n.taxon)||void 0===o?void 0:o.rank_level)&&void 0!==r?r:999)<=40&&(null!==n&&void 0!==n&&null!==(i=n.taxon)&&void 0!==i&&i.ancestor_ids&&n.taxon.ancestor_ids.length>3)){var a,u=!1,l=t(n.taxon.ancestor_ids);try{for(l.s();!(a=l.n()).done;){if(47125===a.value){u=!0;break}}}catch(f){l.e(f)}finally{l.f()}if(u){var c,d=t(n.taxon.ancestor_ids.slice(3,Math.min(7,n.taxon.ancestor_ids.length)));try{var s=function(){var t,r=c.value,o=null===(t=e.find((function(n){return n.taxonID===r})))||void 0===t?void 0:t.rank;if(o){if(40===o&&!wn.includes(r))return wn.push(r),{v:1};if(o<=40)return"break"}else console.log("Taxon Rank not found for taxon ".concat(r," on observation ").concat(n.id))};for(d.s();!(c=d.n()).done;){var v=s();if("break"===v)break;if("object"===typeof v)return v.v}}catch(f){d.e(f)}finally{d.f()}}}return 0}),(function(){wn=[]})),Nn=[],Sn=new s("ForeverSpring",52,(function(){return[47125]}),(function(n){var e,r=null===(e=n.observed_on_details)||void 0===e?void 0:e.week;if(r){var o;r>52&&(r=52);var i,a=t(null!==(o=n.annotations)&&void 0!==o?o:[]);try{for(a.s();!(i=a.n()).done;){var u=i.value;if(12===u.controlled_attribute_id&&13===u.controlled_value_id){var l,c,d,s=t(null!==(l=null===n||void 0===n||null===(c=n.taxon)||void 0===c?void 0:c.ancestor_ids)&&void 0!==l?l:[]);try{for(s.s();!(d=s.n()).done;){if(47125===d.value&&!Nn.includes(r))return Nn.push(r),1}}catch(v){s.e(v)}finally{s.f()}}}}catch(v){a.e(v)}finally{a.f()}}return 0}),(function(){Nn=[]})),kn=new s("HeartOfTheMatter",13,(function(){return[]}),(function(n){var t;return!0===(null===n||void 0===n||null===(t=n.taxon)||void 0===t?void 0:t.threatened)?1:0})),Dn=[47398,39532,47114,61415],jn=new Map,Mn=0,Tn=new s("HomelyHermit",24,(function(){return Dn}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){var a,u=o.value;if(Dn.includes(u))if(null!==n&&void 0!==n&&null!==(a=n.observed_on_details)&&void 0!==a&&a.date){var l,c=n.observed_on_details.date,d=new Date(c),s=(null!==(l=jn.get(c))&&void 0!==l?l:0)+1;jn.set(c,s);for(var v=s,f=1;f<=6;f++){var h=jn.get(q(K(d,f),{representation:"date"}));h&&(v+=h)}if(v>Mn)return Mn=v,1}}}catch(y){i.e(y)}finally{i.f()}return 0}),(function(){jn.clear(),Mn=0})),En=new s("KingFisher",33,(function(){return[47178]}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){if(47178===o.value)return 1}}catch(a){i.e(a)}finally{i.f()}return 0})),Fn=[311249,54743],Ln=new s("LichenMoss",31,(function(){return Fn}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){var a=o.value;if(Fn.includes(a))return 1}}catch(u){i.e(u)}finally{i.f()}return 0})),On=[],Pn=0,Cn=0,In=new s("LifeLister",365,(function(){return[]}),(function(n){var t,e,r,o,i;if(null!==(t=n.observed_on_details)&&void 0!==t&&t.year&&(null!==(e=n.taxon)&&void 0!==e&&e.id&&(null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.rank_level)===b||null!==(o=n.taxon)&&void 0!==o&&o.parent_id&&5===(null===n||void 0===n||null===(i=n.taxon)||void 0===i?void 0:i.rank_level))){var a,u,l,c,d;if(Pn!==(null===(a=n.observed_on_details)||void 0===a?void 0:a.year))On=[],Pn=null===(d=n.observed_on_details)||void 0===d?void 0:d.year;if(null!==(u=n.taxon)&&void 0!==u&&u.id&&(null===n||void 0===n||null===(l=n.taxon)||void 0===l?void 0:l.rank_level)===b){var s=n.taxon.id;On.includes(s)||On.push(s)}else if(null!==n&&void 0!==n&&null!==(c=n.taxon)&&void 0!==c&&c.parent_id){var v,f,h,y=null===n||void 0===n||null===(v=n.taxon)||void 0===v?void 0:v.parent_id;5!==(null===n||void 0===n||null===(f=n.taxon)||void 0===f?void 0:f.rank_level)||On.includes(y)?(null===n||void 0===n||null===(h=n.taxon)||void 0===h?void 0:h.rank_level)<b&&!On.includes(y)&&On.push(y):On.push(y)}if(Cn<On.length)return Cn=On.length,1}return 0}),(function(){On=[],Pn=0,Cn=0})),An=[123880,67333,126917,124337,151817,47686,54960,131236],Rn=new s("Microcosm",12,(function(){return An}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){var a=o.value;if(An.includes(a))return 1}}catch(u){i.e(u)}finally{i.f()}return 0})),Un=0,Gn=new s("NameGiver",2e3,(function(){return[]}),(function(n){var t,e;return 0===Un?Un=null!==(t=null===n||void 0===n||null===(e=n.user)||void 0===e?void 0:e.identifications_count)&&void 0!==t?t:0:0}),(function(){Un=0})),Yn=[19350,19664,19376,19351],Hn=new s("NightOwl",12,(function(){return Yn}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){var a,u,l,c,d=o.value;if(Yn.includes(d)&&((null!==(a=null===n||void 0===n||null===(u=n.observed_on_details)||void 0===u?void 0:u.hour)&&void 0!==a?a:99)<=6||(null!==(l=null===n||void 0===n||null===(c=n.observed_on_details)||void 0===c?void 0:c.hour)&&void 0!==l?l:-99)>=18))return 1}}catch(s){i.e(s)}finally{i.f()}return 0})),Zn=[47158,144128,47119,243773],$n=new s("NotABug",201,(function(){return[].concat(Zn,[61267])}),(function(n){var e,r,o,i=!1,a=!1,u=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(u.s();!(o=u.n()).done;){var l=o.value;Zn.includes(l)&&(i=!0),61267===l&&(a=!0)}}catch(c){u.e(c)}finally{u.f()}return i&&!a?1:0})),zn=new s("NotSeeingIsBelieving",50,(function(){return[]}),(function(n){var e,r,o=t(null!==(e=n.annotations)&&void 0!==e?e:[]);try{for(o.s();!(r=o.n()).done;){var i=r.value;if(22===i.controlled_attribute_id&&24!==i.controlled_value_id)return 1}}catch(a){o.e(a)}finally{o.f()}return 0}));function Bn(n,t){D(2,arguments);var e=Z(n),r=Z(t);return e.getFullYear()-r.getFullYear()}function Wn(n,t){D(2,arguments);var e=Z(n),r=Z(t),o=e.getTime()-r.getTime();return o<0?-1:o>0?1:o}function qn(n,t){D(2,arguments);var e=Z(n),r=Z(t),o=Wn(e,r),i=Math.abs(Bn(e,r));e.setFullYear(1584),r.setFullYear(1584);var a=Wn(e,r)===-o,u=o*(i-Number(a));return 0===u?0:u}var Kn=0,Jn=new s("OldGeeser",10,(function(){return[6912]}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){if(6912===o.value){var a,u,l,c,d,s,v=null!==(a=null===n||void 0===n||null===(u=n.observed_on_details)||void 0===u?void 0:u.year)&&void 0!==a?a:-1,f=null!==(l=null===n||void 0===n||null===(c=n.observed_on_details)||void 0===c?void 0:c.month)&&void 0!==l?l:-1,h=null!==(d=null===n||void 0===n||null===(s=n.observed_on_details)||void 0===s?void 0:s.day)&&void 0!==d?d:-1;if(v>=0&&f>=0&&h>=0){var y=new Date(v,f,h),p=new Date;if(y<p){var g=qn(p,y);if(g>Kn){var m=g-Kn;return Kn=g,m}}}}}}catch(b){i.e(b)}finally{i.f()}return 0}),(function(){Kn=0})),Qn=[],Vn=new s("PlentyOfPlaces",20,(function(){return[]}),(function(n){if(n.geojson&&n.geojson.coordinates){var t=Math.round(Math.trunc(10*parseFloat(n.geojson.coordinates[0]))/10*2)/2,e=Math.round(Math.trunc(10*parseFloat(n.geojson.coordinates[1]))/10*2)/2,r="".concat(e,"|").concat(t);if(!Qn.includes(r))return Qn.push(r),1}return 0}),(function(){Qn=[]})),Xn=new s("RatKing",25,(function(){return[43698]}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){if(43698===o.value)return 1}}catch(a){i.e(a)}finally{i.f()}return 0})),nt=[],tt=new s("Scatter",16,(function(){return[]}),(function(n){var e,r;if(n.annotations&&(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.rank_level)&&void 0!==e?e:999)<=b&&n.geojson&&n.geojson.coordinates){var o,i=t(n.annotations);try{for(i.s();!(o=i.n()).done;){var a=o.value;if(22===a.controlled_attribute_id&&25===a.controlled_value_id){var u,l,c=Math.round(Math.trunc(1e3*parseFloat(null===(u=n.geojson)||void 0===u?void 0:u.coordinates[0]))/1e3*4)/4,d=Math.round(Math.trunc(1e3*parseFloat(null===(l=n.geojson)||void 0===l?void 0:l.coordinates[1]))/1e3*4)/4,s="".concat(d,"|").concat(c);if(!nt.includes(s))return nt.push(s),1}}}catch(v){i.e(v)}finally{i.f()}}return 0}),(function(){nt=[]})),et=new s("SelfPollinator",50,(function(){return[]}),(function(n){var e;if(null!==n&&void 0!==n&&n.comments&&null!==n&&void 0!==n&&null!==(e=n.user)&&void 0!==e&&e.id){var r,o,i=t(null!==(r=null===n||void 0===n?void 0:n.comments)&&void 0!==r?r:[]);try{for(i.s();!(o=i.n()).done;){var a,u=o.value;if(null!==u&&void 0!==u&&null!==(a=u.user)&&void 0!==a&&a.id&&u.user.id===n.user.id)return 1}}catch(l){i.e(l)}finally{i.f()}}return 0})),rt=new s("SocialButterfly",30,(function(){return[47224]}),(function(n){var e;if((null!==(e=null===n||void 0===n?void 0:n.comments_count)&&void 0!==e?e:0)>0){var r,o,i,a=t(null!==(r=null===n||void 0===n||null===(o=n.taxon)||void 0===o?void 0:o.ancestor_ids)&&void 0!==r?r:[]);try{for(a.s();!(i=a.n()).done;){if(47224===i.value)return 1}}catch(u){a.e(u)}finally{a.f()}}return 0})),ot=new Map,it=0,at=new s("Strider",500,(function(){return[]}),(function(n){var e;if(n.geojson&&n.geojson.coordinates&&2===n.geojson.coordinates.length&&null!==n&&void 0!==n&&null!==(e=n.observed_on_details)&&void 0!==e&&e.date){var r=n.observed_on_details.date,o=ot.get(r);o||(o=[],ot.set(r,o));var i={lon:parseFloat(n.geojson.coordinates[0]),lat:parseFloat(n.geojson.coordinates[1])};if(o.push(i),o.length>1){var a,u=t(o);try{for(u.s();!(a=u.n()).done;){var l=a.value,c=Math.round(_(i.lat,i.lon,l.lat,l.lon));if(c>it){var d=c-it;return it=c,d}}}catch(s){u.e(s)}finally{u.f()}}}return 0}),(function(){ot.clear(),it=0})),ut=481959,lt=[],ct=new s("SuperStar",5,(function(){return[ut]}),(function(n){var e;if(null!==n&&void 0!==n&&null!==(e=n.taxon)&&void 0!==e&&e.rank_level&&n.taxon.rank_level<=b){var r,o,i=n.taxon.rank_level;if(null!==n&&void 0!==n&&null!==(r=n.taxon)&&void 0!==r&&r.id&&i===b){var a,u,l,c=t(null!==(a=null===n||void 0===n||null===(u=n.taxon)||void 0===u?void 0:u.ancestor_ids)&&void 0!==a?a:[]);try{for(c.s();!(l=c.n()).done;){var d=l.value;if(ut===d){var s=n.taxon.id;if(!lt.includes(s))return lt.push(s),1}}}catch(m){c.e(m)}finally{c.f()}}else if(null!==n&&void 0!==n&&null!==(o=n.taxon)&&void 0!==o&&o.parent_id&&(5===i||i<b)){var v,f,h,y=t(null!==(v=null===n||void 0===n||null===(f=n.taxon)||void 0===f?void 0:f.ancestor_ids)&&void 0!==v?v:[]);try{for(y.s();!(h=y.n()).done;){var p=h.value;if(ut===p){var g=n.taxon.parent_id;if(!lt.includes(g))return lt.push(g),1}}}catch(m){y.e(m)}finally{y.f()}}}return 0}),(function(){lt=[]})),dt=[47459,47797,48332],st=[],vt=new s("TentacleSuckers",8,(function(){return dt}),(function(n){var e;if(null!==n&&void 0!==n&&null!==(e=n.taxon)&&void 0!==e&&e.rank_level&&n.taxon.rank_level<=b){var r,o,i,a=t(null!==(r=null===n||void 0===n||null===(o=n.taxon)||void 0===o?void 0:o.ancestor_ids)&&void 0!==r?r:[]);try{for(a.s();!(i=a.n()).done;){var u=i.value;if(dt.includes(u)){var l,c,d=void 0;if(null!==n&&void 0!==n&&null!==(l=n.taxon)&&void 0!==l&&l.id&&n.taxon.rank_level===b?d=n.taxon.id:null!==n&&void 0!==n&&null!==(c=n.taxon)&&void 0!==c&&c.parent_id&&(5===n.taxon.rank_level||n.taxon.rank_level<b)&&(d=n.taxon.parent_id),d&&!st.includes(d))return st.push(d),1}}}catch(s){a.e(s)}finally{a.f()}}return 0}),(function(){st=[]})),ft=[20979,47169],ht=new s("ToadsAndToadstools",42,(function(){return ft}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){var a=o.value;if(ft.includes(a))return 1}}catch(u){i.e(u)}finally{i.f()}return 0})),yt=new s("TooManyBugs",99,(function(){return[61267]}),(function(n){var e,r,o,i=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(i.s();!(o=i.n()).done;){if(61267===o.value)return 1}}catch(a){i.e(a)}finally{i.f()}return 0})),pt=[42478,43253,46927,71384],gt=[152871,46306,526556],mt=0,bt=0,_t=0,wt=new s("TryMammals",9,(function(){return[].concat(pt,[40268],gt)}),(function(n){var e,r,o,i=Math.min(mt,bt,_t),a=t(null!==(e=null===n||void 0===n||null===(r=n.taxon)||void 0===r?void 0:r.ancestor_ids)&&void 0!==e?e:[]);try{for(a.s();!(o=a.n()).done;){var u=o.value;if(pt.includes(u)){mt++;break}if(gt.includes(u)){bt++;break}if(40268===u){_t++;break}}}catch(l){a.e(l)}finally{a.f()}return i<Math.min(mt,bt,_t)?1:0}),(function(){mt=0,bt=0,_t=0})),xt=[],Nt=[In,et,wt,Hn,En,sn,kn,rt,f,Gn,Xn,an,yt,$n,Ln,ht,xn,new s("WorldClass",21,(function(){return[]}),(function(n,e){var r,o,i;if((null!==(r=null===n||void 0===n||null===(o=n.taxon)||void 0===o?void 0:o.rank_level)&&void 0!==r?r:999)<=50&&(null!==n&&void 0!==n&&null!==(i=n.taxon)&&void 0!==i&&i.ancestor_ids&&n.taxon.ancestor_ids.length>2)){var a,u=t(n.taxon.ancestor_ids.slice(2,Math.min(6,n.taxon.ancestor_ids.length)));try{var l=function(){var t,r=a.value,o=null===(t=e.find((function(n){return n.taxonID===r})))||void 0===t?void 0:t.rank;if(o){if(50===o&&!xt.includes(r))return xt.push(r),{v:1};if(o<=50)return"break"}else console.log("Taxon Rank not found for taxon ".concat(r," on observation ").concat(n.id))};for(u.s();!(a=u.n()).done;){var c=l();if("break"===c)break;if("object"===typeof c)return c.v}}catch(d){u.e(d)}finally{u.f()}}return 0}),(function(){xt=[]})),dn,S,X,yn,vt,Tn,Rn,_n,at,Sn,zn,Vn,m,en,ct,Jn,tt];function St(){return Nt}function kt(){return Dt.apply(this,arguments)}function Dt(){return(Dt=i(u().mark((function n(){var e,r;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e=t(Nt);try{for(e.s();!(r=e.n()).done;)r.value.reset()}catch(o){e.e(o)}finally{e.f()}return n.abrupt("return",Nt.map((function(n){return n.data})));case 3:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function jt(n,t){return Mt.apply(this,arguments)}function Mt(){return(Mt=i(u().mark((function n(e,r){var o,i,a,l,c,d;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:o=t(Nt);try{for(o.s();!(i=o.n()).done;){a=i.value,l=t(e);try{for(l.s();!(c=l.n()).done;)d=c.value,a.evaluate(d,r)}catch(u){l.e(u)}finally{l.f()}}}catch(u){o.e(u)}finally{o.f()}return n.abrupt("return",Nt.map((function(n){return n.data})));case 3:case"end":return n.stop()}}),n)})))).apply(this,arguments)}addEventListener("message",(function(n){var t,e=n.data,o=e.type,i=e.method,a=e.id,u=e.params;"RPC"===o&&i&&((t=r[i])?Promise.resolve().then((function(){return t.apply(r,u)})):Promise.reject("No such method")).then((function(n){postMessage({type:"RPC",id:a,result:n})})).catch((function(n){var t={message:n};n.stack&&(t.message=n.message,t.stack=n.stack,t.name=n.name),postMessage({type:"RPC",id:a,error:t})}))})),postMessage({type:"RPC",method:"ready"})}()}();
//# sourceMappingURL=61b7db1964ec19bed717.worker.js.map