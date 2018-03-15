/**
 * max history length to save in the localStorage
 */
export const MAX_HISTORY_LENGTH: number = 20

/**
 * max log length printed in the console panel
 */
export const MAX_LOG_LENGTH: number = 100

/**
 * colors corresponding to supported methods
 */
export const SUPPORTED_COLORS: {
  [method: string]: string
} = {
  log: '#0B1013',
  warn: '#C99833',
  error: '#CB1B45',
}

/**
 * supported console methods
 */
export const SUPPORTED_METHODS: string[] = Object.keys(SUPPORTED_COLORS)

/**
 * console function type
 */
export type ConsoleFunc = (message?: any, ...optionalParams: any[]) => void