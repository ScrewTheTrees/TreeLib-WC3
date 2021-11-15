import {Node} from "./Node";
import {Vector2} from "../Utility/Data/Vector2";
import {PriorityQueue} from "../Utility/Data/PriorityQueue";
import {PathfindResult} from "./PathfindResult";
import {Quick} from "../Quick";
import {TreeThread} from "../Utility/TreeThread";
import {TreePromise} from "../Utility/TreePromise";

export class Pathfinder<T extends Node = Node> {
    public nodes: T[] = [];
    public nextIndex = 0;
    public maxIndex = 256; //Use a higher number if you plan to use a lot of async path finding.

    private nodesInOrder: T[][] = [];
    private compileNodes: T[][] = [];

    public findPathAsync(from: Vector2,
                         to: Vector2,
                         maxIterateNodes: number = math.maxinteger,
                         asyncMax: number = 256): TreePromise<PathfindResult<T>, TreeThread> {
        let startNode = this.getNodeClosestTo(from);
        let endNode = this.getNodeClosestTo(to);
        return this.findPathByNodesAsync(startNode, endNode, maxIterateNodes, asyncMax);
    }

    public findPath(from: Vector2, to: Vector2, maxDist?: number) {
        let startNode = this.getNodeClosestTo(from);
        let endNode = this.getNodeClosestTo(to);
        return this.findPathByNodes(startNode, endNode, maxDist);
    }

    public findPathByNodesAsync(startNode: T,
                                endNode: T,
                                maxIterateNodes: number = math.maxinteger,
                                asyncMax: number = 128): TreePromise<PathfindResult<T>, TreeThread> {
        let promise = new TreePromise<PathfindResult<T>, TreeThread>();
        promise.handler = TreeThread.RunUntilDone(() => {
            xpcall(() => {
                let result = this.findPathByNodes(startNode, endNode, maxIterateNodes, asyncMax)
                promise.apply(result)
            }, (error) => {
                promise.fail(error);
            });
        });
        return promise;
    }

    public findPathByNodes(startNode: T, endNode: T, maxIterateNodes: number = math.maxinteger, asyncMax: number = -1): PathfindResult<T> {
        // print(os.clock(), "Start/Setup.", " - Index Length:", this.emptyIndexes.length);

        let pathFindIndex = this.nextIndex++;
        if (this.nextIndex >= this.maxIndex) this.nextIndex = 0;

        let isAsync = true;
        if (asyncMax <= 0) isAsync = false;

        const frontier: PriorityQueue<T> = PriorityQueue.new();
        let nodesInOrder: T[] = this.nodesInOrder[pathFindIndex];
        if (nodesInOrder == null) {
            nodesInOrder = [];
            this.nodesInOrder[pathFindIndex] = nodesInOrder;
        }

        Quick.Push(nodesInOrder, startNode);
        Quick.Push(nodesInOrder, endNode);

        //Logic
        startNode.setCameFrom(pathFindIndex, null, this.distanceBetweenNodes(startNode, endNode) * startNode.cost);
        frontier.insertWithPriority(startNode, startNode.getCostSoFar(pathFindIndex) + startNode.cost);

        let finalNode: T = startNode;
        let finalDist: number = math.maxinteger;
        let highest = 0;
        let opCount = 0;
        let iterateNodes = 0;
        let foundPath = false;

        // print(os.clock(), "Main Frontier Loop.", " - Index:", pathFindIndex);
        while (frontier.size() > 0 && iterateNodes < maxIterateNodes) {
            iterateNodes += 1;
            opCount += 1;

            if (isAsync && iterateNodes % asyncMax == 0) {
                coroutine.yield();
            }

            let current = frontier.popLowestPriority();
            if (current != null) {
                Quick.Push(nodesInOrder, current);
                for (let target of current.neighbors) {
                    if (!target.disabled && this.isNodeBadCompared(pathFindIndex, current, target)) {
                        if (!target.getCameFrom(pathFindIndex)) Quick.Push(nodesInOrder, target);
                        if (target.getCameFrom(pathFindIndex) != current) {
                            target.setCameFrom(pathFindIndex, current, this.getNodePriority(pathFindIndex, current, target));
                        }

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

        // print(os.clock(), "getClosestWithCameFrom. : Frontier size", frontier.size(), " - Index:", pathFindIndex);

        if (finalNode == null) {
            finalNode = this.getClosestWithCameFrom(pathFindIndex, nodesInOrder, endNode.point, asyncMax * 2) || startNode;
        }

        // print(os.clock(), "Backtrack.", " - Index:", pathFindIndex);
        // Backtrack to get path
        let compileNodes: T[] = this.compileNodes[pathFindIndex];
        if (compileNodes == null) {
            compileNodes = [];
            this.compileNodes[pathFindIndex] = nodesInOrder;
        }

        let iterateNode: T | undefined = finalNode;
        iterateNodes = 0;
        startNode.clearIndex(pathFindIndex);
        while (iterateNode != null) {
            Quick.Push(compileNodes, iterateNode);
            let temp: T | undefined = iterateNode.getCameFrom(pathFindIndex);
            //iterateNode.clearIndex(pathFindIndex);
            iterateNode = temp;
            iterateNodes++;
            if (isAsync && iterateNodes % asyncMax == 0) {
                coroutine.yield();
            }
        }

        // print(os.clock(), "Reverse Path and convert to points.", " - Index:", pathFindIndex);

        //Reverse Path and convert to points.
        let points: T[] = [];
        for (let i = compileNodes.length - 1; i >= 0; i--) {
            let node = compileNodes[i];
            points.push(node);
        }

        let pathfindResult = new PathfindResult(points, finalNode == endNode, startNode, endNode, finalNode);

        // print(os.clock(), "Done?", points.length, " - Index:", pathFindIndex);

        //Clear
        // print(os.clock(), "Start cleaning.", " - Index:", pathFindIndex);
        for (let node of nodesInOrder) {
            node.clearIndex(pathFindIndex);
            iterateNodes++;
        }
        frontier.recycle();

        Quick.Clear(nodesInOrder);
        Quick.Clear(compileNodes);
        // print(os.clock(), "Finished Cleaning.", " - Index:", pathFindIndex);


        return pathfindResult.finalise();
    }

    public getNodePriority(pathFindIndex: number, current: T, target: T) {
        return current.getCostSoFar(pathFindIndex) + (this.distanceBetweenNodes(current, target) * target.cost);
    }

    public isNodeBadCompared(pathFindIndex: number, current: T, target: T): boolean {
        if (target.getCostSoFar(pathFindIndex) <= 0)
            return true; // Touch this node, its empty.
        if (this.getNodePriority(pathFindIndex, current, target) < target.getCostSoFar(pathFindIndex))
            return true; // Target node is higher cost, add it to prio queue so it can be reevaluated.

        return false;
    }

    public distanceBetweenNodes(current: T, target: T): number {
        let dist = math.abs(current.point.distanceTo(target.point));
        return dist >= 1 ? dist : 0;
    }

    public addNodeWithNeighborsInRange(node: T, distance: number): T {
        distance += 0.1;
        for (let index = 0; index < this.nodes.length; index++) {
            let otherNode = this.nodes[index];
            if (otherNode.point.distanceTo(node.point) <= distance) {
                node.addNeighborTwoWay(otherNode);
            }
        }
        Quick.Push(this.nodes, node);
        return node;
    }

    public getNodeClosestTo(point: Vector2): T {
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

    public getClosestWithCameFrom(pathFindIndex: number, nodesInOrder: T[], point: Vector2, asyncNumber: number = -1): T {
        let closest = this.findFirstWithCameFrom(nodesInOrder);
        let distance = point.distanceTo(closest.point);
        let iterate = 0;

        for (let value of nodesInOrder) {
            if (!value.disabled && value.getCameFrom(pathFindIndex) != undefined) {
                if (point.distanceTo(value.point) < distance) {
                    closest = value;
                    distance = point.distanceTo(value.point);
                    iterate++;
                    if (asyncNumber > 0 && iterate % asyncNumber == 0) {
                        coroutine.yield();
                    }
                }
            }
        }
        return closest;
    }

    public findFirstWithCameFrom(nodesInOrder: T[]) {
        for (let i = nodesInOrder.length - 1; i >= 0; i--) {
            let node = nodesInOrder[i];
            if (node.cameFrom != null) {
                return node;
            }
        }
        return nodesInOrder[0];
    }

    public addNode(node: T) {
        Quick.Push(this.nodes, node);
    }
}