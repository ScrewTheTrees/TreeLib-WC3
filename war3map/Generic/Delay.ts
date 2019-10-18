import {Entity} from "./Entity";
import {Hooks} from "./Hooks";
import {DelayDto} from "./DataContainers/DelayDto";

/**
 * The Delay Executes the sent function after a defined delay.
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
        this.queue.forEach((queueDto, index) => {
            queueDto.age += 0.01;
            if (queueDto.age >= queueDto.delay) {
                queueDto.function();
                this.queue.splice(index, 1);
            }
        });
    }

    public addDelay(f: Function, delaySeconds: number) {
        this.addDelayFrom(new DelayDto(f, delaySeconds));
    }
    public addDelayFrom(delayDto: DelayDto) {
        this.queue.push(delayDto);
    }

}