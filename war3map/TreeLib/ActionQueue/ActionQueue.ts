import {Hooks} from "../Hooks";
import {Entity} from "../Entity";
import {Queue} from "./Queues/Queue";
import {UnitQueue} from "./Queues/UnitQueue";
import {UnitAction} from "./Actions/UnitAction";
import {Logger} from "../Logger";

/**
 * ActionQueue is a system that allows you to create waypoints and a string of orders, like if a player would
 * hold shift and click in the game, not only that but it allows for special actions like killing and removing the unit too.
 * Also some logic stuff like GoTo action to go to another part of the queue, setting to 0 resets the queue.
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
    public createUnitQueue(target: unit, ...actions: UnitAction[]): UnitQueue {
        let unitQueue = new UnitQueue(target, ...actions);
        this.allQueues.push(unitQueue);
        Logger.LogDebug("Created UnitQueue, total: ", this.allQueues.length);
        return unitQueue;
    }

    /**
     * Great if you want to reAdd a queue, or add a custom queue.
     * @param queue the queue to enable,
     */
    public enableQueue(queue: Queue) {
        if (this.allQueues.indexOf(queue) <= 0) {
            Logger.LogVerbose("Queue is missing, adding");
            this.allQueues.push(queue);
            return;
        }
        Logger.LogVerbose("Queue is present.");
    }
}