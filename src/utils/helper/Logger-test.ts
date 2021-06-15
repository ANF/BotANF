/** 
*   Rewrite of the logger class, I didn't use it (but it has been tested and it works great) 
*   It'll be used when the mongodb code will be rewrited
* */
export enum LogLevel {
    DEBUG = 0,
    VERBOSE = 1,
    INFO = 2,
    WARNING = 3,
    ERROR = 4,
}

interface Options {
    /**
     * The minimum level to log in the console. If the minimum
     * level is warning, for example; it won't log anything
     * above warning i.e, `verbose` and `info`.
     */
    minimumLoggingLevel: LogLevel;
    closeAppOnError: boolean;
    colors: {
        debug: string;
        verbose: string;
        info: string;
        warning: string;
        error: string;
    };
    debugEnabled: boolean,
}

class Logger {
    public static options: Options = {
        minimumLoggingLevel: LogLevel.VERBOSE,
        closeAppOnError: true,
        colors: {
            debug: '',
            verbose: '\u001b[34m',
            info: '\u001b[32m',
            warning: '\u001b[33m',
            error: '\u001b[31m'
        },
        debugEnabled: true
    };

    public static log(text: string, logType: LogLevel, file: string){
        if(logType !== LogLevel.DEBUG && !this.hasMinimumLevel(logType)){
            return;
        }

        if(logType === LogLevel.DEBUG && !this.options.debugEnabled){
            return;
        }

        const color = this.getColor(logType);
        const colorReset = "\u001b[0m";

        console.log(`${color}[${LogLevel[logType]}, ${file}] ${colorReset} ${text}`);

        if(logType === LogLevel.ERROR && this.options.closeAppOnError){
            process.exit(1);
        }
    }

    private static getColor(logType: LogLevel): string{
        let color: string = '';


        switch (logType){
            case LogLevel.DEBUG:
                color = this.options.colors.debug;
                break;

            case LogLevel.VERBOSE:
                color = this.options.colors.verbose;
                break;

            case LogLevel.INFO:
                color = this.options.colors.info;
                break;

            case LogLevel.WARNING:
                color = this.options.colors.warning;
                break;

            case LogLevel.ERROR:
                color = this.options.colors.error;
                break;
        }
        return color;
    }

    private static hasMinimumLevel(logType: LogLevel): boolean {
        if(logType < this.options.minimumLoggingLevel){

            return false;
        }
        return true;
    }
}

export default Logger;
