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

    public isEmpty() {
        return this.x == 0 && this.y == 0 && this.z == 0;
    }

    public getYaw() {
        return Math.atan2(this.x, this.y);
    }

    public getPitch() {
        return Math.atan2(math.sqrt(this.z * this.z + this.x * this.x), this.y) + Math.PI;
    }
}