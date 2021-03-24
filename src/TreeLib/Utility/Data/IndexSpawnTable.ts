import {Quick} from "../../Quick";

export class IndexSpawnTable<T> {
    private values: T[];

    constructor(...values: T[]) {
        this.values = values;
    }

    public add(item: T) {
        Quick.Push(this.values, item);
    }

    public purge() {
        Quick.Clear(this.values);
    }

    public remove(id: T) {
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i] == id) {
                Quick.Slice(this.values, i);
                i -= 1;
            }
        }
    }

    public getRandom(): T {
        return this.values[GetRandomInt(0, this.values.length - 1)];
    }
}