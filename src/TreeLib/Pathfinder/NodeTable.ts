import {Node} from "./Node";
import {PathfindResult} from "./PathfindResult";
import {LabelValue} from "../Utility/LabelValue";
import {Quick} from "../Quick";

//Unused until further notice.
export class NodeTable<T extends Node = Node> {
    public list: LabelValue<T, ResultContainer<T>>[] = [];

    public push(origin: T, target: T, result: PathfindResult) {
        let previous = this.getContainer(origin);
        if (previous == null) {
            previous = new LabelValue<T, ResultContainer<T>>(origin, new ResultContainer());
            Quick.Push(this.list, previous);
        }
        previous.value.push(target, result);
    }

    public get(origin: T, target: T): LabelValue<T, PathfindResult> | null {
        for (let i = 0; i < this.list.length; i++) {
            let value = this.list[i];
            if (value.label == origin) {
                return value.value.get(target);
            }
        }
        return null;
    }

    public getContainer(origin: T): LabelValue<T, ResultContainer<T>> | null {
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

    public clearByOriginNode(origin: T) {
        let container = this.getContainer(origin);
        if (container) {
            container.value = new ResultContainer();
        }
    }
}

class ResultContainer<T extends Node> {
    public list: LabelValue<T, PathfindResult>[] = [];

    public push(node: T, pathfindResult: PathfindResult) {
        let previous = this.get(node);
        if (previous != null) {
            Quick.Slice(this.list, this.list.indexOf(previous));
        }

        Quick.Push(this.list, new LabelValue<T, PathfindResult>(node, pathfindResult));
    }

    public get(node: T): LabelValue<T, PathfindResult> | null {
        for (let i = 0; i < this.list.length; i++) {
            let value = this.list[i];
            if (value.label == node) {
                return value;
            }
        }

        return null;
    }
}