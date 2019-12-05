export class PriorityQueue<T> {
    public entries: PriorityEntry<T>[] = [];


    public get(): T | null {
        let entry = this.entries[0];
        if (this.entries.length > 0) {
            let priority = entry.priority;
            let index = 0;
            for (let i = 0; i < this.entries.length; i++) {
                let e = this.entries[i];
                if (e.priority < priority) {
                    entry = e;
                    priority = e.priority;
                    index = i;
                }
            }
            this.entries.splice(index, 1);
        }

        return entry != null ? entry.value : null;
    }

    public push(value: T, priority: number) {
        let entry = new PriorityEntry(value, priority);
        this.entries.push(entry);
    }

    public hasEntry(): boolean {
        return this.entries.length > 0;
    }
}

class PriorityEntry<T> {
    public value: T;
    public priority: number;

    constructor(value: T, priority: number) {
        this.value = value;
        this.priority = priority;
    }
}