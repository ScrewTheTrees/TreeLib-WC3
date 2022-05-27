/**
 * These are filters for primarily the GridTree.
 */
export abstract class DataTreeFilter<T> {
    public abstract evaluate(value: T): boolean;
    public abstract apply(...args: any[]): this;
}