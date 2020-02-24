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

    export function bind(oldFunc: Function, newFunc: Function) {
        return () => {
            oldFunc();
            newFunc();
        };
    }
}

/*
What is das hooks?
So, lua garbage collection removes stuff that falls out of scope, however,
if you add it to a global object it wont fall out of scope.
The reason being, using static objects does not bode well with ceres as things can fall out of scope,
So they need to be hooked into the global scope to some degree.
 */