/**
 * stringify the value by Object.prototype.toString
 * @param value 
 */
function toString(value: any): string {
  return Object.prototype.toString.call(value)
}

/**
 * format output function map
 */
const formatFuncMap = {
  '[object Undefined]': () => 'undefined',
  '[object Null]': () => 'null',
  '[object Number]': (value: number) => value.toString(),
  '[object String]': (value: string) => value.toString(),
  '[object Boolean]': (value: boolean) => value ? 'true' : 'false',
  '[object Symbol]': (value: symbol) => `Symbol(${value.toString()})`,
  '[object Function]': (value: Function) => value.toString(),
  '[object Array]': (value: any[]) => `[${value.join(', ')}]`,
  '[object Object]': (value: object) => JSON.stringify(value),
}

/**
 * format output string
 */
export function format(value: any): string {
  return (formatFuncMap as any)[toString(value)](value)
}

/**
 * get dom node by onscreenconsole-id
 * @param id onscreenconsole-id
 */
export function getNode(id: string): Element {
  return document.querySelector(`[onscreenconsole-id="${id}"]`)
}