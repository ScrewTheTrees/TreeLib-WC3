import {Bunkering} from "../TreeLib/Services/Special/Bunker/Bunkering";
import {Vector3} from "../TreeLib/Utility/Data/Vector3";
import {BunkerUnitTypeConfig} from "../TreeLib/Services/Special/Bunker/BunkerUnitTypeConfig";

export class BunkeringTests {
    run() {

        let bunkerUnitTypeConfig = new BunkerUnitTypeConfig(FourCC("h000"))
            .setUnitScale(0.4)
            .setDefaultPosition(0, 0, 170)
            .setIsMoveable(false)
            .setOffsetPositions([
                Vector3.new(20, 20, 170),
                Vector3.new(20, -20, 170),
                Vector3.new(-20, 20, 170),
                Vector3.new(-20, -20, 170),
            ])
            .setUnitFilter((filterUnit => !IsUnitType(filterUnit, UNIT_TYPE_HERO)));

        let bunkerUnitTypeConfig2 = new BunkerUnitTypeConfig(FourCC("h003"))
            .setUnitScale(0.4)
            .setDefaultPosition(0, 0, 160)
            .setIsMoveable(false)
            .setOffsetPositions([
                Vector3.new(-30, 90, 180),
                Vector3.new(30, -90, 180),
                Vector3.new(90, 30, 180),
                Vector3.new(-90, -30, 180),
                Vector3.new(-30, -40, 125),
                Vector3.new(30, 40, 125),
            ])
            .setUnitFilter((filterUnit => !IsUnitType(filterUnit, UNIT_TYPE_HERO)))
            .setOnDummyUnitSpawn((bunkerUnit) => {
                //Attack index 2 doesnt work...
                let range1 = (BlzGetUnitWeaponRealField(bunkerUnit, UNIT_WEAPON_RF_ATTACK_RANGE, 0) * 3);
                SetUnitAcquireRange(bunkerUnit, math.max(range1));
                BlzSetUnitRealField(bunkerUnit, UNIT_RF_ACQUISITION_RANGE, math.max(range1));
                BlzSetUnitWeaponRealField(bunkerUnit, UNIT_WEAPON_RF_ATTACK_RANGE, 1, range1);
            });


        let bunkerUnitTypeConfig3 = new BunkerUnitTypeConfig(FourCC("h004"))
            .setUnitScale(0.5)
            .setDefaultPosition(10, 0, 80)
            .setIsMoveable(true)
            .setOffsetPositions([
                Vector3.new(45, 35, 50),
                Vector3.new(45, -35, 50),
                Vector3.new(-45, 35, 50),
                Vector3.new(-45, -35, 50),
            ])
            .setUnitFilter((filterUnit => !IsUnitType(filterUnit, UNIT_TYPE_HERO)));

        Bunkering.getInstance().addBunkerConfig(bunkerUnitTypeConfig);
        Bunkering.getInstance().addBunkerConfig(bunkerUnitTypeConfig2);
        Bunkering.getInstance().addBunkerConfig(bunkerUnitTypeConfig3);
    }
}