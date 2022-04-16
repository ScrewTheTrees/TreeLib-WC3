import {DamageDetectionSystem} from "../TreeLib/Services/DDS/DamageDetectionSystem";
import {Logger} from "../TreeLib/Logger";
import {DDSFilterAttackingPlayers} from "../TreeLib/Services/DDS/Filters/DDSFilterAttackingPlayers";
import {DDSFilterAttackingUnitIsHero} from "../TreeLib/Services/DDS/Filters/DDSFilterAttackingUnitIsHero";
import {DDSFilterTargetUnitPlayers} from "../TreeLib/Services/DDS/Filters/DDSFilterTargetUnitPlayers";
import {DDSFilterTargetUnitIsNotHero} from "../TreeLib/Services/DDS/Filters/DDSFilterTargetUnitIsNotHero";

export class DDSTests {
    run() {
        let redHeroAttacksBlueUnit = DamageDetectionSystem.registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            Logger.LogDebug("Now, Thats a lot of DAMAGE!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redHeroAttacksBlueUnit.addFilter(DDSFilterAttackingPlayers.RED);
        redHeroAttacksBlueUnit.addFilter(new DDSFilterAttackingUnitIsHero());

        redHeroAttacksBlueUnit.addFilter(DDSFilterTargetUnitPlayers.BLUE);
        redHeroAttacksBlueUnit.addFilter(new DDSFilterTargetUnitIsNotHero());
    }
}