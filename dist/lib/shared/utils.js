"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toString(value) {
    return Object.prototype.toString.call(value);
}
function isUndefined(value) {
    return toString(value) === '[object Undefined]';
}
exports.isUndefined = isUndefined;
function isNull(value) {
    return toString(value) === '[object Null]';
}
exports.isNull = isNull;
function isNumber(value) {
    return toString(value) === '[object Number]';
}
exports.isNumber = isNumber;
function isString(value) {
    return toString(value) === '[object String]';
}
exports.isString = isString;
function isArray(value) {
    return toString(value) === '[object Array]';
}
exports.isArray = isArray;
function isBoolean(value) {
    return toString(value) === '[object Boolean]';
}
exports.isBoolean = isBoolean;
function isSymbol(value) {
    return toString(value) === '[object Symbol]';
}
exports.isSymbol = isSymbol;
function isObject(value) {
    return toString(value) === '[object Object]';
}
exports.isObject = isObject;
function isFunction(value) {
    return toString(value) === '[object Function]';
}
exports.isFunction = isFunction;
function format(arg, expendObject) {
    if (expendObject === void 0) { expendObject = true; }
    if (isUndefined(arg)) {
        return 'undefined';
    }
    else if (isNull(arg)) {
        return 'null';
    }
    else if (isArray(arg)) {
        return "[" + arg.join(', ') + "]";
    }
    else if (isObject(arg)) {
        return JSON.stringify(arg);
    }
    else {
        return arg;
    }
}
exports.format = format;
//# sourceMappingURL=utils.js.map