import {UnitAction} from "./UnitAction";
import {Point} from "../../Utility/Point";
import {WaypointOrders} from "./WaypointOrders";
import {Logger} from "../../Logger";
import {ActionQueueConfig} from "../ActionQueueConfig";
import {WeaponIndex} from "../../Wrappers/WeaponIndex";

/**
 * Basic waypoint action, move, attack move, or smart your way over to a Point.
 */
export class UnitActionWaypoint implements UnitAction {
    isFinished: boolean = false;
    private readonly toPoint: Point;
    private readonly acceptableDistance: number;
    private readonly order: WaypointOrders;
    private readonly maxTime: number;
    private timer: number = 0;
    private updateTimer: number = 5;

    constructor(toPoint: Point, order: WaypointOrders = WaypointOrders.smart, acceptableDistance: number = 32, maxTime: number = 300) {
        this.toPoint = toPoint;
        this.order = order;
        this.acceptableDistance = acceptableDistance;
        this.maxTime = maxTime;
    }

    update(target: unit): void {
        this.timer += ActionQueueConfig.getInstance().timerDelay;
        this.updateTimer += ActionQueueConfig.getInstance().timerDelay;
        if (Point.fromWidget(target).distanceTo(this.toPoint) <= this.acceptableDistance || this.timer > this.maxTime) {
            this.isFinished = true;
            Logger.LogVerbose("Finished waypoint");
        } else if (this.updateTimer >= 5) {
            IssuePointOrder(target, this.order, this.toPoint.x, this.toPoint.y); //Update order
            this.updateTimer = (BlzGetUnitWeaponRealField(target, UNIT_WEAPON_RF_ATTACK_BASE_COOLDOWN, WeaponIndex.WEAPON_1) * 2) + 1;
        }
    }

    init(target: unit): void {
        IssuePointOrder(target, this.order, this.toPoint.x, this.toPoint.y); //Update order
    }

}