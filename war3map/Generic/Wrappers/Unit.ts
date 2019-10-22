import {WeaponIndex} from "./WeaponIndex";

export class Unit {
    public readonly wrappedUnit: unit;

    constructor(wrappedUnit: unit) {
        this.wrappedUnit = wrappedUnit;
    }

    public SetPosition(x: number, y: number): this {
        SetUnitX(this.wrappedUnit, x);
        SetUnitY(this.wrappedUnit, y);
        return this;
    }

    public SetFacing(facing: number) {
        SetUnitFacing(this.wrappedUnit, facing);
        return this;
    }

    public SetMoveSpeed(speed: number) {
        SetUnitMoveSpeed(this.wrappedUnit, speed);
        return this;
    }

    public SetFlyHeight(height: number, rate: number) {
        SetUnitFlyHeight(this.wrappedUnit, height, rate);
        return this;
    }

    public SetPropWindow(facing: number) {
        SetUnitPropWindow(this.wrappedUnit, facing);
        return this;
    }

    public SetAcquireRange(range: number) {
        SetUnitAcquireRange(this.wrappedUnit, range);
        return this;
    }

    public SetCreepGuard(doGuard: boolean) {
        SetUnitCreepGuard(this.wrappedUnit, doGuard);
        return this;
    }

    public SetOwner(whichPlayer: player, changeColor: boolean) {
        SetUnitOwner(this.wrappedUnit, whichPlayer, changeColor);
        return this;
    }

    public SetColor(whichColor: playercolor) {
        SetUnitColor(this.wrappedUnit, whichColor);
        return this;
    }

    public SetScaleXYZ(scaleX: number, scaleY: number, scaleZ: number) {
        SetUnitScale(this.wrappedUnit, scaleX, scaleY, scaleZ);
        return this;
    }

    public SetScale(scale: number) {
        SetUnitScale(this.wrappedUnit, scale, scale, scale);
        return this;
    }

    public SetTimeScale(scale: number) {
        SetUnitTimeScale(this.wrappedUnit, scale);
        return this;
    }

    public SetBlendTime(blend: number) {
        SetUnitTimeScale(this.wrappedUnit, blend);
        return this;
    }

    public SetVertexColor(red: number, green: number, blue: number, alpha: number) {
        SetUnitVertexColor(this.wrappedUnit, red, green, blue, alpha);
        return this;
    }

    public AddAnimationProperties(animProperties: string, add: boolean) {
        AddUnitAnimationProperties(this.wrappedUnit, animProperties, add);
        return this;
    }

    public SetRescuable(whichPlayer: player, flag: boolean, range: number) {
        SetUnitRescuable(this.wrappedUnit, whichPlayer, flag);
        SetUnitRescueRange(this.wrappedUnit, range);
    }

    public DecAbilityLevel(abilityCode: number): this {
        DecUnitAbilityLevel(this.wrappedUnit, abilityCode);
        return this;
    }

    public IncAbilityLevel(abilityCode: number): this {
        IncUnitAbilityLevel(this.wrappedUnit, abilityCode);
        return this;
    }

    public SetAbilityLevel(abilityCode: number, level: number): this {
        SetUnitAbilityLevel(this.wrappedUnit, abilityCode, level);
        return this;
    }

    public SetExplode(doExplode: boolean): this {
        SetUnitExploded(this.wrappedUnit, doExplode);
        return this;
    }

    public SetInvulnerable(isInvulnerable: boolean): this {
        SetUnitInvulnerable(this.wrappedUnit, isInvulnerable);
        return this;
    }

    public Pause(doPause: boolean): this {
        PauseUnit(this.wrappedUnit, doPause);
        return this;
    }

    public SetPathing(isPathable: boolean): this {
        SetUnitPathing(this.wrappedUnit, isPathable);
        return this;
    }

    public Select(doSelect: boolean): this {
        SelectUnit(this.wrappedUnit, doSelect);
        return this;
    }

    public ShareVision(toPlayer: player, shareVision: boolean): this {
        UnitShareVision(this.wrappedUnit, toPlayer, shareVision);
        return this;
    }

    public SuspendDecay(toPlayer: player, disableDecay: boolean): this {
        UnitSuspendDecay(this.wrappedUnit, disableDecay);
        return this;
    }

    public AddType(type: unittype): this {
        UnitAddType(this.wrappedUnit, type);
        return this;
    }

    public AddAbility(abilityId: number): this {
        UnitAddAbility(this.wrappedUnit, abilityId);
        return this;
    }

    public MakeAbilityPermanent(isPermanent: boolean, abilityId: number): this {
        UnitMakeAbilityPermanent(this.wrappedUnit, isPermanent, abilityId);
        return this;
    }

    public Sleep(doSleep: boolean): this {
        UnitAddSleep(this.wrappedUnit, doSleep);
        return this;
    }

    public SleepPermanent(doSleep: boolean): this {
        UnitAddSleepPerm(this.wrappedUnit, doSleep);
        return this;
    }

    public WakeUp(): this {
        UnitWakeUp(this.wrappedUnit);
        return this;
    }

    public SetTimedLife(buffId: number, duration: number): this {
        UnitApplyTimedLife(this.wrappedUnit, buffId, duration);
        return this;
    }

    public SetIgnoreAlarm(doIgnore: boolean): this {
        UnitIgnoreAlarm(this.wrappedUnit, doIgnore);
        return this;
    }

    public ResetCooldown(): this {
        UnitResetCooldown(this.wrappedUnit);
        return this;
    }

    public SetConstructionProgress(constructionPercentage: number): this {
        UnitSetConstructionProgress(this.wrappedUnit, constructionPercentage);
        return this;
    }

    public SetUpgradeProgress(upgradePercentage: number): this {
        UnitSetUpgradeProgress(this.wrappedUnit, upgradePercentage);
        return this;
    }

    public SetMaxHealth(health: number): this {
        BlzSetUnitMaxHP(this.wrappedUnit, health);
        return this;
    }

    public SetMaxMana(mana: number): this {
        BlzSetUnitMaxMana(this.wrappedUnit, mana);
        return this;
    }

    public SetName(name: string): this {
        BlzSetUnitName(this.wrappedUnit, name);
        return this;
    }

    public SetBaseDamage(baseDamage: number, weaponIndex: WeaponIndex): this {
        BlzSetUnitBaseDamage(this.wrappedUnit, baseDamage, weaponIndex);
        return this;
    }

    public SetDiceNumber(dice: number, weaponIndex: WeaponIndex): this {
        BlzSetUnitDiceNumber(this.wrappedUnit, dice, weaponIndex);
        return this;
    }

    public SetDiceSides(dice: number, weaponIndex: WeaponIndex): this {
        BlzSetUnitDiceSides(this.wrappedUnit, dice, weaponIndex);
        return this;
    }

    public SetAttackCooldown(cooldown: number, weaponIndex: WeaponIndex): this {
        BlzSetUnitAttackCooldown(this.wrappedUnit, cooldown, weaponIndex);
        return this;
    }

    public SetArmor(armor: number): this {
        BlzSetUnitArmor(this.wrappedUnit, armor);
        return this;
    }

    public SetBooleanField(field: unitbooleanfield, value: boolean) {
        BlzSetUnitBooleanField(this.wrappedUnit, field, value);
        return this;
    }

    public SetIntegerField(field: unitintegerfield, value: number) {
        BlzSetUnitIntegerField(this.wrappedUnit, field, value);
        return this;
    }

    public SetRealField(field: unitrealfield, value: number) {
        BlzSetUnitRealField(this.wrappedUnit, field, value);
        return this;
    }

    public SetStringField(field: unitstringfield, value: string) {
        BlzSetUnitStringField(this.wrappedUnit, field, value);
        return this;
    }


    public SetWeaponBooleanField(field: unitweaponbooleanfield, value: boolean, index: WeaponIndex) {
        BlzSetUnitWeaponBooleanField(this.wrappedUnit, field, index, value);
        return this;
    }

    public SetWeaponIntegerField(field: unitweaponintegerfield, value: number, index: WeaponIndex) {
        BlzSetUnitWeaponIntegerField(this.wrappedUnit, field, index, value);
        return this;
    }

    public SetWeaponRealField(field: unitweaponrealfield, value: number, index: WeaponIndex) {
        BlzSetUnitWeaponRealField(this.wrappedUnit, field, index, value);
        return this;
    }

    public SetWeaponStringField(field: unitweaponstringfield, value: string, index: WeaponIndex) {
        BlzSetUnitWeaponStringField(this.wrappedUnit, field, index, value);
        return this;
    }

    public SetUnitState(state: unitstate, value: number) {
        SetUnitState(this.wrappedUnit, state, value);
        return this;
    }
}