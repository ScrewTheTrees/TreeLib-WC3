import {LinkedList} from "./LinkedList";

export class PriorityQueue<T> {
    public entries: LinkedList<PriorityEntry<T>> = new LinkedList<PriorityEntry<T>>();


    public get(): T | null {
        const entry = this.entries.popAtStart();
        if (entry) {
            return entry.value;
        } else {
            return null;
        }
    }

    public push(value: T, priority: number) {
        priority = Math.ceil(priority);
        if (priority < 1) priority = 1;
        let entry = new PriorityEntry(value, priority);
        const referenceField = this.entries.search((t) => {
            return entry.priority <= t.priority; //If Ts priority is above entry, insert entry before T
        });
        if (referenceField) {
            referenceField.insertBefore(entry);
        } else {
            this.entries.insertAtEnd(entry);
        }
    }

    public hasEntry(): boolean {
        return this.entries.noOfEntries > 0;
    }

    public clear() {
        this.entries.clear();
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