import {Logger} from "../TreeLib/Logger";
import {Players} from "../TreeLib/Structs/Players";
import {ActionQueue} from "../TreeLib/ActionQueue/ActionQueue";
import {UnitActionWaypoint} from "../TreeLib/ActionQueue/Actions/UnitActionWaypoint";
import {Point} from "../TreeLib/Utility/Point";
import {WaypointOrders} from "../TreeLib/ActionQueue/Actions/WaypointOrders";
import {UnitActionDeath} from "../TreeLib/ActionQueue/Actions/UnitActionDeath";
import {Delay} from "../TreeLib/Utility/Delay";
import {Respawner} from "../TreeLib/Respawner/Respawner";
import {UnitActionGoToAction} from "../TreeLib/ActionQueue/Actions/UnitActionGoToAction";
import {UnitActionWaitWhileDead} from "../TreeLib/ActionQueue/Actions/UnitActionWaitWhileDead";
import {UnitActionDelay} from "../TreeLib/ActionQueue/Actions/UnitActionDelay";

export class QueueRespawnIntegrationTests {
    run() {
        xpcall(() => {

            Delay.addDelay(() => {
                let foot = CreateUnit(Players.RED, FourCC("hfoo"), -6000, -6000, 0);
                let queue = ActionQueue.createUnitQueue(foot,
                    new UnitActionWaypoint(new Point(-6000, -6000), WaypointOrders.attack),
                    new UnitActionWaypoint(new Point(-5500, -6000), WaypointOrders.attack),
                    new UnitActionWaypoint(new Point(-5500, -5500), WaypointOrders.attack),
                    new UnitActionWaypoint(new Point(-6000, -5500), WaypointOrders.attack),
                    new UnitActionDeath(false),
                    new UnitActionWaitWhileDead(),
                    new UnitActionGoToAction(0)
                );
                let resp = Respawner.createNewUnitRespawner(foot, 5, false, undefined)
                resp.onRespawn = (newUnit) => {
                    queue.target = newUnit.target;
                    ActionQueue.enableQueue(queue);
                };
            }, 2.5, 5);


        }, (...args) => Logger.LogCritical(...args));
    }
}