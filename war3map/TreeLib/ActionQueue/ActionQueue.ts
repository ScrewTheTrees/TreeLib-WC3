import {Hooks} from "../Hooks";
import {Entity} from "../Entity";
import {Queue} from "./Queues/Queue";
import {UnitQueue} from "./Queues/UnitQueue";
import {UnitAction} from "./Actions/UnitAction";
import {Logger} from "../Logger";

/**
 * ActionQueue is a system that allows you to create waypoints and a string of orders, like if a player would
 * hold shift and click in the game, not only that but it allows for special actions like killing and removing the unit too.
 */
export class ActionQueue extends Entity {
    private static instance: ActionQueue;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new ActionQueue();
            Hooks.set("ActionQueue", this.instance);
        }
        return this.instance;
    }

    private allQueues: Queue[] = [];
    public _timerDelay: number = 0.1;

    constructor() {
        super();
    }

    step(): void {
        for (let i = 0; i < this.allQueues.length; i++) {
            let queue = this.allQueues[i];
            if (queue.isFinished) {
                Logger.LogVerbose("Queue is finished, total queues:", this.allQueues.length);
                this.allQueues.splice(i, 1);
                Logger.LogVerbose("Spliced queue:", this.allQueues.length);
                i -= 1;
            } else {
                queue.update(this._timerDelay);
            }

        }
    }

    /**
     * Create a single unit Queue
     * @param target The unit that should be handled.
     * @param actions Initial actions, more can be added with a function in the returned object.
     */
    createUnitQueue(target: unit, ...actions: UnitAction[]) : UnitQueue {
        let unitQueue = new UnitQueue(target, ...actions);
        this.allQueues.push(unitQueue);
        Logger.LogDebug("Created UnitQueue, total: ", this.allQueues.length);
        return unitQueue;
    }
}