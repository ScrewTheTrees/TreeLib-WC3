import {DamageHitContainer} from "./DamageHitContainer";
import {StringBuilder} from "../Utility/StringBuilder";

export class DamageBeforeHitContainer extends DamageHitContainer {
    set damageType(type: damagetype) {
        this._damageType = type;
        BlzSetEventDamageType(type);
    }

    set attackType(type: attacktype) {
        this._attackType = type;
        BlzSetEventAttackType(type);
    }

    set weaponType(type: weapontype) {
        this._weaponType = type;
        BlzSetEventWeaponType(type);
    }

    public toString(): string {
        let builder = new StringBuilder();
        builder.append("{")
            .append("damageNumber: ")
            .append(this._damageNumber)
            .append(", attackingUnit: ")
            .append(this.attackingUnit)
            .append(", attackedUnit: ")
            .append(this.attackedUnit)
            .append("}");
        return builder.toString();
    }
}