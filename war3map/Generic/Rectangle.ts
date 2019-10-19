import {Delay} from "./Delay";

/**
 * My wrapper for Rects
 */
export class Rectangle {
    public x: number;
    public y: number;
    public x2: number;
    public y2: number;

    constructor(x: number, y: number, x2: number, y2: number) {
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
    }

    public toRectClean() {
        let rect = Rect(this.x, this.y, this.x2, this.y2);
        Delay.getInstance().addDelay(() => {
            RemoveRect(rect);
        }, 0.1);
        return rect;
    }

    public toRect() {
        return Rect(this.x, this.y, this.x2, this.y2);
    }

    public static fromRect(input: rect) {
        return new Rectangle(GetRectMinX(input), GetRectMinY(input), GetRectMaxX(input), GetRectMaxY(input));
    }

    public static fromRectClean(input: rect) {
        let retVar = new Rectangle(GetRectMinX(input), GetRectMinY(input), GetRectMaxX(input), GetRectMaxY(input));
        RemoveRect(input);
        return retVar;
    }
}