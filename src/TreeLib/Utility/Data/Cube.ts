import {Quick} from "../../Quick";
import {Recyclable} from "./Recyclable";
import {Vector3} from "./Vector3";

export class Cube implements Recyclable {
    public xMin!: number;
    public yMin!: number;
    public zMin!: number;
    public xMax!: number;
    public yMax!: number;
    public zMax!: number;

    private constructor(x: number, y: number, z: number, x2: number, y2: number, z2: number) {
        this.updateTo(x, y, z, x2, y2, z2);
    }

    private static stash: Cube[] = [];

    public static new(x: number, y: number, z: number, x2: number, y2: number, z2: number): Cube {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(x, y, z, x2, y2, z2);
        else return new Cube(x, y, z, x2, y2, z2)
    }

    public static recycle(p: Cube) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }

    public recycle() {
        Cube.recycle(this);
        return this;
    }

    public updateTo(x: number, y: number, z: number, x2: number, y2: number, z2: number) {
        this.xMin = math.min(x, x2);
        this.yMin = math.min(y, y2);
        this.zMin = math.min(z, z2);
        this.xMax = math.max(x, x2);
        this.yMax = math.max(y, y2);
        this.zMax = math.max(z, z2);
        return this;
    }

    public static fromVectors(v1: Vector3, v2: Vector3): Cube {
        return this.new(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    }

}