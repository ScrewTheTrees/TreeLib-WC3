import {IDDSFilter} from "./IDDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterAttackingUnitIsNotHero implements IDDSFilter {
    runFilter(hitObject: DamageHitContainer): boolean {
        return !IsUnitType(hitObject.attackingUnit, UNIT_TYPE_HERO);
    }
}