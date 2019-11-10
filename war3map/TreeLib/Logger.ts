/**
 * Very basic logger, use booleans to turn specific levels of logging on and off
 * Generally you would want Debug turned on for DEV but disabled for release.
 * And verbose on in worst case erroring.
 */
import {RGB, RGBTextString} from "./Utility/RGB";

export class Logger {
    public static doLogVerbose = false;
    public static doLogDebug = true;
    public static doLogWarning = true;
    public static doLogCritical = true;

    public static COLOR_VERBOSE = new RGB(128, 128, 128);
    public static COLOR_DEBUG = new RGB(255, 255, 255);
    public static COLOR_WARNING = new RGB(255, 255, 0);
    public static COLOR_CRITICAL = new RGB(255, 0, 0);

    public static LogVerbose(...params: any[]) {
        if (this.doLogVerbose) {
            print(RGBTextString(Logger.COLOR_VERBOSE, "Verbose: ", ...params));
        }
    }

    public static LogDebug(...params: any[]) {
        if (this.doLogDebug) {
            print(RGBTextString(Logger.COLOR_DEBUG, "Debug: ", ...params));
        }
    }

    public static LogWarning(...params: any[]) {
        if (this.doLogWarning) {
            print(RGBTextString(Logger.COLOR_WARNING, "Warning: ", ...params));
        }
    }


    public static LogCritical(...params: any[]) {
        if (this.doLogCritical) {
            print(RGBTextString(Logger.COLOR_CRITICAL, "Critical: ", ...params));
        }
    }

    //Quickies since the above functions are a bit too overly explanatory.
    public static verbose(...args: string[]) {
        Logger.LogVerbose(...args);
    }

    public static debug(...args: string[]) {
        Logger.LogDebug(...args);
    }

    public static warning(...args: string[]) {
        Logger.LogWarning(...args);
    }

    public static critical(...args: string[]) {
        Logger.LogCritical(...args);
    }
}