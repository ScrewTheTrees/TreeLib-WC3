export class DelayDto {
    public function: (delayDto: DelayDto) => any;
    public delay: number;
    public age: number = 0;
    public repeats: number;
    public repeatCounter: number;
    constructor(func: (this: any, delayDto: DelayDto) => any, delay: number, repeats: number) {
        this.function = func;
        this.delay = delay;
        this.repeats = repeats;
        this.repeatCounter = 0;
    }

    public finish() {
        this.age = this.delay;
    }
}