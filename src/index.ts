import oConsole from './console'

// bind oConsole on window
if (window) {
  ;(window as any).oConsole = oConsole
}

export default oConsole
