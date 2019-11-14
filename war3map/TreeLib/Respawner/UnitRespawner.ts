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
    public onRespawn: Function | undefined;
    public respawns: number;


    /**
     * @param target the unit in question that you want to respawn.
     * @param delay the delay after death before it respawns.
     *      * @param onRespawn function called when target is respawned by the system.
     * @param respawnAtCurrentLocation if true, respawns at the location where the unit was added, else respawns where it died.
     * @param doEyeCandy show revive graphics
     * @param maxRespawns the amount of times the respawns can occur, -1 is infinite.
     */
    constructor(target: unit, delay: number = 60, onRespawn?: (target: unit) => void,
                respawnAtCurrentLocation: boolean = true, doEyeCandy: boolean = true, maxRespawns: number = -1) {
        this.target = target;
        this.owner = GetOwningPlayer(target);
        this.unitType = GetUnitTypeId(this.target);
        this.delay = delay;
        this.onRespawn = onRespawn;
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
        if (this.counter >= this.delay) {
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
                this.onRespawn(this.target);
            }
        }
        if (this.respawns > 0) {
            this.respawns -= 1;
        }
        this.counter = 0;
    }

}