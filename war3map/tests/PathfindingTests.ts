import {Hooks} from "../TreeLib/Hooks";
import {Pathfinder} from "../TreeLib/Pathfinder/Pathfinder";
import {InputManager} from "../TreeLib/InputManager/InputManager";
import {Point} from "../TreeLib/Utility/Point";
import {Logger} from "../TreeLib/Logger";
import {UnitActionWaypoint} from "../TreeLib/ActionQueue/Actions/UnitActionWaypoint";
import {WaypointOrders} from "../TreeLib/ActionQueue/Actions/WaypointOrders";
import {ActionQueue} from "../TreeLib/ActionQueue/ActionQueue";
import {UnitActionDeath} from "../TreeLib/ActionQueue/Actions/UnitActionDeath";
import {PathfinderGrid} from "../TreeLib/Pathfinder/PathfinderGrid";

export class PathfindingTests {
    private static instance: PathfindingTests;
    private pathfinder: Pathfinder;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new PathfindingTests();
            Hooks.set("PathfindingTests", this.instance);
        }
        return this.instance;
    }

    constructor() {
        let stepSize = 128;
        this.pathfinder = new PathfinderGrid(-4000, -4000, 4000, 4000, stepSize);

        for (let i = 0; i < this.pathfinder.nodes.length; i++) {
            let node = this.pathfinder.nodes[i];
            if (IsTerrainPathable(node.point.x, node.point.y, PATHING_TYPE_WALKABILITY)
                || IsTerrainPathable(node.point.x + (stepSize / 2), node.point.y, PATHING_TYPE_WALKABILITY)
                || IsTerrainPathable(node.point.x, node.point.y + (stepSize / 2), PATHING_TYPE_WALKABILITY)
                || IsTerrainPathable(node.point.x + (stepSize / 2), node.point.y + (stepSize / 2), PATHING_TYPE_WALKABILITY)
            ) {
                node.disabled = true;
            }
        }

        InputManager.addKeyboardPressCallback(OSKEY_P, () => xpcall(() => {
            let coord = InputManager.getLastMouseCoordinate(Player(0));
            let path = this.pathfinder.findPath(new Point(0, 0), coord);
            let actions = [];
            let u = CreateUnit(Player(0), FourCC("hfoo"), path[0].x, path[1].y, 0);
            for (let i = 0; i < path.length; i++) {
                let value = path[i];
                actions.push(new UnitActionWaypoint(value, WaypointOrders.attack, 64));
            }
            actions.push(new UnitActionDeath(true));
            ActionQueue.createUnitQueue(u, ...actions);
        }, (...args) => Logger.critical(...args)));
    }
}