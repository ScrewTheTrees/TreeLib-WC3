import {Node} from "./Node";
import {Vector2} from "../Utility/Data/Vector2";
import {Pathfinder} from "./Pathfinder";
import {PriorityQueue} from "../Utility/Data/PriorityQueue";
import {PointWalkableChecker} from "../Pathing/PointWalkableChecker";
import {Delay} from "wc3-treelib/src/TreeLib/Utility/Delay";
import {DelayDto} from "TreeLib/Utility/DelayDto";
import {Logger} from "wc3-treelib/src/TreeLib/Logger";

export class PathfinderGrid extends Pathfinder {
    private grid: Node[][] = [];
    private stepSize: number;
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;

    constructor(startX: number, startY: number, endX: number, endY: number, stepSize: number,
                allowDiagonal: boolean = true, excludeNonWalkable: boolean = false, generateAsync: boolean = false) {
        super();
        let walk = PointWalkableChecker.getInstance();
        let done = false;
        let xx = math.max(startX, endX);
        let yy = math.max(startY, endY);
        startX = math.min(startX, endX)
        startY = math.min(startY, endY)
        endX = xx;
        endY = yy;

        startX = math.floor(startX / stepSize) * stepSize;
        startY = math.floor(startY / stepSize) * stepSize;
        endX = math.ceil(endX / stepSize) * stepSize;
        endY = math.ceil(endY / stepSize) * stepSize;

        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.stepSize = stepSize;

        let routine = coroutine.create(() => {
            xpcall(() => {
                let sr = 0;
                for (let i = startX; i < endX; i += stepSize) {
                    if (this.grid[i] == null) {
                        this.grid[i] = [];
                    }
                    for (let j = startY; j < endY; j += stepSize) {
                        let pos = Vector2.new(i + (stepSize / 2), j + (stepSize / 2));
                        if (excludeNonWalkable && !walk.checkTerrainXY(pos.x, pos.y)) continue; //Not walkable.
                        let node = new Node(pos);
                        this.grid[i][j] = node;

                        let up = this.grid[i] != null ? this.grid[i][j - stepSize] : null;
                        let down = this.grid[i] != null ? this.grid[i][j + stepSize] : null;

                        let left: Node | null = null;
                        let upLeft: Node | null = null;
                        let downLeft: Node | null = null;
                        let right: Node | null = null;
                        let upRight: Node | null = null;
                        let downRight: Node | null = null;
                        if (this.grid[i - stepSize] != null) { //Left
                            left = this.grid[i - stepSize][j];
                            upLeft = this.grid[i - stepSize][j - stepSize];
                            downLeft = this.grid[i - stepSize][j + stepSize];
                        }
                        if (this.grid[i + stepSize] != null) { //Right
                            right = this.grid[i + stepSize][j];
                            upRight = this.grid[i + stepSize][j - stepSize];
                            downRight = this.grid[i + stepSize][j + stepSize];
                        }

                        if (up) node.addNeighborTwoWay(up);
                        if (down) node.addNeighborTwoWay(down);
                        if (left) node.addNeighborTwoWay(left);
                        if (right) node.addNeighborTwoWay(right);

                        if (allowDiagonal) {
                            if (upLeft && up && left) node.addNeighborTwoWay(upLeft);
                            if (upRight && up && right) node.addNeighborTwoWay(upRight);
                            if (downLeft && down && left) node.addNeighborTwoWay(downLeft);
                            if (downRight && down && right) node.addNeighborTwoWay(downRight);
                        }
                        this.addNode(node);
                        sr++;
                        if (sr >= 256) {
                            //Logger.generic("x:", i, "y:", j);
                            sr = 0;
                            coroutine.yield();
                        }
                    }
                }
            }, Logger.critical);
            done = true;
        });
        if (generateAsync) {
            let del: DelayDto;
            del = Delay.addDelay(() => {
                if (!done) {
                    coroutine.resume(routine);
                }
                del.repeatCounter = 0;
            }, 0.02, 2);
        } else {
            while (!done) {
                coroutine.resume(routine);
            }
        }
    }
    public getNodeClosestTo(point: Vector2): Node {
        let p = point.copy().alignToGrid(this.stepSize);
        if (p.x < this.startX) p.x = this.startX;
        if (p.x > this.endX) p.x = this.endX - this.stepSize;
        if (p.y < this.startY) p.y = this.startX;
        if (p.y > this.endY) p.y = this.endY - this.stepSize;
        let g = this.grid[p.x][p.y];
        if (g == null) {
            let i = 100;
            let vecs: Vector2[] = [];
            let frontier = new PriorityQueue<Vector2>();
            let next = p.copy();
            frontier.push(next, i);
            vecs.push(next);
            while (g == null) {
                i++;
                let thing = frontier.get();
                if (thing) {
                    let node = this.grid[thing.x][thing.y];
                    if (node) g = node;
                    else {
                        let v = thing.copy().updateTo(thing.x - this.stepSize, thing.y);
                        frontier.push(v, i);
                        vecs.push(v);
                        v = thing.copy().updateTo(thing.x + this.stepSize, thing.y);
                        frontier.push(v, i);
                        vecs.push(v);
                        v = thing.copy().updateTo(thing.x, thing.y - this.stepSize);
                        frontier.push(v, i);
                        vecs.push(v);
                        v = thing.copy().updateTo(thing.x, thing.y + this.stepSize);
                        frontier.push(v, i);
                        vecs.push(v);
                    }
                }
            }
            for (let vec of vecs) {
                vec.recycle();
                frontier.clear();
            }
        }
        p.recycle();
        return g;
    }
}