import {Node} from "./Node";
import {Point} from "../Utility/Point";
import {Pathfinder} from "./Pathfinder";

export class PathfinderGrid extends Pathfinder {
    constructor(startX: number, startY: number, endX: number, endY: number, stepSize: number) {
        super();
        let tempNodes: Node[][] = [];
        for (let i = startX; i < endX; i += stepSize) {
            if (tempNodes[i] == null) {
                tempNodes[i] = [];
            }
            for (let j = startY; j < endY; j += stepSize) {
                let node = new Node(new Point(i, j));
                tempNodes[i][j] = node;
                let up = tempNodes[i] != null ? tempNodes[i][j - stepSize] : null;
                let left = tempNodes[i - stepSize] != null ? tempNodes[i - stepSize][j] : null;
                if (up != null) {
                    node.addNeighborTwoWay(up);
                }
                if (left != null) {
                    node.addNeighborTwoWay(left);
                }
                this.nodes.push(node);
            }
        }
    }
}