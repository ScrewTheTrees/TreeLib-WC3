import {SpellData} from "./SpellData";

export class EffectContainer {
    public abilityType: number;
    public onTrigger: (data: SpellData) => void;
    public filter?: (data: SpellData) => boolean;

    constructor(abilityType: number, onTrigger: (data: SpellData) => void, filter?: (data: SpellData) => boolean) {
        this.abilityType = abilityType;
        this.onTrigger = onTrigger;
        this.filter = filter;
    }

    public passFilter(spellData: SpellData): boolean {
        if (this.filter != undefined) {
            return this.filter(spellData);
        }

        return true;
    }
}