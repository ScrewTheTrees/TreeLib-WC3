import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class AttackedUnitIsHeroDDSFilter implements DDSFilter {
    constructor(private reverse = false) {
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        if (this.reverse) {
            return !IsUnitType(hitObject.attackedUnit, UNIT_TYPE_HERO);
        }
        return IsUnitType(hitObject.attackedUnit, UNIT_TYPE_HERO);
    }
}