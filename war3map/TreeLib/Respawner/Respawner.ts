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
            for (let index = 0; index < this.spawners.length; index++) {
                let spawner = this.spawners[index];
                spawner.update(this._timerDelay);
                if (spawner.respawns == 0) {
                    this.spawners.splice(index, 1);
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
}