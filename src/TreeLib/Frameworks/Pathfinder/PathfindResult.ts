import {Node} from "./Node";
import {Quick} from "../../Quick";

export class PathfindResult<T extends Node = Node> {
    public path: T[];
    public reachedTheEnd: boolean;
    public startNode: Node;
    public endNode: Node;
    public finalNode: Node;
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

    public destroy() {
        Quick.Clear(this.path);
        // @ts-ignore
        this.path = null;
        // @ts-ignore
        this.startNode = null;
        // @ts-ignore
        this.endNode = null;
        // @ts-ignore
        this.finalNode = null;
    }

    copy(): PathfindResult<T> {
        let newPath: T[] = [];
        for (let i = 0; i < this.path.length; i++) {
            let value = this.path[i];
            newPath.push(value);
        }

        return new PathfindResult<T>(newPath, this.reachedTheEnd, this.startNode, this.endNode, this.finalNode);
    }
}