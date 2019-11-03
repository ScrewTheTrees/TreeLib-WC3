import {DamageDetectionSystem} from "../TreeLib/DDS/DamageDetectionSystem";
import {Logger} from "../TreeLib/Logger";
import {DDSFilterAttackingPlayers} from "../TreeLib/DDS/Filters/DDSFilterAttackingPlayers";
import {DDSFilterAttackingUnitIsHero} from "../TreeLib/DDS/Filters/DDSFilterAttackingUnitIsHero";
import {DDSFilterAttackedPlayers} from "../TreeLib/DDS/Filters/DDSFilterAttackedPlayers";
import {DDSFilterAttackingUnitIsNotHero} from "../TreeLib/DDS/Filters/DDSFilterAttackingUnitIsNotHero";

export class DDSTests {
    run() {
        let redHeroAttacksBlueUnit = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("Now, Thats a lot of DAMAGE!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redHeroAttacksBlueUnit.addFilter(DDSFilterAttackingPlayers.RED);
        redHeroAttacksBlueUnit.addFilter(new DDSFilterAttackingUnitIsHero());

        redHeroAttacksBlueUnit.addFilter(DDSFilterAttackedPlayers.BLUE);
        redHeroAttacksBlueUnit.addFilter(new DDSFilterAttackingUnitIsNotHero());
    }
}