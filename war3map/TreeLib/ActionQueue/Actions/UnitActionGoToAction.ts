import {UnitAction} from "./UnitAction";
import {UnitQueue} from "../Queues/UnitQueue";
import {Delay} from "../../Utility/Delay";

/**
 * Sets the current action index in queue to another action, also resets all actions.
 * Allows for adding an expression which will evaluate, returning true if it should go to the action or false if not.
 */
export class UnitActionGoToAction implements UnitAction {
    isFinished: boolean = false;
    public readonly expression: (() => boolean);
    public actionIndex: number;

    constructor(actionIndex: number, expression?: () => boolean) {
        this.actionIndex = actionIndex;
        this.expression = expression || function () {
            return true;
        };
        this.isFinished = false;
    }

    update(target: unit, timeStep: number, queue: UnitQueue): void {
        if (this.expression()) {
            queue.resetActions();
            queue.currentActionIndex = this.actionIndex;
            Delay.getInstance().addDelay(() => {
                queue.allActions[this.actionIndex].init(queue.target, queue);
            }, 0.02);
        } else {
            this.isFinished = true;
        }
    }

    init(target: unit, queue: UnitQueue): void {
    }

}