import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class AttackingPlayersDDSFilter implements DDSFilter {
    constructor(private attackingPlayers: player[]) {
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let play of this.attackingPlayers) {
            if (GetOwningPlayer(hitObject.attackingUnit) == play) {
                return true;
            }
        }
        return false;
    }
}