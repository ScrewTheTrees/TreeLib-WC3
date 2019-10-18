import {Hooks} from "./Hooks";

export class Timers {
    public static fastTimerCallbacks = new Map<string, Function>();
    public static fastTimer: trigger;

    public init() {
        Timers.fastTimer = CreateTrigger();
        TriggerRegisterTimerEvent(Timers.fastTimer, 0.01, true);
        TriggerAddAction(Timers.fastTimer, () => {
            Timers.fastTimerCallbacks.forEach((callback: Function) => {
                callback();
            })
        });
    }

    public static addFastTimerCallback(name: string, func: Function) {
        if (!Hooks.get("mapTimerHook")) {
            const timer = new Timers();
            timer.init();
            Hooks.set("mapTimerHook", timer);
        }
        this.fastTimerCallbacks.set(name, func);
    }
}