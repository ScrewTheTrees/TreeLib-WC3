import {Hooks} from "../Hooks";
import {Entity} from "../Entity";
import {Logger} from "../Logger";
import {Unit} from "../Wrappers/Unit";
import {WeaponIndex} from "../Wrappers/WeaponIndex";
import {Point} from "../Utility/Point";

export class DummyCaster extends Entity {
    private static instance: DummyCaster;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new DummyCaster();
            Hooks.set("DummyCaster", this.instance);
        }
        return this.instance;
    }

    private allCasters: Caster[] = [];
    private aliases: any = {};
    public unitTypeBase = "hgyr";

    public addAlias(caster: unit, credit: unit) {
        this.aliases[GetHandleId(caster)] = credit;
    }

    public removeAlias(caster: unit) {
        delete this.aliases[GetHandleId(caster)];
    }

    public isUnitAlias(caster: unit): boolean {
        return this.aliases[GetHandleId(caster)] != null;
    }

    public getActualUnit(caster: unit): unit {
        return this.aliases[GetHandleId(caster)];
    }

    public castAtUnitInstant(abilityId: number, orderString: string, target: unit, castingUnit: unit) {
        let caster = this.getNonExpended(castingUnit);
        caster.issueTargetInstant(abilityId, orderString, target, castingUnit);
    }

    private getNonExpended(castingUnit: unit): Caster {
        let cast: Caster | null = null;
        for (let caster of this.allCasters) {
            if (caster.isAvailable(GetOwningPlayer(castingUnit))) {
                cast = caster;
                break;
            }
        }
        if (cast != null) {
            return cast;
        }
        cast = new Caster(castingUnit);
        this.allCasters.push(cast);
        Logger.LogVerbose("Allocated new Dummy caster for", GetOwningPlayer(castingUnit), ", total", this.allCasters.length, "casters");
        return cast;
    }

    private constructor() {
        super();
    }

    secondStep(): void {
        this.allCasters.forEach((caster) => {
            if (caster.expended <= 0) {
                caster.inactiveFor += 1;
            }

            if (caster.inactiveFor > 600) {
                Logger.LogVerbose("To remove caster, ", this.allCasters.length, "casters currently.");
                this.allCasters = this.allCasters.filter((toRemove) => {
                    if (toRemove != caster) {
                        caster.remove();
                        return true;
                    }
                    return false;
                });
                Logger.LogVerbose("Removed caster, ", this.allCasters.length, "casters remaining.")
            }
        });
    }

    private internalSecond = 0;

    step(): void {
        this.allCasters.forEach((caster) => {
            if (caster.expended >= 0) {
                caster.expended -= 0.01;
            } else if (caster.lastAbility != 0) {
                caster.clean();
                Logger.LogVerbose("Cleaned caster", caster.lastAbility, caster.expended)
            }
        });

        this.internalSecond += 0.01;
        if (this.internalSecond >= 1) {
            this.secondStep();
            this.internalSecond = 0;
        }
    }
}

class Caster {
    public unit: unit;
    public expended: number = 0;
    public lastAbility: number = 0;
    public inactiveFor: number = 0;

    constructor(castingUnit: unit) {
        let newUnit = createDummyUnit(castingUnit);

        this.unit = newUnit.wrappedUnit;
        this.expended = 0;

        DummyCaster.getInstance().addAlias(this.unit, castingUnit);
    }

    private addAbility(abilityId: number) {
        this.lastAbility = abilityId;
        UnitAddAbility(this.unit, abilityId);
    }

    public issueTargetInstant(abilityId: number, orderString: string, target: widget, castingUnit: unit) {
        this.issueTargetInstantOrigin(abilityId, orderString, target, castingUnit, Point.fromLocationClean(GetUnitLoc(castingUnit)));
    }

    public issueTargetInstantOrigin(abilityId: number, orderString: string, target: widget, castingUnit: unit, origin: Point) {
        DummyCaster.getInstance().addAlias(this.unit, castingUnit);
        this.addAbility(abilityId);
        SetUnitPositionLoc(this.unit, origin.toLocationClean());
        IssueTargetOrder(this.unit, orderString, target);
        this.expended = 2;
        this.inactiveFor = 0;
    }

    public issueTargetChannel(abilityId: number, orderString: string, target: widget, castingUnit: unit) {
        this.issueTargetInstantOrigin(abilityId, orderString, target, castingUnit, Point.fromLocationClean(GetUnitLoc(castingUnit)));
        let abil = BlzGetUnitAbility(this.unit, abilityId);
        this.expended = BlzGetAbilityRealLevelField(abil, ABILITY_RLF_DURATION_NORMAL, 0) + 2;
    }

    public isAvailable(owner: player) {
        return (this.expended < 0 && this.lastAbility == 0 && GetPlayerId(GetOwningPlayer(this.unit)) == GetPlayerId(owner));
    }

    public clean() {
        this.expended = -1;
        this.lastAbility = 0;
        DummyCaster.getInstance().removeAlias(this.unit);
        SetUnitX(this.unit, GetRectMaxX(GetEntireMapRect()) - 64);
        SetUnitY(this.unit, GetRectMaxY(GetEntireMapRect()) - 64);
        UnitRemoveAbility(this.unit, this.lastAbility);
    }

    public remove() {
        RemoveUnit(this.unit);
    }
}

function createDummyUnit(castingUnit: unit) {
    let newUnit = new Unit(CreateUnit(GetOwningPlayer(castingUnit), FourCC(DummyCaster.getInstance().unitTypeBase), 0, 0, bj_UNIT_FACING));
    newUnit.maxHealth = 10000;
    newUnit.maxMana = 10000;
    newUnit.health = 10000;
    newUnit.mana = 10000;
    newUnit.acquireRange = 0;
    newUnit.invulnerable = true;
    newUnit.SetPathing(false);
    newUnit.Show(false);
    newUnit.SetWeaponBooleanField(UNIT_WEAPON_BF_ATTACKS_ENABLED, false, WeaponIndex.WEAPON_1);
    newUnit.SetWeaponBooleanField(UNIT_WEAPON_BF_ATTACKS_ENABLED, false, WeaponIndex.WEAPON_2);
    newUnit.SetStringField(UNIT_SF_SHADOW_IMAGE_UNIT, "");
    newUnit.SetBooleanField(UNIT_BF_HIDE_MINIMAP_DISPLAY, true);
    newUnit.SetRealField(UNIT_RF_CAST_BACK_SWING, 0.001);
    newUnit.SetRealField(UNIT_RF_CAST_POINT, 0.001);
    newUnit.SetRealField(UNIT_RF_SELECTION_SCALE, 0.001);
    newUnit.SetRealField(UNIT_RF_SHADOW_IMAGE_HEIGHT, 0);
    newUnit.SetRealField(UNIT_RF_SHADOW_IMAGE_WIDTH, 0);
    return newUnit;
}