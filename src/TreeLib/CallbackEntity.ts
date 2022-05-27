import {Entity} from "./Entity";
import {Quick} from "./Quick";

/**
 * Callback Entity is a class that stores a set of callbacks to be called when running its step logic.
 * Allows adding callback through the constructor for easy implementation.
 */
export class CallbackEntity extends Entity{
    public callbacks: ((this: any) => any)[] = [];

    public constructor(timerDelay?: number, callback?: (this: any) => any) {
        super(timerDelay);
        if (callback) this.addCallback(callback);
    }

    public addCallback(callback: (this: any) => any): (this: any) => any {
        Quick.Push(this.callbacks, callback);
        return callback;
    }

    step(): void {
        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
    }
}