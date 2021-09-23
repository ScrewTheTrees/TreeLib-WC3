import {Node} from "./Node";
import {Vector2} from "../Utility/Data/Vector2";
import {Pathfinder} from "./Pathfinder";
import {PriorityQueue} from "../Utility/Data/PriorityQueue";
import {PointWalkableChecker} from "../Pathing/PointWalkableChecker";
import {Delay} from "../Utility/Delay";
import {DelayDto} from "TreeLib/Utility/DelayDto";
import {Logger} from "../Logger";

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

        let routine = coroutine.wrap(() => {
            xpcall(() => {
                let sr = 0;
                let previousNode: Node | undefined;
                let previousX = startX;
                let previousY = startY;

                for (let i = startX; i < endX; i += stepSize) {
                    if (this.grid[i] == null) {
                        this.grid[i] = [];
                    }
                    for (let j = startY; j < endY; j += stepSize) {
                        let pos = Vector2.new(i + (stepSize / 2), j + (stepSize / 2));
                        if (excludeNonWalkable && (!walk.checkTerrainXY(pos.x, pos.y))) {
                            pos.recycle();
                            sr++;
                            continue; //Not walkable.
                        }

                        let node = new Node(pos);
                        this.grid[i][j] = node;
                        this.addNode(node);

                        if (previousNode != undefined) {
                            this.connectNeighbors(previousX, previousY, stepSize, previousNode, allowDiagonal);
                        }

                        previousNode = node;
                        previousX = i;
                        previousY = j;

                        sr++;
                        if (sr >= 256) {
                            sr = 0;
                            coroutine.yield();
                        }
                    }
                }
                if (previousNode != undefined) {
                    this.connectNeighbors(previousX, previousY, stepSize, previousNode, allowDiagonal);
                }
            }, Logger.critical);
            done = true;
        });
        if (generateAsync) {
            let del: DelayDto;
            del = Delay.addDelay(() => {
                if (!done) {
                    routine();
                    del.repeatCounter = 0;
                } else {
                    // @ts-ignore
                    routine = undefined;
                    // @ts-ignore
                    del = undefined;
                }
            }, 0.02, 2);
        } else {
            while (!done) {
                routine();
            }
            // @ts-ignore
            routine = undefined;
        }
    }
    private connectNeighbors(previousX: number, previousY: number, stepSize: number, previousNode: Node, allowDiagonal: boolean) {
        let up = this.grid[previousX] != null ? this.grid[previousX][previousY - stepSize] : null;
        let down = this.grid[previousX] != null ? this.grid[previousX][previousY + stepSize] : null;

        let left: Node | null = null;
        let upLeft: Node | null = null;
        let downLeft: Node | null = null;
        let right: Node | null = null;
        let upRight: Node | null = null;
        let downRight: Node | null = null;
        if (this.grid[previousX - stepSize] != null) { //Left
            left = this.grid[previousX - stepSize][previousY];
            upLeft = this.grid[previousX - stepSize][previousY - stepSize];
            downLeft = this.grid[previousX - stepSize][previousY + stepSize];
        }
        if (this.grid[previousX + stepSize] != null) { //Right
            right = this.grid[previousX + stepSize][previousY];
            upRight = this.grid[previousX + stepSize][previousY - stepSize];
            downRight = this.grid[previousX + stepSize][previousY + stepSize];
        }

        if (up) previousNode.addNeighborTwoWay(up);
        if (down) previousNode.addNeighborTwoWay(down);
        if (left) previousNode.addNeighborTwoWay(left);
        if (right) previousNode.addNeighborTwoWay(right);

        if (allowDiagonal) {
            if (upLeft && up && left) previousNode.addNeighborTwoWay(upLeft);
            if (upRight && up && right) previousNode.addNeighborTwoWay(upRight);
            if (downLeft && down && left) previousNode.addNeighborTwoWay(downLeft);
            if (downRight && down && right) previousNode.addNeighborTwoWay(downRight);
        }
    }
    public getNodeClosestTo(point: Vector2): Node {
        let p = point.copy();
        p.x -= this.stepSize / 2;
        p.y -= this.stepSize / 2;
        p.x = math.floor(p.x / this.stepSize) * this.stepSize;
        p.y = math.floor(p.y / this.stepSize) * this.stepSize;
        if (p.x <= this.startX) p.x = this.startX + this.stepSize;
        if (p.x >= this.endX) p.x = this.endX - this.stepSize;
        if (p.y <= this.startY) p.y = this.startY + this.stepSize;
        if (p.y >= this.endY) p.y = this.endY - this.stepSize;
        let g = this.grid[p.x][p.y];
        if (g == null) {
            let i = 100;
            let vecs: Vector2[] = [];
            let frontier = new PriorityQueue<Vector2>();
            let next = p.copy();
            frontier.push(next, i);
            vecs.push(next);
            while (g == null) {
                i--;
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

                        v = thing.copy().updateTo(thing.x - this.stepSize, thing.y - this.stepSize);
                        frontier.push(v, i);
                        vecs.push(v);
                        v = thing.copy().updateTo(thing.x - this.stepSize, thing.y + this.stepSize);
                        frontier.push(v, i);
                        vecs.push(v);
                        v = thing.copy().updateTo(thing.x + this.stepSize, thing.y - this.stepSize);
                        frontier.push(v, i);
                        vecs.push(v);
                        v = thing.copy().updateTo(thing.x + this.stepSize, thing.y + this.stepSize);
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