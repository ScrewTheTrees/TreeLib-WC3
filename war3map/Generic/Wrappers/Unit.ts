import {WeaponIndex} from "../DataContainers/WeaponIndex";

export class UnitBuilder {
    protected readonly target: unit;

    constructor(target: unit) {
        this.target = target;
    }

    public SetPosition(x: number, y: number): this {
        SetUnitX(this.target, x);
        SetUnitY(this.target, y);
        return this;
    }

    public SetFacing(facing: number) {
        SetUnitFacing(this.target, facing);
        return this;
    }

    public SetMoveSpeed(speed: number) {
        SetUnitMoveSpeed(this.target, speed);
        return this;
    }

    public SetFlyHeight(height: number, rate: number) {
        SetUnitFlyHeight(this.target, height, rate);
        return this;
    }

    public SetPropWindow(facing: number) {
        SetUnitPropWindow(this.target, facing);
        return this;
    }

    public SetAcquireRange(range: number) {
        SetUnitAcquireRange(this.target, range);
        return this;
    }

    public SetCreepGuard(doGuard: boolean) {
        SetUnitCreepGuard(this.target, doGuard);
        return this;
    }

    public SetOwner(whichPlayer: player, changeColor: boolean) {
        SetUnitOwner(this.target, whichPlayer, changeColor);
        return this;
    }

    public SetColor(whichColor: playercolor) {
        SetUnitColor(this.target, whichColor);
        return this;
    }

    public SetScaleXYZ(scaleX: number, scaleY: number, scaleZ: number) {
        SetUnitScale(this.target, scaleX, scaleY, scaleZ);
        return this;
    }

    public SetScale(scale: number) {
        SetUnitScale(this.target, scale, scale, scale);
        return this;
    }

    public SetTimeScale(scale: number) {
        SetUnitTimeScale(this.target, scale);
        return this;
    }

    public SetBlendTime(blend: number) {
        SetUnitTimeScale(this.target, blend);
        return this;
    }

    public SetVertexColor(red: number, green: number, blue: number, alpha: number) {
        SetUnitVertexColor(this.target, red, green, blue, alpha);
        return this;
    }

    public AddAnimationProperties(animProperties: string, add: boolean) {
        AddUnitAnimationProperties(this.target, animProperties, add);
        return this;
    }

    public SetRescuable(whichPlayer: player, flag: boolean, range: number) {
        SetUnitRescuable(this.target, whichPlayer, flag);
        SetUnitRescueRange(this.target, range);
    }

    public DecAbilityLevel(abilityCode: number): this {
        DecUnitAbilityLevel(this.target, abilityCode);
        return this;
    }

    public IncAbilityLevel(abilityCode: number): this {
        IncUnitAbilityLevel(this.target, abilityCode);
        return this;
    }

    public SetAbilityLevel(abilityCode: number, level: number): this {
        SetUnitAbilityLevel(this.target, abilityCode, level);
        return this;
    }

    public SetExplode(doExplode: boolean): this {
        SetUnitExploded(this.target, doExplode);
        return this;
    }

    public SetInvulnerable(isInvulnerable: boolean): this {
        SetUnitInvulnerable(this.target, isInvulnerable);
        return this;
    }

    public Pause(doPause: boolean): this {
        PauseUnit(this.target, doPause);
        return this;
    }

    public SetPathing(isPathable: boolean): this {
        SetUnitPathing(this.target, isPathable);
        return this;
    }

    public Select(doSelect: boolean): this {
        SelectUnit(this.target, doSelect);
        return this;
    }

    public ShareVision(toPlayer: player, shareVision: boolean): this {
        UnitShareVision(this.target, toPlayer, shareVision);
        return this;
    }

    public SuspendDecay(toPlayer: player, disableDecay: boolean): this {
        UnitSuspendDecay(this.target, disableDecay);
        return this;
    }

    public AddType(type: unittype): this {
        UnitAddType(this.target, type);
        return this;
    }

    public AddAbility(abilityId: number): this {
        UnitAddAbility(this.target, abilityId);
        return this;
    }

    public MakeAbilityPermanent(isPermanent: boolean, abilityId: number): this {
        UnitMakeAbilityPermanent(this.target, isPermanent, abilityId);
        return this;
    }

    public Sleep(doSleep: boolean): this {
        UnitAddSleep(this.target, doSleep);
        return this;
    }

    public SleepPermanent(doSleep: boolean): this {
        UnitAddSleepPerm(this.target, doSleep);
        return this;
    }

    public WakeUp(): this {
        UnitWakeUp(this.target);
        return this;
    }

    public SetTimedLife(buffId: number, duration: number): this {
        UnitApplyTimedLife(this.target, buffId, duration);
        return this;
    }

    public SetIgnoreAlarm(doIgnore: boolean): this {
        UnitIgnoreAlarm(this.target, doIgnore);
        return this;
    }

    public ResetCooldown(): this {
        UnitResetCooldown(this.target);
        return this;
    }

    public SetConstructionProgress(constructionPercentage: number): this {
        UnitSetConstructionProgress(this.target, constructionPercentage);
        return this;
    }

    public SetUpgradeProgress(upgradePercentage: number): this {
        UnitSetUpgradeProgress(this.target, upgradePercentage);
        return this;
    }

    public SetMaxHealth(health: number): this {
        BlzSetUnitMaxHP(this.target, health);
        return this;
    }

    public SetMaxMana(mana: number): this {
        BlzSetUnitMaxMana(this.target, mana);
        return this;
    }

    public SetName(name: string): this {
        BlzSetUnitName(this.target, name);
        return this;
    }

    public SetBaseDamage(baseDamage: number, weaponIndex: WeaponIndex): this {
        BlzSetUnitBaseDamage(this.target, baseDamage, weaponIndex);
        return this;
    }

    public SetDiceNumber(dice: number, weaponIndex: WeaponIndex): this {
        BlzSetUnitDiceNumber(this.target, dice, weaponIndex);
        return this;
    }

    public SetDiceSides(dice: number, weaponIndex: WeaponIndex): this {
        BlzSetUnitDiceSides(this.target, dice, weaponIndex);
        return this;
    }

    public SetAttackCooldown(cooldown: number, weaponIndex: WeaponIndex): this {
        BlzSetUnitAttackCooldown(this.target, cooldown, weaponIndex);
        return this;
    }

    public SetArmor(armor: number): this {
        BlzSetUnitArmor(this.target, armor);
        return this;
    }

    public SetBooleanField(field: unitbooleanfield, value: boolean) {
        BlzSetUnitBooleanField(this.target, field, value);
    }

    public SetIntegerField(field: unitintegerfield, value: number) {
        BlzSetUnitIntegerField(this.target, field, value);
    }

    public SetRealField(field: unitrealfield, value: number) {
        BlzSetUnitRealField(this.target, field, value);
    }

    public SetStringField(field: unitstringfield, value: string) {
        BlzSetUnitStringField(this.target, field, value);
    }


    public SetWeaponBooleanField(field: unitweaponbooleanfield, value: boolean, index: WeaponIndex) {
        BlzSetUnitWeaponBooleanField(this.target, field, index, value);
    }

    public SetWeaponIntegerField(field: unitweaponintegerfield, value: number, index: WeaponIndex) {
        BlzSetUnitWeaponIntegerField(this.target, field, index, value);
    }

    public SetWeaponRealField(field: unitweaponrealfield, value: number, index: WeaponIndex) {
        BlzSetUnitWeaponRealField(this.target, field, index, value);
    }

    public SetWeaponStringField(field: unitweaponstringfield, value: string, index: WeaponIndex) {
        BlzSetUnitWeaponStringField(this.target, field, index, value);
    }

}