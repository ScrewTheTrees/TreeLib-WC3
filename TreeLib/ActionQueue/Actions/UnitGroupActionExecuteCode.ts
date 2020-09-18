import {UnitGroupQueue} from "../Queues/UnitGroupQueue";
import {UnitGroupAction} from "./UnitGroupAction";

/**
 * Executes code
 *
 */
export class UnitGroupActionExecuteCode implements UnitGroupAction {
    isFinished: boolean = false;
    public readonly code: ((targets: unit[], timeStep: number, queue: UnitGroupQueue) => void);

    constructor(code: (targets: unit[], timeStep: number, queue: UnitGroupQueue) => void) {
        this.code = code;
    }

    update(targets: unit[], timeStep: number, queue: UnitGroupQueue): void {
        this.code(targets, timeStep, queue);
        this.isFinished = true;

    }

    init(targets: unit[], queue: UnitGroupQueue): void {
    }

}