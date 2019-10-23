import {Hooks} from "../Hooks";
import {DamageHitContainer} from "./DamageHitContainer";
import {Logger} from "../Logger";
import {DamageBeforeHitContainer} from "./DamageBeforeHitContainer";
import {BeforeHitCallback} from "./BeforeHitCallback";
import {AfterHitCallback} from "./AfterHitCallback";

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

    private readonly beforeHitCallbacks: BeforeHitCallback[] = [];
    private readonly afterHitCallbacks: AfterHitCallback[] = [];

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

    /**
     * Register a callback that recives an object used for getting and manipulating damage data.
     * Includes damage, damagetypes, target, caster, aliasedCaster (if casted by dummy)
     */
    public registerBeforeHitEvent(callback: (hitObject: DamageBeforeHitContainer) => void): number {
        this.beforeHitCallbacks.push(new BeforeHitCallback(callback));
        return this.afterHitCallbacks.length - 1;
    }

    public registerAfterHitEvent(callback: (hitObject: DamageHitContainer) => void): number {
        this.afterHitCallbacks.push(new AfterHitCallback(callback));
        return this.afterHitCallbacks.length - 1;
    }


    private onBeforeHit() {
        const beforeHit = new DamageBeforeHitContainer();

        for (let hitCall of this.beforeHitCallbacks) {
            hitCall.callback(beforeHit);
        }
    }

    private onAfterHit() {
        const afterHit = new DamageHitContainer();

        for (let hitCall of this.afterHitCallbacks) {
            hitCall.callback(afterHit);
        }
    }
}