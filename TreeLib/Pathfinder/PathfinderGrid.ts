import {Node} from "./Node";
import {Point} from "../Utility/Point";
import {Pathfinder} from "./Pathfinder";

export class PathfinderGrid extends Pathfinder {
    private grid: Node[][] = [];

    constructor(startX: number, startY: number, endX: number, endY: number, stepSize: number) {
        super();
        for (let i = startX; i < endX; i += stepSize) {
            if (this.grid[i] == null) {
                this.grid[i] = [];
            }
            for (let j = startY; j < endY; j += stepSize) {
                let node = new Node(new Point(i + (stepSize / 2), j + (stepSize / 2)));
                this.grid[i][j] = node;
                let up = this.grid[i] != null ? this.grid[i][j - stepSize] : null;
                let down = this.grid[i] != null ? this.grid[i][j + stepSize] : null;
                let left = this.grid[i - stepSize] != null ? this.grid[i - stepSize][j] : null;
                let right = this.grid[i + stepSize] != null ? this.grid[i + stepSize][j] : null;
                if (up != null) {
                    node.addNeighborTwoWay(up);
                }
                if (down != null) {
                    node.addNeighborTwoWay(down);
                }
                if (left != null) {
                    node.addNeighborTwoWay(left);
                }
                if (right != null) {
                    node.addNeighborTwoWay(right);
                }
                this.addNode(node);
            }
        }
    }
}