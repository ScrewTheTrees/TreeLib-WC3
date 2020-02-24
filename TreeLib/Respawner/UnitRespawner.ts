import {Spawner} from "./Spawner";
import {IsValidUnit} from "../Misc";
import {Point} from "../Utility/Point";

export class UnitRespawner implements Spawner {
    public target: unit;
    public owner: player;
    public unitType: number;
    public delay: number;
    public counter: number = 0;
    public isHero: boolean;
    public respawnAtCurrentLocation: boolean;
    public respawnLocation: Point;
    public doEyeCandy: boolean;
    public rotation: number;
    public onRespawn: ((self: UnitRespawner) => void) | undefined;
    public respawns: number;
    public filter: ((self: UnitRespawner) => boolean) | undefined;


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

        this.respawnLocation = Point.fromWidget(this.target);
    }

    update(timeStep: number): void {
        if (!IsValidUnit(this.target) || IsUnitDeadBJ(this.target)) {
            this.counter += timeStep;
        } else {
            this.counter = 0;
            if (!this.respawnAtCurrentLocation) {
                this.respawnLocation = Point.fromWidget(this.target);
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