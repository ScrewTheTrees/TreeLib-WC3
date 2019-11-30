import {UnitAction} from "./UnitAction";
import {UnitQueue} from "../Queues/UnitQueue";
import {Delay} from "../../Utility/Delay";

/**
 * Basic delay, wait for x amount of seconds and then get on your way.
 */
export class UnitActionDelay implements UnitAction {
    isFinished: boolean = false;
    private timer: number = 0;
    private updateTimer: number = 5;
    private delay: number;

    constructor(delay: number) {
        this.delay = delay;
        this.isFinished = false;
    }

    update(target: unit, timeStep: number, queue: UnitQueue): void {
        this.timer += timeStep;
        this.updateTimer += timeStep;

        Delay.addDelay(() => {
            this.isFinished = true;
        }, this.delay)
    }

    init(target: unit, queue: UnitQueue): void {

    }

}