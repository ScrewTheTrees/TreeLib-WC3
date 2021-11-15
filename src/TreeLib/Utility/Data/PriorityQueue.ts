import {Quick} from "../../Quick";
import {Recyclable} from "./Recyclable";

export class PriorityEntry<T> implements Recyclable {
    public value: T;
    public priority: number;

    private constructor(value: T, priority: number) {
        this.value = value;
        this.priority = priority;
    }

    private static stash: PriorityEntry<any>[] = [];
    public static new<T>(value: T, priority: number): PriorityEntry<any> {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(value, priority);
        else return new PriorityEntry(value, priority)
    }
    public static recycle(p: PriorityEntry<any>) {
        p.value = null;
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        PriorityEntry.recycle(this);
        return this;
    }
    public updateTo(value: T, priority: number) {
        this.value = value;
        this.priority = priority;
        return this;
    }
}

export class PriorityBucket<T extends Object> implements Recyclable {
    public entries: PriorityEntry<T>[] = [];
    public priority: number = 0;

    private constructor(priority: number) {
        this.priority = priority;
    }

    private static stash: PriorityBucket<any>[] = [];
    public static new(priority: number): PriorityBucket<any> {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(priority);
        else return new PriorityBucket(priority)
    }
    public static recycle(p: PriorityBucket<any>) {
        p.clear();
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        PriorityBucket.recycle(this);
        return this;
    }
    public updateTo(priority: number) {
        this.priority = priority;
        return this;
    }

    //API
    public pop(): T | undefined {
        let data = this.entries.pop();
        if (data) {
            data.recycle();
            return data.value;
        }
        return undefined;
    }
    public push(entry: T, priority: number) {
        this.insertAtEnd(PriorityEntry.new(entry, priority));
    }
    public insertWithPriority(value: T, priority: number) {
        let entry = PriorityEntry.new(value, priority);
        for (let i = 0; i < this.entries.length; i++) {
            if (priority >= this.entries[i].priority) {
                this.insertAtIndex(entry, i);
                return this;
            }
        }
        //No data in array
        this.insertAtEnd(entry);
        return this;
    }
    public insertAtEnd(entry: PriorityEntry<T>) {
        Quick.Push(this.entries, entry);
    }
    public insertAtIndex(entry: PriorityEntry<T>, index: number) {
        for (let i = this.entries.length; i > index; i--) { //Start at end + 1, iterate until index + 1
            this.entries[i] = this.entries[i - 1]; //Set current to previous
        }
        this.entries[index] = entry; //Replace (now also index+1) with new entry.
        return entry;
    }
    public clear() {
        let entry = this.entries.pop();
        while (entry != null) {
            entry.recycle();
            entry = this.entries.pop();
        }
    }
}

export class PriorityQueue<T> {
    public entries: PriorityBucket<T>[] = [];
    public bucketSize: number;

    private constructor(bucketSize: number = 128) {
        if (bucketSize < 8) bucketSize = 8; //Safety
        this.bucketSize = bucketSize;
        this.entries[0] = PriorityBucket.new(0);
    }

    public size() {
        let count = 0;
        for (let bucket of this.entries) {
            count += bucket.entries.length;
        }
        return count;
    }

    public getBucketByPriority(priority: number): PriorityBucket<T> {
        let currentBucket = this.entries[this.entries.length - 1];
        let index = 0;

        if (priority < currentBucket.priority) return this.entries[this.entries.length - 1];

        for (let i = 0; i < this.entries.length; i++) {
            currentBucket = this.entries[i];
            if (priority >= currentBucket.priority) {
                return currentBucket;
            }
            index = i;
        }
        return currentBucket; //Must be last one.
    }

    public splitBucket(bucket: PriorityBucket<T>) {
        let index = this.entries.indexOf(bucket);
        let splitValues = Math.floor(bucket.entries.length / 2); //math.floor(this.length / 2);
        let lowerBucket = PriorityBucket.new(bucket.priority);
        let rep: PriorityEntry<T>[] = [];
        for (let i = 0; i < splitValues; i++) {
            let val = bucket.entries.pop();
            if (val) {
                Quick.Push(rep, val);
            }
        }
        //Backfill onto new bucket.
        let data = rep.pop();
        while (data != null) {
            Quick.Push(lowerBucket.entries, data);
            data = rep.pop();
        }
        bucket.priority = bucket.entries[bucket.entries.length - 1].priority;
        lowerBucket.priority = lowerBucket.entries[lowerBucket.entries.length - 1].priority;

        this.insertAtIndex(lowerBucket, index + 1);
    }

    public insertWithPriority(value: T, priority: number) {
        let bucket = this.getBucketByPriority(priority);
        bucket.insertWithPriority(value, priority);
        if (priority < bucket.priority) {
            bucket.priority = priority; //Move priority down so we can support lower numbers (usually negative numbers).
        }
        if (bucket.entries.length >= this.bucketSize) {
            this.splitBucket(bucket);
        }
    }

    public popLowestPriority(): T | undefined {
        let bucket = this.entries[this.entries.length - 1]; //Final bucket.
        let value = bucket.pop();
        if (value == undefined) {
            if (this.entries.length > 1) {
                let bucket = this.entries.pop(); //pop out the last bucket in the list.
                if (bucket) bucket.recycle();
                return this.popLowestPriority();
            }
            //Its now 100% empty.
        }
        return value;
    }

    private static stash: PriorityQueue<any>[] = [];
    public static new(bucketSize?: number): PriorityQueue<any> {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(bucketSize);
        else return new PriorityQueue(bucketSize)
    }
    public static recycle(p: PriorityQueue<any>) {
        let entry = p.entries.pop();
        while (entry != null) {
            entry.recycle();
            entry = p.entries.pop();
        }
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        PriorityQueue.recycle(this);
        return this;
    }
    public updateTo(bucketSize?: number) {
        if (bucketSize) this.bucketSize = bucketSize;
        Quick.Push(this.entries, PriorityBucket.new(0));
        return this;
    }
    public popAtIndex(index: number): PriorityBucket<T> | undefined {
        let value = this.entries[index];
        this.entries.slice(index);
        return value;
    }
    public insertAtIndex(entry: PriorityBucket<T>, index: number) {
        for (let i = this.entries.length; i > index; i--) { //Start at end + 1, iterate until index + 1
            this.entries[i] = this.entries[i - 1]; //Set current to previous
        }
        this.entries[index] = entry; //Replace (now also index+1) with new entry.
        return entry;
    }
}