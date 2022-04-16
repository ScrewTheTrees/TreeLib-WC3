import {IRespawner} from "./IRespawner";
import {IsValidUnit} from "../../Misc";
import {Vector2} from "../../Utility/Data/Vector2";

export class UnitRespawner implements IRespawner {
    public target: unit;
    public owner: player;
    public unitType: number;
    public delay: number;
    public counter: number = 0;
    public isHero: boolean;
    public respawnAtCurrentLocation: boolean;
    private _respawnLocation: Vector2;
    public doEyeCandy: boolean;
    public rotation: number;
    public onRespawn: ((self: UnitRespawner) => void) | undefined;
    public respawns: number;
    public filter: ((self: UnitRespawner) => boolean) | undefined;

    get respawnLocation(): Vector2 {
        return this._respawnLocation;
    }

    set respawnLocation(value: Vector2) {
        this._respawnLocation.updateTo(value.x, value.y);
    }

    /**
     * See Respawner.createNewUnitRespawner
     */
    constructor(target: unit, delay: number = 60, respawnAtCurrentLocation: boolean = true, doEyeCandy: boolean = true, maxRespawns: number = -1) {
        this.target = target;
        this.owner = GetOwningPlayer(target);
        this.unitType = GetUnitTypeId(this.target);
        this.delay = delay;
        this.isHero = IsUnitType(this.target, UNIT_TYPE_HERO);
        this.respawnAtCurrentLocation = respawnAtCurrentLocation;
        this.doEyeCandy = doEyeCandy;
        this.rotation = GetUnitFacing(this.target);
        this.respawns = maxRespawns;

        this._respawnLocation = Vector2.fromWidget(this.target);
    }

    update(timeStep: number): void {
        if (!IsValidUnit(this.target) || IsUnitDeadBJ(this.target)) {
            this.counter += timeStep;
        } else {
            this.counter = 0;
            if (!this.respawnAtCurrentLocation) {
                this.respawnLocation = Vector2.fromWidget(this.target);
                this.rotation = GetUnitFacing(this.target);
            }
        }
        if (this.counter >= this.delay && (this.filter == undefined || this.filter(this))) {
            this.performRevive();
        }
    }

    performRevive() {
        if (this.respawns != 0) {
            if (this.isHero) {
                ReviveHero(this.target, this.respawnLocation.x, this.respawnLocation.y, false);
                SetUnitFacing(this.target, this.rotation);
            } else {
                this.target = CreateUnit(this.owner, this.unitType, this.respawnLocation.x, this.respawnLocation.y, this.rotation);
            }
            if (this.onRespawn) {
                this.onRespawn(this);
            }
        }
        if (this.respawns > 0) {
            this.respawns -= 1;
        }
        this.counter = 0;
    }

}