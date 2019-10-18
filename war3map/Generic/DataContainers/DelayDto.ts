export class DelayDto {
    public function: Function;
    public delay: number;
    public age: number = 0;
    constructor(func: Function, delay: number) {
        this.function = func;
        this.delay = delay;
    }
}