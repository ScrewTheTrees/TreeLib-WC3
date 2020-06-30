/**@NoSelfInFile **/
/*
DO NOT CURRENTLY USE THIS, HIGHLY UNFINISHED!
*/

/*
import {Hooks} from "../Hooks";
import {Quick} from "../Quick";
import {Logger} from "../Logger";
import {IsValidUnit} from "../Misc";

export class UnitTracker {
    public static livingUnits: unit[] = [];
    public static deadUnits: unit[] = [];
    public static summonedUnits: unit[] = [];

    public static triggerUnitDeath = CreateTrigger();
    public static triggerUnitTrained = CreateTrigger();
    public static triggerUnitSummoned = CreateTrigger();

    public static getAllUnits() {
        return [...this.livingUnits, ...this.deadUnits, ...this.summonedUnits];
    }

    public static killUnit(u: unit) {
        Logger.warning("Moved unit from living to dead: ", u);
        Quick.Slice(this.livingUnits, this.livingUnits.indexOf(u));
        //Event handles dead adding
    }

    public static removeFromAll(u: unit): boolean {
        if (this.removeLivingUnit(u)) return true;
        else if (this.removeDeadUnit(u)) return true;
        else if (this.removeSummonedUnit(u)) return true;

        return false;
    }

    public static removeLivingUnit(u: unit): boolean {
        let index = UnitTracker.livingUnits.indexOf(u);
        if (index >= 0) {
            Quick.Slice(UnitTracker.livingUnits, index);
            return true;
        }
        return false;
    }

    public static removeDeadUnit(u: unit): boolean {
        let index = UnitTracker.deadUnits.indexOf(u);
        if (index >= 0) {
            Quick.Slice(UnitTracker.deadUnits, index);
            return true;
        }
        return false;
    }

    public static removeSummonedUnit(u: unit): boolean {
        let index = UnitTracker.summonedUnits.indexOf(u);
        if (index >= 0) {
            Quick.Slice(UnitTracker.summonedUnits, index);
            return true;
        }
        return false;
    }

    public static onUnitCreate(u: unit) {
        Logger.verbose("Added to tracking: ", u);
        Quick.Push(UnitTracker.livingUnits, u);
    }

    public static onDeadCreate(u: unit) {
        Logger.verbose("Added Dead to tracking: ", u);
        if (IsValidUnit(u))
            Quick.Push(UnitTracker.deadUnits, u);
    }
}

// @ts-ignore
main = Hooks.hookArguments(main, () => {
    TriggerRegisterAnyUnitEventBJ(UnitTracker.triggerUnitDeath, EVENT_PLAYER_UNIT_DEATH);
    TriggerAddAction(UnitTracker.triggerUnitDeath, () => UnitTracker.killUnit(GetDyingUnit()));
    TriggerRegisterAnyUnitEventBJ(UnitTracker.triggerUnitTrained, EVENT_PLAYER_UNIT_TRAIN_FINISH);
    TriggerAddAction(UnitTracker.triggerUnitDeath, () => UnitTracker.onDeadCreate(GetTrainedUnit()));
    TriggerRegisterAnyUnitEventBJ(UnitTracker.triggerUnitSummoned, EVENT_PLAYER_UNIT_SUMMON);
    TriggerAddAction(UnitTracker.triggerUnitSummoned, () => UnitTracker.onDeadCreate(GetSummonedUnit()));
});

// @ts-ignore
CreateUnit = Hooks.hookResult<unit>(CreateUnit, (u: unit) => UnitTracker.onUnitCreate(u));
// @ts-ignore
CreateUnitByName = Hooks.hookResult<unit>(CreateUnitByName, (u: unit) => UnitTracker.onUnitCreate(u));
// @ts-ignore
CreateUnitAtLoc = Hooks.hookResult<unit>(CreateUnitAtLoc, (u: unit) => UnitTracker.onUnitCreate(u));
// @ts-ignore
CreateUnitAtLocByName = Hooks.hookResult<unit>(CreateUnitAtLocByName, (u: unit) => UnitTracker.onUnitCreate(u));
// @ts-ignore
BlzCreateUnitWithSkin = Hooks.hookResult<unit>(BlzCreateUnitWithSkin, (u: unit) => UnitTracker.onUnitCreate(u));

// @ts-ignore
CreateCorpse = Hooks.hookResult<unit>(CreateCorpse, (u: unit) => UnitTracker.onDeadCreate(u));

// @ts-ignore
KillUnit = Hooks.hookArguments(KillUnit, (u: unit) => UnitTracker.killUnit(u));

// @ts-ignore
RemoveUnit = Hooks.hookArguments(RemoveUnit, (u: unit) => UnitTracker.removeFromAll(u));
*/