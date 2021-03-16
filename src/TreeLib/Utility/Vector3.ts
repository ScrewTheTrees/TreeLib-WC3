export class Vector3 {
    public x: number;
    public y: number;
    public z: number;

    public constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
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