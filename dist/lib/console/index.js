"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../shared/constants");
var utils_1 = require("../shared/utils");
var OnScreenConsole = (function () {
    function OnScreenConsole() {
        this._createNodes();
        this._overwriteNativeMethods();
        this._setErrorListener();
    }
    OnScreenConsole.prototype._setErrorListener = function () {
        var prevOnerror = window.onerror;
        window.onerror = function (info, path, line, col, err) {
            if (prevOnerror) {
                prevOnerror(info, path, line, col, err);
            }
            var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
            if (consoleNode) {
                if (err && err.stack) {
                    console.error(err.stack);
                }
                else {
                    console.error(info);
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
            ;
            this["_" + method] = console[method].bind(console);
            console[method] = this._print(method).bind(this);
        }
    };
    OnScreenConsole.prototype._createNodes = function () {
        var _this = this;
        this._consoleNode = document.createElement('div');
        this._consoleNode.setAttribute('onscreenconsole-id', 'panel');
        this._consoleNode.style.cssText = "\n\t\t\tcursor: default;\n\t\t\tposition: fixed;\n\t\t\tz-index: 995;\n\t\t\theight: 240px;\n\t\t\twidth: 100%;\n\t\t\tbottom: -250px;\n\t\t\tleft: 0;\n\t\t\toverflow: scroll;\n\t\t\tbackground-color: #fff;\n\t\t\t-webkit-box-shadow: 0 -5px 10px #00000033;\n\t\t\t\t\t\t\tbox-shadow: 0 -5px 10px #00000033;\n\t\t\t-webkit-box-sizing: border-box;\n\t\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\ttransition: all .2s;\n\t\t";
        this._showBtn = document.createElement('button');
        this._showBtn.setAttribute('onscreenconsole-id', 'show');
        this._showBtn.style.cssText = "\n\t\t\tposition: fixed;\n\t\t\tz-index: 990;\n\t\t\theight: 32px;\n\t\t\twidth: 48px;\n\t\t\tbottom: 6px;\n\t\t\tright: 6px;\n\t\t\tcolor: #0089A7;\n\t\t\tborder: 1px solid #0089A7;\n\t\t\tbackground-color: #fff;\n\t\t\tcursor: pointer;\n\t\t\t-webkit-box-shadow: 0 2px 5px #00000033;\n\t\t\t\t\t\t\tbox-shadow: 0 2px 5px #00000033;\n\t\t\ttransition: all .2s;\n\t\t";
        this._showBtn.innerHTML = 'Show';
        this._showBtn.onclick = this.show.bind(this);
        this._hideBtn = document.createElement('button');
        this._hideBtn.style.cssText = "\n\t\t\tposition: fixed;\n\t\t\tz-index: 999;\n\t\t\theight: 32px;\n\t\t\twidth: 48px;\n\t\t\tbottom: 6px;\n\t\t\tright: 6px;\n\t\t\tcolor: #0089A7;\n\t\t\tborder: 1px solid #0089A7;\n\t\t\tbackground-color: #fff;\n\t\t\tcursor: pointer;\n\t\t\t-webkit-box-shadow: 0 2px 5px #00000033;\n\t\t\t\t\t\t\tbox-shadow: 0 2px 5px #00000033;\n\t\t\ttransition: all .2s;\n\t\t";
        this._hideBtn.innerHTML = 'Hide';
        this._hideBtn.onclick = this.hide.bind(this);
        this._consoleNode.appendChild(this._hideBtn);
        this._inputNode = document.createElement('input');
        this._inputNode.placeholder = '>';
        this._inputNode.style.cssText = "\n\t\t\toverflow: scroll;\n\t\t\tpadding: 6px 12px;\n\t\t\tfont-size: 14px;\n\t\t\tborder: none;\n\t\t\toutline: none;\n\t\t\tresize: none;\n\t\t\tborder-top: 1px solid #00000033;\n\t\t\twidth: 100%;\n\t\t\t-webkit-box-sizing: border-box;\n\t\t\t\t\t\t\tbox-sizing: border-box;\n\t\t";
        var history = JSON.parse(localStorage.getItem('onscreen-console-history'));
        var hisIndex = -1;
        if (!Array.isArray(history)) {
            history = [];
        }
        else {
            hisIndex = history.length;
        }
        this._inputNode.onkeydown = function (e) {
            var value = e.target.value;
            if (e.keyCode === 13 && value !== '') {
                var result = void 0;
                var evalErr = void 0;
                var tmpConsole = console;
                console = {};
                for (var _i = 0, _a = OnScreenConsole._supportedMethods; _i < _a.length; _i++) {
                    var method = _a[_i];
                    ;
                    console[method] = function () { };
                }
                try {
                    result = eval(value);
                }
                catch (err) {
                    evalErr = err;
                }
                console = tmpConsole;
                if (evalErr) {
                    console.error(evalErr);
                }
                else {
                    console.log("<span style=\"color: #00000055\">></span> " + value);
                    var tmpScript = document.createElement('script');
                    tmpScript.innerHTML = value;
                    document.body.appendChild(tmpScript);
                    tmpScript.remove();
                    console.log("<span style=\"color: #00000055\"><</span> " + utils_1.format(result));
                }
                history.push(value);
                while (history.length > constants_1.MAX_HISTORY_LENGTH) {
                    history.shift();
                }
                localStorage.setItem('onscreen-console-history', JSON.stringify(history));
                _this._inputNode.value = '';
                hisIndex = history.length;
            }
            else if (e.keyCode === 38) {
                if (hisIndex > 0) {
                    hisIndex--;
                    _this._inputNode.value = history[hisIndex];
                }
                else if (hisIndex === 0) {
                    _this._inputNode.value = history[hisIndex];
                }
            }
            else if (e.keyCode === 40) {
                if (hisIndex < history.length - 1) {
                    hisIndex++;
                    _this._inputNode.value = history[hisIndex];
                }
                else if (hisIndex === history.length - 1) {
                    hisIndex++;
                    _this._inputNode.value = '';
                }
            }
        };
        this._consoleNode.appendChild(this._inputNode);
    };
    OnScreenConsole.prototype._print = function (method) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
            if (consoleNode) {
                var msgNode = document.createElement('div');
                msgNode.style.cssText = "\n          min-height: 20px;\n          font-size: 14px;\n          color: " + OnScreenConsole._supportedColors[method] + ";\n          background-color: " + OnScreenConsole._supportedColors[method] + "11;\n          border-top: 1px solid " + OnScreenConsole._supportedColors[method] + "33;\n          padding: 6px 12px;\n        ";
                var msg = [];
                for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                    var arg = args_1[_a];
                    msg.push(utils_1.format(arg));
                }
                msgNode.innerHTML = msg.join(' ');
                this._consoleNode.insertBefore(msgNode, this._inputNode);
                this._consoleNode.scrollTop = consoleNode.scrollHeight;
            }
            else {
                this['_' + method].apply(this, args);
            }
        };
    };
    OnScreenConsole.prototype.enable = function () {
        var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
        if (!consoleNode) {
            document.body.appendChild(this._consoleNode);
        }
        var showBtn = document.querySelector('[onscreenconsole-id="show"]');
        if (!showBtn) {
            document.body.appendChild(this._showBtn);
        }
    };
    OnScreenConsole.prototype.disable = function () {
        var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
        if (consoleNode) {
            consoleNode.remove();
        }
        var showBtn = document.querySelector('[onscreenconsole-id="show"]');
        if (showBtn) {
            showBtn.remove();
        }
    };
    OnScreenConsole.prototype.show = function () {
        var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
        if (consoleNode && this._consoleNode.style.bottom !== '0px') {
            this._consoleNode.style.bottom = '0px';
            this._hideBtn.style.bottom = '6px';
        }
    };
    OnScreenConsole.prototype.hide = function () {
        var consoleNode = document.querySelector('[onscreenconsole-id="panel"]');
        if (consoleNode && this._consoleNode.style.bottom === '0px') {
            this._consoleNode.style.bottom = (-this._consoleNode.offsetHeight - 10) + 'px';
            this._hideBtn.style.bottom = (-this._consoleNode.offsetHeight - 4) + 'px';
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
var oConsole = OnScreenConsole.instance;
exports.default = oConsole;
//# sourceMappingURL=index.js.map