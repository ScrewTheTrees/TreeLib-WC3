import {IRecyclable} from "../../../Utility/Data/IRecyclable";
import {BunkerUnitTypeConfig} from "./BunkerUnitTypeConfig";
import {Quick} from "../../../Quick";
import {Logger} from "../../../Logger";
import {UnitTransfer} from "../../Transference/UnitTransfer";

export class BunkerUnitContainer implements IRecyclable {
    private constructor(bunkerUnit: unit, typeConfig: BunkerUnitTypeConfig) {
        this.bunkerUnit = bunkerUnit;
        this.typeConfig = typeConfig;
    }

    public bunkerUnit: unit;
    public typeConfig: BunkerUnitTypeConfig;
    public bunkeredUnits: unit[] = [];
    public bunkeredMapping: Map<unit, unit> = new Map();
    public bunkeredIndexMapping: (unit | undefined)[] = [];

    public currentStopDelayTimer: number = 0;


    public addUnit(u: unit) {
        if (this.typeConfig.unitFilter && !this.typeConfig.unitFilter(u)) return;

        if (!Quick.Contains(this.bunkeredUnits, u)) {
            Quick.Push(this.bunkeredUnits, u);

            let bunkered = UnitTransfer.deepCopyUnit(u);
            this.bunkeredMapping.set(u, bunkered);

            let index = 0;
            while (this.bunkeredIndexMapping[index] != null) {
                index++;
            }
            this.bunkeredIndexMapping[index] = u;
            let positionFor = this.typeConfig.getPositionFor(index)

            let skin = BlzGetUnitSkin(u)
            BlzSetUnitSkin(bunkered, skin);

            UnitAddAbility(bunkered, FourCC("Aloc"));
            UnitAddAbility(bunkered, FourCC("Avul"));

            UnitAddAbility(bunkered, FourCC("Amrf"));
            UnitRemoveAbility(bunkered, FourCC("Amrf"));

            BlzSetUnitMaxMana(bunkered, 0);
            SetUnitFlyHeight(bunkered, positionFor.z, 0);
            SetUnitPropWindow(bunkered, 0);

            SetUnitUseFood(bunkered, false);

            if (this.typeConfig.unitScale) {
                SetUnitScale(bunkered, this.typeConfig.unitScale, this.typeConfig.unitScale, this.typeConfig.unitScale);
            }

            SetUnitX(bunkered, GetUnitX(this.bunkerUnit) + positionFor.x);
            SetUnitY(bunkered, GetUnitY(this.bunkerUnit) + positionFor.y);

            if (this.typeConfig.onDummyUnitSpawn) {
                this.typeConfig.onDummyUnitSpawn(bunkered);
            }

        } else {
            Logger.warning("Trying to add unit to a bunker where its already present.");
        }
    }

    public removeUnit(u: unit) {
        if (Quick.Contains(this.bunkeredUnits, u)) {
            Quick.Remove(this.bunkeredUnits, u);
            let unit = this.bunkeredMapping.get(u);
            if (unit) {
                this.bunkeredMapping.delete(u);
                for (let i = 0; i < 12; i++) {
                    if (this.bunkeredIndexMapping[i] == u) {
                        this.bunkeredIndexMapping[i] = undefined;
                        break;
                    }
                }
                RemoveUnit(unit);
            }
        } else {
            Logger.warning("Trying to remove unit from bunker that is not inside the bunker.");
        }
    }

    public getIndexMappingByUnit(u: unit) {
        for (let i = 0; i < 12; i++) {
            if (this.bunkeredIndexMapping[i] == u) {
                return i;
            }
        }
        return -1;
    }


    // API to allow extending this class more easily to change behavior.
    public tweakDirection(direction: number, u: unit) {
        direction += GetUnitFacing(this.bunkerUnit);
        return direction % 360;
    }
    public tweakDistance(distance: number, u: unit) {
        return distance;
    }


    //Stash Stuff
    private static stash: BunkerUnitContainer[] = [];
    public static new(bunkerUnit: unit, typeConfig: BunkerUnitTypeConfig): BunkerUnitContainer {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(bunkerUnit, typeConfig);
        else return new BunkerUnitContainer(bunkerUnit, typeConfig)
    }
    public static recycle(p: BunkerUnitContainer) {
        p.bunkeredMapping.clear();
        Quick.Clear(p.bunkeredUnits);
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        BunkerUnitContainer.recycle(this);
        return this;
    }
    public updateTo(bunkerUnit: unit, typeConfig: BunkerUnitTypeConfig) {
        this.bunkerUnit = bunkerUnit;
        this.typeConfig = typeConfig;
        return this;
    }
}