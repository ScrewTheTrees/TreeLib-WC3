import {Vector2} from "../Utility/Data/Vector2";
import {Quick} from "../Quick";

export class Node {
    public point: Vector2;
    public neighbors: Node[] = [];
    public disabled = false;

    /** A cost of 2 would be twice as hard to traverse (50%), a cost of 0 is nothing, it will always be traversed if adjacent */
    public cost = 1;

    //Pathfinding
    public cameFrom: Node[] = [];
    public costSoFar: number[] = [];

    public setCameFrom(index: number, cameFrom: Node | null, cost: number) {
        if (cameFrom) this.cameFrom[index] = cameFrom;
        this.costSoFar[index] = cost;
    }

    public clearIndex(index: number) {
        Quick.Slice(this.cameFrom,index);
        Quick.Slice(this.costSoFar,index);
    }

    public getCostSoFar(index: number) {
        return this.costSoFar[index] || 0;
    }

    public getCameFrom(index: number): Node | undefined {
        return this.cameFrom[index];
    }

    constructor(point: Vector2) {
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
            Quick.Remove(node.neighbors, this);
        }
        Quick.Clear(this.neighbors);
    }
}