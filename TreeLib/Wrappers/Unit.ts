import {WeaponIndex} from "./WeaponIndex";

export class Unit {
    public readonly wrappedUnit: unit;

    constructor(wrappedUnit: unit) {
        this.wrappedUnit = wrappedUnit;
    }

    public SetCreepGuard(doGuard: boolean) {
        SetUnitCreepGuard(this.wrappedUnit, doGuard);
    }

    public SetOwner(whichPlayer: player, changeColor: boolean) {
        SetUnitOwner(this.wrappedUnit, whichPlayer, changeColor);
    }

    public SetColor(whichColor: playercolor) {
        SetUnitColor(this.wrappedUnit, whichColor);
    }

    public SetScaleXYZ(scaleX: number, scaleY: number, scaleZ: number) {
        SetUnitScale(this.wrappedUnit, scaleX, scaleY, scaleZ);
    }

    public SetScale(scale: number) {
        SetUnitScale(this.wrappedUnit, scale, scale, scale);
    }

    public SetTimeScale(scale: number) {
        SetUnitTimeScale(this.wrappedUnit, scale);
    }

    public SetBlendTime(blend: number) {
        SetUnitBlendTime(this.wrappedUnit, blend);
    }

    public SetVertexColor(red: number, green: number, blue: number, alpha: number) {
        SetUnitVertexColor(this.wrappedUnit, red, green, blue, alpha);
    }

    public AddAnimationProperties(animProperties: string, add: boolean) {
        AddUnitAnimationProperties(this.wrappedUnit, animProperties, add);
    }

    public SetRescuable(whichPlayer: player, flag: boolean, range: number) {
        SetUnitRescuable(this.wrappedUnit, whichPlayer, flag);
        SetUnitRescueRange(this.wrappedUnit, range);
    }

    public DecAbilityLevel(abilityCode: number) {
        DecUnitAbilityLevel(this.wrappedUnit, abilityCode);
    }

    public IncAbilityLevel(abilityCode: number) {
        IncUnitAbilityLevel(this.wrappedUnit, abilityCode);
    }

    public SetAbilityLevel(abilityCode: number, level: number) {
        SetUnitAbilityLevel(this.wrappedUnit, abilityCode, level);
    }

    public SetExplode(doExplode: boolean) {
        SetUnitExploded(this.wrappedUnit, doExplode);
    }

    public SetPathing(isPathable: boolean) {
        SetUnitPathing(this.wrappedUnit, isPathable);
    }

    public Select(doSelect: boolean) {
        SelectUnit(this.wrappedUnit, doSelect);
    }

    public ShareVision(toPlayer: player, shareVision: boolean) {
        UnitShareVision(this.wrappedUnit, toPlayer, shareVision);
    }

    public SuspendDecay(toPlayer: player, disableDecay: boolean) {
        UnitSuspendDecay(this.wrappedUnit, disableDecay);
    }

    public AddType(type: unittype) {
        UnitAddType(this.wrappedUnit, type);
    }

    public AddAbility(abilityId: number) {
        UnitAddAbility(this.wrappedUnit, abilityId);
    }

    public MakeAbilityPermanent(isPermanent: boolean, abilityId: number) {
        UnitMakeAbilityPermanent(this.wrappedUnit, isPermanent, abilityId);
    }

    public Sleep(doSleep: boolean) {
        UnitAddSleep(this.wrappedUnit, doSleep);
    }

    public SleepPermanent(doSleep: boolean) {
        UnitAddSleepPerm(this.wrappedUnit, doSleep);
    }

    public WakeUp() {
        UnitWakeUp(this.wrappedUnit);
    }

    public SetTimedLife(buffId: number, duration: number) {
        UnitApplyTimedLife(this.wrappedUnit, buffId, duration);
    }

    public SetIgnoreAlarm(doIgnore: boolean) {
        UnitIgnoreAlarm(this.wrappedUnit, doIgnore);
    }

    public ResetCooldown() {
        UnitResetCooldown(this.wrappedUnit);
    }

    public SetConstructionProgress(constructionPercentage: number) {
        UnitSetConstructionProgress(this.wrappedUnit, constructionPercentage);
    }

    public SetUpgradeProgress(upgradePercentage: number) {
        UnitSetUpgradeProgress(this.wrappedUnit, upgradePercentage);
    }

    public SetBaseDamage(baseDamage: number, weaponIndex: WeaponIndex) {
        BlzSetUnitBaseDamage(this.wrappedUnit, baseDamage, weaponIndex);
    }

    public SetDiceNumber(dice: number, weaponIndex: WeaponIndex) {
        BlzSetUnitDiceNumber(this.wrappedUnit, dice, weaponIndex);
    }

    public SetDiceSides(dice: number, weaponIndex: WeaponIndex) {
        BlzSetUnitDiceSides(this.wrappedUnit, dice, weaponIndex);
    }

    public SetAttackCooldown(cooldown: number, weaponIndex: WeaponIndex) {
        BlzSetUnitAttackCooldown(this.wrappedUnit, cooldown, weaponIndex);
    }

    public SetBooleanField(field: unitbooleanfield, value: boolean) {
        BlzSetUnitBooleanField(this.wrappedUnit, field, value);
    }

    public SetIntegerField(field: unitintegerfield, value: number) {
        BlzSetUnitIntegerField(this.wrappedUnit, field, value);
    }

    public SetRealField(field: unitrealfield, value: number) {
        BlzSetUnitRealField(this.wrappedUnit, field, value);
    }

    public SetStringField(field: unitstringfield, value: string) {
        BlzSetUnitStringField(this.wrappedUnit, field, value);
    }

    public SetWeaponBooleanField(field: unitweaponbooleanfield, value: boolean, index: WeaponIndex) {
        BlzSetUnitWeaponBooleanField(this.wrappedUnit, field, index, value);
    }

    public SetWeaponIntegerField(field: unitweaponintegerfield, value: number, index: WeaponIndex) {
        BlzSetUnitWeaponIntegerField(this.wrappedUnit, field, index, value);
    }

    public SetWeaponRealField(field: unitweaponrealfield, value: number, index: WeaponIndex) {
        BlzSetUnitWeaponRealField(this.wrappedUnit, field, index, value);
    }

    public SetWeaponStringField(field: unitweaponstringfield, value: string, index: WeaponIndex) {
        BlzSetUnitWeaponStringField(this.wrappedUnit, field, index, value);
    }

    public SetUnitState(state: unitstate, value: number) {
        SetUnitState(this.wrappedUnit, state, value);
    }

    set health(value: number) {
        SetUnitState(this.wrappedUnit, UNIT_STATE_LIFE, value);
    }

    get health() {
        return GetUnitState(this.wrappedUnit, UNIT_STATE_LIFE);
    }

    set mana(value: number) {
        SetUnitState(this.wrappedUnit, UNIT_STATE_MANA, value);
    }

    get mana() {
        return GetUnitState(this.wrappedUnit, UNIT_STATE_MANA);
    }

    set x(x: number) {
        SetUnitX(this.wrappedUnit, x);
    }

    get x() {
        return GetUnitX(this.wrappedUnit);
    }

    set y(y: number) {
        SetUnitY(this.wrappedUnit, y);
    }

    get y() {
        return GetUnitY(this.wrappedUnit);
    }

    set facing(facing: number) {
        SetUnitFacing(this.wrappedUnit, facing);
    }

    get facing() {
        return GetUnitFacing(this.wrappedUnit);
    }

    set moveSpeed(speed: number) {
        SetUnitMoveSpeed(this.wrappedUnit, speed);
    }

    get moveSpeed() {
        return GetUnitMoveSpeed(this.wrappedUnit);
    }

    set acquireRange(range: number) {
        SetUnitAcquireRange(this.wrappedUnit, range);
    }

    get acquireRange() {
        return GetUnitAcquireRange(this.wrappedUnit);
    }

    set pause(doPause: boolean) {
        PauseUnit(this.wrappedUnit, doPause);
    }

    get pause() {
        return IsUnitPaused(this.wrappedUnit);
    }

    set maxHealth(health: number) {
        BlzSetUnitMaxHP(this.wrappedUnit, health);
    }

    get maxHealth() {
        return BlzGetUnitMaxHP(this.wrappedUnit);
    }

    set maxMana(mana: number) {
        BlzSetUnitMaxMana(this.wrappedUnit, mana);
    }

    get maxMana() {
        return BlzGetUnitMaxMana(this.wrappedUnit);
    }

    set name(name: string) {
        BlzSetUnitName(this.wrappedUnit, name);
    }

    get name() {
        return GetUnitName(this.wrappedUnit);
    }

    set armor(armor: number) {
        BlzSetUnitArmor(this.wrappedUnit, armor);
    }

    get armor() {
        return BlzGetUnitArmor(this.wrappedUnit);
    }

    set invulnerable(isInvulnerable: boolean) {
        SetUnitInvulnerable(this.wrappedUnit, isInvulnerable);
    }

    get invulnerable() {
        return BlzIsUnitInvulnerable(this.wrappedUnit);
    }

    Show(doShow: boolean) {
        ShowUnit(this.wrappedUnit, doShow);
    }
}