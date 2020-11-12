import {UnitAction} from "./UnitAction";
import {Point} from "../../Utility/Point";
import {WaypointOrders} from "./WaypointOrders";
import {Logger} from "../../Logger";
import {UnitQueue} from "../Queues/UnitQueue";

/**
 * Basic waypoint action, move, attack move, or smart your way over to a Point.
 */
export class UnitActionWaypoint implements UnitAction {
    isFinished: boolean = false;
    public readonly toPoint: Point;
    public readonly acceptableDistance: number;
    public readonly order: WaypointOrders;
    public readonly maxTime: number;
    public timer: number = 0;
    public updateTimer: number = 0;
    public idleFor: number = 0;

    constructor(toPoint: Point, order: WaypointOrders = WaypointOrders.smart, acceptableDistance: number = 96, maxTime: number = 600) {
        this.toPoint = toPoint;
        this.order = order;
        this.acceptableDistance = acceptableDistance;
        this.maxTime = maxTime;
        this.isFinished = false;
    }

    public update(target: unit, timeStep: number, queue: UnitQueue): void {
        this.timer += timeStep;
        this.updateTimer += timeStep;

        if (GetUnitCurrentOrder(target) == 0) this.idleFor += timeStep;


        if (this.inObjectiveRange(target) || this.timer > this.maxTime) {
            this.isFinished = true;
            Logger.LogVerbose("Finished waypoint");
        } else if (this.updateTimer >= 7 || this.idleFor >= 1) {
            IssuePointOrder(target, this.order, this.toPoint.x, this.toPoint.y); //Update order
            this.updateTimer = 0;
            this.idleFor = 0;
        }
    }

    public init(target: unit, queue: UnitQueue): void {
        IssuePointOrder(target, this.order, this.toPoint.x, this.toPoint.y); //Update order
    }

    public inObjectiveRange(target: unit) {
        let targetPoint = Point.fromWidget(target);
        let offset = targetPoint.getOffsetTo(this.toPoint);

        if (offset.x > this.acceptableDistance
            || offset.x < -this.acceptableDistance
            || offset.y > this.acceptableDistance
            || offset.y < -this.acceptableDistance) {
            return false;
        }

        let acceptSquare = this.acceptableDistance * this.acceptableDistance;
        return targetPoint.distanceToSquared(this.toPoint) <= acceptSquare;
    }

}