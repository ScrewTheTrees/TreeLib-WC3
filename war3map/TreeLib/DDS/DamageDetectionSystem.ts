import {Hooks} from "../Hooks";
import {DamageHitContainer} from "./DamageHitContainer";
import {HitCallback} from "./HitCallback";
import {Logger} from "../Logger";

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

    private readonly beforeHitCallbacks: HitCallback[] = [];
    private readonly afterHitCallbacks: HitCallback[] = [];

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
     * Register a callback that recives an object used for getting and manipulating damage data before damage calculation.
     * Includes damage, damagetypes, target, caster, aliasedCaster (if casted by dummy)
     */
    public registerBeforeDamageCalculation(callback: (hitObject: DamageHitContainer) => void) {
        let hitCall = new HitCallback(callback);
        this.beforeHitCallbacks.push(hitCall);
        return hitCall;
    }

    /**
     * Register a callback that recives an object used for getting and manipulating damage data after damage calculations.
     * Includes damage, damagetypes, target, caster, aliasedCaster (if casted by dummy)
     */
    public registerAfterDamageCalculation(callback: (hitObject: DamageHitContainer) => void) {
        let hitCall = new HitCallback(callback);
        this.afterHitCallbacks.push(hitCall);
        return hitCall;
    }

    public allowRecursiveDDS = false;
    private locked = false;

    private isLocked() {
        return (this.locked && !this.allowRecursiveDDS);
    }

    private readonly hitContainer = new DamageHitContainer();

    private onBeforeHit() {
        this.hitContainer.updateContainer();
        this.onHitExecute(this.beforeHitCallbacks);
        this.locked = false;
    }

    private onAfterHit() {
        this.hitContainer.updateContainer();
        this.onHitExecute(this.afterHitCallbacks);
        this.locked = false;
    }
    private isPassingFilters(hitCall: HitCallback) {
        for (let filter of hitCall.filters) {
            if (!filter.runFilter(this.hitContainer)) {
                return false;
            }
        }
        return true;
    }

    private onHitExecute(hitCallbacks: HitCallback[]) {
        if (!this.isLocked()) {
            for (let hitCall of hitCallbacks) {
                this.locked = true;
                xpcall(() => {
                    if (this.isPassingFilters(hitCall)) {
                        hitCall.callback(this.hitContainer);
                    }
                }, () => Logger.LogCritical);
                this.locked = false;
            }
        }
    }
}