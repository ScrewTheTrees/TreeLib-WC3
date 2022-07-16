/**
 * Dynamic entities are great in the way that you can yield and change the timerDelay with less overhead.
 * While entity runs all timers of the same interval at the same time, DynamicEntities run their own timers.
 * Thus they will execute at different times if created at different times.
 */
export abstract class DynamicEntity {
    //TimerDelay API
    protected _timerDelay: number;
    protected _timer: timer = CreateTimer();
    public lastStepSize: number;

    public timerLoop: (this: any) => any;
    public timerLoopYield: (this: any) => any;

    protected constructor(timerDelay: number = 0.01) {
        this._timerDelay = Math.round(timerDelay * 1_000) / 1_000;
        this.lastStepSize = this.timerDelay;

        this.timerLoop = () => {
            this.step();
        }
        this.timerLoopYield = () => {
            this.add();
            this.step();
        }

        this.add();
    }

    get timerDelay(): number {
        return this._timerDelay;
    }
    set timerDelay(value: number) {
        value = Math.round(value * 1_000) / 1_000; //Should give 0.001 of precision.
        this.remove();
        this._timerDelay = value;
        this.add();
    }

    public timerYield(time: number) {
        this.resetTimer();
        TimerStart(this._timer, time, false, this.timerLoopYield);
        this.lastStepSize = time;
    }
    public isActive() {
        return !(this.isInactive());
    }
    public isInactive() {
        return this.timerLoop == null && this.timerLoopYield == null;
    }

    //Logic to execute when the logic beat hits.
    abstract step(): void;

    /** Purges the Entity from the timer system, thus making it no longer run "step()".
     **/
    public remove() {
        this.removeTimer();
    }
    /**
     * Full purge, cleans up the entire thing.
     */
    public destroy() {
        this.remove();
        // @ts-ignore
        this.timerLoop = undefined;
        // @ts-ignore
        this.timerLoopYield = undefined;
    }
    public add() {
        this.resetTimer();
        TimerStart(this._timer, this.timerDelay, true, this.timerLoop);
        this.lastStepSize = this.timerDelay;
    }
    private removeTimer() {
        if (this._timer == undefined) return;
        PauseTimer(this._timer);
        DestroyTimer(this._timer);
    }
    private resetTimer() {
        this.removeTimer();
        this._timer = CreateTimer();
    }
}