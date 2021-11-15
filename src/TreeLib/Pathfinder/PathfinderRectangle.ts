import {Node, RectangleNode} from "./Node";
import {Vector2} from "../Utility/Data/Vector2";
import {Pathfinder} from "./Pathfinder";
import {PointWalkableChecker} from "../Pathing/PointWalkableChecker";
import {Logger} from "../Logger";
import {Rectangle} from "../Utility/Data/Rectangle";
import {Quick} from "../Quick";
import {TreeThread} from "../Utility/TreeThread";

export class PathfinderRectangle extends Pathfinder<RectangleNode> {
    private grid: RectangleNode[][] = [];
    private stepSize: number;
    private startX: number;
    private startY: number;
    private endX: number;
    private endY: number;
    public isFinishGenerating: boolean = false;

    private walkChecker = PointWalkableChecker.getInstance();

    constructor(startX: number, startY: number, endX: number, endY: number, stepSize: number,
                allowDiagonal: boolean = true, excludeNonWalkable: boolean = false, generateAsync: boolean = false) {
        super();
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

        if (generateAsync) {
            TreeThread.RunUntilDone(() => {
                this.generateMesh(startX, startY, endY, stepSize, endX, halfStep, excludeNonWalkable, generateAsync);
                this.isFinishGenerating = true;
            });
        } else {
            this.generateMesh(startX, startY, endY, stepSize, endX, halfStep, excludeNonWalkable, generateAsync);
            this.isFinishGenerating  = true;
        }
    }
    private generateMesh(startX: number, startY: number, endY: number, stepSize: number, endX: number, halfStep: number, excludeNonWalkable: boolean, generateAsync: boolean) {
        xpcall(() => {
            let sr = 0;
            let previousNode: Node | undefined;
            let previousX = startX;
            let previousY = startY;

            for (let y = startY; y < endY; y += stepSize) {
                for (let x = startX; x < endX; x += stepSize) {
                    if (this.getGridElementByCoordinate(x, y) != null) continue; //Already Occupied.

                    let xx = x + halfStep
                    let yy = y + halfStep
                    if (excludeNonWalkable && (!this.walkChecker.checkTerrainIsWalkableXY(xx, yy))) {
                        sr++;
                        continue; //Not walkable.
                    }

                    let node = this.generateRectangleNode(x, y, generateAsync ? 1024 : -1);

                    previousNode = node;
                    previousX = x;
                    previousY = y;

                    sr++;
                    if (sr >= 8) {
                        sr = 0;
                        coroutine.yield();
                    }
                }
            }
        }, Logger.critical);
    }
    public getGridElementByCoordinate(x: number, y: number) {
        x = math.floor(x / this.stepSize);
        y = math.floor(y / this.stepSize);
        if (this.grid[x] == null) {
            this.grid[x] = [];
        }
        return this.grid[x][y];
    }
    public setGridElementByCoordinate(x: number, y: number, element: RectangleNode) {
        x = math.floor(x / this.stepSize);
        y = math.floor(y / this.stepSize);
        if (this.grid[x] == null) {
            this.grid[x] = [];
        }
        this.grid[x][y] = element;
    }
    public getNodeClosestTo(point: Vector2): RectangleNode {
        let xx = point.x;
        let yy = point.y;

        //p.x -= 4;
        //p.y -= 4;
        xx = math.floor(xx / this.stepSize) * this.stepSize;
        yy = math.floor(yy / this.stepSize) * this.stepSize;
        if (xx <= this.startX) xx = this.startX + this.stepSize;
        if (xx >= this.endX) xx = this.endX - this.stepSize;
        if (yy <= this.startY) yy = this.startY + this.stepSize;
        if (yy >= this.endY) yy = this.endY - this.stepSize;
        let g = this.getGridElementByCoordinate(xx, yy);
        if (g == null) {
            let offset = this.stepSize;
            while (g == null) {
                for (let i = -this.stepSize; i <= offset; i += this.stepSize) {
                    let val = this.getGridElementByCoordinate(xx + i, yy - offset);
                    if (val != null) return val;
                }
                for (let i = -this.stepSize; i <= offset; i += this.stepSize) {
                    let val = this.getGridElementByCoordinate(xx + i, yy + offset);
                    if (val != null) return val;
                }

                for (let i = -this.stepSize; i <= offset; i += this.stepSize) {
                    let val = this.getGridElementByCoordinate(xx + offset, yy + i);
                    if (val != null) return val;
                }
                for (let i = -this.stepSize; i <= offset; i += this.stepSize) {
                    let val = this.getGridElementByCoordinate(xx - offset, yy + i);
                    if (val != null) return val;
                }

                offset += this.stepSize;
            }
        }
        return g;
    }
    private generateRectangleNode(startX: number, startY: number, maxOps: number = -1): RectangleNode {
        let halfStep = this.stepSize / 2;
        let node = new RectangleNode(Vector2.new(startX + halfStep, startY + halfStep), Rectangle.new(startX, startY, startX + this.stepSize, startY + this.stepSize));
        let checker = PointWalkableChecker.getInstance();

        this.setGridElementByCoordinate(startX, startY, node);
        this.addNode(node);

        let xExpandCandidates: Vector2[] = [];
        let yExpandCandidates: Vector2[] = [];
        let horizontalIterateSize = 0;
        let verticalIterateSize = 0;
        let hitTop = false;
        let hitRight = false;
        let iterations = 64;
        let extras = 2 + ((startX % (this.stepSize * 3)) / this.stepSize); //0, 64, 128
        let operations = 0;

        //Main loop.
        while ((!hitTop || !hitRight) && iterations > 0 && extras > 0) {
            let checkX = startX + horizontalIterateSize; // 0
            let checkY = startY + verticalIterateSize;   // 0

            if (!hitTop) { //Check top rectangle.
                let nextY = checkY + this.stepSize;
                for (let x = startX; x <= checkX; x += this.stepSize) { // Start at startX, iterate all nodes to the right (only 0 now)
                    let checkNode = this.getGridElementByCoordinate(x, nextY); //Get node at all the X coordinates above the highest Y (64)
                    if ((checkNode != null && checkNode != node) //If the node is not empty, or else if this node is not this.
                        || !checker.checkTerrainIsWalkableXY(x + halfStep, nextY + halfStep) //Or if the terrain here is not walkable
                    ) {
                        hitTop = true; //Top has been hit, end it here.
                        break;
                    } else { //If this place can be added to this node
                        Quick.Push(xExpandCandidates, Vector2.new(x, nextY)); //Add to frontier
                    }
                    operations++;
                    if (maxOps > 0 && operations % maxOps == 0) coroutine.yield();
                }
                for (let candice of xExpandCandidates) {
                    if (!hitTop) this.setGridElementByCoordinate(candice.x, candice.y, node);
                    candice.recycle();
                    operations++;
                    if (maxOps > 0 && operations % maxOps == 0) coroutine.yield();
                }
                Quick.Clear(xExpandCandidates);
            }
            if (!hitTop) {
                verticalIterateSize += this.stepSize;
                node.boundary.yMax += this.stepSize;
                node.point.y += halfStep;
            }

            checkX = startX + horizontalIterateSize; // 0
            checkY = startY + verticalIterateSize;   // 0 or 64
            if (!hitRight) { //Check right rectangle
                let nextX = checkX + this.stepSize;
                for (let y = startY; y <= checkY; y += this.stepSize) { //Start at StartY, iterate all nodes vertically, (Either 0 or also 64)
                    let checkNode = this.getGridElementByCoordinate(nextX, y); //Get node at all the Y coordinates, one step to the right of highest X (0, 64)
                    if ((checkNode != null && checkNode != node) //If the node is not empty, or else if this node is not this.
                        || !checker.checkTerrainIsWalkableXY(nextX + halfStep, y + halfStep) //Or if the terrain here is not walkable
                    ) {
                        hitRight = true; //Top has been hit, end it here.
                        break;
                    } else { //If this place can be added to this node
                        Quick.Push(yExpandCandidates, Vector2.new(nextX, y)); //Add to frontier
                    }
                    operations++;
                    if (maxOps > 0 && operations % maxOps == 0) coroutine.yield();
                }
            }
            for (let candice of yExpandCandidates) {
                if (!hitRight) this.setGridElementByCoordinate(candice.x, candice.y, node);
                candice.recycle();
                operations++;
                if (maxOps > 0 && operations % maxOps == 0) coroutine.yield();
            }
            Quick.Clear(yExpandCandidates);
            if (!hitRight) {
                horizontalIterateSize += this.stepSize;
                node.boundary.xMax += this.stepSize;
                node.point.x += halfStep;
            }
            if (hitTop != hitRight) {
                extras--;
            } else {
                extras++;
                if (iterations <= 60) extras = 64;
            }
            iterations--;
        }

        this.addConnectionsRect(node, //Bottom
            startX,
            startX + horizontalIterateSize,
            startY - this.stepSize,
            startY - this.stepSize
        );
        this.addConnectionsRect(node, //Top
            startX,
            startX + horizontalIterateSize,
            startY + verticalIterateSize + this.stepSize,
            startY + verticalIterateSize + this.stepSize
        );
        this.addConnectionsRect(node, //Left
            startX - this.stepSize,
            startX - this.stepSize,
            startY,
            startY + verticalIterateSize,
        );
        this.addConnectionsRect(node, //Right
            startX + horizontalIterateSize + this.stepSize,
            startX + horizontalIterateSize + this.stepSize,
            startY,
            startY + verticalIterateSize,
        );
        return node;
    }

    private addConnectionsRect(node: RectangleNode, x1: number, x2: number, y1: number, y2: number) {
        let minX = math.min(x1, x2);
        let maxX = math.max(x1, x2);

        let minY = math.min(y1, y2);
        let maxY = math.max(y1, y2);

        for (let x = minX; x <= maxX; x += this.stepSize) {
            for (let y = minY; y <= maxY; y += this.stepSize) {
                node.addNeighborTwoWay(this.getGridElementByCoordinate(x, y));
            }
        }
    }

}