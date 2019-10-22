import {Unit} from "./Unit";

export class Hero extends Unit {
    constructor(wrappedUnit: unit) {
        super(wrappedUnit);
    }

    public SetStrength(amount: number, isPermanent: boolean): this {
        SetHeroStr(this.wrappedUnit, amount, isPermanent);
        return this;
    }

    public SetAgility(amount: number, isPermanent: boolean): this {
        SetHeroAgi(this.wrappedUnit, amount, isPermanent);
        return this;
    }

    public SetIntelligence(amount: number, isPermanent: boolean): this {
        SetHeroInt(this.wrappedUnit, amount, isPermanent);
        return this;
    }

    public StripLevels(amount: number): this {
        UnitStripHeroLevel(this.wrappedUnit, amount);
        return this;
    }

    public SetXP(xp: number, showGFX: boolean): this {
        SetHeroXP(this.wrappedUnit, xp, showGFX);
        return this;
    }

    public ModifySkillPoints(skillPointDelta: number): this {
        UnitModifySkillPoints(this.wrappedUnit, skillPointDelta);
        return this;
    }

    public AddXP(xp: number, showGFX: boolean): this {
        AddHeroXP(this.wrappedUnit, xp, showGFX);
        return this;
    }

    public AddLevel(level: number, showGFX: boolean): this {
        SetHeroLevel(this.wrappedUnit, level, showGFX);
        return this;
    }

    public SuspendXPGain(doFreeze: boolean): this {
        SuspendHeroXP(this.wrappedUnit, doFreeze);
        return this;
    }

    public SelectHeroSkill(abilityCode: number): this {
        SelectHeroSkill(this.wrappedUnit, abilityCode);
        return this;
    }

    public Revive(x: number, y: number, doGFX: boolean): this {
        ReviveHero(this.wrappedUnit, x, y, doGFX);
        return this;
    }

    public SetProperName(heroProperName: string): this {
        BlzSetHeroProperName(this.wrappedUnit, heroProperName);
        return this;
    }


}