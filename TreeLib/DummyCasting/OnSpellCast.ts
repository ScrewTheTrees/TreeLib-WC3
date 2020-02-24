import {Hooks} from "../Hooks";
import {OnCastContainer} from "./OnCastContainer";
import {SpellData} from "./SpellData";
import {DummyCaster} from "./DummyCaster";
import {Quick} from "../Quick";

export class OnSpellCast {
    private static instance: OnSpellCast;
    private onSpellCast: trigger = CreateTrigger();
    private registeredSpells: OnCastContainer[] = [];

    constructor() {
        for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
            TriggerRegisterPlayerUnitEvent(this.onSpellCast, Player(i), EVENT_PLAYER_UNIT_SPELL_EFFECT, null);
        }
        TriggerAddAction(this.onSpellCast, () => {
            this.onSpellEffect(new SpellData());
        });
    }

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new OnSpellCast();
            Hooks.set(this.name, this.instance);
        }
        return this.instance;
    }

    public addSpell(container: OnCastContainer) {
        Quick.Push(this.registeredSpells, container);
        return OnCastContainer;
    }

    private onSpellEffect(spell: SpellData) {
        for (let i = 0; i < this.registeredSpells.length; i++) {
            let value = this.registeredSpells[i];
            if (value.abilityTypes.indexOf(spell.abilityType) >= 0 || value.abilityTypes.length == 0) {
                if (value.passFilter(spell)) {
                    value.onTrigger(spell);
                }
            }
        }
    }

    //STATIC API
    public static addSpell(container: OnCastContainer) {
        return this.getInstance().addSpell(container);
    }

    public static makeBasicTargetReplacement(fromType: number, toType: number, orderString: string) {
        let container = new OnCastContainer([fromType], (data) => {
            DummyCaster.castAtWidgetInstant(toType, orderString, data.targetUnit, data.castingUnit);
        });
        return this.addSpell(container);
    }


}

