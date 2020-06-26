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
import {UnitAction} from "../TreeLib/ActionQueue/Actions/UnitAction";

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
        this.pathfinder = new PathfinderGrid(-8192, -8192, 8192, 8192, stepSize);

        for (let i = 0; i < this.pathfinder.nodes.length; i++) {
            let node = this.pathfinder.nodes[i];
            if (this.isRectUnWalkable(node.point.x, node.point.y, stepSize, stepSize)) {
                node.remove();
            }
            if (GetTerrainType(node.point.x, node.point.y) == FourCC("Odtr")) {
                node.cost = 2;
            }
        }

        InputManager.addKeyboardPressCallback(OSKEY_P, () => xpcall(() => {
            let coord = InputManager.getLastMouseCoordinate(Player(0));
            let path = this.pathfinder.findPath(new Point(0, 0), coord);
            let actions: UnitAction[] = [];
            let newPath = path.getPathOptimised();
            print("newPath: ", path.path.length, " -> ", newPath.length);
            let u = CreateUnit(Player(0), FourCC("hfoo"), 0, 0, 0);
            for (let i = 0; i < newPath.length; i++) {
                let value = Point.copy(newPath[i]);
                actions.push(new UnitActionWaypoint(value, WaypointOrders.attack, 64));
            }
            actions.push(new UnitActionDeath(true));
            ActionQueue.createUnitQueue(u, ...actions);
        }, (...args) => Logger.critical(...args)));
    }

    private isRectUnWalkable(x: number, y: number, sizeX: number, sizeY: number) {
        for (let i = 0; i < sizeX; i += 16) {
            for (let j = 0; j < sizeY; j += 16) {
                if (IsTerrainPathable(x + i, y + j, PATHING_TYPE_WALKABILITY)) {
                    return true;
                }
            }
        }
        return false;
    }
}