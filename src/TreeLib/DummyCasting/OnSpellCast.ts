import {Hooks} from "../Hooks";
import {EffectContainer} from "./EffectContainer";
import {SpellData} from "./SpellData";
import {DummyCaster} from "./DummyCaster";

export class OnSpellCast {
    private static instance: OnSpellCast;
    private onSpellCast: trigger = CreateTrigger();
    private registeredSpells: EffectContainer[] = [];

    constructor() {
        for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
            TriggerRegisterPlayerUnitEvent(this.onSpellCast, Player(i), EVENT_PLAYER_UNIT_SPELL_EFFECT, null);
            TriggerAddAction(this.onSpellCast, () => {
                this.onSpellEffect(new SpellData());
            });
        }
    }

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new OnSpellCast();
            Hooks.set("CastReplacer", this.instance);
        }
        return this.instance;
    }

    /*
    STATIC API
     */
    public static addSpell(container: EffectContainer) {
        this.getInstance().addSpell(container);
    }

    public static makeBasicTargetReplacement(fromType: number, toType: number, orderString: string) {
        let container = new EffectContainer(fromType, (data) => {
            DummyCaster.castAtWidgetInstant(toType, orderString, data.targetUnit, data.castingUnit);
        });
        this.addSpell(container);
    }

    public addSpell(container: EffectContainer) {
        this.registeredSpells.push(container);
    }

    private onSpellEffect(spell: SpellData) {
        for (let i = 0; i < this.registeredSpells.length; i++) {
            let value = this.registeredSpells[i];
            if (value.abilityType == spell.abilityType) {
                if (value.passFilter(spell)) {
                    value.onTrigger(spell);
                }
            }
        }
    }
}

