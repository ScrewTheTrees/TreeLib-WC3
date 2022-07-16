import {Entity} from "../../Entity";
import {IRespawner} from "./IRespawner";
import {UnitRespawner} from "./UnitRespawner";
import {UnitCampRespawner} from "./UnitCampRespawner";
import {Quick} from "../../Quick";

export class Respawner extends Entity {
    private static _instance: Respawner;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new Respawner();
        }
        return this._instance;
    }
    private constructor() {
        super(1);
    }
    private spawners: IRespawner[] = [];
    /**
     * Pauses all timers for respawning units, very good if you go into a cinematic mode or similar and dont want them respawning.
     */
    public paused = false;

    step(): void {
        if (!this.paused) {
            for (let index = 0; index < this.spawners.length; index++) {
                let spawner = this.spawners[index];
                spawner.update(this.timerDelay);
                if (spawner.respawns == 0) {
                    Quick.Slice(this.spawners, index);
                    index -= 1;
                }
            }
        }
    }


    public addSpawner<T extends IRespawner>(spawner: T): T {
        Quick.Push(this.spawners, spawner);
        return spawner;
    }

    /**
     * Set up respawning for a unit, if the unit is removed this will be removed as well.
     * @param target The unit
     * @param delay How long it takes after death to respawn
     * @param respawnAtOriginalLocation Respawn at original location, else if false, respawn where dead.
     * @param doEyeCandy If hero, do respawn animation.
     * @param respawns how many times it will respawn, -1 is infinite.
     */
    public createNewUnitRespawner(target: unit, delay: number, respawnAtOriginalLocation?: boolean, doEyeCandy?: boolean, respawns?: number) {
        return this.addSpawner(new UnitRespawner(target, delay, respawnAtOriginalLocation, doEyeCandy, respawns));
    }

    /**
     * The big difference compared to the other one is that in this one is that all the units in the array have to die before the timer starts.
     * @param targets The array unit
     * @param delay How long it takes after death to respawn
     * @param respawnAtOriginalLocation Respawn at original location, else if false, respawn where dead.
     * @param doEyeCandy If hero, do respawn animation.
     * @param respawns how many times it will respawn, -1 is infinite.
     */
    public createNewUnitCampRespawner(targets: unit[], delay: number, respawnAtOriginalLocation?: boolean, doEyeCandy?: boolean, respawns?: number) {
        return this.addSpawner(new UnitCampRespawner(targets, delay, respawnAtOriginalLocation, doEyeCandy, respawns));
    }
}