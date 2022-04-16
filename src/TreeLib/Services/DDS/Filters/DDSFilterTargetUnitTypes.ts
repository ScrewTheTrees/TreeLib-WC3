import {IDDSFilter} from "./IDDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterTargetUnitTypes implements IDDSFilter {
    private readonly unitTypes: number[];

    constructor(...unitTypes: number[]) {
        this.unitTypes = [...unitTypes];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let myType of this.unitTypes) {
            if (hitObject.targetUnitType == myType) {
                return true;
            }
        }
        return false;
    }
}