!function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(1);window&&(window.oConsole=n.default),e.default=n.default},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(2),i=o(3),r=function(){function t(){this._isShown=!1,this._createNodes(),this._overwriteNativeMethods(),this._setErrorListener()}return t.prototype._setErrorListener=function(){var t=window.onerror;window.onerror=function(e,o,n,r,s){return t&&t(e,o,n,r,s),!!i.getNode("panel")&&(s&&s.stack&&!~s.stack.indexOf("HTMLInputElement._inputNode.onkeydown")?console.error(s.stack):console.error(e),!0)}},t.prototype._overwriteNativeMethods=function(){for(var t=0,e=n.SUPPORTED_METHODS;t<e.length;t++){var o=e[t];this["_"+o]=console[o].bind(console),console[o]=this._print(o).bind(this)}},t.prototype._createNodes=function(){var t=this;this._consoleNode=document.createElement("div"),this._consoleNode.id="console-panel",this._consoleNode.setAttribute("onscreenconsole-id","panel"),this._consoleNode.style.cssText="\n\t\t\tcursor: default;\n\t\t\tposition: fixed;\n\t\t\tz-index: 995;\n\t\t\theight: 240px;\n\t\t\twidth: 100%;\n\t\t\tbottom: -250px;\n\t\t\tleft: 0;\n\t\t\toverflow-x: auto; \n\t\t\toverflow-y: auto;\n\t\t\tbackground-color: #fff;\n\t\t\t-webkit-box-shadow: 0 -5px 10px #00000033;\n\t\t\t\t\t\t\tbox-shadow: 0 -5px 10px #00000033;\n\t\t\t-webkit-box-sizing: border-box;\n\t\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\ttransition: all .2s;\n\t\t",this._showBtn=document.createElement("button"),this._showBtn.id="console-button-show",this._showBtn.setAttribute("onscreenconsole-id","show"),this._showBtn.style.cssText="\n\t\t\tposition: fixed;\n\t\t\tz-index: 990;\n\t\t\theight: 32px;\n\t\t\twidth: 48px;\n\t\t\tbottom: 6px;\n\t\t\tright: 6px;\n\t\t\tcolor: #0089A7;\n\t\t\tborder: 1px solid #0089A7;\n\t\t\tbackground-color: #fff;\n\t\t\tcursor: pointer;\n\t\t\t-webkit-box-shadow: 0 2px 5px #00000033;\n\t\t\t\t\t\t\tbox-shadow: 0 2px 5px #00000033;\n\t\t\ttransition: all .2s;\n\t\t",this._showBtn.innerHTML="Show",this._showBtn.onclick=this.show.bind(this),this._hideBtn=document.createElement("button"),this._hideBtn.id="console-button-hide",this._hideBtn.style.cssText="\n\t\t\tposition: fixed;\n\t\t\tz-index: 999;\n\t\t\theight: 32px;\n\t\t\twidth: 48px;\n\t\t\tbottom: 6px;\n\t\t\tright: 6px;\n\t\t\tcolor: #0089A7;\n\t\t\tborder: 1px solid #0089A7;\n\t\t\tbackground-color: #fff;\n\t\t\tcursor: pointer;\n\t\t\t-webkit-box-shadow: 0 2px 5px #00000033;\n\t\t\t\t\t\t\tbox-shadow: 0 2px 5px #00000033;\n\t\t\ttransition: all .2s;\n\t\t",this._hideBtn.innerHTML="Hide",this._hideBtn.onclick=this.hide.bind(this),this._inputNode=document.createElement("input"),this._inputNode.id="console-input",this._inputNode.placeholder=">",this._inputNode.style.cssText="\n\t\t\toverflow: scroll;\n\t\t\tpadding: 6px 12px;\n\t\t\tfont-size: 14px;\n\t\t\tborder: none;\n\t\t\toutline: none;\n\t\t\tresize: none;\n\t\t\tborder-top: 1px solid #00000033;\n\t\t\twidth: 100%;\n\t\t\t-webkit-box-sizing: border-box;\n\t\t\t\t\t\t\tbox-sizing: border-box;\n\t\t",this._consoleNode.onclick=this._inputNode.focus.bind(this._inputNode);var e=JSON.parse(localStorage.getItem("onscreen-console-history")),o=-1;Array.isArray(e)?o=e.length:e=[],this._inputNode.onkeydown=function(i){var r=i.target.value;if(13===i.keyCode&&""!==r){console.log('<span style="color: #00000055">></span> '+r);var s=document.createElement("script");for(s.innerHTML=r,document.body.appendChild(s),s.remove(),e.push(r);e.length>n.MAX_HISTORY_LENGTH;)e.shift();localStorage.setItem("onscreen-console-history",JSON.stringify(e)),t._inputNode.value="",o=e.length}else 38===i.keyCode?o>0?(o--,t._inputNode.value=e[o]):0===o&&(t._inputNode.value=e[o]):40===i.keyCode&&(o<e.length-1?(o++,t._inputNode.value=e[o]):o===e.length-1&&(o++,t._inputNode.value=""))},this._consoleNode.appendChild(this._inputNode)},t.prototype._print=function(t){return function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];var r=i.getNode("panel");if(r){var s=document.createElement("div");s.style.cssText="\n          min-height: 20px;\n          font-size: 14px;\n          color: "+n.SUPPORTED_COLORS[t]+";\n          background-color: "+n.SUPPORTED_COLORS[t]+"11;\n          border-top: 1px solid "+n.SUPPORTED_COLORS[t]+"33;\n          padding: 6px 12px;\n        ";for(var d=[],c=0,l=e;c<l.length;c++){var u=l[c];d.push(i.format(u))}s.innerHTML=d.join(" "),this._consoleNode.insertBefore(s,this._inputNode),this._consoleNode.scrollTop=r.scrollHeight}else this["_"+t].apply(this,e)}},t.prototype.enable=function(t){void 0===t&&(t=!0),i.getNode("panel")||document.body.appendChild(this._consoleNode),!i.getNode("hide")&&t&&this._consoleNode.appendChild(this._hideBtn),!i.getNode("show")&&t&&document.body.appendChild(this._showBtn)},t.prototype.disable=function(){var t=i.getNode("panel");t&&t.remove();var e=i.getNode("show");e&&e.remove()},t.prototype.show=function(){i.getNode("panel")&&"0px"!==this._consoleNode.style.bottom&&(this._consoleNode.style.bottom="0px",this._hideBtn.style.bottom="6px"),this._isShown=!0},t.prototype.hide=function(){i.getNode("panel")&&"0px"===this._consoleNode.style.bottom&&(this._consoleNode.style.bottom=-this._consoleNode.offsetHeight-10+"px",this._hideBtn.style.bottom=-this._consoleNode.offsetHeight-4+"px"),this._isShown=!1},t.prototype.isShown=function(){return this._isShown},t}();e.default=new r},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MAX_HISTORY_LENGTH=20,e.MAX_LOG_LENGTH=100,e.SUPPORTED_COLORS={log:"#0B1013",warn:"#C99833",error:"#CB1B45"},e.SUPPORTED_METHODS=Object.keys(e.SUPPORTED_COLORS)},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={"[object Undefined]":function(){return"undefined"},"[object Null]":function(){return"null"},"[object Number]":function(t){return t.toString()},"[object String]":function(t){return t.toString()},"[object Boolean]":function(t){return t?"true":"false"},"[object Symbol]":function(t){return"Symbol("+t.toString()+")"},"[object Function]":function(t){return t.toString()},"[object Array]":function(t){return"["+t.join(", ")+"]"},"[object Object]":function(t){return JSON.stringify(t)}};e.format=function(t){return n[function(t){return Object.prototype.toString.call(t)}(t)](t)},e.getNode=function(t){return document.querySelector('[onscreenconsole-id="'+t+'"]')}}]);