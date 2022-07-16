import {Logger} from "../TreeLib/Logger";
import {Players} from "../TreeLib/Structs/Players";
import {ActionQueue} from "../TreeLib/Services/ActionQueue/ActionQueue";
import {UnitActionWaypoint} from "../TreeLib/Services/ActionQueue/Actions/UnitActionWaypoint";
import {Vector2} from "../TreeLib/Utility/Data/Vector2";
import {WaypointOrders} from "../TreeLib/Services/ActionQueue/Actions/WaypointOrders";
import {UnitActionKillUnit} from "../TreeLib/Services/ActionQueue/Actions/UnitActionKillUnit";
import {UnitActionDeath} from "../TreeLib/Services/ActionQueue/Actions/UnitActionDeath";
import {Delay} from "../TreeLib/Services/Delay/Delay";
import {UnitActionImmediate} from "../TreeLib/Services/ActionQueue/Actions/UnitActionImmediate";
import {ImmediateOrders} from "../TreeLib/Services/ActionQueue/Actions/ImmediateOrders";
import {UnitActionDelay} from "../TreeLib/Services/ActionQueue/Actions/UnitActionDelay";
import {UnitGroupQueue} from "../TreeLib/Services/ActionQueue/Queues/UnitGroupQueue";
import {Quick} from "../TreeLib/Quick";
import {UnitGroupActionWaypoint} from "../TreeLib/Services/ActionQueue/Actions/UnitGroupActionWaypoint";
import {UnitGroupActionGoToAction} from "../TreeLib/Services/ActionQueue/Actions/UnitGroupActionGoToAction";

export class QueueTests {
    run() {
        xpcall(() => {
            let killKnight = CreateUnit(Players.BLUE, FourCC("hkni"), 4000, 0, 0);

            let units: unit[] = [];
            for (let i = 0; i < 12; i++) {
                Quick.Push(units, CreateUnit(Players.BLUE, FourCC("hfoo"), -6000, 0, 0));
            }
            let walkAround = new UnitGroupQueue(units,
                new UnitGroupActionWaypoint(Vector2.new(-6000, -6000), WaypointOrders.attack),
                new UnitGroupActionWaypoint(Vector2.new(-6000, 6000), WaypointOrders.attack),
                new UnitGroupActionWaypoint(Vector2.new(6000, 6000), WaypointOrders.attack),
                new UnitGroupActionWaypoint(Vector2.new(6000, -6000), WaypointOrders.attack),
                new UnitGroupActionGoToAction(0),
            );

            ActionQueue.getInstance().addQueue(walkAround);

            Delay.getInstance().addDelay(() => {
                let mortar = CreateUnit(Players.RED, FourCC("hmtm"), -1400, -3000, 0);
                ActionQueue.getInstance().createUnitQueue(mortar,
                    new UnitActionWaypoint(Vector2.new(870, -3064)),
                    new UnitActionWaypoint(Vector2.new(870, -1450), WaypointOrders.smart),
                    new UnitActionImmediate(Vector2.new(870, -1450), ImmediateOrders.holdPosition),
                    new UnitActionDelay(3),
                    new UnitActionWaypoint(Vector2.new(2000, -1450), WaypointOrders.attack),
                    new UnitActionKillUnit(killKnight),
                    new UnitActionDeath(true)
                )
            }, 2, 5);
        }, (...args) => Logger.LogCritical(...args));
    }
}