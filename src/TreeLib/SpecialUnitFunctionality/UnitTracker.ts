/**@NoSelfInFile **/
import {Hooks} from "../Hooks";
import {Quick} from "../Quick";

export namespace UnitTracker {
    const livingUnits: unit[] = [];
    const deadUnits: unit[] = [];
    const summonedUnits: unit[] = [];

    function onUnitCreate(u: unit) {
        print("Added: ", u);
        Quick.Push(livingUnits, u);
    }
    function onDeadCreate(u: unit) {
        print("Added: ", u);
        Quick.Push(deadUnits, u);
    }
    function onUnitRemove(u: unit) {
        print("On unit ")
        let index = livingUnits.indexOf(u);
        if (index >= 0) {
            Quick.Slice(livingUnits, index);
            return;
        }
        index = deadUnits.indexOf(u);
        if (index >= 0) {
            Quick.Slice(deadUnits, index);
            return;
        }
        index = summonedUnits.indexOf(u);
        if (index >= 0) {
            Quick.Slice(summonedUnits, index);
            return;
        }
    }

    Hooks.hookResult<unit>(CreateUnit, onUnitCreate);
    Hooks.hookResult<unit>(CreateUnitByName, onUnitCreate);
    Hooks.hookResult<unit>(CreateUnitAtLoc, onUnitCreate);
    Hooks.hookResult<unit>(CreateUnitAtLocByName, onUnitCreate);
    Hooks.hookResult<unit>(BlzCreateUnitWithSkin, onUnitCreate);

    Hooks.hookResult<unit>(CreateCorpse, onDeadCreate);

    Hooks.hookArguments(RemoveUnit, onUnitRemove);

}

