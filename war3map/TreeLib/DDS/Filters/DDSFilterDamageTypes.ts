import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterDamageTypes implements DDSFilter {
    private readonly damageTypes: damagetype[];

    constructor(...damageTypes: damagetype[]) {
        this.damageTypes = [...damageTypes];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let myType of this.damageTypes) {
            if (hitObject.damageType == myType) {
                return true;
            }
        }
        return false;
    }
}