import {StringBuilder} from "../Utility/StringBuilder";
import {DummyCaster} from "../DummyCasting/DummyCaster";
import {AliasDto} from "../DummyCasting/AliasDto";

export class DamageHitContainer {
    public _rawAttackingUnit: unit;
    public attackingUnit: unit;
    public attackingUnitType: number;
    public targetUnit: unit;
    public targetUnitType: number;
    protected _damageNumber: number;
    protected _damageType: damagetype;
    protected _attackType: attacktype;
    protected _weaponType: weapontype;
    public dummyAlias: AliasDto | undefined;

    constructor() {
        this._rawAttackingUnit = this.dummy();
        this.attackingUnit = this.dummy();
        this.attackingUnitType = this.dummy();
        this.targetUnit = this.dummy();
        this.targetUnitType = this.dummy();
        this._damageNumber = this.dummy();
        this._attackType = this.dummy();
        this._damageType = this.dummy();
        this._weaponType = this.dummy();
        this.dummyAlias = this.dummy();

        this.updateContainer();
    }

    private dummy(): any{
        return null;
    }

    public updateContainer() {
        this._rawAttackingUnit = GetEventDamageSource();
        this.attackingUnit = GetEventDamageSource();
        this.attackingUnitType = GetUnitTypeId(this.attackingUnit);
        this.targetUnit = BlzGetEventDamageTarget();
        this.targetUnitType = GetUnitTypeId(this.targetUnit);
        this._damageNumber = GetEventDamage();
        this._attackType = BlzGetEventAttackType();
        this._damageType = BlzGetEventDamageType();
        this._weaponType = BlzGetEventWeaponType();
        this.dummyAlias = this.dummy();

        if (DummyCaster.getInstance().isUnitAlias(this.attackingUnit)) {
            this.dummyAlias = DummyCaster.getInstance().getUnitAlias(this.attackingUnit);
            this.attackingUnit = this.dummyAlias.credit;
        }
    }

    get attackingPlayer() {
        return GetOwningPlayer(this.attackingUnit);
    }

    get attackedPlayer() {
        return GetOwningPlayer(this.targetUnit);
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
            .append(this.targetUnit)
            .append(", hasDummyAlias: ")
            .append(this.dummyAlias != null)
            .append("}");
        return builder.toString();
    }
}