import {Node} from "./Node";
import {Point} from "../Utility/Point";
import {Logger} from "../Logger";
import {PriorityQueue} from "../Utility/Data/PriorityQueue";
import {PathfindResult} from "./PathfindResult";
import {NodeTable} from "./NodeTable";
import {Quick} from "../Quick";

export class Pathfinder {
    public nodes: Node[] = [];
    private frontier = new PriorityQueue<Node>();
    public nodeTable: NodeTable = new NodeTable();
    public useCache: boolean = true;

    public findPath(from: Point, to: Point): PathfindResult {
        let startNode = this.getNodeClosestTo(from);
        let endNode = this.getNodeClosestTo(to);
        return this.findPathByNodes(startNode, endNode, from, to);
    }

    public findPathByNodes(startNode: Node, endNode: Node, from: Point, to: Point): PathfindResult {
        if (this.useCache) {
            let node1 = this.nodeTable.get(startNode, endNode);
            if (node1 != null) {
                Logger.verbose("Used cached path.");
                return node1.value.copy();
            }
        }

        //Setup
        this.frontier.clear();
        this.resetNodes();

        //Logic
        this.frontier.push(startNode, startNode.costSoFar + startNode.cost);
        startNode.cameFrom = null;
        startNode.costSoFar = this.distanceBetweenNodes(startNode, endNode) * startNode.cost;
        let finalNode: Node | null = null;
        let highest = 0;
        let opCount = 0;

        while (this.frontier.hasEntry()) {
            let current = this.frontier.get();
            if (current != null) {
                for (let i = 0; i < current.neighbors.length; i++) {
                    let target = current.neighbors[i];
                    if (!target.disabled && this.isNodeBadCompared(current, target)) {
                        target.cameFrom = current;
                        target.costSoFar = this.getNodeNumber(current, target);
                        this.frontier.push(target, current.costSoFar + this.distanceBetweenNodes(target, endNode) * target.cost);
                        opCount += 1;
                    }
                    if (target == endNode) {
                        finalNode = target;
                        this.frontier.clear();
                        i = current.neighbors.length + 1;
                    }
                }
            }
            if (this.frontier.entries.length > highest) {
                highest = this.frontier.entries.length;
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
            Quick.Push(compileNodes, iterateNode);
            iterateNode = iterateNode.cameFrom;
        }

        Logger.verbose("startNode", startNode.point.toString());
        Logger.verbose("finalNode", finalNode.point.toString());
        Logger.verbose("endNode", endNode.point.toString());
        Logger.verbose("highestPrios", highest);
        Logger.verbose("opCount", opCount);
        Logger.verbose("compileNodes ", compileNodes.length);

        //Reverse Path and convert to points.
        let points: Point[] = [];
        for (let i = compileNodes.length - 1; i >= 0; i--) {
            let node = compileNodes[i];
            points.push(Point.copy(node.point));
        }

        let pathfindResult = new PathfindResult(points, finalNode == endNode, startNode.point, endNode.point, finalNode.point);
        if (this.useCache) {
            this.nodeTable.push(startNode, endNode, pathfindResult);
            return pathfindResult.copy();
        }
        return pathfindResult; //No need to copy.
    }

    public getNodeNumber(current: Node, target: Node) {
        return current.costSoFar + (this.distanceBetweenNodes(current, target) * target.cost);
    }

    public isNodeBadCompared(current: Node, target: Node): boolean {
        if (target.costSoFar <= 0)
            return true; // Touch this node, its empty.
        if (current.costSoFar + (this.distanceBetweenNodes(current, target) * target.cost) < target.costSoFar)
            return true; // Target node is higher cost, add it to prio queue so it can be reevaluated.

        return false;
    }

    public distanceBetweenNodes(current: Node, target: Node): number {
        let dist = math.abs(current.point.distanceTo(target.point));
        return dist >= 1 ? dist : 0;
    }

    public resetNodes() {
        for (let i = 0; i < this.nodes.length; i++) {
            let node = this.nodes[i];
            node.cameFrom = null;
            node.costSoFar = 0;
        }
    }

    public clearCache() {
        this.nodeTable.clearAll();
    }

    public addNodeWithNeighborsInRange(node: Node, distance: number): Node {
        distance += 0.5;
        for (let index = 0; index < this.nodes.length; index++) {
            let otherNode = this.nodes[index];
            if (otherNode.point.distanceTo(node.point) <= distance) {
                node.addNeighborTwoWay(otherNode);
            }
        }
        Quick.Push(this.nodes, node);
        this.clearCache();
        return node;
    }

    public getNodeClosestTo(point: Point): Node {
        let closest = this.nodes[0];
        if (this.nodes.length > 0) {
            let distance = point.distanceTo(closest.point);
            for (let index = 0; index < this.nodes.length; index++) {
                let value = this.nodes[index];
                let tempDist = point.distanceTo(value.point);
                if (!value.disabled && tempDist < distance) {
                    closest = value;
                    distance = tempDist;
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

    public addNode(node: Node) {
        Quick.Push(this.nodes, node);
        this.clearCache();
    }
}