import {Node} from "./Node";
import {Point} from "../Utility/Point";
import {Logger} from "../Logger";
import {PriorityQueue} from "./PriorityQueue";

export class Pathfinder {
    public nodes: Node[] = [];

    public findPath(from: Point, to: Point): Point[] {
        //Setup
        let startNode = this.getNodeClosestTo(from);
        let endNode = this.getNodeClosestTo(to);
        this.resetNodes();

        //Logic
        let frontier = new PriorityQueue<Node>();
        frontier.push(startNode, startNode.costSoFar + startNode.cost);
        startNode.cameFrom = null;
        startNode.costSoFar = startNode.cost;
        let finalNode = null;
        let highest = 0;

        while (frontier.hasEntry()) {
            let current = frontier.get();
            if (current != null) {
                for (let i = 0; i < current.neighbors.length; i++) {
                    let target = current.neighbors[i];
                    if (!target.disabled && this.isNodeBadCompared(current, target)) {
                        target.cameFrom = current;
                        target.costSoFar = this.getNodeNumber(current, target);
                        frontier.push(target, target.costSoFar);
                    }
                    if (target == endNode) {
                        finalNode = target;
                        break; //Exit
                    }
                }
            }
            if (frontier.entries.length < highest) {
                highest = frontier.entries.length;
            }
        }
        if (finalNode == null) {
            finalNode = this.getClosestWithCameFrom(to) || startNode;
        }

        // Backtrack to get path
        let compileNodes: Node[] = [];
        let iterateNode: Node | null = finalNode;
        startNode.cameFrom = null;
        while (iterateNode != null) {
            compileNodes.push(iterateNode);
            iterateNode = iterateNode.cameFrom;
        }

        Logger.generic("startNode", startNode.point.toString());
        Logger.generic("finalNode", finalNode.point.toString());
        Logger.generic("endNode", endNode.point.toString());
        Logger.generic("totalPrios", highest);
        Logger.critical("compileNodes ", compileNodes.length);

        //Reverse Path and convert to points.
        let points: Point[] = [];
        for (let i = compileNodes.length - 1; i >= 0; i--) {
            let node = compileNodes[i];
            points.push(Point.copy(node.point));
        }

        return points;
    }

    public getNodeNumber(current: Node, target: Node) {
        return current.costSoFar + (target.cost * current.point.distanceTo(target.point));
    }

    public isNodeBadCompared(current: Node, target: Node): boolean {
        if (target.costSoFar == 0)
            return true; // Touch this node, its empty.
        if (current.costSoFar + (target.cost * current.point.distanceTo(target.point)) < target.costSoFar)
            return true; // Target node is higher cost, add it to prio queue so it can be reevaluated.

        return false;
    }

    public resetNodes() {
        this.nodes.forEach((node) => {
            node.cameFrom = null;
            node.costSoFar = 0;
        });
    }

    public addNodeWithNeighborsInRange(node: Node, distance: number): Node {
        distance += 0.5;
        for (let index = 0; index < this.nodes.length; index++) {
            let otherNode = this.nodes[index];
            if (otherNode.point.distanceTo(node.point) <= distance) {
                node.addNeighborTwoWay(otherNode);
            }
        }
        this.nodes.push(node);
        return node;
    }

    public getNodeClosestTo(point: Point): Node {
        let closest = this.nodes[0];
        if (this.nodes.length > 0) {
            let distance = point.distanceTo(closest.point);
            for (let index = 0; index < this.nodes.length; index++) {
                let value = this.nodes[index];
                if (!value.disabled && point.distanceTo(value.point) < distance) {
                    closest = value;
                    distance = point.distanceTo(value.point);
                }
            }
        }
        return closest;
    }

    public getClosestWithCameFrom(point: Point): Node {
        let closest = this.findFirstWithCameFrom();
        if (this.nodes.length > 0) {
            let distance = point.distanceTo(closest.point);
            for (let index = 0; index < this.nodes.length; index++) {
                let value = this.nodes[index];
                if (!value.disabled && value.cameFrom != null && point.distanceTo(value.point) < distance) {
                    closest = value;
                    distance = point.distanceTo(value.point);
                }
            }
        }
        return closest;
    }

    public findFirstWithCameFrom() {
        for (let i = 0; i < this.nodes.length; i++) {
            let node = this.nodes[i];
            if (node.cameFrom != null) {
                return node;
            }
        }
        return this.nodes[0];
    }
}