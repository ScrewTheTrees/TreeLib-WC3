import {IDDSFilter} from "./IDDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";

export class DDSFilterIsEnemy implements IDDSFilter{
    runFilter(hitObject: DamageHitContainer): boolean {
        return (IsPlayerEnemy(hitObject.attackingPlayer, hitObject.attackedPlayer))
    }
}