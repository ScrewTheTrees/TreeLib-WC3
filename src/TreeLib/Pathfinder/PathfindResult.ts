import {Point} from "../Utility/Point";

export class PathfindResult {
    public path: Point[];
    public reachedTheEnd: boolean;
    private optimisedPath: Point[] | undefined;

    constructor(points: Point[], reachedTheEnd: boolean) {
        this.path = points;
        this.reachedTheEnd = reachedTheEnd;
    }

    /**
     * Removes redundant nodes.
     */
    getPathOptimised(): Point[] {
        let path = this.optimisedPath;
        if (path == undefined) {
            path = [];
            for (let i = 1; i < this.path.length - 1 ; i++) {
                let node = this.path[i];
                let previous = this.path[i - 1];
                let next = this.path[i + 1];

                if (next.directionTo(node) != node.directionTo(previous)) {
                    path.push(node);
                }
            }
            path.push(this.path[this.path.length - 1]);
        }

        return path;
    }
}