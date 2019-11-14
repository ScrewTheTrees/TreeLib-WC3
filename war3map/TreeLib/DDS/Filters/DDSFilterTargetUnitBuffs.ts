import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

/**
 * A filter that checks if the target unit has any of the defined buffs.
 * If you want to check if a unit has ALL the buffs you just need to add this filter multiple times.
 */
export class DDSFilterTargetUnitBuffs implements DDSFilter {
    private readonly buffTypes: number[];

    constructor(...damageTypes: number[]) {
        this.buffTypes = [...damageTypes];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let myType of this.buffTypes) {
            if (UnitHasBuffBJ(hitObject.targetUnit, myType)) {
                return true;
            }
        }
        return false;
    }
}