import {Global} from "./Global";
import {ShitEx} from "./Generic/ShitEx";
import {Logger} from "./Generic/Logger";
import {Orders} from "./Orders";
import {GetRandomLocInRectUnitSafe} from "./ExtensionFunctions";

export class CreepRoute {
    private wayPoints: rect[] = [];
    public startPoint: rect;
    public endPoint: rect;
    public readonly myIndex: number;
    public readonly creepPlayer: player;
    private wayPointTriggers: trigger[] = [];

    constructor(index: number, creepPlayer: player) {
        this.myIndex = index;
        this.creepPlayer = creepPlayer;
        this.startPoint = Global.AllRegions["gg_rct_route" + this.myIndex + "spawn"];
        this.endPoint = Global.AllRegions["gg_rct_route" + this.myIndex + "end"];

        this.createWaypointList();
        this.generateWaypoints();
        Logger.LogVerbose(`startPoint in route ${this.myIndex}  -  ${this.startPoint}`);
        Logger.LogVerbose(`endPoint in route ${this.myIndex}  -  ${this.endPoint}`);
        Logger.LogDebug(`Total wayPoints ${this.wayPoints.length} in route ${this.myIndex}`);
        Logger.LogDebug(`Total triggers ${this.wayPointTriggers.length} in route ${this.myIndex}`);

    }

    public spawnUnit(unitType: number) {
        const loc = GetRandomLocInRectUnitSafe(this.startPoint);
        let u = CreateUnitAtLoc(this.creepPlayer, unitType, loc, bj_UNIT_FACING);
        RemoveGuardPosition(u);
        RemoveLocation(loc);
    }


    private createWaypointList() {
        Object.entries(Global.AllRegions).forEach(([key, value]) => {
            if (key.startsWith("gg_rct_route" + this.myIndex)) {
                const result = ShitEx.separateNumbers(key);
                if (result[2] == "waypoint") {
                    this.wayPoints[Number(result[3])] = value;
                    Logger.LogVerbose(`Added waypoint ${result[3]} to route ${result[1]}`);
                }
            }
        });
    }

    private generateWaypoints() {
        if (this.wayPoints.length > 0) {
            this.wayPointTriggers.push(this.createWaypointTrigger(this.startPoint, this.wayPoints[1]));

            for (let i = 1; i < this.wayPoints.length - 1; i++) {
                const start = this.wayPoints[i];
                const end = this.wayPoints[i + 1];
                this.wayPointTriggers.push(this.createWaypointTrigger(start, end));
            }

            this.wayPointTriggers.push(this.createWaypointTrigger(this.wayPoints[this.wayPoints.length - 1], this.endPoint));

        } else {
            this.wayPointTriggers.push(this.createWaypointTrigger(this.startPoint, this.endPoint));
        }
    }

    private createWaypointTrigger(beginRect: rect, endRect: rect): trigger {
        const newTrigger = CreateTrigger();
        const reg = CreateRegion();
        RegionAddRect(reg, beginRect);
        TriggerRegisterEnterRegion(newTrigger, reg, null);
        TriggerAddCondition(newTrigger, Condition(() => {
            return (GetOwningPlayer(GetEnteringUnit()) == this.creepPlayer);
        }));
        TriggerAddAction(newTrigger, () => {
            const loc = GetRandomLocInRectUnitSafe(endRect);

            IssuePointOrderLoc(GetEnteringUnit(), Orders.patrol, loc);
            RemoveLocation(loc);
        });

        return newTrigger;
    }
}