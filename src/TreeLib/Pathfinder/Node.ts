import {Vector2} from "../Utility/Data/Vector2";
import {Quick} from "../Quick";
import {Rectangle} from "../Utility/Data/Rectangle";

export class Node {
    public point: Vector2;
    public neighbors: this[] = [];
    public disabled = false;

    /** A cost of 2 would be twice as hard to traverse (50%), a cost of 0 is nothing, it will always be traversed if adjacent */
    public cost = 1;

    //Pathfinding
    public cameFrom: this[] = [];
    public costSoFar: number[] = [];

    constructor(point: Vector2) {
        this.point = point;
    }

    public setCameFrom(index: number, cameFrom: this | null, cost: number) {
        if (cameFrom) this.cameFrom[index] = cameFrom;
        this.costSoFar[index] = cost;
    }

    public clearIndex(index: number) {
        Quick.Slice(this.cameFrom, index);
        Quick.Slice(this.costSoFar, index);
    }

    public getCostSoFar(index: number) {
        return this.costSoFar[index] || 0;
    }

    public getCameFrom(index: number): this | undefined {
        return this.cameFrom[index];
    }

    public addNeighbor(node: this) {
        if (node == this || node == null) return;
        if (this.neighbors.indexOf(node) < 0) {
            Quick.Push(this.neighbors, node);
        }
    }

    public distanceToNode(node: this): number {
        return this.point.distanceTo(node.point);
    }

    public addNeighborTwoWay(node: this) {
        if (node == this || node == null) return;
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

export class RectangleNode extends Node {
    public boundary: Rectangle;

    constructor(point: Vector2, boundary: Rectangle) {
        super(point);
        this.boundary = boundary;
    }


    public isInsideNode(point: Vector2) {
        return this.boundary.intersectsVector2(point);
    }
    public getClosestPoint(point: Vector2) {
        return this.boundary.closestPointInside(point);
    }
    public getClosestPointWithBoundary(point: Vector2, boundary: number) {
        return this.boundary.closestPointInsideWithBoundary(point, boundary);
    }

    public distanceToNode(node: this): number {
        let start = this.getClosestPoint(node.point);
        let end = node.getClosestPoint(this.point);
        let dist = start.distanceTo(end);
        start.recycle();
        end.recycle();
        return dist;
    }
    public distanceToNodeWithBoundary(node: this, boundary: number): number {
        let start = this.getClosestPointWithBoundary(node.point, boundary);
        let end = node.getClosestPointWithBoundary(this.point, boundary);
        let dist = start.distanceTo(end);
        start.recycle();
        end.recycle();
        return dist;
    }

    public distanceThrough(startNode: Node, endNode: Node) {
        let start = this.getClosestPoint(startNode.point);
        let end = this.getClosestPoint(endNode.point);
        let dist = start.distanceTo(end);
        start.recycle();
        end.recycle();
        return dist;
    }
    public distanceThroughWithBoundary(startNode: Node, endNode: Node, boundary: number) {
        let start = this.getClosestPointWithBoundary(startNode.point, boundary);
        let end = this.getClosestPointWithBoundary(endNode.point, boundary);
        let dist = start.distanceTo(end);
        start.recycle();
        end.recycle();
        return dist;
    }
}