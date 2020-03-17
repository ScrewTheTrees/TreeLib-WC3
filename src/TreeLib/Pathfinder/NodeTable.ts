import {Node} from "./Node";
import {PathfindResult} from "./PathfindResult";
import {LabelValue} from "../Utility/LabelValue";
import {Quick} from "../Quick";

export class NodeTable {
    public list: LabelValue<Node, ResultContainer>[] = [];

    public push(origin: Node, target: Node, result: PathfindResult) {
        let previous = this.getContainer(origin);
        if (previous == null) {
            previous = new LabelValue<Node, ResultContainer>(origin, new ResultContainer());
            Quick.Push(this.list, previous);
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

    public clearAll() {
        this.list = [];
    }

    public clearByOriginNode(origin: Node) {
        let container = this.getContainer(origin);
        if (container) {
            container.value = new ResultContainer();
        }
    }
}

class ResultContainer {
    public list: LabelValue<Node, PathfindResult>[] = [];

    public push(node: Node, pathfindResult: PathfindResult) {
        let previous = this.get(node);
        if (previous != null) {
            Quick.Slice(this.list, this.list.indexOf(previous));
        }

        Quick.Push(this.list, new LabelValue<Node, PathfindResult>(node, pathfindResult));
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