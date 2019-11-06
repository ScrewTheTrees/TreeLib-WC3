import {Spawner} from "./Spawner";
import {IsValidUnit} from "../Misc";
import {UnitRespawner} from "./UnitRespawner";

export class UnitCampRespawner implements Spawner {
    public targets: UnitRespawner[] = [];
    public delay: number;
    public counter: number = 0;
    public respawnAtOriginalLocation: boolean;
    public doEyeCandy: boolean;
    public onRespawn: Function | undefined;


    /**
     * @param targets the units in question that you want to respawn together when they are all dead
     * @param delay the delay after death before it respawns.
     * @param onRespawn function called when target is respawned by the system.
     * @param respawnAtOriginalLocation if true, respawns at the location where the unit was added, else respawns where it died.
     * @param doEyeCandy show revive graphics
     */
    constructor(targets: unit[], delay: number = 60, onRespawn?: (target: unit) => void, respawnAtOriginalLocation: boolean = true, doEyeCandy: boolean = true) {
        this.delay = delay;
        this.onRespawn = onRespawn;
        this.respawnAtOriginalLocation = respawnAtOriginalLocation;
        this.doEyeCandy = doEyeCandy;
        for (let target of targets) {
            let spawner = new UnitRespawner(target, 9999999, onRespawn, respawnAtOriginalLocation, doEyeCandy);
            this.targets.push(spawner);
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
                for (let target of this.targets) {
                    target.performRevive();
                    this.counter = 0;
                }
            }
        }
        
        //Disable automatic revives.
        for (let target of this.targets) {
            target.update(0);
            target.counter = 0;
        }
    }

}