import {Vector2} from "../Utility/Data/Vector2";
import {Quick} from "../Quick";
import {Node} from "./Node";

export class PathfindResult {
    public path: Vector2[];
    public reachedTheEnd: boolean;
    private optimisedPath: Vector2[] | undefined;
    public startNode: Node;
    public endNode: Node;
    public finalNode: Node;

    constructor(points: Vector2[], reachedTheEnd: boolean, startNode: Node, endNode: Node, finalNode: Node) {
        this.path = points;
        this.reachedTheEnd = reachedTheEnd;
        this.startNode = startNode;
        this.endNode = endNode;
        this.finalNode = finalNode;
    }

    /**
     * Removes redundant nodes to make path less complex
     */
    getPathOptimised(): Vector2[] {
        let path = this.optimisedPath;
        if (path == undefined) {
            path = [];
            for (let i = 1; i < this.path.length - 1; i++) {
                let node = this.path[i];
                let previous = this.path[i - 1];
                let next = this.path[i + 1];

                if (Math.round(next.directionTo(node) * 100) != Math.round(node.directionTo(previous) * 100)) {//0.01 is good enough for comparison in this context.
                    Quick.Push(path, node);
                }
            }
            path.push(this.path[this.path.length - 1]);
        }

        return path;
    }

    copy() {
        let newPath: Vector2[] = [];
        for (let i = 0; i < this.path.length; i++) {
            let value = this.path[i];
            newPath.push(value.copy());
        }

        return new PathfindResult(newPath, this.reachedTheEnd, this.startNode, this.endNode, this.finalNode);
    }
}