import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class AttackedPlayersDDSFilter implements DDSFilter {
    constructor(private attackedPlayers: player[]) {
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let play of this.attackedPlayers) {
            if (GetOwningPlayer(hitObject.attackedUnit) == play) {
                return true;
            }
        }
        return false;
    }
}