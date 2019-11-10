import {Caster} from "./DummyCaster";

export class AliasDto {
    public credit: unit;
    public casterDummy: Caster | undefined;

    constructor(credit: unit, casterDto?: Caster) {
        this.credit = credit;
        this.casterDummy = casterDto;
    }

}