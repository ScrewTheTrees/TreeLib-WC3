import {SpellData} from "./SpellData";

export class OnCastContainer {
    public abilityTypes: number[];
    public onTrigger: (data: SpellData) => void;
    public filter?: (data: SpellData) => boolean;

    constructor(abilityTypes: number[], onTrigger: (this: any, data: SpellData) => void, filter?: (this: any, data: SpellData) => boolean) {
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