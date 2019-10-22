import {Hooks} from "../Hooks";
import {DamageHitContainer} from "./DamageHitContainer";

export class DamageDetectionSystem {
    private static instance: DamageDetectionSystem;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new DamageDetectionSystem();
            Hooks.set("DamageDetectionSystem", this.instance);
        }
        return this.instance;
    }

    private readonly beforeHit: trigger;
    private readonly afterHit: trigger;

    private constructor() {
        this.beforeHit = CreateTrigger();
        this.afterHit = CreateTrigger();

        for (let i = 0; i < bj_MAX_PLAYER_SLOTS + 4; i++) {
            let play = Player(i);
            TriggerRegisterPlayerUnitEventSimple(this.beforeHit, play, EVENT_PLAYER_UNIT_DAMAGING);
            TriggerRegisterPlayerUnitEventSimple(this.afterHit, play, EVENT_PLAYER_UNIT_DAMAGED);
        }

        TriggerAddAction(this.beforeHit, () => this.onBeforeHit());
        TriggerAddAction(this.afterHit, () => this.onAfterHit());
    }

    //TODO: Implement functionality to register new natives.

    private onBeforeHit() {
        const beforeHit = DamageHitContainer.fromCurrentEvent();
        //TODO: Implement hit logic
    }

    private onAfterHit() {
        const afterHit = DamageHitContainer.fromCurrentEvent();
        //TODO: Implement hit logic
    }
}