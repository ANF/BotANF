type Nullable<T> = T | null;
const color_reset = "\u001b[0m";

export class Logger implements loggerOptions {
  minimumLoggingLevel: logLevel;
  closeAppOnError: boolean;
  colors = {
    color_debug: "", // This is because the debug mode shouldn't really be used in the final build.
    color_verbose: "\u001b[34m",
    color_info: "\u001b[32m",
    color_warning: "\u001b[33m",
    color_error: "\u001b[31m",
  };
  debugEnabled: boolean;

  /**
   * @param options The options that tell the logger how to function,
   * the logger class implements this interface. It is a required field.
   *
   * About the color parameters, these are the defaults;
   *
   * *default options:
   *
   * `Verbose`: Blue
   *
   * `Info`: Green
   *
   * `Warning`: Yellow
   *
   * `Error`: Red
   */
  constructor(options: loggerOptions) {
    this.minimumLoggingLevel = options.minimumLoggingLevel;
    this.closeAppOnError = options.closeAppOnError;
    this.colors.color_verbose = options.colors?.color_verbose ?? "\u001b[34m";
    this.colors.color_info = options.colors?.color_info ?? "\u001b[32m";
    this.colors.color_warning = options.colors?.color_warning ?? "\u001b[33m";
    this.colors.color_error = options.colors?.color_error ?? "\u001b[31m";
    this.debugEnabled = options.debugEnabled ?? false;
  }

  /**
   * Logs text to the console using `console.log`, just a bit from advanced.
   * @param textToLog The text that will be printed.
   * @param logType The type of the log for the console (comes from the enum `logLevel`).
   * @param file The file from which the log is being logged.
   */
  public log(textToLog: string, logType: logLevel, file: string) {
    let color: Nullable<string> = null;
    switch (logType) {
      case logLevel.debug:
        if (this.debugEnabled == true)
          color = this.colors.color_debug;
        else return;
        break;

      case logLevel.verbose:
        if (this.minimumLoggingLevel == logLevel.verbose)
          color = this.colors.color_verbose;
        else return;
        break;

      case logLevel.info:
        if (
          this.minimumLoggingLevel == logLevel.info ||
          this.minimumLoggingLevel < logLevel.info
        )
          color = this.colors.color_info;
        else return;
        break;

      case logLevel.warning:
        if (
          this.minimumLoggingLevel == logLevel.warning ||
          this.minimumLoggingLevel < logLevel.warning
        )
          color = this.colors.color_warning;
        else return;
        break;

      case logLevel.error:
        if (
          this.minimumLoggingLevel == logLevel.error ||
          this.minimumLoggingLevel < logLevel.error
        )
          color = this.colors.color_error;
        else return;
        break;
    }
    console.log(
      `${color}[${logLevel[
        logType
      ].toUpperCase()}, ${file}]${color_reset} ${textToLog}`
    );
    if (this.closeAppOnError == true && logType == logLevel.error)
      process.exit(1);
  }
}

/**
 * The level of the log for `Logger.log`. There are
 * five levels; `debug`, `verbose`, `info`, `warning`
 * and `error`.
 */
export enum logLevel {
  debug,
  verbose,
  info,
  warning,
  error,
}

/**
 * Options for the logger class.
 */
interface loggerOptions {
  /**
   * The minimum level to log in the console. If the minimum
   * level is warning, for example; it won't log anything
   * above warning i.e, `verbose` and `info`.
   */
  minimumLoggingLevel: logLevel;
  /**
   * This decides weather to close the application
   * service with an exit code of `1` if an error
   * is logged.
   */
  closeAppOnError: boolean;
  colors?: {
    color_verbose: string;
    color_info: string;
    color_warning: string;
    color_error: string;
  };
  debugEnabled?: boolean,
}

/**
 * The logger instance.
 */
const logger = new Logger({
  minimumLoggingLevel: logLevel.verbose,
  closeAppOnError: true,
  debugEnabled: false,
});
export default logger;
