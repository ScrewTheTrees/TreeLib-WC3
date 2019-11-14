import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterAttackTypes implements DDSFilter {
    private readonly attackTypes: attacktype[];

    constructor(...attackTypes: attacktype[]) {
        this.attackTypes = [...attackTypes];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let myType of this.attackTypes) {
            if (hitObject.attackType == myType) {
                return true;
            }
        }
        return false;
    }
}