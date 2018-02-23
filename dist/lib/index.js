"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OnScreenConsole = (function () {
    function OnScreenConsole() {
        this._consoleNode = this._createConsoleNode();
        this._overwriteNativeMethods();
        this._setErrorListener();
    }
    OnScreenConsole.prototype._setErrorListener = function () {
        var _this = this;
        var prevOnerror = window.onerror;
        window.onerror = function (info, path, line, col, err) {
            if (prevOnerror) {
                prevOnerror(info, path, line, col, err);
            }
            var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
            if (consoleNode) {
                if (err && err.stack) {
                    _this.error(err.stack);
                }
                else {
                    _this.error(info);
                }
                return true;
            }
            else {
                return false;
            }
        };
    };
    OnScreenConsole.prototype._overwriteNativeMethods = function () {
        for (var _i = 0, _a = OnScreenConsole._supportedMethods; _i < _a.length; _i++) {
            var method = _a[_i];
            this["_" + method] = console[method].bind(console);
            console[method] = this[method].bind(this);
        }
    };
    OnScreenConsole.prototype._createConsoleNode = function () {
        var _this = this;
        var consoleNode = document.createElement('div');
        consoleNode.setAttribute('onscreenconsole-id', 'panel');
        consoleNode.style.cssText = "\n\t\t\tcursor: default;\n\t\t\tposition: fixed;\n\t\t\tz-index: 99;\n\t\t\theight: 240px;\n\t\t\twidth: 100%;\n\t\t\tbottom: -250px;\n\t\t\tleft: 0;\n\t\t\toverflow: scroll;\n\t\t\tbackground-color: #fff;\n\t\t\t-webkit-box-shadow: 0 -2px 5px #00000033;\n\t\t\t\t\t\t\tbox-shadow: 0 -2px 5px #00000033;\n\t\t\t-webkit-box-sizing: border-box;\n\t\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\ttransition: all .2s;\n\t\t";
        var hideBtn = document.createElement('button');
        hideBtn.style.cssText = "\n\t\t\tposition: fixed;\n\t\t\tz-index: 999;\n\t\t\theight: 32px;\n\t\t\twidth: 32px;\n\t\t\tbottom: 6px;\n\t\t\tright: 6px;\n\t\t\tcolor: #0089A7;\n\t\t\tborder: 1px solid #0089A7;\n\t\t\tbackground-color: #fff;\n\t\t\tcursor: pointer;\n\t\t\t-webkit-box-shadow: 0 2px 5px #00000033;\n\t\t\t\t\t\t\tbox-shadow: 0 2px 5px #00000033;\n\t\t";
        hideBtn.innerHTML = '&darr;';
        hideBtn.onclick = this.hide.bind(this);
        consoleNode.appendChild(hideBtn);
        var showBtn = document.createElement('button');
        showBtn.style.cssText = "\n\t\t\tposition: fixed;\n\t\t\tz-index: 9;\n\t\t\theight: 32px;\n\t\t\twidth: 32px;\n\t\t\tbottom: 6px;\n\t\t\tright: 6px;\n\t\t\tcolor: #0089A7;\n\t\t\tborder: 1px solid #0089A7;\n\t\t\tbackground-color: #fff;\n\t\t\tcursor: pointer;\n\t\t\t-webkit-box-shadow: 0 2px 5px #00000033;\n\t\t\t\t\t\t\tbox-shadow: 0 2px 5px #00000033;\n\t\t";
        showBtn.innerHTML = '&uarr;';
        showBtn.onclick = this.show.bind(this);
        consoleNode.appendChild(showBtn);
        this._inputNode = document.createElement('input');
        this._inputNode.placeholder = '>';
        this._inputNode.style.cssText = "\n\t\t\toverflow: scroll;\n\t\t\tpadding: 6px 12px;\n\t\t\tfont-size: 14px;\n\t\t\tborder: none;\n\t\t\toutline: none;\n\t\t\tresize: none;\n\t\t\tborder-top: 1px solid #00000033;\n\t\t\twidth: 100%;\n\t\t";
        this._inputNode.onkeypress = function (e) {
            if (e.keyCode === 13) {
                console.log(eval(e.target.value) || 'undefined');
                _this._inputNode.value = '';
            }
        };
        this._inputNode._history = [];
        consoleNode.appendChild(this._inputNode);
        return consoleNode;
    };
    OnScreenConsole.prototype._print = function (method) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var msgNode = document.createElement('div');
            msgNode.style.cssText = "\n\t\t\t\tfont-size: 14px;\n\t\t\t\tcolor: " + OnScreenConsole._supportedColors[method] + ";\n        background-color: " + OnScreenConsole._supportedColors[method] + "11;\n        border-top: 1px solid " + OnScreenConsole._supportedColors[method] + "33;\n\t\t\t\tpadding: 6px 12px;\n\t\t\t";
            msgNode.innerHTML = args.join(' ');
            var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
            if (consoleNode) {
                this._consoleNode.insertBefore(msgNode, this._inputNode);
                this._consoleNode.scrollTop = consoleNode.scrollHeight;
            }
            else {
                this['_' + method].apply(this, args);
            }
        };
    };
    Object.defineProperty(OnScreenConsole.prototype, "log", {
        get: function () {
            return this._print('log');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OnScreenConsole.prototype, "warn", {
        get: function () {
            return this._print('warn');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OnScreenConsole.prototype, "error", {
        get: function () {
            return this._print('error');
        },
        enumerable: true,
        configurable: true
    });
    OnScreenConsole.prototype.enable = function () {
        var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
        if (!consoleNode) {
            document.body.appendChild(this._consoleNode);
        }
    };
    OnScreenConsole.prototype.disable = function () {
        var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
        if (consoleNode) {
            this._consoleNode.remove();
        }
    };
    OnScreenConsole.prototype.show = function () {
        var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
        if (consoleNode && this._consoleNode.style.bottom !== '0px') {
            this._consoleNode.style.bottom = '0px';
            this._consoleNode.children[0].style.bottom = '6px';
        }
    };
    OnScreenConsole.prototype.hide = function () {
        var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
        if (consoleNode && this._consoleNode.style.bottom === '0px') {
            this._consoleNode.style.bottom = (-this._consoleNode.offsetHeight - 10) + 'px';
            this._consoleNode.children[0].style.bottom
                = (-this._consoleNode.offsetHeight - 4) + 'px';
        }
    };
    Object.defineProperty(OnScreenConsole, "_supportedMethods", {
        get: function () {
            return ['log', 'warn', 'error'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OnScreenConsole, "_supportedColors", {
        get: function () {
            return {
                log: '#0B1013',
                warn: '#C99833',
                error: '#CB1B45',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OnScreenConsole, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new OnScreenConsole();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return OnScreenConsole;
}());
exports.OnScreenConsole = OnScreenConsole;
var oConsole = OnScreenConsole.instance;
window.oConsole = oConsole;
exports.default = oConsole;
//# sourceMappingURL=index.js.map