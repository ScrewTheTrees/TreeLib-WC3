/**
 * This is just very Miscellaneous functions used for the oddest of purposes.
 */
import {Logger} from "./Logger";

export function ChooseOne<T>(...input: T[]): T {
    let random = GetRandomInt(0, input.length - 1);
    return input[random];
}

export function InverseFourCC(input: number): string {
    return string.pack(">I4", input);
}

export function IsValidUnit(target: unit) {
    return GetUnitTypeId(target) != 0;
}

export function IsUnitAlive(u: unit): boolean {
    return IsValidUnit(u) && !IsUnitType(u, UNIT_TYPE_DEAD);
}

export function IsOfAnyType(buildingType: number, ...targetUnitTypes: number[]): boolean {
    for (let i = 0; i < targetUnitTypes.length; i++) {
        if (buildingType == targetUnitTypes[i]) {
            return true;
        }
    }
    return false;
}

export function TriggerAddXPAction(whichTrigger: trigger, actionFunc: () => void) {
    TriggerAddAction(whichTrigger, () => xpcall(() => actionFunc(), Logger.critical));
}