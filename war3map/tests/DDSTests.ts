import {DamageDetectionSystem} from "../TreeLib/DDS/DamageDetectionSystem";
import {Logger} from "../TreeLib/Logger";
import {DDSFilterAttackingPlayers} from "../TreeLib/DDS/Filters/DDSFilterAttackingPlayers";
import {DDSFilterAttackingUnitIsHero} from "../TreeLib/DDS/Filters/DDSFilterAttackingUnitIsHero";
import {DDSFilterTargetUnitPlayers} from "../TreeLib/DDS/Filters/DDSFilterTargetUnitPlayers";
import {DDSFilterTargetUnitIsNotHero} from "../TreeLib/DDS/Filters/DDSFilterTargetUnitIsNotHero";

export class DDSTests {
    run() {
        let redHeroAttacksBlueUnit = DamageDetectionSystem.registerBeforeDamageCalculation((hitObject) => {
            hitObject.eventDamage *= 2;
            if (hitObject.dummyAlias != undefined && hitObject.dummyAlias.casterDummy != undefined) {
                Logger.LogDebug("Its a : ");
                Logger.LogDebug(hitObject.dummyAlias.casterDummy.lastAbility + " - " + GetAbilityName(hitObject.dummyAlias.casterDummy.lastAbility));
            }
            Logger.LogDebug("Now, Thats a lot of DAMAGE!");
            Logger.LogDebug(hitObject.eventDamage);
        });

        redHeroAttacksBlueUnit.addFilter(DDSFilterAttackingPlayers.RED);
        redHeroAttacksBlueUnit.addFilter(new DDSFilterAttackingUnitIsHero());

        redHeroAttacksBlueUnit.addFilter(DDSFilterTargetUnitPlayers.BLUE);
        redHeroAttacksBlueUnit.addFilter(new DDSFilterTargetUnitIsNotHero());
    }
}