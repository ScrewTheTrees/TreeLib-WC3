import {Point} from "../Utility/Point";

export class Node {
    public point: Point;
    public neighbors: Node[] = [];
    public disabled = false;
    private _cost = 1;

    //Pathfinding
    public cameFrom: Node | null = null;
    public costSoFar: number = 0;

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

    public set cost(cost: number) {
        this._cost = cost > 0 ? cost : 1;
    }

    public get cost() {
        return this._cost;
    }
}