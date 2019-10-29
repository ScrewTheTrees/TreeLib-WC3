import {Hooks} from "../Hooks";

export class ActionQueueConfig {
    private static instance: ActionQueueConfig;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new ActionQueueConfig();
            Hooks.set("ActionQueueConfig", this.instance);
        }
        return this.instance;
    }

    public timerDelay = 0.25;
}