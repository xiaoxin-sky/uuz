(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{22:function(t,e,n){"use strict";n.r(e);var i,r=n(31),o=n(0),s=n.n(o),a=n(63),c=n(61),u=n(62),l=n(65),f=n(64),h=n(67),v=n(68);!function(t){t[t.EMPTY=0]="EMPTY",t[t.HALF=1]="HALF",t[t.DONE=2]="DONE"}(i||(i={}));var d=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(l.a)(this,Object(f.a)(e).call(this,{direction:"y"}))).Refresh_Distance=void 0,t.distanceStatus=void 0,t.isRefreshable=void 0,t.Refresh_Distance=90,t.isRefreshable=!0,t}return Object(h.a)(e,t),Object(u.a)(e,[{key:"_getFinalEndPonit",value:function(){return this.distanceStatus=i.EMPTY,{x:0,y:0}}},{key:"banRefresh",value:function(){this.isRefreshable=!1}},{key:"canRefresh",value:function(){this.isRefreshable=!0}},{key:"markScrollTip",value:function(){var t="",e=this.getDist();return e>this.Refresh_Distance?(this.distanceStatus=i.DONE,t="\u677e\u5f00\u5237\u65b0"):e>0&&(this.distanceStatus=i.HALF,t="\u4e0b\u62c9\u5237\u65b0"),t}},{key:"getUpdateStatus",value:function(){return this.distanceStatus===i.DONE?"update":this.distanceStatus===i.HALF?"reset":"none"}}]),e}(v.a);function b(t){var e,n=Object(o.useState)(""),i=Object(r.a)(n,2),c=i[0],u=i[1],l=Object(o.useState)({transform:"",transition:""}),f=Object(r.a)(l,2),h=f[0],v=f[1],b=Object(o.useState)(0),y=Object(r.a)(b,2),p=y[0],m=y[1],O=Object(o.useState)(new d),j=Object(r.a)(O,1)[0],P=Object(o.useState)(0),E=Object(r.a)(P,2),D=E[0],S=E[1],k=Object(o.useRef)(null),g="zui-scroll-box ".concat(t.className||""),_=function(){v({transform:"translate(0, -50px)",transition:"transform 0.5s"})},w={update:function(){t.freshHandler(),S(D+1),v({transform:"translate(0, 0)",transition:"transform 2s"}),u("\u5237\u65b0\u4e2d >>>"),setTimeout((function(){return _()}),300)},reset:_,none:function(){}},N=function(t){v({transform:"translate(0, -50px)",transition:""}),0===k.current.scrollTop?j.canRefresh():j.banRefresh(),j.start(t)},x=function(t){var e=j.move(t).y;if(e>0&&j.isRefreshable){v({transform:"translate(0, ".concat(e-50,"px)"),transition:""});var n=j.markScrollTip();u(n)}},L=function(){if("function"===typeof t.freshHandler){var e=j.getUpdateStatus();if("none"!==e)return w[e](),void j.end()}if("function"===typeof t.loadHandler){var n=k.current;n.scrollHeight<p+n.scrollTop&&(t.loadHandler(),S(D+1))}};return Object(o.useEffect)((function(){m(e.offsetHeight+500),S(D+1)}),[]),Object(o.useEffect)((function(){var t=new a.a(e);return t.createEventList(N,x,L),t.listenerAllOfEle(),function(){t.removeAllOfEle()}}),[D]),s.a.createElement("div",{className:g,ref:function(t){return e=t}},s.a.createElement("div",{className:"zui-scroll-area",ref:k,style:h},s.a.createElement("div",{className:"zui-scroll-tip"},c,"\u6d4b\u8bd5"),s.a.createElement("div",{className:"zui-scroll"},t.children)))}function y(t){return Array(t.num).fill(0).map((function(t,e){return s.a.createElement("div",{className:"test-content",key:e},e+1,"\uff1a\u9700\u7528\u624b\u673a\u6a21\u5f0f\u6d4b\u8bd5")}))}e.default=function(){var t=Object(o.useState)(50),e=Object(r.a)(t,2),n=e[0],i=e[1];return s.a.createElement(b,{className:"test-fresh",freshHandler:function(){console.log("\u5237\u65b0"),i(50)},loadHandler:function(){console.log("\u52a0\u8f7d"),i(n+30)}},s.a.createElement(y,{num:n}))}},61:function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",(function(){return i}))},62:function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}n.d(e,"a",(function(){return r}))},63:function(t,e,n){"use strict";var i=n(61),r=n(62),o=n(6),s=function(){function t(e){Object(i.a)(this,t),this.eventList=void 0,this.willPreventDefault=void 0,this.willNotPreventDefault=void 0,this.$ele=void 0,this.eventList={};var n=Object(o.e)();this.willPreventDefault=!!n&&{passive:!1},this.willNotPreventDefault=!!n&&{passive:!0},this.$ele=e}return Object(r.a)(t,[{key:"createEventList",value:function(t,e,n){this.eventList={touchstart:t,mousedown:t,touchmove:e,mousemove:e,touchend:n,mouseup:n}}},{key:"listenerAllOfEle",value:function(){var t=this;Object.keys(this.eventList).forEach((function(e){var n=e.indexOf("move")>=0?t.willPreventDefault:t.willNotPreventDefault;t.$ele.addEventListener(e,t.eventList[e],n)}))}},{key:"removeAllOfEle",value:function(){var t=this;Object.keys(this.eventList).forEach((function(e){t.$ele.removeEventListener(e,t.eventList[e])}))}}]),t}();e.a=s},64:function(t,e,n){"use strict";function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}n.d(e,"a",(function(){return i}))},65:function(t,e,n){"use strict";function i(t){return(i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t){return(r="function"===typeof Symbol&&"symbol"===i(Symbol.iterator)?function(t){return i(t)}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":i(t)})(t)}function o(t,e){return!e||"object"!==r(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}n.d(e,"a",(function(){return o}))},67:function(t,e,n){"use strict";function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function r(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}n.d(e,"a",(function(){return r}))},68:function(t,e,n){"use strict";var i=n(14),r=n(61),o=n(62),s=n(6),a=JSON.stringify({x:0,y:0}),c=function(){function t(e){var n=e.direction,i=void 0===n?"x":n;Object(r.a)(this,t),this.startPoint=void 0,this.distance=void 0,this.endPoint=void 0,this.direction=void 0,this.Prevent_Distance=void 0,this.lockDirection=void 0,this.isAnm=void 0,this.direction=i,this.startPoint=JSON.parse(a),this.distance=JSON.parse(a),this.endPoint=JSON.parse(a),this.Prevent_Distance=5,this.lockDirection=null,this.isAnm=!1}return Object(o.a)(t,[{key:"_getFinalEndPonit",value:function(){throw Error("_getFinalEndPonit \u9700\u8981\u88ab\u91cd\u5199")}},{key:"_getLockDirection",value:function(){var t=Math.abs(this.distance.x),e=Math.abs(this.distance.y),n=null;return"x"===this.direction?t>=e&&t>this.Prevent_Distance?n="x":e>this.Prevent_Distance&&(n="y"):e>=t&&e>this.Prevent_Distance?n="y":t>this.Prevent_Distance&&(n="x"),n}},{key:"getDist",value:function(){return this.endPoint[this.direction]-this.distance[this.direction]}},{key:"start",value:function(t){t.stopPropagation(),this.isAnm=!0;var e=Object(s.b)(t);this.lockDirection=null,this.startPoint={x:e.pageX,y:e.pageY}}},{key:"move",value:function(t){if(this.isAnm){t.stopPropagation();var e=Object(s.b)(t);if(this.distance={x:this.startPoint.x-e.pageX,y:this.startPoint.y-e.pageY},this.lockDirection){if(this.direction===this.lockDirection)return t.cancelable&&t.preventDefault(),Object.assign({x:0,y:0},Object(i.a)({},this.direction,this.getDist()))}else this.lockDirection=this._getLockDirection()}return this.endPoint}},{key:"end",value:function(){return this.isAnm=!1,this._getFinalEndPonit()}}]),t}();e.a=c}}]);
//# sourceMappingURL=0.cdec78c8.chunk.js.map