export abstract class StepEffect {
    public timer: number = 0;
    public currentTime: number = 0;

    protected constructor(timer: number) {
        this.timer = timer;
    }

    public abstract step();

    public abstract destroy();

}