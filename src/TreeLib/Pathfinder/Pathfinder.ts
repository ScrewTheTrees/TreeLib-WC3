import {Node} from "./Node";
import {Vector2} from "../Utility/Data/Vector2";
import {Logger} from "../Logger";
import {PriorityQueue} from "../Utility/Data/PriorityQueue";
import {PathfindResult} from "./PathfindResult";
import {NodeTable} from "./NodeTable";
import {Quick} from "../Quick";

export class Pathfinder {
    public nodes: Node[] = [];
    private traversed: Node[] = [];
    private frontier = new PriorityQueue<Node>();
    public nodeTable: NodeTable = new NodeTable();
    public useCache: boolean = true;

    public findPath(from: Vector2, to: Vector2, maxDist?: number) {
        let startNode = this.getNodeClosestTo(from);
        let endNode = this.getNodeClosestTo(to);
        return this.findPathByNodes(startNode, endNode, from, to, maxDist);
    }
    public findPathByNodes(startNode: Node, endNode: Node, from: Vector2, to: Vector2, maxIterateNodes: number = math.maxinteger) {
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
            this.traversed.push(startNode);
            let finalNode: Node = startNode;
            let finalDist: number = math.maxinteger;
            let highest = 0;
            let opCount = 0;
            let iterateNodes = 0;

            while (this.frontier.hasEntry() && iterateNodes < maxIterateNodes) {
                iterateNodes += 1;
                opCount += 1;

                let current = this.frontier.get();
                if (current != null) {
                    Quick.Push(this.traversed, current);
                    for (let i = 0; i < current.neighbors.length; i++) {
                        let target = current.neighbors[i];
                        if (!target.disabled && this.isNodeBadCompared(current, target)) {
                            Quick.Push(this.traversed, target);
                            target.cameFrom = current;
                            target.costSoFar = this.getNodeNumber(current, target);
                            let dist = this.distanceBetweenNodes(target, endNode) * target.cost;

                            this.frontier.push(target, current.costSoFar + dist);

                            if (dist < finalDist) {
                                finalDist = dist;
                                finalNode = target;
                            }

                            opCount += 1;
                        }
                        if (target == endNode) {
                            finalNode = target;
                            Quick.Push(this.traversed, target);
                            this.frontier.clear();
                            i = current.neighbors.length;
                        }
                    }
                }
                if (this.frontier.entries.noOfEntries > highest) {
                    highest = this.frontier.entries.noOfEntries;
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

            //Reverse Path and convert to points.
            let points: Vector2[] = [];
            for (let i = compileNodes.length - 1; i >= 0; i--) {
                let node = compileNodes[i];
                points.push(Vector2.copy(node.point));
            }

            let pathfindResult = new PathfindResult(points, finalNode == endNode, startNode, endNode, finalNode);
            if (this.useCache) {
                this.nodeTable.push(startNode, endNode, pathfindResult);
                return pathfindResult.copy();
            }
           return pathfindResult;
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
        for (let i = 0; i < this.traversed.length; i++) {
            let node = this.traversed[i];
            node.cameFrom = null;
            node.costSoFar = 0;
        }
        Quick.Clear(this.traversed);
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

    public getNodeClosestTo(point: Vector2): Node {
        let closest = this.nodes[0];
        if (this.nodes.length > 0) {
            let distance = point.distanceTo(closest.point);
            for (let index = 0; index < this.nodes.length; index++) {
                let value = this.nodes[index];
                if (!value.disabled) {
                    let tempDist = point.distanceTo(value.point);
                    if (tempDist < distance) {
                        closest = value;
                        distance = tempDist;
                    }
                }
            }
        }
        return closest;
    }

    public getClosestWithCameFrom(point: Vector2): Node {
        let closest = this.findFirstWithCameFrom();
        if (this.traversed.length > 0) {
            let distance = point.distanceTo(closest.point);
            for (let index = 0; index < this.traversed.length; index++) {
                let value = this.traversed[index];
                if (!value.disabled && value.cameFrom != null) {
                    if (point.distanceTo(value.point) < distance) {
                        closest = value;
                        distance = point.distanceTo(value.point);
                    }
                }
            }
        }
        return closest;
    }

    public findFirstWithCameFrom() {
        for (let i = 0; i < this.traversed.length; i++) {
            let node = this.traversed[i];
            if (node.cameFrom != null) {
                return node;
            }
        }
        return this.traversed[0];
    }

    public addNode(node: Node) {
        Quick.Push(this.nodes, node);
        this.clearCache();
    }
}