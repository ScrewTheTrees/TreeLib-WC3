import {Entity} from "../../Entity";
import {Hooks} from "../../Hooks";
import {DelayContainer} from "./DelayContainer";
import {Quick} from "../../Quick";

/**
 * The Delay Executes the sent function after a defined delay. Can also be repeated X amount of times.
 */
Hooks.addBeforeMainHook(() => Delay.Init());
export class Delay extends Entity {
    private static instance: Delay;
    private constructor() {
        super(0.01);
    }
    static Init() {
        this.instance = new Delay();
    }

    private static queue: DelayContainer[] = [];

    public static addDelayFrom<T extends DelayContainer>(delayDto: T) : T{
        Quick.Push(this.queue, delayDto);
        return delayDto;
    }
    /**
     * Adds a delayed function that will execute after a wanted duration.
     * @param f the function to execute on the delay.
     * @param delaySeconds the time before the delay executes.
     * @param repeats How many times it will run, 1 runs it once. 0 and under wont run at all
     */
    public static addDelay(f: (this: any, delayDto: DelayContainer) => any, delaySeconds: number = 1, repeats: number = 1): DelayContainer {
        let del = new DelayContainer(f, delaySeconds, repeats);
        this.addDelayFrom(del);
        return del;
    }


    step(): void {
        for (let index = 0; index < Delay.queue.length; index++) {
            let queueDto = Delay.queue[index];
            queueDto.age += 0.01;
            if (queueDto.age >= queueDto.delay) {
                queueDto.function(queueDto);
                queueDto.repeatCounter += 1;
                if (queueDto.repeatCounter >= queueDto.repeats) {
                    // @ts-ignore
                    queueDto.function = undefined;
                    Quick.Slice(Delay.queue, index);
                    index -= 1;
                } else {
                    queueDto.age = 0;
                }
            }
        }
    }

}