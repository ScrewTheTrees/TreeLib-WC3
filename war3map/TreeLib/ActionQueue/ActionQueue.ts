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

    public createUnitQueue(target: unit, ...actions: UnitAction[]): UnitQueue {
        let unitQueue = new UnitQueue(target, ...actions);
        this.allQueues.push(unitQueue);
        Logger.LogDebug("Created UnitQueue, total: ", this.allQueues.length);
        return unitQueue;
    }

    public enableQueue(queue: Queue) {
        if (this.allQueues.indexOf(queue) <= 0) {
            Logger.LogVerbose("Queue is missing, adding");
            this.allQueues.push(queue);
            return;
        }
        Logger.LogVerbose("Queue is present.");
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
     */
    public static createSimpleGuardPoint(target: unit, point: Point) {
        return this.getInstance().createUnitQueue(target,
            new UnitActionWaypoint(point, WaypointOrders.attack),
            new UnitActionDelay(3),
            new UnitActionWaitWhileDead(),
            new UnitActionGoToAction(0));
    }
}