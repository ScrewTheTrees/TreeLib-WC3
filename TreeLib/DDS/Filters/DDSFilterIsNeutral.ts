import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterIsNeutral implements DDSFilter{
    runFilter(hitObject: DamageHitContainer): boolean {
        return (!IsPlayerEnemy(hitObject.attackingPlayer, hitObject.attackedPlayer)
            && !IsPlayerAlly(hitObject.attackingPlayer, hitObject.attackedPlayer))
    }
}