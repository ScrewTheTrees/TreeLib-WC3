import {Quick} from "../../Quick";
import {Recyclable} from "./Recyclable";
import {Vector2} from "./Vector2";
import {Cube} from "./Cube";
import {Rectangle} from "./Rectangle";

export class Vector3 implements Recyclable {
    public x: number;
    public y: number;
    public z: number;

    private constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    private static stash: Vector3[] = [];
    public static new(x: number, y: number, z: number): Vector3 {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(x, y, z);
        else return new Vector3(x, y, z)
    }
    public static recycle(p: Vector3) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        Vector3.recycle(this);
        return this;
    }
    public updateTo(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    //Intersects
    public intersectsVector2(other: Vector2): boolean {
        return this.x == other.x
            && this.y == other.y;
    }
    public intersectsVector3(other: Vector3): boolean {
        return this.x == other.x
            && this.y == other.y
            && this.z == other.z;
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
            && this.y <= other.yMax
            && this.z >= other.zMin
            && this.z <= other.zMax;
    }


    //Extensive API
    public distanceTo(target: Vector3) {
        return math.sqrt(this.distanceToSquaredXYZ(target.x, target.y, target.z));
    }

    public distanceToXYZ(targetX: number, targetY: number, targetZ: number) {
        return math.sqrt(this.distanceToSquaredXYZ(targetX, targetY, targetZ));
    }

    public distanceToSquared(target: Vector3) {
        return this.distanceToSquaredXYZ(target.x, target.y, target.z);
    }

    public distanceToSquaredXYZ(targetX: number, targetY: number, targetZ: number) {
        const xx = (this.x - targetX) * (this.x - targetX);
        const yy = (this.y - targetY) * (this.y - targetY);
        const zz = (this.z - targetZ) * (this.z - targetZ);
        return xx + yy + zz;
    }

    public getYaw() {
        return Math.atan2(this.x, this.y);
    }

    public getPitch() {
        return Math.atan2(math.sqrt(this.z * this.z + this.x * this.x), this.y) + Math.PI;
    }

    public isEmpty() {
        return this.x == 0 && this.y == 0 && this.z == 0;
    }

    //Basic math
    public addVector3(v: Vector3) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    public subVector3(v: Vector3) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    public mulVector3(v: Vector3) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }
    public divVector3(v: Vector3) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }
}