import {Node} from "./Node";
import {PathfindResult} from "./PathfindResult";
import {LabelValue} from "../Utility/LabelValue";
import {QuickSplice} from "../Misc";

export class NodeTable {
    public list: LabelValue<Node, ResultContainer>[] = [];

    public push(origin: Node, target: Node, result: PathfindResult) {
        let previous = this.getContainer(origin);
        if (previous == null) {
            previous = new LabelValue<Node, ResultContainer>(origin, new ResultContainer());
            this.list.push(previous);
        }
        previous.value.push(target, result);
    }

    public get(origin: Node, target: Node): LabelValue<Node, PathfindResult> | null {
        for (let i = 0; i < this.list.length; i++) {
            let value = this.list[i];
            if (value.label == origin) {
                return value.value.get(target);
            }
        }
        return null;
    }

    public getContainer(origin: Node): LabelValue<Node, ResultContainer> | null {
        for (let i = 0; i < this.list.length; i++) {
            let value = this.list[i];
            if (value.label == origin) {
                return value;
            }
        }
        return null;
    }
}

class ResultContainer {
    public list: LabelValue<Node, PathfindResult>[] = [];

    public push(node: Node, pathfindResult: PathfindResult) {
        let previous = this.get(node);
        if (previous != null) {
            QuickSplice(this.list, this.list.indexOf(previous));
        }

        this.list.push(new LabelValue<Node, PathfindResult>(node, pathfindResult))
    }

    public get(node: Node): LabelValue<Node, PathfindResult> | null {
        for (let i = 0; i < this.list.length; i++) {
            let value = this.list[i];
            if (value.label == node) {
                return value;
            }
        }

        return null;
    }
}