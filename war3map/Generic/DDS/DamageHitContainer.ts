import {DummyCaster} from "../DummyCasting/DummyCaster";

export class DamageHitContainer {
    public readonly damageNumber: number;
    public readonly actualUnit: unit;
    public readonly attackingUnit: unit;
    public readonly attackedUnit: unit;
    public readonly damageType: damagetype;

    private constructor(damageNumber: number, actualUnit: unit, attackingUnit: unit, attackedUnit: unit, damageType: damagetype) {
        this.damageNumber = damageNumber;
        this.actualUnit = actualUnit;
        this.attackingUnit = attackingUnit;
        this.attackedUnit = attackedUnit;
        this.damageType = damageType;
    }

    public static fromCurrentEvent() {
        let damageNumber = GetEventDamage();
        let actualUnit = GetEventDamageSource();
        let attackingUnit = GetEventDamageSource();
        let attackedUnit = BlzGetEventDamageTarget();
        let damageType = BlzGetEventDamageType();

        if (DummyCaster.getInstance().isUnitAlias(attackingUnit)) {
            attackingUnit = DummyCaster.getInstance().getUnitCredited(attackingUnit)
        }

        return new DamageHitContainer(damageNumber, actualUnit, attackingUnit, attackedUnit, damageType);
    }
}