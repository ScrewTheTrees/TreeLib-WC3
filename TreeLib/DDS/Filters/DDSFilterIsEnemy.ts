import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterIsEnemy implements DDSFilter{
    runFilter(hitObject: DamageHitContainer): boolean {
        return (IsPlayerEnemy(hitObject.attackingPlayer, hitObject.attackedPlayer))
    }
}