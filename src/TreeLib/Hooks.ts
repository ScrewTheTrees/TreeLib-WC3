/** @noSelfInFile **/
import {Logger} from "./Logger";

const __hooks: any = {};
// @ts-ignore
_G.__hooks = __hooks; //Make persistent.
/**
 * In order to prevent things falling out of scope, you can hook them to global,
 * That way the garbage collector wont ever remove it.
 */
export namespace Hooks {
    export function get(name: string): object | undefined {
        return __hooks[name];
    }

    export function set(name: string, value: any) {
        __hooks[name] = value;
        Logger.LogDebug("Hooked: " + name)
    }

    /**  Hook a function with your own logic that will execute after the original function. */
    export function hookArguments<Args extends any[], T>(oldFunc: (...args: Args) => T, newFunc: (...args: Args) => void) {
        return (...args: Args) => {
            let val = oldFunc(...args);
            newFunc(...args);
            return val;
        };
    }

    /**  Hook a function with your own logic that will execute before the original function. */
    export function hookArgumentsBefore<Args extends any[], T>(oldFunc: (...args: Args) => T, newFunc: (...args: Args) => void) {
        return (...args: Args) => {
            newFunc(...args);
            return oldFunc(...args);
        };
    }

    /**  Hook a function that will execute your own function and passes the result of the original to the new function. */
    export function hookResult<Args extends any[], T>(hookFunc: (...args: Args) => T, passFunc: (value: T) => void) {
        return (...args: Args) => {
            let value = hookFunc(...args);
            passFunc(value);
            return value;
        }
    }
}