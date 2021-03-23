import {Vector2} from "./Vector2";
import {Quick} from "../../Quick";

export class Line {
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;

    private static stash: Line[] = [];

    public static new(x: number, y: number, x2: number, y2: number): Line {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(x, y, x2, y2);
        else return new Line(x, y, x2, y2)
    }

    public static recycle(p: Line) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }

    public recycle() {
        Line.recycle(this);
        return this;
    }

    private constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    public updateTo(x: number, y: number, x2: number, y2: number) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x2;
        this.y2 = y2;
        return this;
    }


    distanceToSquared(point: Vector2) {
        let A = point.x - this.x1;
        let B = point.y - this.y1;
        let C = this.x2 - this.x1;
        let D = this.y2 - this.y1;

        let dot = A * C + B * D;
        let len_sq = C * C + D * D;
        let param = -1;
        if (len_sq != 0) //in case of 0 length line
            param = dot / len_sq;

        let xx, yy;

        if (param < 0) {
            xx = this.x1;
            yy = this.y1;
        } else if (param > 1) {
            xx = this.x2;
            yy = this.y2;
        } else {
            xx = this.x1 + param * C;
            yy = this.y1 + param * D;
        }

        let dx = point.x - xx;
        let dy = point.y - yy;
        return dx * dx + dy * dy;
    }

    distanceTo(point: Vector2) {
        return math.sqrt(this.distanceToSquared(point));
    }


    public toString(): string {
        return `line {x1: ${this.x1}, y1: ${this.y1}, x2: ${this.x2}, y2: ${this.y2} }`;
    }

    public equals(line: Line) {
        return line.x1 == this.x1 && line.y1 == this.y1
            && line.x2 == this.x2 && line.y2 == this.y2;
    }
}