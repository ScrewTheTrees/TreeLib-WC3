import {Node} from "./Node";
import {Point} from "../Utility/Point";
import {Logger} from "../Logger";

export class Pathfinder {
    public nodes: Node[] = [];

    public findPath(from: Point, to: Point): Point[] {
        //Setup
        let startNode = this.getNodeClosestTo(from);
        let endNode = this.getNodeClosestTo(to);
        this.resetNodes();

        //Logic
        let frontier: Node[] = [];
        frontier.push(startNode);
        startNode.cameFrom = null;
        let finalNode = startNode;

        while (frontier.length > 0) {
            let current = frontier[0];
            for (let i = 0; i < current.neighbors.length; i++) {
                let node = current.neighbors[i];
                if (node.cameFrom == null && !node.disabled) {
                    frontier.push(node);
                    node.cameFrom = current;
                    finalNode = node;
                    if (node == endNode) {
                        break; //Exit
                    }
                }
            }
            frontier.splice(0, 1);
        }

        Logger.generic("startNode", startNode.point.toString());
        Logger.generic("finalNode", finalNode.point.toString());
        Logger.generic("endNode", endNode.point.toString());

        // Backtrack to get path
        let compileNodes: Node[] = [];
        let iterateNode: Node | null = endNode;
        startNode.cameFrom = null;
        while (iterateNode != null) {
            compileNodes.push(iterateNode);
            iterateNode = iterateNode.cameFrom;
        }
        Logger.critical("compileNodes ", compileNodes.length);

        //Reverse Path and convert to points.
        let points: Point[] = [];
        for (let i = compileNodes.length - 1; i >= 0; i--) {
            let node = compileNodes[i];
            points.push(Point.copy(node.point));
        }
        Logger.critical("points ", points.length);

        return points;
    }

    public resetNodes() {
        this.nodes.forEach((node) => {
            node.cameFrom = null;
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
        Logger.critical(tostring(closest), "  ", this.nodes.length);
        return closest;

    }
}