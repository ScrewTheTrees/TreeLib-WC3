import {IRecyclable} from "../../Utility/Data/IRecyclable";
import {Quick} from "../../Quick";

export class DelayContainer implements IRecyclable {
    public function: (delayDto: DelayContainer) => any;
    public delay: number;
    public age: number = 0;
    public repeats: number;
    public repeatCounter: number;
    private constructor(func: (this: any, delayDto: DelayContainer) => any, delay: number, repeats: number) {
        this.function = func;
        this.delay = delay;
        this.repeats = repeats;
        this.repeatCounter = 0;
    }

    public finish() {
        this.age = this.delay;
    }

    private static stash: DelayContainer[] = [];
    public static new(func: (this: any, delayDto: DelayContainer) => any, delay: number, repeats: number): DelayContainer {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(func, delay, repeats);
        else return new DelayContainer(func, delay, repeats)
    }
    public static recycle(p: DelayContainer) {
        // @ts-ignore
        p.function = undefined;
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        DelayContainer.recycle(this);
        return this;
    }
    public updateTo(func: (this: any, delayDto: DelayContainer) => any, delay: number, repeats: number) {
        this.function = func;
        this.delay = delay;
        this.repeats = repeats;
        this.repeatCounter = 0;
        return this;
    }
}