import {DamageHitContainer} from "../DamageHitContainer";

export interface DDSFilter {
    runFilter(hitObject: DamageHitContainer): boolean;
}