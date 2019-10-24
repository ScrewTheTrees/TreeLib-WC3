import {DamageDetectionSystem} from "./TreeLib/DDS/DamageDetectionSystem";
import {Logger} from "./TreeLib/Logger";
import {AttackedPlayerDDSFilter} from "./TreeLib/DDS/Filters/AttackedPlayerDDSFilter";
import {AttackingPlayerDDSFilter} from "./TreeLib/DDS/Filters/AttackingPlayerDDSFilter";
import {AttackingUnitIsHeroDDSFilter} from "./TreeLib/DDS/Filters/AttackingUnitIsHeroDDSFilter";
import {AttackedUnitIsHeroDDSFilter} from "./TreeLib/DDS/Filters/AttackedUnitIsHeroDDSFilter";
import {AttackedPlayersDDSFilter} from "./TreeLib/DDS/Filters/AttackedPlayersDDSFilter";

export class Game {
    constructor() {
        let redHeroAttacksBlueUnit = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("Now, Thats a lot of DAMAGE!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redHeroAttacksBlueUnit.addFilter(new AttackingPlayerDDSFilter(Player(0)));
        redHeroAttacksBlueUnit.addFilter(new AttackingUnitIsHeroDDSFilter());

        redHeroAttacksBlueUnit.addFilter(new AttackedPlayerDDSFilter(Player(1)));
        redHeroAttacksBlueUnit.addFilter(new AttackedUnitIsHeroDDSFilter(true));

        let redAttacksAnyone = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("With the power of flextape!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redAttacksAnyone.addFilter(new AttackingPlayerDDSFilter(Player(0)));
        redAttacksAnyone.addFilter(new AttackedPlayersDDSFilter([Player(1), Player(2)]));
    }
}