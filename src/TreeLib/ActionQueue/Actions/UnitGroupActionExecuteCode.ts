import {UnitGroupQueue} from "../Queues/UnitGroupQueue";
import {IUnitGroupAction} from "./IUnitGroupAction";

/**
 * Executes code
 *
 */
export class UnitGroupActionExecuteCode implements IUnitGroupAction {
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