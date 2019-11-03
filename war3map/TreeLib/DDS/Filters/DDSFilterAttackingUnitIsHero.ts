import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterAttackingUnitIsHero implements DDSFilter {
    runFilter(hitObject: DamageHitContainer): boolean {
        return IsUnitType(hitObject.attackingUnit, UNIT_TYPE_HERO);
    }
}