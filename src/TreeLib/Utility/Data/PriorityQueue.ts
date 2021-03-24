import {LinkedList} from "./LinkedList";
import {Quick} from "../../Quick";
import {Recyclable} from "./Recyclable";

export class PriorityQueue<T> {
    public entries: LinkedList<PriorityEntry<T>> = new LinkedList<PriorityEntry<T>>();


    public get(): T | null {
        const entry = this.entries.popAtStart();
        if (entry) {
            entry.recycle();
            return entry.value;
        } else {
            return null;
        }
    }

    public push(value: T, priority: number) {
        let entry = PriorityEntry.new(value, priority);
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
        this.entries.forEach((entry) => {
            entry.recycle();
        });
        this.entries.clear();
    }
}

class PriorityEntry<T> implements Recyclable {
    public value: T;
    public priority: number;

    private constructor(value: T, priority: number) {
        this.value = value;
        this.priority = priority;
    }

    //Stash API
    private static stash: PriorityEntry<any>[] = [];

    public static new<T>(value: T, priority: number): PriorityEntry<T> {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(value, priority);
        else return new PriorityEntry(value, priority);
    }

    public static recycle(p: PriorityEntry<any>) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }

    public recycle(): this {
        PriorityEntry.recycle(this);
        return this;
    }

    public updateTo(value: T, priority: number): PriorityEntry<T> {
        this.value = value;
        this.priority = priority;
        return this;
    }
}