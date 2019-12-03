import {Point} from "../Utility/Point";

export class Node {
    public point: Point;
    public neighbors: Node[] = [];
    public disabled = false;
    public weight = 1;

    //Pathfinding
    public cameFrom: Node | null = null;

    constructor(point: Point) {
        this.point = point;
    }

    public addNeighbor(node: Node) {
        if (this.neighbors.indexOf(node) < 0) {
            this.neighbors.push(node);
        }
    }

    public addNeighborTwoWay(node: Node) {
        this.addNeighbor(node);
        if (node.neighbors.indexOf(this) < 0) {
            node.neighbors.push(this);
        }
    }
}