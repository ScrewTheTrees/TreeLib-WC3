/**
 * Very basic logger, use booleans to turn specific levels of logging on and off
 * Generally you would want Debug turned on for DEV but disabled for release.
 * And verbose on in worst case erroring.
 */


import {RGB} from "./Utility/Data/RGB";

/** @noSelf **/
export class Logger {
    public static doLogVerbose = false;
    public static doLogDebug = false;
    public static doLogWarning = true;
    public static doLogCritical = true;

    public static COLOR_VERBOSE = RGB.new(128, 128, 128);
    public static COLOR_DEBUG = RGB.new(255, 255, 255);
    public static COLOR_WARNING = RGB.new(255, 255, 0);
    public static COLOR_CRITICAL = RGB.new(255, 0, 0);

    public static LogVerbose(...params: any[]) {
        if (Logger.doLogVerbose) {
            print(RGB.textString(Logger.COLOR_VERBOSE, "Verbose: ", ...params));
        }
    }

    public static LogDebug(...params: any[]) {
        if (Logger.doLogDebug) {
            print(RGB.textString(Logger.COLOR_DEBUG, "Debug: ", ...params));
        }
    }

    public static LogWarning(...params: any[]) {
        if (Logger.doLogWarning) {
            print(RGB.textString(Logger.COLOR_WARNING, "Warning: ", ...params));
        }
    }

    public static LogCritical(...params: any[]) {
        if (Logger.doLogCritical) {
            print(RGB.textString(Logger.COLOR_CRITICAL, "Critical: ", ...params));
        }
    }

    //Quickies since the above functions are a bit too overly explanatory.
    public static verbose(...args: any[]) {
        Logger.LogVerbose(...args);
    }

    //debug seems to be a reserved codeword, so we are using generic instead
    public static generic(...args: any[]) {
        Logger.LogDebug(...args);
    }

    public static warning(...args: any[]) {
        Logger.LogWarning(...args);
    }

    public static critical(...args: any[]) {
        Logger.LogCritical(...args);
    }
}