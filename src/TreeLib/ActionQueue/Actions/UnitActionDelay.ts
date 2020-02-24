import {UnitAction} from "./UnitAction";
import {UnitQueue} from "../Queues/UnitQueue";

/**
 * Basic delay, wait for x amount of seconds and then get on your way.
 */
export class UnitActionDelay implements UnitAction {
    isFinished: boolean = false;
    private timer: number = 0;
    public delay: number;

    constructor(delay: number) {
        this.delay = delay;
        this.isFinished = false;
    }

    update(target: unit, timeStep: number, queue: UnitQueue): void {
        this.timer += timeStep;

        if (this.timer >= this.delay) {
            this.isFinished = true;
        }
    }

    init(target: unit, queue: UnitQueue): void {
        this.timer = 0;
    }

}