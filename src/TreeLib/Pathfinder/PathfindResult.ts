import {Point} from "../Utility/Point";

export class PathfindResult {
    public path: Point[];
    public reachedTheEnd: boolean;
    constructor(points: Point[], reachedTheEnd: boolean) {
        this.path = points;
        this.reachedTheEnd = reachedTheEnd;
    }
}