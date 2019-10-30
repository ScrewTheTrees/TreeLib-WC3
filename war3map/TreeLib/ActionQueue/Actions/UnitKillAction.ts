import {UnitAction} from "./UnitAction";
import {Logger} from "../../Logger";
import {ActionQueueConfig} from "../ActionQueueConfig";
import {IsValidUnit} from "../../Misc";

/**
 * Try to kill a unit until it is dead, or the time runs out
 */
export class UnitKillAction implements UnitAction {
    isFinished: boolean = false;
    private readonly killUnit: unit;
    private readonly maxTime: number;
    private timer: number = 0;
    private updateTimer: number = 5;

    constructor(killUnit: unit, maxTime: number = 300) {
        this.killUnit = killUnit;
        this.maxTime = maxTime;
    }

    update(target: unit): void {
        this.timer += ActionQueueConfig.getInstance().timerDelay;
        this.updateTimer += ActionQueueConfig.getInstance().timerDelay;
        if (!IsValidUnit(this.killUnit) || IsUnitDeadBJ(this.killUnit) || this.timer > this.maxTime) {
            this.isFinished = true;
            Logger.LogVerbose("Unit dead, Gone or time ran out");
        } else if (this.updateTimer >= 5) {
            IssueTargetOrder(target, "attack", this.killUnit); //Update order
        }
    }

    init(target: unit): void {
        IssueTargetOrder(target, "attack", this.killUnit); //Update order
    }

}