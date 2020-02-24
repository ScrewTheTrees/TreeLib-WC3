import {SpellData} from "./SpellData";

export class OnCastContainer {
    public abilityTypes: number[];
    public onTrigger: (data: SpellData) => void;
    public filter?: (data: SpellData) => boolean;

    constructor(abilityTypes: number[], onTrigger: (data: SpellData) => void, filter?: (data: SpellData) => boolean) {
        this.abilityTypes = abilityTypes;
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