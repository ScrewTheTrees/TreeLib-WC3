import {Quick} from "../../Quick";

export class IndexSpawnTable {
    private values: string[];

    constructor(...values: string[]) {
        this.values = values;
    }

    public add(item: string) {
        Quick.Push(this.values, item);
    }

    public purge() {
        this.values = [];
    }

    public remove(id: string) {
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i] == id) {
                Quick.Slice(this.values, i);
                i -= 1;
            }
        }
    }

    public getRandom(): string {
        return this.values[GetRandomInt(0, this.values.length - 1)];
    }

    public getRandomAsId(): number {
        return FourCC(this.values[GetRandomInt(0, this.values.length - 1)]);
    }
}