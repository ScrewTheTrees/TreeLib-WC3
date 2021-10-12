import {Quick} from "../../Quick";

export class TreeArray<T> {
    public entries: T[] = [];

    public popFirst(): T | undefined {
        return this.popAtIndex(0);
    }
    public popAtIndex(index: number): T | undefined {
        let value = this.entries[index];
        for (let i = index + 1; i < this.entries.length; i++) { //Start at index, iterate until end;
            this.entries[i - 1] = this.entries[i]; //Set previous to current
        }
        return value;
    }
    public insertAtStart(entry: T) {
        return this.insertAtIndex(entry, 0);
    }
    public insertAtEnd(entry: T) {
        Quick.Push(this.entries, entry);
    }
    public insertAtIndex(entry: T, index: number) {
        for (let i = this.entries.length; i > index; i--) { //Start at end + 1, iterate until index + 1
            this.entries[i] = this.entries[i - 1]; //Set current to previous
        }
        this.entries[index] = entry; //Replace (now also index+1) with new entry.
        return entry;
    }
}

export class PriorityBucket<T extends Object> extends TreeArray<T> {
    public priority: number = 0;

    constructor(priority: number) {
        super();
        this.priority = priority;
    }

    public insertWithPriority(value: T, priority: number) {
        // @ts-ignore
        value._tl_priority = priority;
        for (let i = 0; i < this.entries.length; i++) {
            // @ts-ignore
            if (priority >= this.entries[i]._tl_priority) {
                this.insertAtIndex(value, i);
                return this;
            }
        }
        //No data in array
        this.insertAtEnd(value);
        return this;
    }
}

export class PriorityQueue<T> extends TreeArray<PriorityBucket<T>> {
    public bucketSize: number;

    constructor(bucketSize: number = 128) {
        super();
        if (bucketSize < 2) bucketSize = 2; //Safety
        this.bucketSize = bucketSize;
        this.entries[0] = new PriorityBucket(0);
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
        let lowerBucket = new PriorityBucket<T>(bucket.priority);
        let rep: T[] = [];
        for (let i = 0; i < splitValues; i++) {
            let val = bucket.entries.pop();
            if (val) {
                Quick.Push(rep, val);
            }
        }
        //Backfill onto new bucket.
        let prio = 0;
        let data = rep.pop();
        while (data != null) {
            // @ts-ignore
            prio = data._tl_priority;
            Quick.Push(lowerBucket.entries, data);
            data = rep.pop();
        }
        // @ts-ignore
        bucket.priority = bucket.entries[bucket.entries.length - 1]._tl_priority;
        // @ts-ignore
        lowerBucket.priority = lowerBucket.entries[lowerBucket.entries.length - 1]._tl_priority;
        this.insertAtIndex(lowerBucket, index + 1);
    }

    public insertWithPriority(value: T, priority: number) {
        let bucket = this.getBucketByPriority(priority);
        bucket.insertWithPriority(value, priority);
        if (bucket.entries.length >= this.bucketSize) {
            this.splitBucket(bucket);
        }
        if (priority < bucket.priority) {
            bucket.priority = priority; //Move priority down so we can support lower numbers (usually negative numbers).
        }
    }

    public popLowestPriority(): T | undefined {
        let bucket = this.entries[this.entries.length - 1]; //Final bucket.
        let value = bucket.entries.pop();
        if (value == undefined) {
            if (this.entries.length > 1) {
                this.entries.pop(); //pop out the last bucket in the list.
                return this.popLowestPriority();
            }
            //Its now 100% empty.
        }
        return value;
    }

    public clear(async: boolean = false) {
        let num = 0;
        while(this.popLowestPriority() != null) {
            num++;
            if (async && num % 32 == 0) coroutine.yield();
        }
    }
}