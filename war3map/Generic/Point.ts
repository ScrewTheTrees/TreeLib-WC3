export class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public distanceTo(target: Point): number {
        return (math.sqrt(this.x - target.x) + math.sqrt(this.y - target.y));
    }

    public directionTo(target: Point) {
        let radians = math.atan(target.y - this.y, target.x - this.x);
        return (radians * 180 / Math.PI);
    }

    public toLocation() {
        return Location(this.x, this.y);
    }

    public polarProject(distance: number, angle: number): Point {
        let x = this.x + distance * math.cos(angle * bj_DEGTORAD);
        let y = this.y + distance * math.sin(angle * bj_DEGTORAD);
        return new Point(x, y);
    }

    public static fromLocation(inputLoc: location) {
        return new Point(GetLocationX(inputLoc), GetLocationY(inputLoc));
    }

    public static fromLocationClean(inputLoc: location) {
        let point = new Point(GetLocationX(inputLoc), GetLocationY(inputLoc));
        RemoveLocation(inputLoc);
        return point;
    }

    distanceToLine(lineStart: Point, lineEnd: Point) {
        let A = this.x - lineStart.x;
        let B = this.y - lineStart.y;
        let C = lineEnd.x - lineStart.x;
        let D = lineEnd.y - lineStart.y;

        let dot = A * C + B * D;
        let len_sq = C * C + D * D;
        let param = -1;
        if (len_sq != 0) //in case of 0 length line
            param = dot / len_sq;

        let xx, yy;

        if (param < 0) {
            xx = lineStart.x;
            yy = lineStart.y;
        } else if (param > 1) {
            xx = lineEnd.x;
            yy = lineEnd.y;
        } else {
            xx = lineStart.x + param * C;
            yy = lineStart.y + param * D;
        }

        let dx = this.x - xx;
        let dy = this.y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }
}