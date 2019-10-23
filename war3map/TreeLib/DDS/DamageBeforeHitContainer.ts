import {DamageHitContainer} from "./DamageHitContainer";
import {StringBuilder} from "../Utility/StringBuilder";

export class DamageBeforeHitContainer extends DamageHitContainer {
    get damageType() {
        return this._damageType;
    }

    set damageType(type: damagetype) {
        this._damageType = type;
        BlzSetEventDamageType(type);
    }

    get attackType() {
        return this._attackType;
    }

    set attackType(type: attacktype) {
        this._attackType = type;
        BlzSetEventAttackType(type);
    }

    get weaponType() {
        return this._weaponType;
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