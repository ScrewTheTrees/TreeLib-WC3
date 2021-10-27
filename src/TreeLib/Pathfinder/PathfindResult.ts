import {Node} from "./Node";

export class PathfindResult<T extends Node = Node> {
    public path: T[];
    public reachedTheEnd: boolean;
    public startNode: Node;
    public endNode: Node;
    public finalNode: Node;
    public optimisedPath: boolean = false;
    public finishedGenerating: boolean = false;

    constructor(points: T[], reachedTheEnd: boolean, startNode: Node, endNode: Node, finalNode: Node) {
        this.path = points;
        this.reachedTheEnd = reachedTheEnd;
        this.startNode = startNode;
        this.endNode = endNode;
        this.finalNode = finalNode;
    }

    public finalise() {
        this.finishedGenerating = true;
        return this;
    }

    public getNode(index: number) {
        return this.path[index];
    }

    /**
     * Removes redundant nodes to make path less complex, this might not be the best idea if you need precision.
     * (Need a lot of fixing).
     */
    /*optimisePath(recycle: boolean = false): Vector2[] {
        if (!this.optimisedPath) {
            for (let i = this.path.length - 2; i > 0; i--) {
                let node = this.path[i];
                let previous = this.path[i - 1];
                let next = this.path[i + 1];

                if (Math.round(previous.directionTo(node) * 10) == Math.round(node.directionTo(next) * 10)) {//0.1 is good enough for comparison in this context.
                    Quick.Slice(this.path, i);
                    if (recycle) node.recycle();
                }
            }
            this.optimisedPath = true;
        }
        return this.path;
    }*/

    copy(): PathfindResult<T> {
        let newPath: T[] = [];
        for (let i = 0; i < this.path.length; i++) {
            let value = this.path[i];
            newPath.push(value);
        }

        return new PathfindResult<T>(newPath, this.reachedTheEnd, this.startNode, this.endNode, this.finalNode);
    }
}