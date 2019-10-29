import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class IsAllyDDSFilter implements DDSFilter{
    runFilter(hitObject: DamageHitContainer): boolean {
        return (IsPlayerAlly(hitObject.attackingPlayer, hitObject.attackedPlayer))
    }
}