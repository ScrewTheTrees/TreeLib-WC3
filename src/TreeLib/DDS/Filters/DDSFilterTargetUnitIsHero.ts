import {IDDSFilter} from "./IDDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterTargetUnitIsHero implements IDDSFilter {
    runFilter(hitObject: DamageHitContainer): boolean {
        return IsUnitType(hitObject.targetUnit, UNIT_TYPE_HERO);
    }
}