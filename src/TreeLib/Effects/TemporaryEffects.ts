import {Hooks} from "../Hooks";
import {Quick} from "../Quick";
import {Entity} from "../Entity";
import {StepEffect} from "./StepEffects/StepEffect";

export class TemporaryEffects extends Entity {
    private static instance: TemporaryEffects;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new TemporaryEffects();
            Hooks.set(this.name, this.instance);
        }
        return this.instance;
    }

    constructor() {
        super();
        this._timerDelay = 0.5;
    }


    public runes: StepEffect[] = [];

    public addEffect(container: StepEffect) {
        this.runes.push(container);
    }

    step(): void {
        for (let i = 0; i < this.runes.length; i++) {
            let value = this.runes[i];
            value.currentTime += this._timerDelay;
            value.step();
            if (value.currentTime >= value.timer) {
                value.destroy();
                Quick.Slice(this.runes, i);
                i -= 1;
            }
        }
    }
}

