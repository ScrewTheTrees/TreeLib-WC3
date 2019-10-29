export class DelayDto {
    public function: Function;
    public delay: number;
    public age: number = 0;
    public repeats: number;
    public repeatCounter: number;
    constructor(func: Function, delay: number, repeats: number) {
        this.function = func;
        this.delay = delay;
        this.repeats = repeats;
        this.repeatCounter = 0;
    }
}