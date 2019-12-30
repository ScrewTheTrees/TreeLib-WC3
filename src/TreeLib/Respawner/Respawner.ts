import {Hooks} from "../Hooks";
import {Entity} from "../Entity";
import {Spawner} from "./Spawner";
import {UnitRespawner} from "./UnitRespawner";
import {UnitCampRespawner} from "./UnitCampRespawner";
import {QuickSplice} from "../Misc";

export class Respawner extends Entity {
    private static instance: Respawner;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new Respawner();
            Hooks.set("Respawner", this.instance);
        }
        return this.instance;
    }

    private spawners: Spawner[] = [];
    /**
     * Pauses all timers for respawning units, very good if you go into a cinematic mode or similar and dont want them respawning.
     */
    public paused = false;

    constructor() {
        super();
        this._timerDelay = 0.1;
    }

    step(): void {
        if (!this.paused) {
            for (let index = 0; index < this.spawners.length; index++) {
                let spawner = this.spawners[index];
                spawner.update(this._timerDelay);
                if (spawner.respawns == 0) {
                    QuickSplice(this.spawners, index);
                    index -= 1;
                }
            }
        }
    }

    public createNewUnitRespawner(target: unit, delay: number, respawnAtOriginalLocation?: boolean, doEyeCandy?: boolean,
                                  onRespawn?: (target: unit) => void, respawns?: number) {
        let spawner = new UnitRespawner(target, delay, onRespawn, respawnAtOriginalLocation, doEyeCandy, respawns);
        this.spawners.push(spawner);
        return spawner;
    }

    public createNewUnitCampRespawner(targets: unit[], delay: number, respawnAtOriginalLocation?: boolean, doEyeCandy?: boolean,
                                      onRespawn?: (target: unit) => void, respawns?: number) {
        let spawner = new UnitCampRespawner(targets, delay, onRespawn, respawnAtOriginalLocation, doEyeCandy, respawns);
        this.spawners.push(spawner);
        return spawner;
    }

    /*
    STATIC API
     */
    /**
     * Set up respawning for a unit, if the unit is removed this will be removed as well.
     * @param target The unit
     * @param delay How long it takes after death to respawn
     * @param respawnAtOriginalLocation Respawn at original location, else if false, respawn where dead.
     * @param doEyeCandy If hero, do respawn animation.
     * @param onRespawn callback on respawn containing the target unit respawned.
     * @param respawns how many times it will respawn, -1 is infinite.
     */
    public static createNewUnitRespawner(target: unit, delay: number, respawnAtOriginalLocation?: boolean, doEyeCandy?: boolean,
                                         onRespawn?: (target: unit) => void, respawns?: number) {
        return this.getInstance().createNewUnitRespawner(target, delay, respawnAtOriginalLocation, doEyeCandy, onRespawn, respawns);
    }
    /**
     * The big difference compared to the other one is that in this one is that all the units in the array have to die before the timer starts.
     * @param targets The array unit
     * @param delay How long it takes after death to respawn
     * @param respawnAtOriginalLocation Respawn at original location, else if false, respawn where dead.
     * @param doEyeCandy If hero, do respawn animation.
     * @param onRespawn callback on respawn containing the target unit respawned, runs for every unit respawned
     * @param respawns how many times it will respawn, -1 is infinite.
     */
    public static createNewUnitCampRespawner(targets: unit[], delay: number, respawnAtOriginalLocation?: boolean, doEyeCandy?: boolean,
                                      onRespawn?: (target: unit) => void, respawns?: number) {
        return this.getInstance().createNewUnitCampRespawner(targets, delay, respawnAtOriginalLocation, doEyeCandy, onRespawn, respawns);
    }
}