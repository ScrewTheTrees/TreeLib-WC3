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

    export const beforeMainHooks: ((this: any) => void)[] = [];
    export function addBeforeMainHook(hookFunc: (this: any) => void) {
        beforeMainHooks.push(hookFunc);
    }
    export const afterMainHooks: (() => void)[] = [];
    export function addAfterMainHook(hookFunc: (this: any) => void) {
        afterMainHooks.push(hookFunc);
    }

    export const beforeConfigHooks: (() => void)[] = [];
    export function addBeforeConfigHook(hookFunc: (this: any) => void) {
        beforeConfigHooks.push(hookFunc);
    }
    export const afterConfigHooks: (() => void)[] = [];
    export function addAfterConfigHook(hookFunc: (this: any) => void) {
        afterConfigHooks.push(hookFunc);
    }
}

// @ts-ignore
_G.main = Hooks.hookArgumentsBefore(_G.main, () => xpcall(() => {
        for (let i = 0; i < Hooks.beforeMainHooks.length; i++) {
            Hooks.beforeMainHooks[i]();
        }
    }, Logger.critical)
)
// @ts-ignore
_G.main = Hooks.hookArguments(_G.main, () => xpcall(() => {
        for (let i = 0; i < Hooks.afterMainHooks.length; i++) {
            Hooks.afterMainHooks[i]();
        }
    }, Logger.critical)
)
// @ts-ignore
_G.config = Hooks.hookArgumentsBefore(_G.config, () => xpcall(() => {
        for (let i = 0; i < Hooks.beforeConfigHooks.length; i++) {
            Hooks.beforeConfigHooks[i]();
        }
    }, Logger.critical)
)
// @ts-ignore
_G.config = Hooks.hookArguments(_G.config, () => xpcall(() => {
        for (let i = 0; i < Hooks.afterConfigHooks.length; i++) {
            Hooks.afterConfigHooks[i]();
        }
    }, Logger.critical)
)
