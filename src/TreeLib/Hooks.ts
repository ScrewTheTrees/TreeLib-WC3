/** @noSelfInFile **/
import {Logger} from "./Logger";

_G.__hooks = {};

/**
 * In order to prevent things falling out of scope, you can hook them to global,
 * That way the garbage collector wont ever remove it.
 */
export namespace Hooks {
    export function get(name: string): object | undefined {
        return _G.__hooks[name];
    }

    export function set(name: string, value: any) {
        _G.__hooks[name] = value;
        Logger.LogDebug("Hooked: " + name)
    }

    /**  Hook a function with your own logic that will execute after the original function. */
    export function hookArguments(oldFunc: (...args: any) => any, newFunc: (...args: any) => any) {
        return (...args) => {
            let val = oldFunc(...args);
            newFunc(...args);
            return val;
        };
    }

    /**  Hook a function with your own logic that will execute before the original function. */
    export function hookArgumentsBefore(oldFunc: (...args: any) => any, newFunc: (...args: any) => any) {
        return (...args) => {
            newFunc(...args);
            return oldFunc(...args);
        };
    }

    /**  Hook a function that will execute your own function and passes the result of the original to the new function. */
    export function hookResult<T>(hookFunc: (...args: any) => T, passFunc: (value: T) => void) {
        return (...args) => {
            let value = hookFunc(...args);
            passFunc(value);
            return value;
        }
    }
}

/*
What is das hooks?
So, lua garbage collection removes stuff that falls out of scope, however,
if you add it to a global object it wont fall out of scope.
The reason being, using static objects does not bode well with ceres as things can fall out of scope,
So they need to be hooked into the global scope to some degree.
 */