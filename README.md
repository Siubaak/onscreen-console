# onscreen-console

[![](https://img.shields.io/npm/v/onscreen-console.svg?style=flat-square)](https://www.npmjs.com/package/onscreen-console)

![](https://raw.githubusercontent.com/Siubaak/onscreen-console/master/assets/snapshot.png)

Add a console on screen for those browsers or clients (nwjs or electron) with no console. The onscreen-console overwrites the native console.log, console.warn and console.error methods. If onscreen-console enable, you could use console.log, console.warn and console.error to print what your want in onscreen console panel.

# Usage

Install from npm.

```bash
npm i -S onscreen-console
```

And then import.

```js
import oConsole from 'onscreen-console';
// enable onscreen-console and it will block native console
// print all logs on onscreen-console panel
oConsole.enable();
// show the onscreen-console panel
oConsole.show();
// just use native console statements
console.log('This is a log');
console.warn('This is a warn');
console.error('This is a error');
// or throw error what you want
throw new Error('Error thrown');
// hide the onscreen-console panel
// but it still working
oConsole.hide();
// totally disable the onscreen-console
// and all your favorite native console methods are back
oConsole.disable();
```

Or, you can simple source at your html file, and the minimized file can be found at [release](https://github.com/Siubaak/onscreen-console/releases). Download it and unzip, then you can find `onscreen-console/dist/min/onscreen-console.min.js` and source it as follow. It will bind a oConsole instance on window.

```html
<script type="text/javascript" src="onscreen-console.min.js"></script>
<script type="text/javascript">
  // enable onscreen-console and it will block native console
  // print all logs on onscreen-console panel
  oConsole.enable();
  // show the onscreen-console panel
  oConsole.show();
  // just use native console statements
  console.log('This is a log');
  console.warn('This is a warn');
  console.error('This is a error');
  // or throw error what you want
  throw new Error('Error thrown');
  // hide the onscreen-console panel
  // but it's still working
  oConsole.hide();
  // totally disable the onscreen-console
  // and all your favorite native console methods are back
  oConsole.disable();
</script>
```

You can use commander line to input your dev commands, and if you want add a global variable, your need to bind it on window by yourself, as the demo below. Then you can use as a global variable.

# Demo

![](https://raw.githubusercontent.com/Siubaak/onscreen-console/master/assets/demo.gif)

[Try onscreen-console](https://siubaak.github.io/onscreen-console)

# License

The onscreen-console is licensed under the [MIT](https://github.com/Siubaak/onscreen-console/blob/master/LICENSE).