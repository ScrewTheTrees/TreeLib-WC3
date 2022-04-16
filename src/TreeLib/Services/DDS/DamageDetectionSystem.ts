import {Hooks} from "../../Hooks";
import {DamageHitContainer} from "./DamageHitContainer";
import {HitCallback} from "./HitCallback";
import {Logger} from "../../Logger";
import {Quick} from "../../Quick";

Hooks.addBeforeMainHook(() => DamageDetectionSystem.Init());
/**
 * Simple streamlined DDS system where you can register callbacks and optionally add filters for quickly handling when units take damage.
 * Callbacks will get a helpful Container where you can get, set and modify the DDS data.
 * Works with the DummyCaster system to provide the casting unit instead of the dummy unit in the Container.
 */
export class DamageDetectionSystem {
    private constructor() {}
    static Init() {
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

    private static beforeHit: trigger;
    private static afterHit: trigger;

    private static beforeHitCallbacks: HitCallback[] = [];
    private static afterHitCallbacks: HitCallback[] = [];

    /**
     * Warning, Recursive DDS is an unsafe option, it will allow the DDS system to create infinite loops if used poorly.
     * If used wrongly, it also forces TreeLibs DDS to create a new DamageHitContainer every time instead of reusing the same one.
     * TreeLibs DDS system blocks infinite loops by locking the execution on hit, but it will still cause issues due to the event changes.
     * While some parts are unsolveable, i will work on something to allow execution of code after all the DDS passes.
     */
    public static allowRecursiveDDS = false;
    private static locked = false;

    private static isLocked() {
        return (this.locked && !this.allowRecursiveDDS);
    }

    private static hitContainer = new DamageHitContainer();

    private static resolveHitContainer() {
        if (this.allowRecursiveDDS) {
            return new DamageHitContainer();
        } else {
            this.hitContainer.updateContainer();
            return this.hitContainer;
        }
    }

    private static onBeforeHit() {
        this.onHitExecute(this.beforeHitCallbacks);
        this.locked = false;
    }

    private static onAfterHit() {
        this.onHitExecute(this.afterHitCallbacks);
        this.locked = false;
    }

    private static isPassingFilters(hitCall: HitCallback, hitContainer: DamageHitContainer) {
        for (let filter of hitCall.filters) {
            if (!filter.runFilter(hitContainer)) {
                return false;
            }
        }
        return true;
    }

    private static onHitExecute(hitCallbacks: HitCallback[]) {
        if (!this.isLocked()) {
            let hitContainer = this.resolveHitContainer();
            for (let hitCall of hitCallbacks) {
                this.locked = true;
                xpcall(() => {
                    if (this.isPassingFilters(hitCall, hitContainer)) {
                        hitCall.callback(hitContainer);
                    }
                }, Logger.LogCritical);
                this.locked = false;
            }
        } else {
            Logger.LogWarning("Circular DDS detected.");
        }
    }

    /*
    STATIC API
     */

    /**
     * Register a callback that recives an object used for getting and manipulating damage data after damage calculations.
     * Includes damage, damagetypes, target, caster, aliasedCaster (if casted by dummy)
     */
    public static registerAfterDamageCalculation(callback: (hitObject: DamageHitContainer) => void) {
        let hitCall = new HitCallback(callback);
        Quick.Push(this.afterHitCallbacks, hitCall);
        return hitCall;
    }

    /**
     * Register a callback that recives an object used for getting and manipulating damage data before damage calculation.
     * Includes damage, damagetypes, target, caster, aliasedCaster (if casted by dummy)
     */
    public static registerBeforeDamageCalculation(callback: (hitObject: DamageHitContainer) => void) {
        let hitCall = new HitCallback(callback);
        Quick.Push(this.beforeHitCallbacks, hitCall);
        return hitCall;
    }
}