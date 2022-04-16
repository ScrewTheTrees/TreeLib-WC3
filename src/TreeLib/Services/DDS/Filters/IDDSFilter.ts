import {DamageHitContainer} from "../DamageHitContainer";

export interface IDDSFilter {
    runFilter(hitObject: DamageHitContainer): boolean;
}