import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

/**
 * A filter that checks if the attacking unit thas any of he defined buffs.
 * If you want to check if a unit has ALL the buffs you just need to add this filter multiple times.
 */
export class DDSFilterAttackingUnitBuffs implements DDSFilter {
    private readonly buffTypes: number[];

    constructor(...buffTypes: number[]) {
        this.buffTypes = [...buffTypes];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let myType of this.buffTypes) {
            if (UnitHasBuffBJ(hitObject.attackingUnit, myType)) {
                return true;
            }
        }
        return false;
    }
}