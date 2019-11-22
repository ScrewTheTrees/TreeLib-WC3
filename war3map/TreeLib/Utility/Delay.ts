import {Entity} from "../Entity";
import {Hooks} from "../Hooks";
import {DelayDto} from "./DelayDto";

/**
 * The Delay Executes the sent function after a defined delay. Can also be repeated X amount of times.
 */
export class Delay extends Entity {
    private static instance: Delay;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new Delay();
            Hooks.set("Delay", this.instance);
        }
        return this.instance;
    }

    private constructor() {
        super();
    }

    private queue: DelayDto[] = [];

    step(): void {
        for (let index = 0; index < this.queue.length; index++) {
            let queueDto = this.queue[index];
            queueDto.age += 0.01;
            if (queueDto.age >= queueDto.delay) {
                queueDto.function();
                queueDto.repeatCounter += 1;
                if (queueDto.repeatCounter >= queueDto.repeats) {
                    this.queue.splice(index, 1);
                    index -= 1;
                } else {
                    queueDto.age = 0;
                }
            }
        }
    }

    /**
     * Adds a delayed function that will execute after a wanted duration.
     * @param f the function to execute on the delay.
     * @param delaySeconds the time before the delay executes.
     * @param repeats How many times it will run, 1 runs it once.
     */
    public addDelay(f: Function, delaySeconds: number, repeats: number = 1) {
        this.addDelayFrom(new DelayDto(f, delaySeconds, repeats));
    }

    public addDelayFrom(delayDto: DelayDto) {
        this.queue.push(delayDto);
    }

    /*
    STATIC API
     */
    public static addDelay(f: Function, delaySeconds: number, repeats: number = 1) {
        this.getInstance().addDelayFrom(new DelayDto(f, delaySeconds, repeats));
    }

}