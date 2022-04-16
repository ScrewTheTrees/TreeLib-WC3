import {IDDSFilter} from "./IDDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterIsAlly implements IDDSFilter{
    runFilter(hitObject: DamageHitContainer): boolean {
        return (IsPlayerAlly(hitObject.attackingPlayer, hitObject.attackedPlayer))
    }
}