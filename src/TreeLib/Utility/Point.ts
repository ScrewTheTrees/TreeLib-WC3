/**
 * My wrapper for Locations, contains some useful helper functions and wrappers from other functions.
 * In particular it provides functions that automatically cleans up the locations automatically.
 */
import {Delay} from "./Delay";

export class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public distanceTo(target: Point): number {
        return math.sqrt(((this.x - target.x) * (this.x - target.x)) + ((this.y - target.y) * (this.y - target.y)));
    }

    public distanceToSquared(target: Point): number {
        return ((this.x - target.x) * (this.x - target.x)) + ((this.y - target.y) * (this.y - target.y));
    }

    public directionTo(target: Point) {
        let radians = math.atan(target.y - this.y, target.x - this.x);
        return (radians * 180 / Math.PI);
    }

    public getOffsetTo(target: Point): Point {
        let x = target.x - this.x;
        let y = target.y - this.y;
        return new Point(x, y);
    }

    public addOffset(offset: Point): Point {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    }

    public getBetween(offset: Point): Point {
        return new Point((this.x + offset.x) / 2, (this.y + offset.y) / 2);
    }

    public updateToLocation(inputLoc: location) {
        this.x = GetLocationX(inputLoc);
        this.y = GetLocationY(inputLoc);
    }

    public updateToLocationClean(inputLoc: location) {
        this.x = GetLocationX(inputLoc);
        this.y = GetLocationY(inputLoc);
        RemoveLocation(inputLoc);
    }

    public polarProject(distance: number, angle: number): Point {
        let x = this.x + distance * math.cos(angle * bj_DEGTORAD);
        let y = this.y + distance * math.sin(angle * bj_DEGTORAD);
        return new Point(x, y);
    }

    public toLocation() {
        return Location(this.x, this.y);
    }

    /**
     * A very temporary self cleaning location.
     */
    public toLocationClean() {
        let loc = Location(this.x, this.y);
        Delay.getInstance().addDelay(() => {
            RemoveLocation(loc);
        }, 0.1);
        return loc;
    }

    public isAlignedWith(point: Point): boolean {
        return (this.x == point.x || this.y == point.y);
    }

    public static getCenterOfPoints(arr: Point[]) {
        let sumX = 0;
        let sumY = 0;
        for (let i = 0; i < arr.length; i++) {
             sumX += arr[i].x;
             sumY += arr[i].y;
        }
        sumX = sumX / arr.length;
        sumY = sumY / arr.length;
        return new Point(sumX, sumY);
    }

    public static fromLocation(inputLoc: location) {
        return new Point(GetLocationX(inputLoc), GetLocationY(inputLoc));
    }

    public static fromLocationClean(inputLoc: location) {
        let point = new Point(GetLocationX(inputLoc), GetLocationY(inputLoc));
        RemoveLocation(inputLoc);
        return point;
    }

    public static fromWidget(inputU: widget) {
        return new Point(GetWidgetX(inputU), GetWidgetY(inputU));
    }

    public static fromRectCenter(input: rect) {
        return new Point(GetRectCenterX(input), GetRectCenterY(input));
    }

    public static copy(input: Point): Point {
        return new Point(input.x, input.y);
    }

    public copy(): Point {
        return Point.copy(this);
    }

    distanceToLine(lineStart: Point, lineEnd: Point) {
        let A = this.x - lineStart.x;
        let B = this.y - lineStart.y;
        let C = lineEnd.x - lineStart.x;
        let D = lineEnd.y - lineStart.y;

        let dot = A * C + B * D;
        let len_sq = C * C + D * D;
        let param = -1;
        if (len_sq != 0) //in case of 0 length line
            param = dot / len_sq;

        let xx, yy;

        if (param < 0) {
            xx = lineStart.x;
            yy = lineStart.y;
        } else if (param > 1) {
            xx = lineEnd.x;
            yy = lineEnd.y;
        } else {
            xx = lineStart.x + param * C;
            yy = lineStart.y + param * D;
        }

        let dx = this.x - xx;
        let dy = this.y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }


    public toString(): string {
        return "point {x:" + this.x + ", y:" + this.y + " }";
    }

    public equals(point: Point) {
        return point.x == this.x && point.y == this.y;
    }
}