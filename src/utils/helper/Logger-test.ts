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
    colors: Record<LogLevel, string>;
    debugEnabled: boolean,
}

class Logger {
    public static options: Options = {
        minimumLoggingLevel: LogLevel.VERBOSE,
        closeAppOnError: true,
        colors: {
            [LogLevel.DEBUG]: '',
            [LogLevel.VERBOSE]: '\u001b[34m',
            [LogLevel.INFO]: '\u001b[32m',
            [LogLevel.WARNING]: '\u001b[33m',
            [LogLevel.ERROR]: '\u001b[31m'
        },
        debugEnabled: true
    };

    public static log(text: string, logType: LogLevel){
        if(logType !== LogLevel.DEBUG && !this.hasMinimumLevel(logType)){
            return;
        }

        if(logType === LogLevel.DEBUG && !this.options.debugEnabled){
            return;
        }

        const color = this.getColor(logType);
        const colorReset = "\u001b[0m";

        //File name will be add later
        console.log(`${color}[${LogLevel[logType]}]${colorReset} ${text}`);

        if(logType === LogLevel.ERROR && this.options.closeAppOnError){
            process.exit(1);
        }
    }

    private static getColor(logType: LogLevel): string{
        return this.options.colors[logType];
    }

    private static hasMinimumLevel(logType: LogLevel): boolean {
        return logType >= this.options.minimumLoggingLevel;    
    }
}

export default Logger;
