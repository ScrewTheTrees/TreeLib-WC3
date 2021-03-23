import {Quick} from "../../Quick";

export class Vector3 {
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
}