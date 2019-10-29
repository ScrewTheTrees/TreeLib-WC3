import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class AttackingUnitTypesDDSFilter implements DDSFilter {
    private readonly unitTypes: number[];

    constructor(...unitTypes: number[]) {
        this.unitTypes = [...unitTypes];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let myType of this.unitTypes) {
            if (GetUnitTypeId(hitObject.attackingUnit) == myType) {
                return true;
            }
        }
        return false;
    }
}