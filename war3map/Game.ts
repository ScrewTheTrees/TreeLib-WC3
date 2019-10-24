import {DamageDetectionSystem} from "./TreeLib/DDS/DamageDetectionSystem";
import {Logger} from "./TreeLib/Logger";
import {AttackingUnitIsHeroDDSFilter} from "./TreeLib/DDS/Filters/AttackingUnitIsHeroDDSFilter";
import {AttackedUnitIsHeroDDSFilter} from "./TreeLib/DDS/Filters/AttackedUnitIsHeroDDSFilter";
import {AttackedPlayersDDSFilter} from "./TreeLib/DDS/Filters/AttackedPlayersDDSFilter";
import {AttackingPlayersDDSFilter} from "./TreeLib/DDS/Filters/AttackingPlayersDDSFilter";
import {Delay} from "./TreeLib/Utility/Delay";
import {DummyCaster} from "./TreeLib/DummyCasting/DummyCaster";
import {Players} from "./TreeLib/Structs/Players";

export class Game {
    constructor() {
        Logger.doLogVerbose = true;

        let redHeroAttacksBlueUnit = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("Now, Thats a lot of DAMAGE!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redHeroAttacksBlueUnit.addFilter(AttackingPlayersDDSFilter.RED);
        redHeroAttacksBlueUnit.addFilter(new AttackingUnitIsHeroDDSFilter());

        redHeroAttacksBlueUnit.addFilter(AttackedPlayersDDSFilter.BLUE);
        redHeroAttacksBlueUnit.addFilter(new AttackedUnitIsHeroDDSFilter(true));

        let redAttacksAnyone = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("With the power of flextape!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redAttacksAnyone.addFilter(AttackingPlayersDDSFilter.RED);
        redAttacksAnyone.addFilter(new AttackedPlayersDDSFilter(Players.BLUE, Players.TEAL));

        Delay.getInstance().addDelay(() => {
            DummyCaster.getInstance().castAtUnitInstant(FourCC("ACf3"),
                "fingerofdeath", _G["gg_unit_hkni_0010"], _G["gg_unit_Hamg_0003"]);
        }, 5);
    }
}