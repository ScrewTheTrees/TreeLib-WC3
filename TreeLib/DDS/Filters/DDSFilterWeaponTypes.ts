import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterWeaponTypes implements DDSFilter {
    private readonly weaponTypes: weapontype[];

    constructor(...weaponTypes: weapontype[]) {
        this.weaponTypes = [...weaponTypes];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let myType of this.weaponTypes) {
            if (hitObject.weaponType == myType) {
                return true;
            }
        }
        return false;
    }
}