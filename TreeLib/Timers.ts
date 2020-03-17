import {Hooks} from "./Hooks";
import {Quick} from "./Quick";
import {TreeLib} from "./TreeLib";

/**
 * Provides timers for other classes,
 * Now, these timers generally is used by Entity, and i recommend extending Entity instead of adding callbacks here.
 * Once added, removing the callbacks can be quite the pain, only use it for static, always there callbacks.
 * Otherwise use Entity.
 */
export class Timers {
    private static instance: Timers;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new Timers();
            Hooks.set(this.name, this.instance);
        }
        return this.instance;
    }

    private fastTimerCallbacks: Function[] = [];
    private readonly fastTimer: trigger;

    private constructor() {
        this.fastTimer = CreateTrigger();
        TriggerRegisterTimerEvent(this.fastTimer, 0.01, true);
        TriggerAddAction(this.fastTimer, () => {
            this.fastTimerCallbacks.forEach((callback) => {
                callback();
            });
        });

        print(TreeLib.getIntroductionString());
    }

    public addFastTimerCallback(func: Function) {
        Quick.Push(this.fastTimerCallbacks, func);
    }

    /*
    STATIC API
     */
    public static addFastTimerCallback(func: Function) {
        return Timers.getInstance().addFastTimerCallback(func);
    }
}