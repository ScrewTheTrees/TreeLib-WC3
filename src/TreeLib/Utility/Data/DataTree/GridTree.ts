import {Vector2} from "../Vector2";
import {Quick} from "../../../Quick";
import {Circle} from "../Circle";
import {DataTreeFilter} from "./DataTreeFilter";
import {DataTreePositionEvaluation} from "./DataTreePositionEvaluation";

export class GridTree<T> {
    private gridNegative: number;
    private grid: T[][][] = [];
    private readonly gridSize: number;
    public positionEvaluation: DataTreePositionEvaluation<T>;

    /**
     *
     * @param positionEvaluation  You probably dont want this to be closure, keep it fully isolated for performance reasons.
     * @param gridNegative Mostly intended for negative coordinates, this is to allow more performance by using 1..n index tables.
     * @param gridSize Size of grid squares.
     */
    constructor(positionEvaluation: DataTreePositionEvaluation<T>, gridNegative: number = 32_768, gridSize: number = 64) {
        this.positionEvaluation = positionEvaluation;
        this.gridNegative = gridNegative;
        this.gridSize = gridSize;
    }

    public getAtIndex(x: number, y: number) {
        if (this.grid[x] == null) {
            this.grid[x] = [];
        }
        if (this.grid[x][y] == null) {
            this.grid[x][y] = [];
        }
        return this.grid[x][y];
    }

    public getAtCoordinate(x: number, y: number) {
        x += this.gridNegative;
        y += this.gridNegative;
        x = math.floor(x / this.gridSize);
        y = math.floor(y / this.gridSize);
        return this.getAtIndex(x, y)
    }
    public removeAtCoordinate(x: number, y: number, value: T) {
        let chunk = this.getAtCoordinate(x, y);
        Quick.Remove(chunk, value);
    }
    public addToCoordinate(x: number, y: number, value: T) {
        let chunk = this.getAtCoordinate(x, y);
        Quick.PushIfMissing(chunk, value);
    }
    public moveFromCoordinateToCoordinate(startX: number, startY: number, endX: number, endY: number, value: T) {
        let startChunk = this.getAtCoordinate(startX, startY);
        let endChunk = this.getAtCoordinate(endX, endY);
        if (startChunk == endChunk) return;
        Quick.Remove(startChunk, value);
        Quick.PushIfMissing(endChunk, value);
    }
    public fetchInCircle(circle: Circle, filter?: DataTreeFilter<T>, checkArr?: []) {
        return this.fetchInCircleR(circle.center, circle.radius, filter, checkArr);
    }
    public fetchInCircleR(center: Vector2, radius: number, filter?: DataTreeFilter<T>, checkArr?: T[]) {
        checkArr = checkArr || [];
        let xs = math.floor((center.x + this.gridNegative) / this.gridSize);
        let ys = math.floor((center.y + this.gridNegative) / this.gridSize);
        let maxDist = math.ceil(radius / this.gridSize);
        let finalRound = false;

        this.IfFilterDoPush(this.getAtIndex(xs, ys), checkArr, filter);

        for (let d = 1; d <= maxDist; d++) {
            for (let i = 0; i < d + 1; i++) {
                let x1 = xs - d + i;
                let y1 = ys - i;
                this.IfFilterDoPush(this.getAtIndex(x1, y1), checkArr, filter);

                let x2 = xs + d - i;
                let y2 = ys + i;
                this.IfFilterDoPush(this.getAtIndex(x2, y2), checkArr, filter);
            }
            for (let i = 1; i < d; i++) {
                let x1 = xs - i;
                let y1 = ys + d - i;
                this.IfFilterDoPush(this.getAtIndex(x1, y1), checkArr, filter);

                let x2 = xs + i;
                let y2 = ys - d + i;
                this.IfFilterDoPush(this.getAtIndex(x2, y2), checkArr, filter);
            }
            if (checkArr.length > 0) {
                if (finalRound) break;
                else finalRound = true;
            }
        }
        for (let i = checkArr.length - 1; i >= 0; i--) {
            let value = checkArr[i];
            if (this.positionEvaluation.evaluate(value).distanceTo(center) > radius) {
                Quick.Slice(checkArr, i);
            }
        }
        return checkArr;
    }
    public fetchClosest(center: Vector2, maxDist: number, filter?: DataTreeFilter<T>) {
        maxDist = math.ceil(maxDist / this.gridSize);

        let checkArr = this.checkArr;
        let target = undefined;
        let targetDist = math.maxinteger;
        let xs = math.floor((center.x + this.gridNegative) / this.gridSize);
        let ys = math.floor((center.y + this.gridNegative) / this.gridSize);
        let finalRound = false;

        this.IfFilterDoPush(this.getAtIndex(xs, ys), checkArr, filter);

        for (let d = 1; d <= maxDist; d++) {
            for (let i = 0; i < d + 1; i++) {
                let x1 = xs - d + i;
                let y1 = ys - i;
                this.IfFilterDoPush(this.getAtIndex(x1, y1), checkArr, filter);

                let x2 = xs + d - i;
                let y2 = ys + i;
                this.IfFilterDoPush(this.getAtIndex(x2, y2), checkArr, filter);
            }
            for (let i = 1; i < d; i++) {
                let x1 = xs - i;
                let y1 = ys + d - i;
                this.IfFilterDoPush(this.getAtIndex(x1, y1), checkArr, filter);

                let x2 = xs + i;
                let y2 = ys - d + i;
                this.IfFilterDoPush(this.getAtIndex(x2, y2), checkArr, filter);
            }
            if (checkArr.length > 0) {
                if (finalRound) break;
                else finalRound = true;
            }
        }
        for (let value of checkArr) {
            let pos = this.positionEvaluation.evaluate(value);
            let dist = pos.distanceTo(center);
            if (dist <= targetDist) {
                target = value;
                targetDist = dist;
            }
        }
        return target;
    }

    public IfFilterDoPush(sourceArr: T[], targetArr: T[], filter?: DataTreeFilter<T>) {
        for (let e of sourceArr) {
            if (!filter || filter.evaluate(e)) {
                Quick.Push(targetArr, e);
            }
        }
        return targetArr;
    }


    private _checkArr: T[] = [];
    get checkArr(): T[] {
        Quick.Clear(this._checkArr);
        return this._checkArr;
    }
}