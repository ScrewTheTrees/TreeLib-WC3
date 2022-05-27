import {Quick} from "../Quick";
import {Logger} from "../Logger";

/**
 * A custom type of promise. I've had bad luck with the built in js/ts promises and async/await.
 * So in the end i settled for making my own "promise" api.
 */
export class TreePromise<T, H = undefined> {
    public data: T | undefined;
    public handler?: H;
    public error: any;
    public isError: boolean = false;
    public isFinished: boolean = false;
    public thenCallbacks: ((data: T) => void)[] = [];
    public errorCallbacks: ((error: any) => void)[] = [];
    public finallyCallbacks: (() => void)[] = [];

    constructor(handler?: H) {
        this.handler = handler;
    }

    public apply(value: T) {
        this.data = value;
        this.error = undefined;
        this.isError = false;
        this.isFinished = true;
        xpcall(() => {
            for (let call of this.thenCallbacks) {
                call(value);
            }
        }, Logger.critical)

        for (let final of this.finallyCallbacks) {
            xpcall(() => {
                final();
            }, Logger.critical)
        }

        return this;
    }
    public fail(error: any) {
        this.data = undefined;
        this.error = error;
        this.isError = true;
        this.isFinished = true;
        xpcall(() => {
            for (let call of this.thenCallbacks) {
                call(error);
            }
        }, Logger.critical)

        for (let final of this.finallyCallbacks) {
            xpcall(() => {
                final();
            }, Logger.critical)
        }
        return this;
    }
    public then(callback: (data: T) => void) {
        Quick.Push(this.thenCallbacks, callback);
        if (this.isFinished && !this.isError && this.data) callback(this.data);
        return this;
    }
    public onFail(callback: (error: any) => void) {
        Quick.Push(this.errorCallbacks, callback);
        if (this.isFinished && this.isError) callback(this.error);
        return this;
    }
    public finally(callback: () => void) {
        Quick.Push(this.finallyCallbacks, callback);
        if (this.isFinished) callback();
        return this;
    }
}