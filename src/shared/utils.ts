/**
 * stringify the value by Object.prototype.toString
 * @param value 
 */
function toString(value: any): string {
  return Object.prototype.toString.call(value)
}

/**
 * determine if the value is undefined
 * @param value 
 */
export function isUndefined(value: any): boolean {
  return toString(value) === '[object Undefined]'
}

/**
 * determine if the value is null
 * @param value 
 */
export function isNull(value: any): boolean {
  return toString(value) === '[object Null]'
}

/**
 * determine if the value is a number
 * @param value 
 */
export function isNumber(value: any): boolean {
  return toString(value) === '[object Number]'
}

/**
 * determine if the value is a string
 * @param value 
 */
export function isString(value: any): boolean {
  return toString(value) === '[object String]'
}

/**
 * determine if the value is an array
 * @param value 
 */
export function isArray(value: any): boolean {
  return toString(value) === '[object Array]'
}

/**
 * determine if the value is a boolean
 * @param value 
 */
export function isBoolean(value: any): boolean {
  return toString(value) === '[object Boolean]'
}

/**
 * determine if the value is a symbol
 * @param value 
 */
export function isSymbol(value: any): boolean {
  return toString(value) === '[object Symbol]'
}

/**
 * determine if the value is a object
 * @param value 
 */
export function isObject(value: any): boolean {
  return toString(value) === '[object Object]'
}

/**
 * determine if the value is a function
 * @param value 
 */
export function isFunction(value: any): boolean {
  return toString(value) === '[object Function]'
}

/**
 * format output string
 */
export function format(arg: any, expendObject: boolean = true): string {
  if (isUndefined(arg)) {
    return 'undefined'
  } else if (isNull(arg)) {
    return 'null'
  } else if (isArray(arg)) {
    return `[${arg.join(', ')}]`
  } else if (isObject(arg)) {
    return JSON.stringify(arg)
  } else {
    return arg
  }
}