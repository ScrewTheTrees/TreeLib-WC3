import {HeroAttack} from "../AttackControllers/HeroAttack";

export class HeroUnit {
    public static HERO_POTM: HeroUnit = new HeroUnit("E000", 6, new HeroAttack(0.6, 0.4));

    public readonly attackSpellId: number = FourCC("A000");
    public readonly attackSpellOrderString: string = "farsight";
    public readonly unitType: number;
    public readonly walkAnimationIndex: number;
    public readonly heroAttack: HeroAttack;

    constructor(unitType: string, walkAnimationIndex: number, heroAttack: HeroAttack) {
        this.unitType = FourCC(unitType);
        this.walkAnimationIndex = walkAnimationIndex;
        this.heroAttack = heroAttack;
    }
}