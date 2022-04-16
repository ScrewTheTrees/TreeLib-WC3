import {Quick} from "../../Quick";
import {IRecyclable} from "./IRecyclable";
import {Vector3} from "./Vector3";
import {Rectangle} from "./Rectangle";
import {Vector2} from "./Vector2";

export class Cube implements IRecyclable {
    public xMin!: number;
    public yMin!: number;
    public zMin!: number;
    public xMax!: number;
    public yMax!: number;
    public zMax!: number;

    protected constructor(x: number, y: number, z: number, x2: number, y2: number, z2: number) {
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

    //Intersects
    public intersectsVector2(other: Vector2): boolean {
        return other.x >= this.xMin
            && other.x <= this.xMax
            && other.y >= this.yMin
            && other.y <= this.yMax;
    }
    public intersectsVector3(other: Vector3): boolean {
        return other.x >= this.xMin
            && other.x <= this.xMax
            && other.y >= this.yMin
            && other.y <= this.yMax
            && other.z >= this.zMin
            && other.z <= this.zMax;
    }
    public intersectRectangle(other: Rectangle) {
        return this.xMax >= other.xMin
            && this.xMin <= other.xMax
            && this.yMax >= other.yMin
            && this.yMin <= other.yMax;
    }
    public intersectsCube(other: Cube) {
        return this.xMax >= other.xMin
            && this.xMin <= other.xMax
            && this.yMax >= other.yMin
            && this.yMin <= other.yMax
            && this.zMax >= other.zMin
            && this.zMin <= other.zMax;
    }


    //Basic math
    public addVector3(v: Vector3) {
        this.xMin += v.x;
        this.xMax += v.x;
        this.yMin += v.y;
        this.yMax += v.y;
        this.zMin += v.z;
        this.zMax += v.z;
        return this;
    }
    public subVector3(v: Vector3) {
        this.xMin -= v.x;
        this.xMax -= v.x;
        this.yMin -= v.y;
        this.yMax -= v.y;
        this.zMin -= v.z;
        this.zMax -= v.z;
        return this;
    }
    public mulVector3(v: Vector3) {
        this.xMin *= v.x;
        this.xMax *= v.x;
        this.yMin *= v.y;
        this.yMax *= v.y;
        this.zMin *= v.z;
        this.zMax *= v.z;
        return this;
    }
    public divVector3(v: Vector3) {
        this.xMin /= v.x;
        this.xMax /= v.x;
        this.yMin /= v.y;
        this.yMax /= v.y;
        this.zMin /= v.z;
        this.zMax /= v.z;
        return this;
    }
}