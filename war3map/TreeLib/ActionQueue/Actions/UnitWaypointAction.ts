import {UnitAction} from "./UnitAction";
import {Point} from "../../Utility/Point";
import {WaypointOrders} from "./WaypointOrders";
import {Logger} from "../../Logger";

export class UnitWaypointAction implements UnitAction {
    isFinished: boolean = false;
    private readonly toPoint: Point;
    private readonly acceptableDistance: number;
    private readonly order: WaypointOrders;

    constructor(toPoint: Point, order: WaypointOrders = WaypointOrders.smart, acceptableDistance: number = 32) {
        this.toPoint = toPoint;
        this.order = order;
        this.acceptableDistance = acceptableDistance;
    }

    update(target: unit): void {
        if (Point.fromWidget(target).distanceTo(this.toPoint) <= this.acceptableDistance) {
            this.isFinished = true;
            Logger.LogVerbose("Finished waypoint");
        } else if (GetUnitCurrentOrder(target) == 0) {
            IssuePointOrder(target, this.order, this.toPoint.x, this.toPoint.y); //Update order
        }
    }

    init(target: unit): void {
        IssuePointOrder(target, this.order, this.toPoint.x, this.toPoint.y); //Update order
    }

}