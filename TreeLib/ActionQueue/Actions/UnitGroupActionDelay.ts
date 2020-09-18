import {UnitGroupAction} from "./UnitGroupAction";
import {UnitGroupQueue} from "../Queues/UnitGroupQueue";

/**
 * Basic delay, wait for x amount of seconds and then get on your way.
 */
export class UnitGroupActionDelay implements UnitGroupAction {
    isFinished: boolean = false;
    private timer: number = 0;
    public delay: number;

    constructor(delay: number) {
        this.delay = delay;
        this.isFinished = false;
    }

    update(targets: unit[], timeStep: number, queue: UnitGroupQueue): void {
        this.timer += timeStep;

        if (this.timer >= this.delay) {
            this.isFinished = true;
        }
    }

    init(targets: unit[], queue: UnitGroupQueue): void {
        this.timer = 0;
    }

}