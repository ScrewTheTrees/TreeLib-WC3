import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class AttackedPlayerDDSFilter implements DDSFilter {
    constructor(private attackedPlayer: player) {
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        return (GetOwningPlayer(hitObject.attackedUnit) == this.attackedPlayer);
    }
}