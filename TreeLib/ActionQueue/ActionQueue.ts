import {Hooks} from "../Hooks";
import {Entity} from "../Entity";
import {Queue} from "./Queues/Queue";
import {UnitQueue} from "./Queues/UnitQueue";
import {UnitAction} from "./Actions/UnitAction";
import {Logger} from "../Logger";
import {Point} from "../Utility/Point";
import {UnitActionWaypoint} from "./Actions/UnitActionWaypoint";
import {WaypointOrders} from "./Actions/WaypointOrders";
import {UnitActionGoToAction} from "./Actions/UnitActionGoToAction";
import {UnitActionWaitWhileDead} from "./Actions/UnitActionWaitWhileDead";
import {UnitActionDelay} from "./Actions/UnitActionDelay";
import {Quick} from "../Quick";
import {UnitGroupQueue} from "./Queues/UnitGroupQueue";
import {UnitGroupAction} from "./Actions/UnitGroupAction";
import {UnitGroupActionWaypoint} from "./Actions/UnitGroupActionWaypoint";
import {UnitGroupActionDelay} from "./Actions/UnitGroupActionDelay";
import {UnitGroupActionGoToAction} from "./Actions/UnitGroupActionGoToAction";

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
            Hooks.set(this.name, this.instance);
        }
        return this.instance;
    }

    private allQueues: Queue[] = [];
    public _timerDelay: number = 0.5;

    constructor() {
        super();
    }

    public createUnitQueue(target: unit, ...actions: UnitAction[]): UnitQueue {
        let unitQueue = new UnitQueue(target, ...actions);
        this.enableQueue(unitQueue);
        Logger.verbose("Created UnitQueue, total: ", this.allQueues.length);
        return unitQueue;
    }

    public createUnitGroupQueue(targets: unit[], ...actions: UnitGroupAction[]): UnitGroupQueue {
        let unitQueue = new UnitGroupQueue(targets, ...actions);
        this.enableQueue(unitQueue);
        Logger.verbose("Created UnitQueue, total: ", this.allQueues.length);
        return unitQueue;
    }

    public enableQueue(queue: Queue) {
        if (this.allQueues.indexOf(queue) < 0) {
            Logger.LogVerbose("Queue is missing, adding");
            Quick.Push(this.allQueues, queue);
            queue.init();
            return;
        }
        Logger.LogVerbose("Queue is present.");
    }

    step(): void {
        for (let i = 0; i < this.allQueues.length; i++) {
            let queue = this.allQueues[i];
            if (queue.isFinished) {
                Quick.Slice(this.allQueues, i);
                Logger.LogVerbose("Spliced queue:", this.allQueues.length);
                i -= 1;
            } else if (!queue.isPaused) {
                queue.update(this._timerDelay);
            }
        }
    }

    /*
    STATIC API
     */
    /**
     * Create a single unit Queue
     * @param target The unit that should be handled.
     * @param actions Initial actions, more can be added with a function in the returned object.
     */
    public static createUnitQueue(target: unit, ...actions: UnitAction[]): UnitQueue {
        return this.getInstance().createUnitQueue(target, ...actions);
    }

    /**
     * Great if you want to reAdd a finished queue, like if the unit despawned but you created a new unit and add it to an old queue. you can reenable it here.
     * Wont add a queue already present.
     * @param queue the queue to enable,
     */
    public static enableQueue(queue: Queue) {
        return this.getInstance().enableQueue(queue);
    }

    /**
     * Great if a queue has lost its purpose or needs replacing.
     * @param queue the queue to disable,
     */
    public static disableQueue(queue: Queue) {
        return this.getInstance().disableQueue(queue);
    }

    /**
     * Creates a simple patrol between two points, the unit will run between this until their body disappears (unit is removed).
     * @param target
     * @param point1
     * @param point2
     * @param delay The delay on each edge, no delay by default
     */
    public static createSimplePatrol(target: unit, point1: Point, point2: Point, delay: number = 0) {
        return this.getInstance().createUnitQueue(target,
            new UnitActionWaypoint(point1, WaypointOrders.attack),
            new UnitActionDelay(delay),
            new UnitActionWaypoint(point2, WaypointOrders.attack),
            new UnitActionDelay(delay),
            new UnitActionWaitWhileDead(),
            new UnitActionGoToAction(0));
    }

    /**
     * Creates a simple guard position, a unit will infinitly guard this position until their their body disappears (unit is removed).
     * @param target
     * @param point
     * @param delay the delay when the unit is ordered back... dont put it too low.
     */
    public static createSimpleGuardPoint(target: unit, point: Point, delay: number = 15) {
        return this.getInstance().createUnitQueue(target,
            new UnitActionWaypoint(point, WaypointOrders.attack),
            new UnitActionDelay(delay),
            new UnitActionWaitWhileDead(),
            new UnitActionGoToAction(0));
    }

    /**
     * Creates a simple guard position, a unit will infinitly guard this position until their their body disappears (unit is removed).
     * @param targets
     * @param point
     * @param delay the delay when the unit is ordered back... dont put it too low.
     */
    public static createGroupGuardPoint(targets: unit[], point: Point, delay: number = 15) {
        return this.getInstance().createUnitGroupQueue(targets,
            new UnitGroupActionWaypoint(point, WaypointOrders.attack),
            new UnitGroupActionDelay(delay),
            new UnitGroupActionGoToAction(0));
    }

    public disableQueue(queue: Queue) {
        let index = this.allQueues.indexOf(queue);
        queue.isFinished = true;
        if (index >= 0) {
            Logger.verbose("Queue is present, splicing");
            Quick.Slice(this.allQueues, index);
            return;
        }
        Logger.LogVerbose("Queue is not present, no action required.");
    }
}