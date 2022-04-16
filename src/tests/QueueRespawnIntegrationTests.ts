import {Logger} from "../TreeLib/Logger";
import {Players} from "../TreeLib/Structs/Players";
import {ActionQueue} from "../TreeLib/Services/ActionQueue/ActionQueue";
import {UnitActionWaypoint} from "../TreeLib/Services/ActionQueue/Actions/UnitActionWaypoint";
import {Vector2} from "../TreeLib/Utility/Data/Vector2";
import {WaypointOrders} from "../TreeLib/Services/ActionQueue/Actions/WaypointOrders";
import {UnitActionDeath} from "../TreeLib/Services/ActionQueue/Actions/UnitActionDeath";
import {Delay} from "../TreeLib/Services/Delay/Delay";
import {Respawner} from "../TreeLib/Services/Respawner/Respawner";
import {UnitActionGoToAction} from "../TreeLib/Services/ActionQueue/Actions/UnitActionGoToAction";
import {UnitActionWaitWhileDead} from "../TreeLib/Services/ActionQueue/Actions/UnitActionWaitWhileDead";

export class QueueRespawnIntegrationTests {
    run() {
        xpcall(() => {

            Delay.addDelay(() => {
                let foot = CreateUnit(Players.RED, FourCC("hfoo"), -6000, -6000, 0);
                let queue = ActionQueue.createUnitQueue(foot,
                    new UnitActionWaypoint(Vector2.new(-6000, -6000), WaypointOrders.attack),
                    new UnitActionWaypoint(Vector2.new(-5500, -6000), WaypointOrders.attack),
                    new UnitActionWaypoint(Vector2.new(-5500, -5500), WaypointOrders.attack),
                    new UnitActionWaypoint(Vector2.new(-6000, -5500), WaypointOrders.attack),
                    new UnitActionDeath(false),
                    new UnitActionWaitWhileDead(),
                    new UnitActionGoToAction(0)
                );
                let resp = Respawner.createNewUnitRespawner(foot, 5, false, undefined)
                resp.onRespawn = (newUnit) => {
                    queue.target = newUnit.target;
                    ActionQueue.addQueue(queue);
                };
            }, 2.5, 4);


        }, (...args) => Logger.LogCritical(...args));
    }
}