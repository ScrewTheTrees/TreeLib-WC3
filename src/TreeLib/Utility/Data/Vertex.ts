/**
 * My wrapper for Locations, contains some useful helper functions and wrappers from other functions.
 * In particular it provides functions that automatically cleans up the locations automatically.
 */
import {Quick} from "../../Quick";
import {IRecyclable} from "./IRecyclable";
import {Vector3} from "./Vector3";

export class Vertex implements IRecyclable {
    public x1: number;
    public y1: number;
    public z1: number;
    public x2: number;
    public y2: number;
    public z2: number;
    public x3: number;
    public y3: number;
    public z3: number;

    private constructor(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, x3: number, y3: number, z3: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
        this.x3 = x3;
        this.y3 = y3;
        this.z3 = z3;
    }

    private static stash: Vertex[] = [];

    public static new(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, x3: number, y3: number, z3: number): Vertex {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(x1, y1, z1, x2, y2, z2, x3, y3, z3);
        else return new Vertex(x1, y1, z1, x2, y2, z2, x3, y3, z3)
    }

    public static recycle(p: Vertex) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }

    public recycle() {
        Vertex.recycle(this);
        return this;
    }

    public updateTo(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, x3: number, y3: number, z3: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
        this.x3 = x3;
        this.y3 = y3;
        this.z3 = z3;
        return this;
    }

    public static fromVectors(v1: Vector3, v2: Vector3, v3: Vector3): Vertex {
        return this.new(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z);
    }

    //TODO: Vertex collision :sob:   its very hard stuff k?
}