import {Wave} from "./Wave";
import {WaveUnitTypes} from "./WaveUnitTypes";

export class WaveHandler {
    public currentWave: number = 0;
    public allWaves: Wave[] = [];
    public waveTimer: number = 0;
    public timeBetweenSpawns: number = 0.05;
    public timeBetweenWaves: number = 5;
    public amountOfUnitsTotal: number = 90;
    public waveInProgress: boolean = false;
    private readonly timer: timer;
    private readonly timerDialog: timerdialog;
    private readonly timerTrigger: trigger;

    public onWaveStart: Function[] = [];
    public onWaveEnd: Function[] = [];
    public sendSpawnSignal: { (param: Wave): void; }[] = [];

    constructor() {
        this.generateWaves();
        this.timer = CreateTimer();
        this.timerDialog = CreateTimerDialog(this.timer);

        this.timerTrigger = CreateTrigger();
        TriggerRegisterTimerExpireEvent(this.timerTrigger, this.timer);
        TriggerAddAction(this.timerTrigger, () => {
            this.onWaveStart.forEach((callback) => {
                callback(this.allWaves[1]);
            });
            this.spawnWave();
        });
    }

    public startWaveTimer() {
        TimerStart(this.timer, this.timeBetweenWaves, false, undefined);
        TimerDialogSetTitle(this.timerDialog, "Next wave in:");
        TimerDialogDisplay(this.timerDialog, true);
    }

    public generateWaves() {
        this.allWaves[1] = new Wave(WaveUnitTypes.get(1));
        this.allWaves[2] = new Wave(WaveUnitTypes.get(2));
    }

    private spawnWave() {
        this.currentWave += 1;
        const spawner = CreateTrigger();
        this.waveInProgress = true;
        let counter = this.amountOfUnitsTotal;

        TriggerRegisterTimerEvent(spawner, this.timeBetweenSpawns, true);
        TriggerAddAction(spawner, () => {
            this.sendSpawnSignal.forEach((callback) => {
                if (counter > 0 && GetRandomInt(1, 10) == 1) {
                    callback(this.allWaves[this.currentWave]);
                    counter -= 1;
                }

                if (counter <= 0) {
                    this._onWaveEnd();
                    DestroyTrigger(spawner);
                    return;
                }
            });
        })
    }

    private _onWaveEnd() {
        this.waveInProgress = false;
        this.onWaveEnd.forEach((callback) => {
            callback();
        });
    }

}