import {Spawner} from "./Spawner";
import {IsValidUnit} from "../Misc";
import {UnitRespawner} from "./UnitRespawner";
import {Quick} from "../Quick";

export class UnitCampRespawner implements Spawner {
    public targets: UnitRespawner[] = [];
    public delay: number;
    public counter: number = 0;
    public respawnAtOriginalLocation: boolean;
    public doEyeCandy: boolean;
    public respawns: number;
    public filter: ((self: UnitCampRespawner) => boolean) | undefined;

    /**
     * See Respawner.createNewUnitCampRespawner
     */
    constructor(targets: unit[], delay: number = 60, respawnAtOriginalLocation: boolean = true, doEyeCandy: boolean = true, maxRespawns: number = -1) {
        this.delay = delay;
        this.respawnAtOriginalLocation = respawnAtOriginalLocation;
        this.doEyeCandy = doEyeCandy;
        this.respawns = maxRespawns;
        for (let target of targets) {
            let spawner = new UnitRespawner(target, 9999999, respawnAtOriginalLocation, doEyeCandy, maxRespawns);
            Quick.Push(this.targets, spawner);
        }
    }

    private isAllDead(): boolean {
        for (let target of this.targets) {
            if (IsValidUnit(target.target) && IsUnitAliveBJ(target.target)) {
                return false;
            }
        }
        return true;
    }

    update(timeStep: number): void {
        if (this.isAllDead()) {
            this.counter += timeStep;
            if (this.counter >= this.delay) {
                if (this.respawns != 0 && (this.filter == undefined || this.filter(this))) {
                    for (let target of this.targets) {
                        target.performRevive();
                        this.counter = 0;
                    }
                }
                if (this.respawns > 0) {
                    this.respawns -= 1;
                }
            }
        }

        //Disable automatic revives.
        for (let target of this.targets) {
            target.update(0);
            target.counter = 0;
            target.respawns = -1;
        }
    }

}