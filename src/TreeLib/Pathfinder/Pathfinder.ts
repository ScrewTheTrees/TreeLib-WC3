import {Node} from "./Node";
import {Vector2} from "../Utility/Data/Vector2";
import {Logger} from "../Logger";
import {PriorityQueue} from "../Utility/Data/PriorityQueue";
import {PathfindResult} from "./PathfindResult";
import {NodeTable} from "./NodeTable";
import {Quick} from "../Quick";
import {DelayDto} from "../Utility/DelayDto";
import {Delay} from "../Utility/Delay";
import {TreeThread} from "../Utility/TreeThread";

export class Pathfinder {
    public nodes: Node[] = [];
    public nodeTable: NodeTable = new NodeTable();
    public useCache: boolean = true;
    public nextIndex = 0;

    public findPathAsync(from: Vector2,
                         to: Vector2,
                         maxIterateNodes: number = math.maxinteger,
                         asyncMax: number = 256,
                         onFinish?: (result: PathfindResult) => any) {
        let startNode = this.getNodeClosestTo(from);
        let endNode = this.getNodeClosestTo(to);
        return this.findPathByNodesAsync(startNode, endNode, maxIterateNodes, asyncMax, onFinish);
    }

    public findPath(from: Vector2, to: Vector2, maxDist?: number) {
        let startNode = this.getNodeClosestTo(from);
        let endNode = this.getNodeClosestTo(to);
        return this.findPathByNodes(startNode, endNode, maxDist);
    }

    public findPathByNodesAsync(startNode: Node,
                                endNode: Node,
                                maxIterateNodes: number = math.maxinteger,
                                asyncMax: number = 128,
                                onFinish?: (result: PathfindResult) => any) {
        let done = false;
        let routine = coroutine.create(() => {
            xpcall(() => {
                let result = this.findPathByNodes(startNode, endNode, maxIterateNodes, asyncMax)
                if (onFinish) onFinish(result);
            }, Logger.critical);
            done = true;
        })
        coroutine.resume(routine);
        Delay.addDelay((delay: DelayDto) => {
            if (!done) {
                delay.repeatCounter = 0;
                coroutine.resume(routine);
            } else {
                delay.repeatCounter = delay.repeats;
            }
        }, 0.02, 2);
    }

    public findPathByNodes(startNode: Node, endNode: Node, maxIterateNodes: number = math.maxinteger, asyncMax: number = -1) {
        // print(os.clock(), "Start/Setup.");
        if (this.useCache) {
            let node1 = this.nodeTable.get(startNode, endNode);
            if (node1 != null) {
                Logger.verbose("Used cached path.");
                return node1.value.copy();
            }
        }

        let pathFindIndex = this.nextIndex++;
        let isAsync = true;
        if (asyncMax <= 0) isAsync = false;

        const frontier = new PriorityQueue<Node>();
        const nodesInOrder: Node[] = [];

        Quick.Push(nodesInOrder, startNode);
        Quick.Push(nodesInOrder, endNode);

        //Logic
        startNode.setCameFrom(pathFindIndex, null, this.distanceBetweenNodes(startNode, endNode) * startNode.cost);
        frontier.insertWithPriority(startNode, startNode.getCostSoFar(pathFindIndex) + startNode.cost);

        let finalNode: Node = startNode;
        let finalDist: number = math.maxinteger;
        let highest = 0;
        let opCount = 0;
        let iterateNodes = 0;
        let foundPath = false;

        // print(os.clock(), "Main Frontier Loop.");
        while (frontier.size() > 0 && iterateNodes < maxIterateNodes) {
            iterateNodes += 1;
            opCount += 1;

            if (isAsync && iterateNodes % asyncMax == 0) {
                coroutine.yield();
            }

            let current = frontier.popLowestPriority();
            if (current != null) {
                Quick.Push(nodesInOrder, current);
                for (let i = 0; i < current.neighbors.length; i++) {
                    let target = current.neighbors[i];

                    if (!target.disabled && this.isNodeBadCompared(pathFindIndex, current, target)) {
                        if (target.getCameFrom(pathFindIndex)) Quick.Push(nodesInOrder, target);

                        target.setCameFrom(pathFindIndex, current, this.getNodeNumber(pathFindIndex, current, target));
                        let dist = this.distanceBetweenNodes(target, endNode) * target.cost;
                        frontier.insertWithPriority(target, current.getCostSoFar(pathFindIndex) + dist);

                        if (dist < finalDist) {
                            finalDist = dist;
                            finalNode = target;
                        }

                        opCount += 1;
                    }
                    if (target == endNode) {
                        foundPath = true;
                        finalNode = target;
                        i = math.maxinteger;
                        break;
                    }
                }
                if (current == endNode) {
                    foundPath = true;
                    finalNode = current;
                    break;
                }
            }
            if (frontier.size() > highest) {
                highest = frontier.size();
            }
        }//while

        // print(os.clock(), "getClosestWithCameFrom. : Frontier size", frontier.size());

        if (finalNode == null) {
            finalNode = this.getClosestWithCameFrom(pathFindIndex, nodesInOrder, endNode.point, asyncMax * 2) || startNode;
        }

        // print(os.clock(), "Backtrack.");
        // Backtrack to get path
        let compileNodes: Node[] = [];
        let iterateNode: Node | undefined = finalNode;
        iterateNodes = 0;
        startNode.clearIndex(pathFindIndex);
        while (iterateNode != null) {
            Quick.Push(compileNodes, iterateNode);
            iterateNode = iterateNode.getCameFrom(pathFindIndex);

            iterateNodes++;
            if (isAsync && iterateNodes % asyncMax == 0) {
                coroutine.yield();
            }
        }

        // print(os.clock(), "Reverse Path and convert to points.");

        //Reverse Path and convert to points.
        let points: Vector2[] = [];
        for (let i = compileNodes.length - 1; i >= 0; i--) {
            let node = compileNodes[i];
            points.push(Vector2.copy(node.point));
        }

        let pathfindResult = new PathfindResult(points, finalNode == endNode, startNode, endNode, finalNode);
        if (this.useCache) {
            this.nodeTable.push(startNode, endNode, pathfindResult);
            return pathfindResult.finalise().copy();
        }

        // print(os.clock(), "Done?");

        //Clear
        TreeThread.RunCoroutineUntilDone(
            () => {
                iterateNodes = 0;
                frontier.clear(true);
                for (let node of nodesInOrder) {
                    node.clearIndex(pathFindIndex);

                    iterateNodes++;
                    if (isAsync && iterateNodes % 32 == 0) {
                        coroutine.yield();
                    }
                }
                // print(os.clock(), "Cleaned nodes in order.")
            });


        return pathfindResult.finalise();
    }

    public getNodeNumber(pathFindIndex: number, current: Node, target: Node) {
        return current.getCostSoFar(pathFindIndex) + (this.distanceBetweenNodes(current, target) * target.cost);
    }

    public isNodeBadCompared(pathFindIndex: number, current: Node, target: Node): boolean {
        if (target.getCostSoFar(pathFindIndex) <= 0)
            return true; // Touch this node, its empty.
        if (this.getNodeNumber(pathFindIndex, current, target) < target.getCostSoFar(pathFindIndex))
            return true; // Target node is higher cost, add it to prio queue so it can be reevaluated.

        return false;
    }

    public distanceBetweenNodes(current: Node, target: Node): number {
        let dist = math.abs(current.point.distanceTo(target.point));
        return dist >= 1 ? dist : 0;
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

    public getClosestWithCameFrom(pathFindIndex: number, nodesInOrder: Node[], point: Vector2, asyncNumber: number = -1): Node {
        let closest = this.findFirstWithCameFrom(nodesInOrder);
        let distance = point.distanceTo(closest.point);
        let iterate = 0;

        for (let value of nodesInOrder) {
            if (!value.disabled && value.getCameFrom(pathFindIndex) != undefined) {
                if (point.distanceTo(value.point) < distance) {
                    closest = value;
                    distance = point.distanceTo(value.point);
                    iterate++;
                    if (asyncNumber > 0 && iterate % asyncNumber == 0) coroutine.yield();
                }
            }
        }
        return closest;
    }

    public findFirstWithCameFrom(nodesInOrder: Node[]) {
        for (let i = 0; i < nodesInOrder.length; i++) {
            let node = nodesInOrder[i];
            if (node.cameFrom != null) {
                return node;
            }
        }
        return nodesInOrder[0];
    }

    public addNode(node: Node) {
        Quick.Push(this.nodes, node);
        this.clearCache();
    }
}