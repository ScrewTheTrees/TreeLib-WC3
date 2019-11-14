import {Hooks} from "../Hooks";
import {Entity} from "../Entity";
import {Logger} from "../Logger";
import {WeaponIndex} from "../Wrappers/WeaponIndex";
import {Point} from "../Utility/Point";
import {Delay} from "../Utility/Delay";
import {AliasDto} from "./AliasDto";

/**
 * Dummy caster is a system where you can easily and quickly throw abilities without any setup or akin.
 * It merges into the DDS system, allowing the DDS system to get the casting unit instead of the dummy.
 */
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
    private aliases: AliasDto[] = [];
    public unitTypeBase = "hgyr";

    public addAlias(caster: unit, credit: AliasDto) {
        this.aliases[GetHandleId(caster)] = credit;
    }

    public removeAlias(caster: unit) {
        delete this.aliases[GetHandleId(caster)];
    }

    public isUnitAlias(caster: unit): boolean {
        return this.aliases[GetHandleId(caster)] != null;
    }

    public getUnitAlias(caster: unit): AliasDto {
        if (!this.aliases[GetHandleId(caster)]) {
            Logger.LogWarning("Tried to fetch a unit alias that is non existing: ", GetHandleId(caster), " please check with isUnitAlias before you try to retrieve it.")
        }
        return this.aliases[GetHandleId(caster)];
    }

    public castAtWidgetInstant(abilityId: number, orderString: string, target: widget, castingUnit: unit,
                               origin: Point = Point.fromWidget(castingUnit), level: number = 0, extraSeconds: number = 2) {
        let caster = this.getNonExpended(castingUnit);
        caster.issueTargetInstant(abilityId, orderString, target, castingUnit, origin, level, extraSeconds);
        return caster;
    }

    public channelAtWidget(abilityId: number, orderString: string, target: widget, castingUnit: unit,
                           origin: Point = Point.fromWidget(castingUnit), level: number = 0, extraSeconds: number = 2) {
        let caster = this.getNonExpended(castingUnit);
        caster.issueTargetChannel(abilityId, orderString, target, castingUnit, origin, level, extraSeconds);
        return caster;
    }

    public channelAtPoint(abilityId: number, orderString: string, target: Point, castingUnit: unit,
                          level: number = 0, extraSeconds: number = 2) {
        let caster = this.getNonExpended(castingUnit);
        caster.issuePointOrder(abilityId, orderString, target, castingUnit, target, level, extraSeconds);
        return caster;
    }

    public castImmediately(abilityId: number, orderString: string, castingUnit: unit, level: number = 0, extraSeconds: number = 2) {
        let caster = this.getNonExpended(castingUnit);
        caster.issueImmediateOrder(abilityId, orderString, castingUnit, level, extraSeconds);
        return caster;
    }

    public castImmediatelyDummy(abilityId: number, orderString: string, castingUnit: unit,
                                origin: Point = Point.fromWidget(castingUnit), level: number = 0, extraSeconds: number = 2) {
        let caster = this.getNonExpended(castingUnit);
        caster.issueImmediateOrderDummy(abilityId, orderString, castingUnit, origin, level, extraSeconds);
        return caster;
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

    private secondStep(): void {
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

export class Caster {
    public unit: unit;
    public expended: number = 0;
    public lastAbility: number = 0;
    public inactiveFor: number = 0;

    constructor(castingUnit: unit) {
        let newUnit = Caster.createDummyUnit(castingUnit);

        this.unit = newUnit;
        this.expended = 0;

        DummyCaster.getInstance().addAlias(this.unit, new AliasDto(castingUnit, this));
    }

    private addAbility(abilityId: number, level: number, to: unit = this.unit) {
        this.lastAbility = abilityId;
        UnitAddAbility(to, abilityId);
        SetUnitAbilityLevel(to, abilityId, level);
    }

    public issueTargetInstant(abilityId: number, orderString: string, target: widget, castingUnit: unit, origin: Point, level: number, extraSeconds: number) {
        DummyCaster.getInstance().addAlias(this.unit, new AliasDto(castingUnit, this));
        this.addAbility(abilityId, level);
        SetUnitPositionLoc(this.unit, origin.toLocationClean());
        IssueTargetOrder(this.unit, orderString, target);
        this.expended = extraSeconds;
        this.inactiveFor = 0;
    }

    public issueTargetChannel(abilityId: number, orderString: string, target: widget, castingUnit: unit, origin: Point, level: number, extraSeconds: number) {
        this.issueTargetInstant(abilityId, orderString, target, castingUnit, origin, level, extraSeconds);
        let abil = BlzGetUnitAbility(this.unit, abilityId);
        this.expended = BlzGetAbilityRealLevelField(abil, ABILITY_RLF_DURATION_NORMAL, GetUnitAbilityLevel(this.unit, abilityId)) + extraSeconds;
    }

    public issuePointOrder(abilityId: number, orderString: string, target: Point, castingUnit: unit, origin: Point, level: number, extraSeconds: number) {
        DummyCaster.getInstance().addAlias(this.unit, new AliasDto(castingUnit, this));
        this.addAbility(abilityId, level);
        let abil = BlzGetUnitAbility(this.unit, abilityId);
        SetUnitPositionLoc(this.unit, origin.toLocationClean());
        IssuePointOrder(this.unit, orderString, target.x, target.y);
        this.expended = BlzGetAbilityRealLevelField(abil, ABILITY_RLF_DURATION_NORMAL, GetUnitAbilityLevel(this.unit, abilityId)) + extraSeconds;
        this.inactiveFor = 0;
    }

    public issueImmediateOrder(abilityId: number, orderString: string, castingUnit: unit, level: number, extraSeconds: number) {
        this.addAbility(abilityId, level, castingUnit);
        IssueImmediateOrder(castingUnit, orderString);
        let abil = BlzGetUnitAbility(castingUnit, abilityId);
        Delay.getInstance().addDelay(() => {
            UnitRemoveAbility(castingUnit, abilityId);
        }, BlzGetAbilityRealLevelField(abil, ABILITY_RLF_DURATION_NORMAL, level) + extraSeconds);
    }

    public issueImmediateOrderDummy(abilityId: number, orderString: string, castingUnit: unit, origin: Point, level: number, extraSeconds: number) {
        DummyCaster.getInstance().addAlias(this.unit, new AliasDto(castingUnit, this));
        this.addAbility(abilityId, level, this.unit);
        SetUnitPositionLoc(this.unit, origin.toLocationClean());
        IssueImmediateOrder(this.unit, orderString);
        let abil = BlzGetUnitAbility(this.unit, abilityId);
        Delay.getInstance().addDelay(() => {
            UnitRemoveAbility(this.unit, abilityId);
        }, BlzGetAbilityRealLevelField(abil, ABILITY_RLF_DURATION_NORMAL, level) + extraSeconds);
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

    public static createDummyUnit(castingUnit: unit) {
        let newUnit = CreateUnit(GetOwningPlayer(castingUnit), FourCC(DummyCaster.getInstance().unitTypeBase), 0, 0, bj_UNIT_FACING);
        BlzSetUnitMaxHP(newUnit, 10000);
        BlzSetUnitMaxMana(newUnit, 10000);
        SetUnitAcquireRange(newUnit, 0);
        SetUnitInvulnerable(newUnit, true);
        SetUnitPathing(newUnit, false);
        ShowUnit(newUnit, false);
        BlzSetUnitWeaponBooleanField(newUnit, UNIT_WEAPON_BF_ATTACKS_ENABLED, WeaponIndex.WEAPON_1, false);
        BlzSetUnitWeaponBooleanField(newUnit, UNIT_WEAPON_BF_ATTACKS_ENABLED, WeaponIndex.WEAPON_2, false);
        BlzSetUnitStringField(newUnit, UNIT_SF_SHADOW_IMAGE_UNIT, "");
        BlzSetUnitBooleanField(newUnit, UNIT_BF_HIDE_MINIMAP_DISPLAY, true);
        BlzSetUnitRealField(newUnit, UNIT_RF_CAST_BACK_SWING, 0.001);
        BlzSetUnitRealField(newUnit, UNIT_RF_CAST_POINT, 0.001);
        BlzSetUnitRealField(newUnit, UNIT_RF_SELECTION_SCALE, 0.001);
        BlzSetUnitRealField(newUnit, UNIT_RF_SHADOW_IMAGE_HEIGHT, 0);
        BlzSetUnitRealField(newUnit, UNIT_RF_SHADOW_IMAGE_WIDTH, 0);
        UnitAddAbility(newUnit, FourCC("Aloc"));
        return newUnit;
    }
}