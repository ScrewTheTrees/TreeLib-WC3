/**
 * Coroutine that can be reset, tracks "isFinished", has special Yield.
 * Runs in a 0.01 interval
 */
import {Entity} from "../Entity";
import {Logger} from "../Logger";
import {DelayDto} from "./DelayDto";
import {Delay} from "./Delay";


export abstract class TreeThread extends Entity {
    private routine: Function | undefined;
    private _isManual: boolean = false;
    public isFinished: boolean = false;
    public lastYieldDuration: number = 0;

    protected constructor(timerDelay: number = 0.01, manual: boolean = false) {
        super(timerDelay);
        this.routine = coroutine.wrap(() => this.runSecret());
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
        this.routine = coroutine.wrap(() => this.runSecret());
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
            if (this.routine) this.routine();
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

    public static RunCoroutineUntilDone(func: (this: any) => any) {
        let done = false;
        let routine = coroutine.create(() => {
            xpcall(() => func(), Logger.critical);
            done = true;
        })
        Delay.addDelay((delay: DelayDto) => {
            if (!done) {
                delay.repeatCounter = 0;
                coroutine.resume(routine);
            } else {
                delay.repeatCounter = delay.repeats;
            }
        }, 0.02, 2);
        return routine;
    }
}