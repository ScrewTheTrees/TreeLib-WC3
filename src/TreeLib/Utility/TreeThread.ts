/**
 * Coroutine that can be reset, tracks "isFinished", has special Yield.
 */
import {Logger} from "../Logger";
import {DynamicEntity} from "../DynamicEntity";


export abstract class TreeThread extends DynamicEntity {
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
        this.resume();
    }
    public stop() {
        if (!this.isFinished) {
            this.onEnd();
            this.remove();
            this.routine = undefined;
        }
        this.isFinished = true;
    }
    public yield() {
        coroutine.yield();
        this.lastYieldDuration = this.timerDelay;
    }
    public yieldTimed(totalSeconds: number, inYield?: () => any) {
        for (let i = 0; i < totalSeconds; i += this.timerDelay) {
            if (inYield) inYield();
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

    private runSecret() {
        this.onStart();
        xpcall(() => {
            this.execute();
        }, Logger.critical);
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

    public static RunUntilDone(func: (routine: SimpleTreeCoroutine) => any) {
        return new SimpleTreeCoroutine(func, 0.05, false);
    }
}

export class SimpleTreeCoroutine extends TreeThread {
    public constructor(public func: (routine: SimpleTreeCoroutine) => void, timerDelay: number = 0.05, manual: boolean = false) {
        super(timerDelay, manual);
    }
    protected execute(): void {
        this.func(this);
        this.destroy();
    }
}