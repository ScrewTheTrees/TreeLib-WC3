import {DummyCaster} from "../DummyCasting/DummyCaster";
import {StringBuilder} from "../Utility/StringBuilder";

export class DamageHitContainer {
    public readonly actualUnit: unit;
    public readonly attackingUnit: unit;
    public readonly attackedUnit: unit;
    protected _damageNumber: number;
    protected _damageType: damagetype;
    protected _attackType: attacktype;
    protected _weaponType: weapontype;

    constructor() {
        this.actualUnit = GetEventDamageSource();
        this.attackingUnit = GetEventDamageSource();
        this.attackedUnit = BlzGetEventDamageTarget();
        this._damageNumber = GetEventDamage();
        this._attackType = BlzGetEventAttackType();
        this._damageType = BlzGetEventDamageType();
        this._weaponType = BlzGetEventWeaponType();

        if (DummyCaster.getInstance().isUnitAlias(this.attackingUnit)) {
            this.attackingUnit = DummyCaster.getInstance().getActualUnit(this.attackingUnit)
        }
    }

    get eventDamage() {
        return this._damageNumber;
    }

    set eventDamage(damage: number) {
        this._damageNumber = damage;
        BlzSetEventDamage(damage);
    }

    get damageType() {
        return this._damageType;
    }
    get attackType() {
        return this._attackType;
    }
    get weaponType() {
        return this._weaponType;
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