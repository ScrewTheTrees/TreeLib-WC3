import {Unit} from "./Unit";

export class Hero extends Unit {
    constructor(wrappedUnit: unit) {
        super(wrappedUnit);
    }

    public SetStrength(amount: number, isPermanent: boolean) {
        SetHeroStr(this.wrappedUnit, amount, isPermanent);
    }

    public SetAgility(amount: number, isPermanent: boolean) {
        SetHeroAgi(this.wrappedUnit, amount, isPermanent);
    }

    public SetIntelligence(amount: number, isPermanent: boolean) {
        SetHeroInt(this.wrappedUnit, amount, isPermanent);
    }

    public StripLevels(amount: number) {
        UnitStripHeroLevel(this.wrappedUnit, amount);
    }

    public SetXP(xp: number, showGFX: boolean) {
        SetHeroXP(this.wrappedUnit, xp, showGFX);
    }

    public ModifySkillPoints(skillPointDelta: number) {
        UnitModifySkillPoints(this.wrappedUnit, skillPointDelta);
    }

    public AddXP(xp: number, showGFX: boolean) {
        AddHeroXP(this.wrappedUnit, xp, showGFX);
    }

    public AddLevel(level: number, showGFX: boolean) {
        SetHeroLevel(this.wrappedUnit, level, showGFX);
    }

    public SuspendXPGain(doFreeze: boolean) {
        SuspendHeroXP(this.wrappedUnit, doFreeze);
    }

    public SelectHeroSkill(abilityCode: number) {
        SelectHeroSkill(this.wrappedUnit, abilityCode);
    }

    public Revive(x: number, y: number, doGFX: boolean) {
        ReviveHero(this.wrappedUnit, x, y, doGFX);
    }

    set heroProperName(heroProperName: string) {
        BlzSetHeroProperName(this.wrappedUnit, heroProperName);
    }
    get heroProperName() {
        return GetHeroProperName(this.wrappedUnit);
    }
}