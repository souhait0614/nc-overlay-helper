const logLevel: number = parseInt(process.env.PLASMO_PUBLIC_LOG_LEVEL || "1")

export class Logger {
  static #appName = "NCOverlayHelper"

  private static getHeader() {
    return `[${this.#appName}]`
  }

  static debug(message: string, ...args: unknown[]) {
    if (logLevel > 0) return
    console.log(this.getHeader(), message, ...args)
  }

  static info(message: string, ...args: unknown[]) {
    if (logLevel > 1) return
    console.info(this.getHeader(), message, ...args)
  }

  static warn(message: string, ...args: unknown[]) {
    if (logLevel > 2) return
    console.warn(this.getHeader(), message, ...args)
  }

  static error(message: string, ...args: unknown[]) {
    if (logLevel > 3) return
    console.error(this.getHeader(), message, ...args)
  }
}
