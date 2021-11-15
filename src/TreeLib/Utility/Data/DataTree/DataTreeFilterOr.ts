import {DataTreeFilter} from "./DataTreeFilter";


export abstract class DataTreeFilterOr<T> extends DataTreeFilter<T> {
    public childFilters: DataTreeFilter<T>[] = [];
    public evaluate(value: T): boolean {
        for (let f of this.childFilters) {
            if (!f.evaluate(value)) return false;
        }
        return true;
    }
    public apply(...args: DataTreeFilter<T>[]): this {
        this.childFilters.push(...args);
        return this;
    }
}