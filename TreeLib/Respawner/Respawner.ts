import {Hooks} from "../Hooks";
import {Entity} from "../Entity";
import {Spawner} from "./Spawner";
import {UnitRespawner} from "./UnitRespawner";
import {UnitCampRespawner} from "./UnitCampRespawner";

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
    public paused = false;

    constructor() {
        super();
        this._timerDelay = 0.1;
    }

    step(): void {
        if (!this.paused) {
            for (let spawner of this.spawners) {
                spawner.update(this._timerDelay);
            }
        }
    }

    public createNewUnitRespawner(target: unit, delay: number, respawnAtOriginalLocation?: boolean, doEyeCandy?: boolean, onRespawn?: (target: unit) => void) {
        let spawner = new UnitRespawner(target, delay, onRespawn, respawnAtOriginalLocation, doEyeCandy);
        this.spawners.push(spawner);
        return spawner;
    }

    public createNewUnitCampRespawner(targets: unit[], delay: number, respawnAtOriginalLocation?: boolean, doEyeCandy?: boolean, onRespawn?: (target: unit) => void) {
        let spawner = new UnitCampRespawner(targets, delay, onRespawn, respawnAtOriginalLocation, doEyeCandy);
        this.spawners.push(spawner);
        return spawner;
    }
}