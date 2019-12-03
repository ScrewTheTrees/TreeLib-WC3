import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterIsAlly implements DDSFilter{
    runFilter(hitObject: DamageHitContainer): boolean {
        return (IsPlayerAlly(hitObject.attackingPlayer, hitObject.attackedPlayer))
    }
}