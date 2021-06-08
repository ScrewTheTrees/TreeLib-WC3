import {StringBuilder} from "../Utility/StringBuilder";

export class DamageHitContainer {
    public _rawAttackingUnit!: unit;
    public attackingUnit!: unit;
    public attackingUnitType!: number;
    public targetUnit!: unit;
    public targetUnitType!: number;
    protected _eventDamage!: number;
    protected _isAttack!: boolean;
    protected _damageType!: damagetype;
    protected _attackType!: attacktype;
    protected _weaponType!: weapontype;

    constructor() {
        this.updateContainer();
    }

    public updateContainer() {
        this._rawAttackingUnit = GetEventDamageSource();
        this.attackingUnit = GetEventDamageSource();
        this.attackingUnitType = GetUnitTypeId(this.attackingUnit);
        this.targetUnit = BlzGetEventDamageTarget();
        this.targetUnitType = GetUnitTypeId(this.targetUnit);
        this._eventDamage = GetEventDamage();
        this._isAttack = BlzGetEventIsAttack();
        this._attackType = BlzGetEventAttackType();
        this._damageType = BlzGetEventDamageType();
        this._weaponType = BlzGetEventWeaponType();
    }

    get attackingPlayer() {
        return GetOwningPlayer(this.attackingUnit);
    }

    get attackedPlayer() {
        return GetOwningPlayer(this.targetUnit);
    }

    get eventDamage() {
        return this._eventDamage;
    }

    set eventDamage(damage: number) {
        this._eventDamage = damage;
        BlzSetEventDamage(damage);
    }

    get isAttack() {
        return this._isAttack;
    }

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
            .append(this._eventDamage)
            .append(", attackingUnit: ")
            .append(this.attackingUnit)
            .append(", attackedUnit: ")
            .append(this.targetUnit)
            .append("}");
        return builder.toString();
    }
}