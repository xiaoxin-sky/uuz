(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[11],{27:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(31),l=a(63),s=a.n(l);function i(e){var t,a=Object(n.useState)(0),l=Object(c.a)(a,2),i=l[0],u=l[1],m=e.tabs.length;return Object(n.useEffect)((function(){var e=new s.a(t);return e.on("swipeleft",(function(){i<m-1&&u(i+1)})),e.on("swiperight",(function(){i>0&&u(i-1)})),function(){return e.destroy()}}),[i]),r.a.createElement("div",{className:"zui-tabs-container"},r.a.createElement("div",{className:"zui-tabs-bar-box"},e.tabs.map((function(e,t){return r.a.createElement("div",{className:"zui-tabs-bar".concat(i===t?" active":""),key:t,style:{width:"".concat(100/m,"%")},onClick:function(){return u(t)}},e)})),r.a.createElement("div",{className:"zui-tabs-bar-underline",style:{width:"".concat(100/m,"%"),transform:"translateX(".concat(i,"00%)")}})),r.a.createElement("div",{className:"zui-tabs-area-box",ref:function(e){return t=e}},r.a.createElement("div",{className:"zui-tabs-area",style:{width:"".concat(m,"00%"),transform:"translateX(-".concat(i/m*100,"%)")}},e.children)))}t.default=function(){return r.a.createElement(i,{tabs:["\u6807\u98981","tab2","\u6d4b\u8bd53","\u5475\u5475","\u6536\u5c3e"]},r.a.createElement("div",null,"test"),r.a.createElement("div",null,"test2"),r.a.createElement("div",null,"\u8fea\u65af\u79d1\u5185\u5bb9",r.a.createElement("br",null),"\u8fea\u65af\u79d1\u5185\u5bb9",r.a.createElement("br",null),"\u8fea\u65af\u79d1\u5185\u5bb9",r.a.createElement("br",null),"\u8fea\u65af\u79d1\u5185\u5bb9",r.a.createElement("br",null),"\u8fea\u65af\u79d1\u5185\u5bb9"),r.a.createElement("div",null,"\u5185\u5bb91"),r.a.createElement("div",null,"\u5185\u5bb92"))}}}]);
//# sourceMappingURL=11.6e5e246c.chunk.js.map