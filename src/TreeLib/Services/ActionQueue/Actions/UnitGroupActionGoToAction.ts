import {Delay} from "../../Delay/Delay";
import {IUnitGroupAction} from "./IUnitGroupAction";
import {UnitGroupQueue} from "../Queues/UnitGroupQueue";

/**
 * Sets the current action index in queue to another action, also resets all actions.
 * Allows for adding an expression which will evaluate, returning true if it should go to the action or false if not.
 */
export class UnitGroupActionGoToAction implements IUnitGroupAction {
    isFinished: boolean = false;
    public readonly expression: (targets: unit[], timeStep: number, queue: UnitGroupQueue) => boolean;

    constructor(public actionIndex: number, expression?: (this: any, targets: unit[], timeStep: number, queue: UnitGroupQueue) => boolean) {
        this.expression = expression || function () {
            return true;
        };
    }

    update(targets: unit[], timeStep: number, queue: UnitGroupQueue): void {
        if (this.expression(targets, timeStep, queue)) {
            queue.resetActions();
            queue.currentActionIndex = this.actionIndex;
            Delay.addDelay(() => {
                queue.allActions[this.actionIndex].init(queue.targets, queue);
            }, 0.02);
        } else {
            this.isFinished = true;
        }
    }

    init(targets: unit[], queue: UnitGroupQueue): void {
    }

}