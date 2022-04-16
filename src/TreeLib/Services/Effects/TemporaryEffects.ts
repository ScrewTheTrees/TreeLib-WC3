import {Quick} from "../../Quick";
import {Entity} from "../../Entity";
import {StepEffect} from "./StepEffects/StepEffect";
import {Hooks} from "../../Hooks";

Hooks.addBeforeMainHook(() => TemporaryEffects.Init());
export class TemporaryEffects extends Entity {
    private static instance: TemporaryEffects;
    private constructor() {
        super(0.5);
    }
    static Init() {
        this.instance = new TemporaryEffects();
    }

    /**
     * What are you doing step-effect?
     */
    public static stepEffects: StepEffect[] = [];

    public static addEffect<T extends StepEffect>(container: T): T {
        Quick.Push(this.stepEffects, container);
        return container;
    }

    step(): void {
        for (let i = 0; i < TemporaryEffects.stepEffects.length; i++) {
            let value = TemporaryEffects.stepEffects[i];
            value.currentTime += this.timerDelay;
            if (value.currentTime >= value.timer) {
                value.destroy();
                Quick.Slice(TemporaryEffects.stepEffects, i);
                i -= 1;
            } else {
                value.step();
            }
        }
    }
}