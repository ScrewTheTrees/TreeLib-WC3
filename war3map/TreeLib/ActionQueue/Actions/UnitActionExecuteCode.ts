import {UnitAction} from "./UnitAction";
import {UnitQueue} from "../Queues/UnitQueue";

/**
 * Executes code
 *
 */
export class UnitActionExecuteCode implements UnitAction {
    isFinished: boolean = false;
    public readonly code: ((target: unit, timeStep: number, queue: UnitQueue) => void);

    constructor(code: (target: unit, timeStep: number, queue: UnitQueue) => void) {
        this.code = code;
    }

    update(target: unit, timeStep: number, queue: UnitQueue): void {
        this.code(target, timeStep, queue);
        this.isFinished = true;

    }

    init(target: unit, queue: UnitQueue): void {
    }

}