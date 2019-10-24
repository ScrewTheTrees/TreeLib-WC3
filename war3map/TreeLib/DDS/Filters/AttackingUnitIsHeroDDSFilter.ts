import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class AttackingUnitIsHeroDDSFilter implements DDSFilter {
    constructor(private reverse = false) {
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        if (this.reverse) {
            return !IsUnitType(hitObject.attackingUnit, UNIT_TYPE_HERO);
        }
        return IsUnitType(hitObject.attackingUnit, UNIT_TYPE_HERO);
    }
}