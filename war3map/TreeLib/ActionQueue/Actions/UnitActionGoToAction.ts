import {UnitAction} from "./UnitAction";
import {UnitQueue} from "../Queues/UnitQueue";
import {Delay} from "../../Utility/Delay";

/**
 * Try to kill a unit until it is dead, or the time runs out
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
        }
    }

    init(target: unit, queue: UnitQueue): void {
    }

}