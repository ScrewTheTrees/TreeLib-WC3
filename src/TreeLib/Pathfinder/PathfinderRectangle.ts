import {Node, RectangleNode} from "./Node";
import {Vector2} from "../Utility/Data/Vector2";
import {Pathfinder} from "./Pathfinder";
import {PointWalkableChecker} from "../Pathing/PointWalkableChecker";
import {Delay} from "../Utility/Delay";
import {DelayDto} from "../Utility/DelayDto";
import {Logger} from "../Logger";
import {Rectangle} from "../Utility/Data/Rectangle";
import {Quick} from "../Quick";

export class PathfinderRectangle extends Pathfinder<RectangleNode> {
    private grid: RectangleNode[][] = [];
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
        let halfStep = stepSize / 2;
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
                let previousNode: Node | undefined;
                let previousX = startX;
                let previousY = startY;

                for (let i = startX; i < endX; i += stepSize) {
                    for (let j = startY; j < endY; j += stepSize) {
                        if (this.getGridElement(i, j) != null) continue; //Already Occupied.

                        let pos = Vector2.new(i + halfStep, j + halfStep);
                        if (excludeNonWalkable && (!walk.checkTerrainIsWalkableXY(pos.x, pos.y))) {
                            pos.recycle();
                            sr++;
                            continue; //Not walkable.
                        }

                        coroutine.yield();
                        print(i, j);
                        let node = this.generateRectangleNode(i, j, pos);

                        if (previousNode != undefined) {
                            this.connectNeighbors(previousX, previousY, stepSize, previousNode, allowDiagonal);
                        }

                        previousNode = node;
                        previousX = i;
                        previousY = j;

                        sr++;
                        if (sr >= 32) {
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
                    coroutine.resume(routine);
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
                coroutine.resume(routine);
            }
            // @ts-ignore
            routine = undefined;
        }
    }
    public getGridElement(i: number, j: number) {
        if (this.grid[i] == null) {
            this.grid[i] = [];
        }
        return this.grid[i][j];
    }
    public setGridElement(i: number, j: number, element: RectangleNode) {
        if (this.grid[i] == null) {
            this.grid[i] = [];
        }
        this.grid[i][j] = element;
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
            right = this.getGridElement(previousX + stepSize, previousY);
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
    public getNodeClosestTo(point: Vector2): RectangleNode {
        let p = point.copy();
        //p.x -= 4;
        //p.y -= 4;
        p.x = math.floor(p.x / this.stepSize) * this.stepSize;
        p.y = math.floor(p.y / this.stepSize) * this.stepSize;
        if (p.x <= this.startX) p.x = this.startX + this.stepSize;
        if (p.x >= this.endX) p.x = this.endX - this.stepSize;
        if (p.y <= this.startY) p.y = this.startY + this.stepSize;
        if (p.y >= this.endY) p.y = this.endY - this.stepSize;
        let g = this.grid[p.x][p.y];
        if (g == null) {
            let offset = this.stepSize;
            while (g == null) {
                for (let i = -this.stepSize; i <= offset; i += this.stepSize) {
                    let val = this.grid[p.x + i][p.y - offset];
                    if (val != null) return val;
                }
                for (let i = -this.stepSize; i <= offset; i += this.stepSize) {
                    let val = this.grid[p.x + i][p.y + offset];
                    if (val != null) return val;
                }

                for (let i = -this.stepSize; i <= offset; i += this.stepSize) {
                    let val = this.grid[p.x + offset][p.y + i];
                    if (val != null) return val;
                }
                for (let i = -this.stepSize; i <= offset; i += this.stepSize) {
                    let val = this.grid[p.x - offset][p.y + i];
                    if (val != null) return val;
                }

                offset += this.stepSize;
            }
        }
        p.recycle();
        return g;
    }
    private generateRectangleNode(startI: number, startJ: number, pos: Vector2): RectangleNode {
        let halfStep = this.stepSize / 2;
        let node = new RectangleNode(pos, Rectangle.new(pos.x - halfStep, pos.y - halfStep, pos.x + halfStep, pos.y + halfStep));
        let checker = PointWalkableChecker.getInstance();

        this.setGridElement(startI, startJ, node);
        this.addNode(node);

        let addCandidates: Vector2[] = [];
        let iterateSize = this.stepSize;
        let hit = false;
        let iterations = 0;
        while (!hit && iterations < 4) {
            let checkI = startI + iterateSize;
            let checkJ = startJ + iterateSize;

            for (let i = startI; i <= startI + iterateSize; i += this.stepSize) {
                if (this.getGridElement(i, checkJ) != null || !checker.checkTerrainIsWalkableXY(i, checkJ)) {
                    hit = true;
                    break;
                } else {
                    Quick.Push(addCandidates, Vector2.new(i, checkJ))
                }
            }
            //TODO: Make x/y expand independently.
            for (let j = startJ; j <= checkJ; j += this.stepSize) {
                if (this.getGridElement(checkI, j) != null || !checker.checkTerrainIsWalkableXY(checkI, j)) {
                    hit = true;
                    break;
                } else {
                    Quick.Push(addCandidates, Vector2.new(checkI, j))
                }
            }

            for (let k = addCandidates.length - 1; k >= 0; k--) {
                let candice = addCandidates[k];
                if (!hit) this.setGridElement(candice.x, candice.y, node);
                candice.recycle();
                delete addCandidates[k];
            }
            if (!hit) {
                node.boundary.xMax += this.stepSize;
                node.boundary.yMax += this.stepSize;
                node.point.x += halfStep;
                node.point.y += halfStep;

                iterations++;
                iterateSize += this.stepSize;
            }
        }
        this.addConnectionsRect(node, //Below
            node.boundary.xMin,
            node.boundary.xMax,
            node.boundary.yMin - this.stepSize,
            node.boundary.yMin - this.stepSize
        )
        this.addConnectionsRect(node, //Left
            node.boundary.xMin - this.stepSize,
            node.boundary.xMin - this.stepSize,
            node.boundary.yMin,
            node.boundary.yMax,
        )
        return node;
    }

    private addConnectionsRect(node: RectangleNode, x1: number, x2: number, y1: number, y2: number) {
        let minX = math.min(x1, x2);
        let maxX = math.max(x1, x2);
        let minY = math.min(y1, y2);
        let maxY = math.max(y1, y2);

        for (let x = minX; x <= maxX; x += this.stepSize) {
            for (let y = minY; y <= maxY; y += this.stepSize) {
                node.addNeighborTwoWay(this.getGridElement(x, y));
            }
        }
    }
}