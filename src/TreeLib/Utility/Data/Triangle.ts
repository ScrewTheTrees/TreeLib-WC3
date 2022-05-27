/**
 * My wrapper for Locations, contains some useful helper functions and wrappers from other functions.
 * In particular it provides functions that automatically cleans up the locations automatically.
 */
import {Quick} from "../../Quick";
import {IRecyclable} from "./IRecyclable";
import {Vector2} from "./Vector2";

export class Triangle implements IRecyclable {
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;
    public x3: number;
    public y3: number;

    private constructor(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }

    private static stash: Triangle[] = [];

    public static new(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): Triangle {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(x1, y1, x2, y2, x3, y3);
        else return new Triangle(x1, y1, x2, y2, x3, y3)
    }

    public static recycle(p: Triangle) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }

    public recycle() {
        Triangle.recycle(this);
        return this;
    }

    public updateTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        return this;
    }

    public static fromVectors(v1: Vector2, v2: Vector2, v3: Vector2): Triangle {
        return this.new(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
    }

    //TODO: Triangle intersection with triangles/lines/etc
}