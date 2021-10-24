/**
 * Coroutine that can be reset, tracks "isFinished", has special Yield.
 * Runs in a 0.01 interval
 */
import {Entity} from "../Entity";
import {Logger} from "../Logger";


export abstract class TreeThread extends Entity {
    private routine: LuaThread | undefined;
    private _isManual: boolean = false;
    public isFinished: boolean = false;
    public lastYieldDuration: number = 0;

    protected constructor(timerDelay: number = 0.01, manual: boolean = false) {
        super(timerDelay);
        this.routine = coroutine.create(() => this.runSecret());
        this.isManual = manual;
    }

    step(...args: any[]): void {
        if (!this._isManual) {
            this.resume();
        } else {
            this.remove();
        }
    }

    public reset() {
        if (!this.isFinished) this.onEnd();
        this.routine = coroutine.create(() => this.runSecret());
        this.isFinished = false;
        if (!this.isManual) this.add();
        this.onStart();
    }
    public stop() {
        if (!this.isFinished) {
            this.onEnd();
            this.remove();
            this.routine = undefined;
        }
        this.isFinished = true;
    }
    protected yield() {
        coroutine.yield();
        this.lastYieldDuration = this.timerDelay;
    }
    protected yieldTimed(totalSeconds: number, ...args: any[]) {
        for (let i = 0; i < totalSeconds; i += this.timerDelay) {
            this.yield();
        }
        this.lastYieldDuration = totalSeconds;
    }
    public resume() {
        if (!this.isFinished) {
            if (this.routine) coroutine.resume(this.routine);
            this.onUpdateStep();
        }
    }
    protected isolate(func: (this: void, ...arg: any[]) => any) {
        xpcall(func, Logger.critical);
    }

    private runSecret() {
        this.onStart();
        this.isolate(() => {
            this.execute();
        });
        this.stop();
    }

    protected onStart() {
    };
    protected onUpdateStep(): void {
    };
    protected abstract execute(): void;
    protected onEnd() {
    };

    get isManual(): boolean {
        return this._isManual;
    }
    set isManual(value: boolean) {
        this._isManual = value;
        if (value) {
            this.remove();
        } else this.add();
    }

    public static RunUntilDone(func: (this: any) => any) {
        return new SimpleTreeCoroutine(func, 0.01, false);
    }
}

export class SimpleTreeCoroutine extends TreeThread {
    public constructor(public func: (this: any) => void, timerDelay: number = 0.01, manual: boolean = false) {
        super(timerDelay, manual);
    }
    protected execute(): void {
        this.func();
    }
}