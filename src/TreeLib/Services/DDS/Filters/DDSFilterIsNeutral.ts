import {IDDSFilter} from "./IDDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterIsNeutral implements IDDSFilter{
    runFilter(hitObject: DamageHitContainer): boolean {
        return (!IsPlayerEnemy(hitObject.attackingPlayer, hitObject.attackedPlayer)
            && !IsPlayerAlly(hitObject.attackingPlayer, hitObject.attackedPlayer))
    }
}