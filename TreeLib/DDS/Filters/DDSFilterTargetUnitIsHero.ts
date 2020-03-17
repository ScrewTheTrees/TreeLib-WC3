import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterTargetUnitIsHero implements DDSFilter {
    runFilter(hitObject: DamageHitContainer): boolean {
        return IsUnitType(hitObject.targetUnit, UNIT_TYPE_HERO);
    }
}