(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[1],{29:function(t,e,n){"use strict";n.r(e);var i,s=n(17),r=n(0),o=n.n(r),a=n(10),l=n(71),c=n(20),u=n(19),f=n(21),h=n(72),v=n(74);!function(t){t[t.EMPTY=0]="EMPTY",t[t.HALF=1]="HALF",t[t.DONE=2]="DONE"}(i||(i={}));var d=function(t){function e(){var t;return Object(a.a)(this,e),(t=Object(c.a)(this,Object(u.a)(e).call(this,{direction:"y"}))).Refresh_Distance=void 0,t.distanceStatus=void 0,t.isRefreshable=void 0,t.beginTime=void 0,t.Refresh_Distance=90,t.isRefreshable=!0,t}return Object(f.a)(e,t),Object(l.a)(e,[{key:"_getFinalEndPonit",value:function(){return{x:0,y:0}}},{key:"_resetSomething",value:function(){this._markBeginTime(),this.distance[this.direction]=0}},{key:"_markBeginTime",value:function(){this.beginTime=Date.now()}},{key:"_getTimeTotal",value:function(){return Date.now()-this.beginTime}},{key:"getExpectMat",value:function(){return 234*(this.getMoveDist()/this._getTimeTotal())}},{key:"setRefreshAble",value:function(t){this.isRefreshable=t}},{key:"resetRefreshStatus",value:function(){this.distanceStatus=i.EMPTY}},{key:"markScrollTip",value:function(){var t="",e=this.getMoveDist();return e>this.Refresh_Distance?(this.distanceStatus=i.DONE,t="\u677e\u5f00\u5237\u65b0"):e>0&&(this.distanceStatus=i.HALF,t="\u4e0b\u62c9\u5237\u65b0"),t}},{key:"getUpdateStatus",value:function(){return this.distanceStatus===i.DONE?"update":this.distanceStatus===i.HALF?"reset":"none"}}]),e}(v.a),m=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(c.a)(this,Object(u.a)(e).call(this,t))).freshBoxClassName=void 0,n.refScrollWarp=void 0,n.refScrollBody=void 0,n.eventControl=void 0,n.scrollControl=void 0,n.freshStore=void 0,n.Begin_Distance=void 0,n.End_Distance=void 0,n.oldDistance=void 0,n.scrollBottleneck=void 0,n.hideScrollTip=function(){n.setState({transform:{distance:n.Begin_Distance,time:.5}})},n.updateScroll=function(){n.props.freshHandler(),n.setState({scrollTip:"\u5237\u65b0\u5b8c\u6210>>>",transform:{distance:0,time:2}}),setTimeout((function(){n.hideScrollTip()}),300)},n.getScrollBottleneck=function(){return n.refScrollBody.offsetHeight-n.refScrollWarp.offsetHeight+n.Begin_Distance},n.scrollMat=function(){var t=n.scrollControl.getExpectMat();if(t){var e=n.state.transform.distance+t;e>n.Begin_Distance?e=n.Begin_Distance:e<-n.scrollBottleneck&&(e=-n.scrollBottleneck),n.setState({transform:{distance:e,time:.5}})}},n.onStartHandler=function(t){n.setState({transform:{distance:n.state.transform.distance,time:0}}),n.scrollControl.start(t);var e=n.state.transform.distance===n.Begin_Distance;n.scrollControl.setRefreshAble(e),n.oldDistance=n.state.transform.distance,n.scrollBottleneck=n.getScrollBottleneck()},n.onMoveHandler=function(t){t.preventDefault();var e=n.scrollControl.move(t).y;if(e>0&&n.scrollControl.isRefreshable){var i=n.scrollControl.markScrollTip();n.setState({scrollTip:i})}var s,r=n.oldDistance+e;s=!n.scrollControl.isRefreshable&&r>n.Begin_Distance?n.Begin_Distance:n.scrollBottleneck<=-r?-n.scrollBottleneck-n.End_Distance:e>0?n.oldDistance+e/2:r,n.setState({transform:{distance:s,time:0}})},n.onEndHandler=function(){if(n.scrollControl.end(),"function"===typeof n.props.freshHandler){var t=n.scrollControl.getUpdateStatus();if("none"!==t)return n.freshStore[t](),void n.scrollControl.resetRefreshStatus()}n.scrollMat(),"function"===typeof n.props.loadHandler&&n.scrollBottleneck<=-n.state.transform.distance&&n.props.loadHandler()},n.freshBoxClassName="zui-scroll-box ".concat(t.className||""),n.Begin_Distance=-50,n.End_Distance=26,n.scrollControl=new d,n.freshStore={update:n.updateScroll,reset:n.hideScrollTip,none:function(){}},n.oldDistance=0,n.scrollBottleneck=0,n.state={transform:{distance:n.Begin_Distance,time:0},scrollTip:""},n}return Object(f.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.eventControl=new h.a(this.refScrollWarp),this.eventControl.createEventList(this.onStartHandler,this.onMoveHandler,this.onEndHandler),this.eventControl.listenerAllOfEle()}},{key:"componentWillUnmount",value:function(){this.eventControl.removeAllOfEle()}},{key:"render",value:function(){var t=this;return o.a.createElement("div",{className:this.freshBoxClassName,ref:function(e){return t.refScrollWarp=e}},o.a.createElement("div",{className:"zui-scroll-area",ref:function(e){return t.refScrollBody=e},style:{transform:"translate(0, ".concat(this.state.transform.distance,"px)"),transition:"transform ".concat(this.state.transform.time,"s")}},o.a.createElement("div",{className:"zui-scroll-tip"},this.state.scrollTip),o.a.createElement("div",{className:"zui-scroll"},this.props.children),o.a.createElement("div",{className:"zui-scroll-load-tip"},"\u52a0\u8f7d\u66f4\u591a\u5185\u5bb9")))}}]),e}(o.a.PureComponent);function p(t){return Array(t.num).fill(0).map((function(t,e){return o.a.createElement("div",{className:"test-content",key:e},e+1,"\uff1a\u9700\u7528\u624b\u673a\u6a21\u5f0f\u6d4b\u8bd5")}))}e.default=function(){var t=Object(r.useState)(50),e=Object(s.a)(t,2),n=e[0],i=e[1];return o.a.createElement(m,{className:"test-fresh",freshHandler:function(){console.log("\u5237\u65b0"),i(50)},loadHandler:function(){console.log("\u52a0\u8f7d"),i(n+30)}},o.a.createElement(p,{num:n}))}},71:function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}n.d(e,"a",(function(){return s}))},72:function(t,e,n){"use strict";var i=n(10),s=n(71),r=n(6),o=function(){function t(e){Object(i.a)(this,t),this.eventList=void 0,this.willPreventDefault=void 0,this.willNotPreventDefault=void 0,this.$ele=void 0,this.eventList={};var n=Object(r.e)();this.willPreventDefault=!!n&&{passive:!1},this.willNotPreventDefault=!!n&&{passive:!0},this.$ele=e}return Object(s.a)(t,[{key:"createEventList",value:function(t,e,n){"ontouchstart"in window?this.eventList={touchstart:t,touchmove:e,touchend:n}:this.eventList={mousedown:t,mousemove:e,mouseup:n}}},{key:"listenerAllOfEle",value:function(){var t=this;Object.keys(this.eventList).forEach((function(e){var n=e.indexOf("move")>=0?t.willPreventDefault:t.willNotPreventDefault;t.$ele.addEventListener(e,t.eventList[e],n)}))}},{key:"removeAllOfEle",value:function(){var t=this;Object.keys(this.eventList).forEach((function(e){t.$ele.removeEventListener(e,t.eventList[e])}))}}]),t}();e.a=o},74:function(t,e,n){"use strict";var i=n(18),s=n(10),r=n(71),o=n(6),a=JSON.stringify({x:0,y:0}),l=function(){function t(e){var n=e.direction,i=void 0===n?"x":n;Object(s.a)(this,t),this.startPoint=void 0,this.distance=void 0,this.endPoint=void 0,this.direction=void 0,this.Prevent_Distance=void 0,this.lockDirection=void 0,this.isAnm=void 0,this.direction=i,this.startPoint=JSON.parse(a),this.distance=JSON.parse(a),this.endPoint=JSON.parse(a),this.Prevent_Distance=5,this.lockDirection=null,this.isAnm=!1}return Object(r.a)(t,[{key:"_getFinalEndPonit",value:function(){throw Error("_getFinalEndPonit \u9700\u8981\u88ab\u91cd\u5199")}},{key:"_resetSomething",value:function(){this.distance[this.direction]=0}},{key:"_getLockDirection",value:function(){var t=Math.abs(this.distance.x),e=Math.abs(this.distance.y),n=null;return"x"===this.direction?t>=e&&t>this.Prevent_Distance?n="x":e>this.Prevent_Distance&&(n="y"):e>=t&&e>this.Prevent_Distance?n="y":t>this.Prevent_Distance&&(n="x"),n}},{key:"getMoveDist",value:function(){return this.endPoint[this.direction]-this.distance[this.direction]}},{key:"start",value:function(t){this.isAnm=!0;var e=Object(o.b)(t);this.lockDirection=null,this.startPoint={x:e.pageX,y:e.pageY},this._resetSomething()}},{key:"move",value:function(t){if(this.isAnm){var e=Object(o.b)(t);if(this.distance={x:this.startPoint.x-e.pageX,y:this.startPoint.y-e.pageY},this.lockDirection){if(this.direction===this.lockDirection)return t.preventDefault&&t.preventDefault(),Object.assign({x:0,y:0},Object(i.a)({},this.direction,this.getMoveDist()))}else this.lockDirection=this._getLockDirection(),"y"===this.direction&&t.preventDefault&&t.preventDefault()}return this.endPoint}},{key:"end",value:function(){return this.isAnm=!1,this._getFinalEndPonit()}}]),t}();e.a=l}}]);
//# sourceMappingURL=1.10116ce3.chunk.js.map