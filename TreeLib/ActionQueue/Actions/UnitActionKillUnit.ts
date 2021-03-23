import {UnitAction} from "./UnitAction";
import {Logger} from "../../Logger";
import {IsValidUnit} from "../../Misc";
import {WeaponIndex} from "../../Structs/WeaponIndex";
import {UnitQueue} from "../Queues/UnitQueue";

/**
 * Try to kill a unit until it is dead, or the time runs out
 */
export class UnitActionKillUnit implements UnitAction {
    isFinished: boolean = false;
    private readonly killUnit: unit;
    private readonly maxTime: number;
    private timer: number = 0;
    private updateTimer: number = 5;

    constructor(killUnit: unit, maxTime: number = 1200) {
        this.killUnit = killUnit;
        this.maxTime = maxTime;
        this.isFinished = false;
    }

    update(target: unit,timeStep: number, queue: UnitQueue): void {
        this.timer += timeStep;
        this.updateTimer += timeStep;
        if (!IsValidUnit(this.killUnit) || IsUnitDeadBJ(this.killUnit) || this.timer > this.maxTime) {
            this.isFinished = true;
            Logger.LogVerbose("Unit dead, Gone or time ran out");
        } else if (this.updateTimer >= 5) {
            IssueTargetOrder(target, "attack", this.killUnit); //Update order
            this.updateTimer = (BlzGetUnitWeaponRealField(target, UNIT_WEAPON_RF_ATTACK_BASE_COOLDOWN, WeaponIndex.WEAPON_1) * 2) + 1;
        }
    }

    init(target: unit, queue: UnitQueue): void {
        IssueTargetOrder(target, "attack", this.killUnit); //Update order
    }

}