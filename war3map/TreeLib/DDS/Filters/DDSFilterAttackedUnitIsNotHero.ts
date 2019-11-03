import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterAttackedUnitIsNotHero implements DDSFilter {
    runFilter(hitObject: DamageHitContainer): boolean {
        return !IsUnitType(hitObject.attackedUnit, UNIT_TYPE_HERO);
    }
}