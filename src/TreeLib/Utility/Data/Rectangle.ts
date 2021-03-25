import {Quick} from "../../Quick";
import {Recyclable} from "./Recyclable";
import {Vector2} from "./Vector2";
import {Cube} from "./Cube";
import {Vector3} from "./Vector3";

export class Rectangle implements Recyclable {
    public xMin!: number;
    public yMin!: number;
    public xMax!: number;
    public yMax!: number;

    protected constructor(x: number, y: number, x2: number, y2: number) {
        this.updateTo(x, y, x2, y2);
    }

    private static stash: Rectangle[] = [];
    public static new(x: number, y: number, x2: number, y2: number): Rectangle {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(x, y, x2, y2);
        else return new Rectangle(x, y, x2, y2)
    }
    public static recycle(p: Rectangle) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        Rectangle.recycle(this);
        return this;
    }
    public updateTo(x: number, y: number, x2: number, y2: number) {
        this.xMin = math.min(x, x2);
        this.yMin = math.min(y, y2);
        this.xMax = math.max(x, x2);
        this.yMax = math.max(y, y2);
        return this;
    }
    public static fromVectors(v1: Vector2, v2: Vector2): Rectangle {
        return this.new(v1.x, v1.y, v2.x, v2.y);
    }

    //Intersects
    public intersectsVector2(other: Vector2): boolean {
        return other.x > this.xMin
            && other.x < this.xMax
            && other.y > this.yMin
            && other.y < this.yMax;
    }
    public intersectsVector3(other: Vector3): boolean {
        return other.x > this.xMin
            && other.x < this.xMax
            && other.y > this.yMin
            && other.y < this.yMax;
    }
    public intersectRectangle(second: Rectangle) {
        return this.xMax > second.xMin
            && this.xMin < second.xMax
            && this.yMax > second.yMin
            && this.yMin < second.yMax;
    }
    public intersectCube(second: Cube) {
        return this.xMax > second.xMin
            && this.xMin < second.xMax
            && this.yMax > second.yMin
            && this.yMin < second.yMax;
    }

    //WC3 API
    public toRect() {
        return Rect(this.xMin, this.yMin, this.xMax, this.yMax);
    }

    public static fromRect(input: rect) {
        return Rectangle.new(GetRectMinX(input), GetRectMinY(input), GetRectMaxX(input), GetRectMaxY(input));
    }

    public static fromRectClean(input: rect) {
        let retVar = Rectangle.new(GetRectMinX(input), GetRectMinY(input), GetRectMaxX(input), GetRectMaxY(input));
        RemoveRect(input);
        return retVar;
    }
}