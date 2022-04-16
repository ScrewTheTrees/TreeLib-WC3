import {IUnitAction} from "./IUnitAction";
import {UnitQueue} from "../Queues/UnitQueue";

/**
 * Try to kill a unit until it is dead, or the time runs out
 */
export class UnitActionWaitWhileDead implements IUnitAction {
    isFinished: boolean = false;

    constructor() {

    }

    update(target: unit, timeStep: number, queue: UnitQueue): void {
        if (IsUnitAliveBJ(target)) {
            this.isFinished = true;
        }
    }

    init(target: unit, queue: UnitQueue): void {
    }

}