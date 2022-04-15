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
            xpcall(() => {
                newFunc(...args);
            }, Logger.critical)
            return val;
        };
    }

    /**  Hook a function with your own logic that will execute before the original function. */
    export function hookArgumentsBefore<Args extends any[], T>(oldFunc: (...args: Args) => T, newFunc: (...args: Args) => void) {
        return (...args: Args) => {
            xpcall(() => {
                newFunc(...args);
            }, Logger.critical)
            return oldFunc(...args);
        };
    }

    /**  Hook a function that will execute your own function and passes the result of the original to the new function. */
    export function hookResult<Args extends any[], T>(hookFunc: (...args: Args) => T, passFunc: (value: T) => void) {
        return (...args: Args) => {
            let value = hookFunc(...args);
            xpcall(() => {
                passFunc(value);
            }, Logger.critical)
            return value;
        }
    }

    export const mainHooks: (() => void)[] = [];
    export function addMainHook(hookFunc: () => void) {
        mainHooks.push(hookFunc);
    }

    export const configHooks: (() => void)[] = [];
    export function addConfigHook(hookFunc: () => void) {
        mainHooks.push(hookFunc);
    }
}

// @ts-ignore
_G.main = Hooks.hookArgumentsBefore(_G.main, () => xpcall(() => {
        for (let i = 0; i < Hooks.mainHooks.length; i++) {
            Hooks.mainHooks[i]();
        }
    }, Logger.critical)
)
// @ts-ignore
_G.config = Hooks.hookArgumentsBefore(_G.config, () => xpcall(() => {
        for (let i = 0; i < Hooks.configHooks.length; i++) {
            Hooks.configHooks[i]();
        }
    }, Logger.critical)
)
/*
What is das hooks?
So, lua garbage collection removes stuff that falls out of scope, however,
if you add it to a global object it wont fall out of scope.
The reason being, using static objects does not bode well with ceres as things can fall out of scope,
So they need to be hooked into the global scope to some degree.
 */