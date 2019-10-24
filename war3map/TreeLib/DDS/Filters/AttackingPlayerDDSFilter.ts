import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class AttackingPlayerDDSFilter implements DDSFilter {
    constructor(private attackingPlayer: player) {
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        return (GetOwningPlayer(hitObject.attackingUnit) == this.attackingPlayer);
    }
}