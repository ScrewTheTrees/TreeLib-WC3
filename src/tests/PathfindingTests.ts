import {Hooks} from "../TreeLib/Hooks";
import {Pathfinder} from "../TreeLib/Frameworks/Pathfinder/Pathfinder";
import {InputManager} from "../TreeLib/Services/InputManager/InputManager";
import {Vector2} from "../TreeLib/Utility/Data/Vector2";
import {Logger} from "../TreeLib/Logger";
import {UnitActionWaypoint} from "../TreeLib/Services/ActionQueue/Actions/UnitActionWaypoint";
import {WaypointOrders} from "../TreeLib/Services/ActionQueue/Actions/WaypointOrders";
import {ActionQueue} from "../TreeLib/Services/ActionQueue/ActionQueue";
import {UnitActionDeath} from "../TreeLib/Services/ActionQueue/Actions/UnitActionDeath";
import {PathfinderGrid} from "../TreeLib/Frameworks/Pathfinder/PathfinderGrid";
import {IUnitAction} from "../TreeLib/Services/ActionQueue/Actions/IUnitAction";

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
        this.pathfinder = new PathfinderGrid(-8192, -8192, 8192, 8192, stepSize, true);

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
            let path = this.pathfinder.findPath(Vector2.new(0, 0), coord);
            let actions: IUnitAction[] = [];
            let newPath = path.path;
            print("newPath: ", path.path.length, " -> ", newPath.length);
            let u = CreateUnit(Player(0), FourCC("hfoo"), 0, 0, 0);
            for (let i = 0; i < newPath.length; i++) {
                let value = newPath[i];
                actions.push(new UnitActionWaypoint(value.point, WaypointOrders.attack, 96));
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