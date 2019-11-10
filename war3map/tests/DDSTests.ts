import {DamageDetectionSystem} from "../TreeLib/DDS/DamageDetectionSystem";
import {Logger} from "../TreeLib/Logger";
import {DDSFilterAttackingPlayers} from "../TreeLib/DDS/Filters/DDSFilterAttackingPlayers";
import {DDSFilterAttackingUnitIsHero} from "../TreeLib/DDS/Filters/DDSFilterAttackingUnitIsHero";
import {DDSFilterTargetUnitPlayers} from "../TreeLib/DDS/Filters/DDSFilterTargetUnitPlayers";
import {DDSFilterTargetUnitIsNotHero} from "../TreeLib/DDS/Filters/DDSFilterTargetUnitIsNotHero";
import {Players} from "../TreeLib/Structs/Players";
import {Unit} from "../TreeLib/Wrappers/Unit";
import {assertTrue} from "./Testing";

export class DDSTests {
    constructor() {
        let redHeroAttacksBlueUnit = DamageDetectionSystem.getInstance().registerBeforeDamageCalculation((hitObject) => {
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

    run() {
        xpcall(() => {
            let arch = CreateUnit(Players.RED, FourCC("Hamg"), 0, 0, 0);
            let foot = new Unit(CreateUnit(Players.BLUE, FourCC("hfoo"), 0, 0, 0));
            UnitDamageTarget(arch, foot.wrappedUnit, 100, true, true, ATTACK_TYPE_CHAOS, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS);
            assertTrue(foot.health < foot.maxHealth - 175);

            RemoveUnit(arch);
            RemoveUnit(foot.wrappedUnit);

            arch = CreateUnit(Players.BLUE, FourCC("Hamg"), 0, 0, 0);
            foot = new Unit(CreateUnit(Players.RED, FourCC("hfoo"), 0, 0, 0));
            UnitDamageTarget(arch, foot.wrappedUnit, 100, true, true, ATTACK_TYPE_CHAOS, DAMAGE_TYPE_NORMAL, WEAPON_TYPE_WHOKNOWS);
            assertTrue(foot.health >= foot.maxHealth - 100);

            RemoveUnit(arch);
            RemoveUnit(foot.wrappedUnit);
        }, (...args) => Logger.LogCritical(...args));
    }
}