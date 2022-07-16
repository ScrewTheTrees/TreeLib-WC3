import {Entity} from "../../Entity";
import {DelayContainer} from "./DelayContainer";
import {Quick} from "../../Quick";

/**
 * The Delay Executes the sent function after a defined delay. Can also be repeated X amount of times.
 */
export class Delay extends Entity {
    private static _instance: Delay;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new Delay();
        }
        return this._instance;
    }
    private constructor() {
        super(0.01);
    }

    private queue: DelayContainer[] = [];

    public addDelayFrom<T extends DelayContainer>(delayDto: T) : T{
        Quick.Push(this.queue, delayDto);
        return delayDto;
    }
    /**
     * Adds a delayed function that will execute after a wanted duration.
     * @param f the function to execute on the delay.
     * @param delaySeconds the time before the delay executes.
     * @param repeats How many times it will run, 1 runs it once. 0 and under wont run at all
     */
    public addDelay(f: (this: any, delayDto: DelayContainer) => any, delaySeconds: number = 1, repeats: number = 1): DelayContainer {
        let del = DelayContainer.new(f, delaySeconds, repeats);
        this.addDelayFrom(del);
        return del;
    }


    step(): void {
        for (let index = 0; index < this.queue.length; index++) {
            let queueDto = this.queue[index];
            queueDto.age += 0.01;
            if (queueDto.age >= queueDto.delay) {
                queueDto.function(queueDto);
                queueDto.repeatCounter += 1;
                if (queueDto.repeatCounter >= queueDto.repeats) {
                    queueDto.recycle();
                    Quick.Slice(this.queue, index);
                    index -= 1;
                } else {
                    queueDto.age = 0;
                }
            }
        }
    }

}