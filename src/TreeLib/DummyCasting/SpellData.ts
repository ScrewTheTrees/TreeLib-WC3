export class SpellData {
    public readonly abilityType: number;
    public readonly castingUnit: unit;
    public readonly targetUnit: unit;

    constructor() {
        this.abilityType = GetSpellAbilityId();
        this.castingUnit = GetTriggerUnit();
        this.targetUnit = GetSpellTargetUnit();
    }
}