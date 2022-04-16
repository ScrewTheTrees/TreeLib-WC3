/**
 * My wrapper for Locations, contains some useful helper functions and wrappers from other functions.
 * In particular it provides functions that automatically cleans up the locations automatically.
 */
import {Delay} from "../../Services/Delay/Delay";
import {Quick} from "../../Quick";
import {IRecyclable} from "./IRecyclable";
import {Rectangle} from "./Rectangle";
import {Cube} from "./Cube";
import {Vector3} from "./Vector3";

export class Vector2 implements IRecyclable {
    public x: number;
    public y: number;

    private constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    private static stash: Vector2[] = [];
    public static new(x: number, y: number): Vector2 {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(x, y);
        else return new Vector2(x, y)
    }
    public static recycle(p: Vector2) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        Vector2.recycle(this);
        return this;
    }
    public updateTo(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }
    //Intersects
    public intersectsVector2(other: Vector2): boolean {
        return this.x == other.x
            && this.y == other.y;
    }
    public intersectsVector3(other: Vector3): boolean {
        return this.x == other.x
            && this.y == other.y;
    }
    public intersectsRectangle(other: Rectangle) {
        return this.x >= other.xMin
            && this.x <= other.xMax
            && this.y >= other.yMin
            && this.y <= other.yMax;
    }
    public intersectsCube(other: Cube) {
        return this.x >= other.xMin
            && this.x <= other.xMax
            && this.y >= other.yMin
            && this.y <= other.yMax;
    }


    //Extensive API
    public distanceTo(target: Vector2): number {
        const xx = (this.x - target.x) * (this.x - target.x);
        const yy = (this.y - target.y) * (this.y - target.y);
        return math.sqrt((xx + yy));
    }

    public distanceToXY(targetX: number, targetY: number): number {
        const xx = (this.x - targetX) * (this.x - targetX);
        const yy = (this.y - targetY) * (this.y - targetY);
        return math.sqrt((xx + yy));
    }

    public distanceToSquared(target: Vector2): number {
        const xx = (this.x - target.x) * (this.x - target.x);
        const yy = (this.y - target.y) * (this.y - target.y);
        return (xx + yy);
    }

    public distanceToSquaredXY(targetX: number, targetY: number): number {
        const xx = (this.x - targetX) * (this.x - targetX);
        const yy = (this.y - targetY) * (this.y - targetY);
        return (xx + yy);
    }

    public directionTo(target: Vector2) {
        let radians = math.atan(target.y - this.y, target.x - this.x);
        return (radians * 180 / Math.PI);
    }
    public directionFrom(target: Vector2) {
        return target.directionTo(this);
    }
    public directionToXY(x: number, y: number) {
        let radians = math.atan(y - this.y, x - this.x);
        return (radians * 180 / Math.PI);
    }
    public directionFromXY(x: number, y: number) {
        let radians = math.atan(this.y - y, this.x - x);
        return (radians * 180 / Math.PI);
    }

    public offsetTo(target: Vector2): Vector2 {
        this.x = target.x - this.x;
        this.y = target.y - this.y;
        return this;
    }
    public createOffsetTo(target: Vector2): Vector2 {
        let x = target.x - this.x;
        let y = target.y - this.y;
        return Vector2.new(x, y);
    }

    public addOffset(offset: Vector2): Vector2 {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    }
    public addOffsetNum(offset: number): Vector2 {
        this.x += offset;
        this.y += offset;
        return this;
    }
    public subtractOffset(offset: Vector2): Vector2 {
        this.x -= offset.x;
        this.y -= offset.y;
        return this;
    }
    public subtractOffsetNum(offset: number): Vector2 {
        this.x -= offset;
        this.y -= offset;
        return this;
    }
    public divideOffset(offset: Vector2): Vector2 {
        this.x /= offset.x;
        this.y /= offset.y;
        return this;
    }
    public divideOffsetNum(offset: number): Vector2 {
        this.x /= offset;
        this.y /= offset;
        return this;
    }
    public multiplyOffset(offset: Vector2): Vector2 {
        this.x *= offset.x;
        this.y *= offset.y;
        return this;
    }
    public multiplyOffsetNum(offset: number): Vector2 {
        this.x *= offset;
        this.y *= offset;
        return this;
    }
    private static _loc: location;
    private static get loc() {
        if (Vector2._loc == null) {
            Vector2._loc = Location(0, 0);
        }
        return Vector2._loc;
    }
    public getZ() {
        MoveLocation(Vector2.loc, this.x, this.y);
        return GetLocationZ(Vector2.loc);
    }

    public getBetween(offset: Vector2): Vector2 {
        return Vector2.new((this.x + offset.x) / 2, (this.y + offset.y) / 2);
    }

    public getAngle() {
        let radians = math.atan(this.y, this.x);
        return (radians * 180);
    }
    public getAngleDegrees() {
        return (this.getAngle() / Math.PI);
    }

    public updateToLocation(inputLoc: location) {
        this.x = GetLocationX(inputLoc);
        this.y = GetLocationY(inputLoc);
        return this;
    }

    public updateToLocationClean(inputLoc: location) {
        this.x = GetLocationX(inputLoc);
        this.y = GetLocationY(inputLoc);
        RemoveLocation(inputLoc);
        return this;
    }

    public updateToWidget(inputU: widget) {
        this.x = GetWidgetX(inputU);
        this.y = GetWidgetY(inputU);
        return this;
    }

    public updateToPoint(p: Vector2) {
        this.x = p.x;
        this.y = p.y;
        return this;
    }
    public alignToGrid(gridSize: number) {
        this.x = Math.round(this.x / gridSize) * gridSize;
        this.y = Math.round(this.y / gridSize) * gridSize;
        return this;
    }
    public polarProject(distance: number, angle: number): Vector2 {
        this.x = this.x + distance * math.cos(angle * bj_DEGTORAD);
        this.y = this.y + distance * math.sin(angle * bj_DEGTORAD);
        return this;
    }
    public polarProjectTowards(distance: number, vec: Vector2): Vector2 {
        let angle = this.directionTo(vec);
        return this.polarProject(distance, angle);
    }

    public toLocation() {
        return Location(this.x, this.y);
    }

    /**
     * A very temporary self cleaning location.
     */
    public toLocationClean() {
        let loc = Location(this.x, this.y);
        Delay.addDelay(() => {
            RemoveLocation(loc);
        }, 0.1);
        return loc;
    }

    public isAlignedWith(point: Vector2): boolean {
        return (this.x == point.x || this.y == point.y);
    }

    public static getCenterOfPoints(arr: Vector2[]) {
        let sumX = 0;
        let sumY = 0;
        for (let i = 0; i < arr.length; i++) {
            sumX += arr[i].x;
            sumY += arr[i].y;
        }
        sumX = sumX / arr.length;
        sumY = sumY / arr.length;
        return Vector2.new(sumX, sumY);
    }
    public static getClosestOfPoints(to: Vector2, arr: Vector2[]) {
        let check = arr[0];
        let dist = math.maxinteger;
        for (let vec of arr) {
            let d = vec.distanceToSquared(to);
            if (d <= dist) {
                dist = d;
                check = vec;
            }
        }
        return check;
    }
    public static getFurthestOfPoints(to: Vector2, arr: Vector2[]) {
        let check = arr[0];
        let dist = -1;
        for (let vec of arr) {
            let d = vec.distanceToSquared(to);
            if (d >= dist) {
                dist = d;
                check = vec;
            }
        }
        return check;
    }

    public static fromLocation(inputLoc: location) {
        return Vector2.new(GetLocationX(inputLoc), GetLocationY(inputLoc));
    }

    public static fromLocationClean(inputLoc: location) {
        let point = Vector2.new(GetLocationX(inputLoc), GetLocationY(inputLoc));
        RemoveLocation(inputLoc);
        return point;
    }

    public static fromWidget(inputU: widget) {
        return Vector2.new(GetWidgetX(inputU), GetWidgetY(inputU));
    }

    public static fromRectCenter(input: rect) {
        return Vector2.new(GetRectCenterX(input), GetRectCenterY(input));
    }

    public static randomPointInRect(input: rect) {
        return Vector2.new(math.random(GetRectMinX(input) + 32, GetRectMaxX(input) - 32),
            math.random(GetRectMinY(input) + 32, GetRectMaxY(input) - 32)
        );
    }

    public static copy(input: Vector2): Vector2 {
        return Vector2.new(input.x, input.y);
    }

    public copy(): Vector2 {
        return Vector2.copy(this);
    }

    distanceToLineSquared(lineStart: Vector2, lineEnd: Vector2) {
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
        return dx * dx + dy * dy;
    }
    distanceToLine(lineStart: Vector2, lineEnd: Vector2) {
        return math.sqrt(this.distanceToLineSquared(lineStart, lineEnd));
    }


    public toString(): string {
        return "point {x:" + this.x + ", y:" + this.y + " }";
    }

    public equals(point: Vector2) {
        return point.x == this.x && point.y == this.y;
    }
}