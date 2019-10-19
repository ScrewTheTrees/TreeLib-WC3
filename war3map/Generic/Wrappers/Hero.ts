import {UnitBuilder} from "./Unit";
import {WeaponIndex} from "../DataContainers/WeaponIndex";

export class Hero extends UnitBuilder {
    constructor(target: unit) {
        super(target);
    }

    public SetStrength(amount: number, isPermanent: boolean): this {
        SetHeroStr(this.target, amount, isPermanent);
        return this;
    }

    public SetAgility(amount: number, isPermanent: boolean): this {
        SetHeroAgi(this.target, amount, isPermanent);
        return this;
    }

    public SetIntelligence(amount: number, isPermanent: boolean): this {
        SetHeroInt(this.target, amount, isPermanent);
        return this;
    }

    public StripLevels(amount: number): this {
        UnitStripHeroLevel(this.target, amount);
        return this;
    }

    public SetXP(xp: number, showGFX: boolean): this {
        SetHeroXP(this.target, xp, showGFX);
        return this;
    }

    public ModifySkillPoints(skillPointDelta: number): this {
        UnitModifySkillPoints(this.target, skillPointDelta);
        return this;
    }

    public AddXP(xp: number, showGFX: boolean): this {
        AddHeroXP(this.target, xp, showGFX);
        return this;
    }

    public AddLevel(level: number, showGFX: boolean): this {
        SetHeroLevel(this.target, level, showGFX);
        return this;
    }

    public SuspendXPGain(doFreeze: boolean): this {
        SuspendHeroXP(this.target, doFreeze);
        return this;
    }

    public SelectHeroSkill(abilityCode: number): this {
        SelectHeroSkill(this.target, abilityCode);
        return this;
    }

    public Revive(x: number, y: number, doGFX: boolean): this {
        ReviveHero(this.target, x, y, doGFX);
        return this;
    }

    public SetProperName(heroProperName: string): this {
        BlzSetHeroProperName(this.target, heroProperName);
        return this;
    }


}