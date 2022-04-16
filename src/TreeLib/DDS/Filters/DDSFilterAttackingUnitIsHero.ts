import {IDDSFilter} from "./IDDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterAttackingUnitIsHero implements IDDSFilter {
    runFilter(hitObject: DamageHitContainer): boolean {
        return IsUnitType(hitObject.attackingUnit, UNIT_TYPE_HERO);
    }
}