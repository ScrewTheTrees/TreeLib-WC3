import {Node} from "./Node";
import {Point} from "../Utility/Point";
import {Pathfinder} from "./Pathfinder";

export class PathfinderGrid extends Pathfinder {
    private grid: Node[][] = [];

    constructor(startX: number, startY: number, endX: number, endY: number, stepSize: number, allowDiagonal: boolean = false) {
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

                let left: Node | null = null;
                let upLeft: Node | null = null;
                let downLeft: Node | null = null;
                let right: Node | null = null;
                let upRight: Node | null = null;
                let downRight: Node | null = null;
                if (this.grid[i - stepSize] != null) { //Left
                    left = this.grid[i - stepSize][j];
                    upLeft = this.grid[i - stepSize][j - stepSize];
                    downLeft = this.grid[i - stepSize][j + stepSize];
                }
                if (this.grid[i + stepSize] != null) { //Right
                    right = this.grid[i + stepSize][j];
                    upRight = this.grid[i + stepSize][j - stepSize];
                    downRight = this.grid[i + stepSize][j + stepSize];
                }

                if (up != null) node.addNeighborTwoWay(up);
                if (down != null) node.addNeighborTwoWay(down);
                if (left != null) node.addNeighborTwoWay(left);
                if (right != null) node.addNeighborTwoWay(right);

                if (allowDiagonal) {
                    if (upLeft != null) node.addNeighborTwoWay(upLeft);
                    if (upRight != null) node.addNeighborTwoWay(upRight);
                    if (downLeft != null) node.addNeighborTwoWay(downLeft);
                    if (downRight != null) node.addNeighborTwoWay(downRight);
                }
                this.addNode(node);
            }
        }
    }
}