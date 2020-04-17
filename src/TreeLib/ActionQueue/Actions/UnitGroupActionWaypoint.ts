import {Point} from "../../Utility/Point";
import {WaypointOrders} from "./WaypointOrders";
import {Logger} from "../../Logger";
import {UnitGroupAction} from "./UnitGroupAction";
import {Quick} from "../../Quick";
import {UnitGroupQueue} from "../Queues/UnitGroupQueue";

/**
 * Basic waypoint action, move, attack move, or smart your way over to a Point.
 */
export class UnitGroupActionWaypoint implements UnitGroupAction {
    isFinished: boolean = false;
    public readonly toPoint: Point;
    public readonly acceptableDistance: number;
    public readonly order: WaypointOrders;
    public readonly maxTime: number;
    public timer: number = 0;
    public updateTimer: number = 0;

    //300 for acceptable distance is mainly for groups of 12 which has a a sweetspot around ~222, so we use a more decent size
    constructor(toPoint: Point, order: WaypointOrders = WaypointOrders.smart, acceptableDistance: number = 400, maxTime: number = 1200) {
        this.toPoint = toPoint;
        this.order = order;
        this.acceptableDistance = acceptableDistance;
        this.maxTime = maxTime;
        this.isFinished = false;
    }

    update(targets: unit[], timeStep: number, queue: UnitGroupQueue): void {
        this.timer += timeStep;
        this.updateTimer += timeStep;

        if (this.getDistanceToPoint(targets, this.toPoint) <= this.acceptableDistance || this.timer > this.maxTime) {
            this.isFinished = true;
            Logger.LogVerbose("Finished waypoint");
        } else if (this.updateTimer >= 10) {
            let g = Quick.UnitArrayToGroup(targets);
            GroupPointOrder(g, this.order, this.toPoint.x, this.toPoint.y); //Update order
            DestroyGroup(g);
            this.updateTimer = 0;
        }
    }

    init(targets: unit[], queue: UnitGroupQueue): void {
        let g = Quick.UnitArrayToGroup(targets);
        GroupPointOrder(g, this.order, this.toPoint.x, this.toPoint.y); //Update order
        DestroyGroup(g);
    }

    private getDistanceToPoint(targets: unit[], point: Point): number {
        if (targets.length == 0) return 9999999;
        let num = 0;
        for (let i = 0; i < targets.length; i++) {
            num += Point.fromWidget(targets[i]).distanceTo(point);
        }
        return num / targets.length;
    }

}