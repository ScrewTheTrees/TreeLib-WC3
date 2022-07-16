import {Quick} from "../../Quick";
import {Entity} from "../../Entity";
import {StepEffect} from "./StepEffects/StepEffect";

export class TemporaryEffects extends Entity {
    private static _instance: TemporaryEffects;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new TemporaryEffects();
        }
        return this._instance;
    }
    private constructor() {
        super(0.5);
    }

    /**
     * What are you doing step-effect?
     */
    public stepEffects: StepEffect[] = [];

    public addEffect<T extends StepEffect>(container: T): T {
        Quick.Push(this.stepEffects, container);
        return container;
    }

    step(): void {
        for (let i = 0; i < this.stepEffects.length; i++) {
            let value = this.stepEffects[i];
            value.currentTime += this.timerDelay;
            if (value.currentTime >= value.timer) {
                value.destroy();
                Quick.Slice(this.stepEffects, i);
                i -= 1;
            } else {
                value.step();
            }
        }
    }
}