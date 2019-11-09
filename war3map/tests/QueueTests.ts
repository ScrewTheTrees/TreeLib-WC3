import {Logger} from "../TreeLib/Logger";
import {Players} from "../TreeLib/Structs/Players";
import {ActionQueue} from "../TreeLib/ActionQueue/ActionQueue";
import {UnitActionWaypoint} from "../TreeLib/ActionQueue/Actions/UnitActionWaypoint";
import {Point} from "../TreeLib/Utility/Point";
import {WaypointOrders} from "../TreeLib/ActionQueue/Actions/WaypointOrders";
import {UnitActionKillUnit} from "../TreeLib/ActionQueue/Actions/UnitActionKillUnit";
import {UnitActionDeath} from "../TreeLib/ActionQueue/Actions/UnitActionDeath";
import {Delay} from "../TreeLib/Utility/Delay";

export class QueueTests {
    private actionQueue: ActionQueue;
    private delay: Delay;

    constructor() {
        this.actionQueue = ActionQueue.getInstance();
        this.delay = Delay.getInstance();
    }

    run() {
        xpcall(() => {
            let killKnight = CreateUnit(Players.BLUE, FourCC("hkni"), 4000, 0, 0);

            this.delay.addDelay(() => {
                let mortar = CreateUnit(Players.RED, FourCC("hmtm"), -1400, -3000, 0);
                this.actionQueue.createUnitQueue(mortar,
                    new UnitActionWaypoint(new Point(870, -3064)),
                    new UnitActionWaypoint(new Point(870, -1450), WaypointOrders.smart),
                    new UnitActionWaypoint(new Point(2000, -1450), WaypointOrders.attack),
                    new UnitActionKillUnit(killKnight),
                    new UnitActionDeath(true)
                )
            }, 2, 5);
        }, (...args) => Logger.LogCritical(...args));
    }
}