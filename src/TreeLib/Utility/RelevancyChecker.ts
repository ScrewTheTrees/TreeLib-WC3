import {Quick} from "../Quick";
import {StringFuncs} from "./Extended/StringFuncs";

export class RelevancyChecker<T> {
    public allRefs: RelevancyRef<T>[] = [];

    public add(key: string, value: T): RelevancyRef<T> {
        const ref = RelevancyRef.new(key, value);
        this.allRefs.push(ref);
        return ref;
    }

    public findRelevant(compare: string) {
        let candidate = this.allRefs[0];
        candidate.similarTo(compare); //Update data.
        for (let refs of this.allRefs) {
            const sim = refs.similarTo(compare);
            if (sim > candidate.relevancy) candidate = refs;
        }
        return candidate;
    }
    public orderByRelevancy(compare: string, arr?: RelevancyRef<T>[]) {
        let list: RelevancyRef<T>[] = arr || [];
        for (let refs of this.allRefs) {
            refs.similarTo(compare); //Update
            list.push(refs);
        }
        list.sort((ref1, ref2) => {
            return ref2.relevancy - ref1.relevancy;
        });
        return list;
    }

    public destroy() {
        for (let ref of this.allRefs) {
            ref.recycle();
        }
        Quick.Clear(this.allRefs);
    }
}

export class RelevancyRef<T> {
    public key: string
    public value: T
    public relevancy: number;
    private constructor(key: string, value: T) {
        this.key = key;
        this.value = value;
        this.relevancy = 0;
    }

    public similarTo(compare: string) {
        this.relevancy = StringFuncs.compareStringSimilar(compare.toLowerCase(), this.key.toLowerCase());
        return this.relevancy;
    }
    private static stash: RelevancyRef<any>[] = [];

    public static new(key: string, value: any): RelevancyRef<any> {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(key, value);
        else return new RelevancyRef<any>(key, value);
    }

    public static recycle(p: RelevancyRef<any>) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }

    public recycle() {
        RelevancyRef.recycle(this);
        return this;
    }

    private updateTo(key: string, value: T) {
        this.key = key;
        this.value = value;
        this.relevancy = 0;
        return this;
    }
}