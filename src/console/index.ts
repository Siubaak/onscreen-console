import { MAX_HISTORY_LENGTH } from '../shared/constants'
import { format } from '../shared/utils'

type consoleFunc = (message?: any, ...optionalParams: any[]) => void

type supportedMethods = 'log' | 'warn' | 'error'

class OnScreenConsole {
	private _showBtn: HTMLButtonElement
	private _hideBtn: HTMLButtonElement
	private _consoleNode: HTMLDivElement
	private _inputNode: HTMLInputElement
  private _log: consoleFunc
  private _warn: consoleFunc
  private _error: consoleFunc
  private static _instance: OnScreenConsole

	constructor() {
		this._createNodes()
		this._overwriteNativeMethods()
		this._setErrorListener()
	}
	/**
	 * set the init listener
	 */
	private _setErrorListener(): void {
		const prevOnerror: ErrorEventHandler = window.onerror
		// add error listener for trying the js error
		// or manually throw error
		window.onerror = (info, path, line, col, err) => {
			// to avoid overwrite the prev onerror function
			if (prevOnerror) {
				prevOnerror(info, path, line, col, err)
			}
			const consoleNode: Element = document.querySelector('[onscreenconsole-id="panel"]')
			if (consoleNode) {
				if (err && err.stack) {
					console.error(err.stack)
				} else {
					console.error(info)
				}
				// block the native console print
				return true
			} else {
				// allow the native console print
				return false
			}
		}
	}
	/**
	 * overwrite log, warn and error method
	 */
	private _overwriteNativeMethods(): void {
    for (const method of OnScreenConsole._supportedMethods) {
      ;(this as any)[`_${method}`] = (console as any)[method].bind(console)
      ;(console as any)[method] = this._print(method as supportedMethods).bind(this)
    }
	}
	/**
	 * create the console panel dom element
	 */
	private _createNodes(): void {
		this._consoleNode = document.createElement('div')
		this._consoleNode.setAttribute('onscreenconsole-id', 'panel')
		this._consoleNode.style.cssText = `
			cursor: default;
			position: fixed;
			z-index: 995;
			height: 240px;
			width: 100%;
			bottom: -250px;
			left: 0;
			overflow: scroll;
			background-color: #fff;
			-webkit-box-shadow: 0 -5px 10px #00000033;
							box-shadow: 0 -5px 10px #00000033;
			-webkit-box-sizing: border-box;
							box-sizing: border-box;
			transition: all .2s;
		`

		this._showBtn = document.createElement('button')
		this._showBtn.setAttribute('onscreenconsole-id', 'show')
		this._showBtn.style.cssText = `
			position: fixed;
			z-index: 990;
			height: 32px;
			width: 48px;
			bottom: 6px;
			right: 6px;
			color: #0089A7;
			border: 1px solid #0089A7;
			background-color: #fff;
			cursor: pointer;
			-webkit-box-shadow: 0 2px 5px #00000033;
							box-shadow: 0 2px 5px #00000033;
			transition: all .2s;
		`
		this._showBtn.innerHTML = 'Show'
		this._showBtn.onclick = this.show.bind(this)

		this._hideBtn = document.createElement('button')
		this._hideBtn.style.cssText = `
			position: fixed;
			z-index: 999;
			height: 32px;
			width: 48px;
			bottom: 6px;
			right: 6px;
			color: #0089A7;
			border: 1px solid #0089A7;
			background-color: #fff;
			cursor: pointer;
			-webkit-box-shadow: 0 2px 5px #00000033;
							box-shadow: 0 2px 5px #00000033;
			transition: all .2s;
		`
		this._hideBtn.innerHTML = 'Hide'
		this._hideBtn.onclick = this.hide.bind(this)
		this._consoleNode.appendChild(this._hideBtn)

		this._inputNode = document.createElement('input')
		this._inputNode.placeholder = '>'
		this._inputNode.style.cssText = `
			overflow: scroll;
			padding: 6px 12px;
			font-size: 14px;
			border: none;
			outline: none;
			resize: none;
			border-top: 1px solid #00000033;
			width: 100%;
			-webkit-box-sizing: border-box;
							box-sizing: border-box;
		`
		let history: string[] = JSON.parse(localStorage.getItem('onscreen-console-history'))
		let hisIndex: number = -1
		if (!Array.isArray(history)) {
			history = []
		} else {
			hisIndex = history.length
		}
		this._inputNode.onkeydown = (e: KeyboardEvent) => {
      const value: string = (e.target as any).value
      if (e.keyCode === 13 && value !== '') {	// enter
        let result: string
        let evalErr: Error
        try {
          result = eval(value)
        } catch(err) {
          evalErr = err
        }
        if (evalErr) {
          console.error(evalErr)
        } else {
          const tmpScript = document.createElement('script')
          tmpScript.innerHTML = value
          document.body.appendChild(tmpScript)
          tmpScript.remove()
          console.log(`<span style="color: #00000055">></span> ${value}`)
          console.log(`<span style="color: #00000055"><</span> ${format(result)}`)
        }
        history.push(value)
        while (history.length > MAX_HISTORY_LENGTH) {
          history.shift()
        }
        localStorage.setItem('onscreen-console-history', JSON.stringify(history))
        this._inputNode.value = ''
        hisIndex = history.length
			} else if (e.keyCode === 38) {	// up
				if (hisIndex > 0) {
					hisIndex--
					this._inputNode.value = history[hisIndex]
				} else if (hisIndex === 0) {
					this._inputNode.value = history[hisIndex]
				}
			} else if (e.keyCode === 40) {	// down
				if (hisIndex < history.length - 1) {
					hisIndex++
					this._inputNode.value = history[hisIndex]
				} else if (hisIndex === history.length - 1) {
					hisIndex++
					this._inputNode.value = ''
				}
			}
		}
		this._consoleNode.appendChild(this._inputNode)
  }
	/**
	 * internal print method
	 * @param {string} method enum {'log', 'warn', 'error'}
	 */
	_print(method: 'log' | 'warn' | 'error'): consoleFunc {
		return function(...args: any[]): void {
			// check if it's enable
			const consoleNode: Element = document.querySelector('[onscreenconsole-id="panel"]')
			if (consoleNode) {
        // create error message dom element
        const msgNode: HTMLDivElement = document.createElement('div')
        msgNode.style.cssText = `
          min-height: 20px;
          font-size: 14px;
          color: ${OnScreenConsole._supportedColors[method]};
          background-color: ${OnScreenConsole._supportedColors[method]}11;
          border-top: 1px solid ${OnScreenConsole._supportedColors[method]}33;
          padding: 6px 12px;
        `
        // set innerHTML
        let msg: string[] = []
        for (const arg of args) {
          msg.push(format(arg))
        }
        msgNode.innerHTML = msg.join(' ')
				// print the output
				this._consoleNode.insertBefore(msgNode, this._inputNode)
				this._consoleNode.scrollTop = consoleNode.scrollHeight
			} else {
				// if disable, invoke the native method first to print in console
				this['_' + method](...args)
			}
		}
	}
	// controllers
	/**
	 * enable the on screen console
	 */
	enable(): void {
		const consoleNode: Element = document.querySelector('[onscreenconsole-id="panel"]')
		if (!consoleNode) {
			document.body.appendChild(this._consoleNode)
		}
		const showBtn: Element = document.querySelector('[onscreenconsole-id="show"]')
		if (!showBtn) {
			document.body.appendChild(this._showBtn)
		}
	}
	/**
	 * disable the on screen console
	 */
	disable(): void {
		const consoleNode: Element = document.querySelector('[onscreenconsole-id="panel"]')
		if (consoleNode) {
			consoleNode.remove()
		}
		const showBtn: Element = document.querySelector('[onscreenconsole-id="show"]')
		if (showBtn) {
			showBtn.remove()	
		}
	}
	/**
	 * show the on screen console
	 */
	show(): void {
		const consoleNode: Element = document.querySelector('[onscreenconsole-id="panel"]')
		if (consoleNode && this._consoleNode.style.bottom !== '0px') {
      this._consoleNode.style.bottom = '0px'
			this._hideBtn.style.bottom = '6px'
    }
	}
	/**
	 * hide the on screen console
	 */
	hide(): void {
		const consoleNode: Element = document.querySelector('[onscreenconsole-id="panel"]')
		if (consoleNode && this._consoleNode.style.bottom === '0px') {
			this._consoleNode.style.bottom = (-this._consoleNode.offsetHeight - 10) + 'px'
      this._hideBtn.style.bottom = (-this._consoleNode.offsetHeight - 4) + 'px'
		}
	}
  // others
  /**
	 * supported console methods
	 */
	static get _supportedMethods(): string[] {
		return ['log', 'warn', 'error']
	}
	/**
	 * colors corresponding to supported methods
	 */
	static get _supportedColors(): {
    log: string
    warn: string
    error: string
  } {
		return {
			log: '#0B1013',
			warn: '#C99833',
			error: '#CB1B45',
		}
	}
	// singleton
	/**
	 * get singleton to ensure only one on screen console panel
	 */
	static get instance() {
		if (!this._instance) {
			this._instance = new OnScreenConsole()
		}
		return this._instance
	}
}

const oConsole: OnScreenConsole = OnScreenConsole.instance

export default oConsole