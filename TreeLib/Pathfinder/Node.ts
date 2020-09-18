import {Point} from "../Utility/Point";
import {Quick} from "../Quick";

export class Node {
    public point: Point;
    public neighbors: Node[] = [];
    public disabled = false;

    /** A cost of two would be twice as hard to traverse (50%), a cost of 0 is nothing, it will always be traversed if adjacent */
    public cost = 1;

    //Pathfinding
    public cameFrom: Node | null = null;
    public costSoFar: number = 0;

    constructor(point: Point) {
        this.point = point;
    }

    public addNeighbor(node: Node) {
        if (this.neighbors.indexOf(node) < 0) {
            Quick.Push(this.neighbors, node);
        }
    }

    public addNeighborTwoWay(node: Node) {
        this.addNeighbor(node);
        if (node.neighbors.indexOf(this) < 0) {
            Quick.Push(node.neighbors, this);
        }
    }

    public remove() {
        for (let i = 0; i < this.neighbors.length; i++) {
            let node = this.neighbors[i];
            Quick.Slice(node.neighbors, node.neighbors.indexOf(this));
        }
    }
}