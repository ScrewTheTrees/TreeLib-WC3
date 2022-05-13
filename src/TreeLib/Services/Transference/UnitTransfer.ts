export class UnitTransfer {

    public static transferAllUnitIntegerFields(from: unit, to: unit) {
        for (let field of this.unitIntegerFields) {
            BlzSetUnitIntegerField(to, field, BlzGetUnitIntegerField(from, field));
        }
    }
    public static transferAllUnitRealFields(from: unit, to: unit) {
        for (let field of this.unitRealFields) {
            BlzSetUnitRealField(to, field, BlzGetUnitRealField(from, field));
        }
    }
    public static transferAllUnitBooleanFields(from: unit, to: unit) {
        for (let field of this.unitBooleanFields) {
            BlzSetUnitBooleanField(to, field, BlzGetUnitBooleanField(from, field));
        }
    }
    public static transferAllUnitStringFields(from: unit, to: unit) {
        for (let field of this.unitStringFields) {
            BlzSetUnitStringField(to, field, BlzGetUnitStringField(from, field));
        }
    }

    public static transferAllUnitWeaponIntegerFields(from: unit, to: unit) {
        for (let index = 0; index <= 1; index++) {
            for (let field of this.unitWeaponIntegerField) {
                BlzSetUnitWeaponIntegerField(to, field, index + 1, BlzGetUnitWeaponIntegerField(from, field, index));
            }
        }
    }
    public static transferAllUnitWeaponRealFields(from: unit, to: unit) {
        for (let index = 0; index <= 1; index++) {
            for (let field of this.unitWeaponRealField) {
                BlzSetUnitWeaponRealField(to, field, index + 1, BlzGetUnitWeaponRealField(from, field, index));
            }
        }
    }
    public static transferAllUnitWeaponBooleanFields(from: unit, to: unit) {
        for (let index = 0; index <= 1; index++) {
            for (let field of this.unitWeaponBooleanField) {
                BlzSetUnitWeaponBooleanField(to, field, index + 1, BlzGetUnitWeaponBooleanField(from, field, index));
            }
        }
    }
    public static transferAllUnitWeaponStringFields(from: unit, to: unit) {
        for (let index = 0; index <= 1; index++) {
            for (let field of this.unitWeaponStringField) {
                BlzSetUnitWeaponStringField(to, field, index + 1, BlzGetUnitWeaponStringField(from, field, index));
            }
        }
    }

    public static transferAllUnitFields(from: unit, to: unit) {
        this.transferAllUnitIntegerFields(from, to);
        this.transferAllUnitRealFields(from, to);
        this.transferAllUnitBooleanFields(from, to);
        this.transferAllUnitStringFields(from, to);

        //These are all very wonky...

        //this.transferAllUnitWeaponIntegerFields(from, to);
        //this.transferAllUnitWeaponRealFields(from, to);
        //this.transferAllUnitWeaponBooleanFields(from, to);
        //this.transferAllUnitWeaponStringFields(from, to);
    }

    public static deepCopyUnit(from: unit): unit {
        let to = CreateUnit(GetOwningPlayer(from), GetUnitTypeId(from), 33_000, 33_000, GetUnitFacing(from));
        this.transferAllUnitFields(from, to);
        SetUnitX(to, GetUnitX(from));
        SetUnitY(to, GetUnitY(from));
        return to;
    }


    public static unitIntegerFields: unitintegerfield[] = [
        UNIT_IF_DEFENSE_TYPE,
        UNIT_IF_ARMOR_TYPE,
        UNIT_IF_LOOPING_FADE_IN_RATE,
        UNIT_IF_LOOPING_FADE_OUT_RATE,
        //UNIT_IF_AGILITY,
        //UNIT_IF_INTELLIGENCE,
        //UNIT_IF_STRENGTH,
        //UNIT_IF_AGILITY_PERMANENT,
        //UNIT_IF_INTELLIGENCE_PERMANENT,
        //UNIT_IF_STRENGTH_PERMANENT,
        //UNIT_IF_AGILITY_WITH_BONUS,
        //UNIT_IF_INTELLIGENCE_WITH_BONUS,
        //UNIT_IF_STRENGTH_WITH_BONUS,
        UNIT_IF_GOLD_BOUNTY_AWARDED_NUMBER_OF_DICE,
        UNIT_IF_GOLD_BOUNTY_AWARDED_BASE,
        UNIT_IF_GOLD_BOUNTY_AWARDED_SIDES_PER_DIE,
        UNIT_IF_LUMBER_BOUNTY_AWARDED_NUMBER_OF_DICE,
        UNIT_IF_LUMBER_BOUNTY_AWARDED_BASE,
        UNIT_IF_LUMBER_BOUNTY_AWARDED_SIDES_PER_DIE,
        UNIT_IF_LEVEL,
        UNIT_IF_FORMATION_RANK,
        UNIT_IF_ORIENTATION_INTERPOLATION,
        UNIT_IF_ELEVATION_SAMPLE_POINTS,
        UNIT_IF_TINTING_COLOR_RED,
        UNIT_IF_TINTING_COLOR_GREEN,
        UNIT_IF_TINTING_COLOR_BLUE,
        UNIT_IF_TINTING_COLOR_ALPHA,
        UNIT_IF_MOVE_TYPE,
        UNIT_IF_TARGETED_AS,
        UNIT_IF_UNIT_CLASSIFICATION,
        UNIT_IF_HIT_POINTS_REGENERATION_TYPE,
        UNIT_IF_PLACEMENT_PREVENTED_BY,
        UNIT_IF_PRIMARY_ATTRIBUTE,
    ];

    public static unitRealFields: unitrealfield[] = [
        UNIT_RF_STRENGTH_PER_LEVEL,
        UNIT_RF_AGILITY_PER_LEVEL,
        UNIT_RF_INTELLIGENCE_PER_LEVEL,
        UNIT_RF_HIT_POINTS_REGENERATION_RATE,
        UNIT_RF_MANA_REGENERATION,
        UNIT_RF_DEATH_TIME,
        UNIT_RF_FLY_HEIGHT,
        UNIT_RF_TURN_RATE,
        UNIT_RF_ELEVATION_SAMPLE_RADIUS,
        UNIT_RF_FOG_OF_WAR_SAMPLE_RADIUS,
        UNIT_RF_MAXIMUM_PITCH_ANGLE_DEGREES,
        UNIT_RF_MAXIMUM_ROLL_ANGLE_DEGREES,
        UNIT_RF_SCALING_VALUE,
        UNIT_RF_ANIMATION_RUN_SPEED,
        UNIT_RF_SELECTION_SCALE,
        UNIT_RF_SELECTION_CIRCLE_HEIGHT,
        UNIT_RF_SHADOW_IMAGE_HEIGHT,
        UNIT_RF_SHADOW_IMAGE_WIDTH,
        UNIT_RF_SHADOW_IMAGE_CENTER_X,
        UNIT_RF_SHADOW_IMAGE_CENTER_Y,
        UNIT_RF_ANIMATION_WALK_SPEED,
        UNIT_RF_DEFENSE,
        UNIT_RF_SIGHT_RADIUS,
        UNIT_RF_PRIORITY,
        UNIT_RF_SPEED,
        UNIT_RF_OCCLUDER_HEIGHT,
        UNIT_RF_HP,
        UNIT_RF_MANA,
        UNIT_RF_ACQUISITION_RANGE,
        UNIT_RF_CAST_BACK_SWING,
        UNIT_RF_CAST_POINT,
        UNIT_RF_MINIMUM_ATTACK_RANGE,
    ];

    public static unitBooleanFields: unitbooleanfield[] = [
        UNIT_BF_RAISABLE,
        UNIT_BF_DECAYABLE,
        UNIT_BF_IS_A_BUILDING,
        UNIT_BF_USE_EXTENDED_LINE_OF_SIGHT,
        UNIT_BF_NEUTRAL_BUILDING_SHOWS_MINIMAP_ICON,
        UNIT_BF_HERO_HIDE_HERO_INTERFACE_ICON,
        UNIT_BF_HERO_HIDE_HERO_MINIMAP_DISPLAY,
        UNIT_BF_HERO_HIDE_HERO_DEATH_MESSAGE,
        //UNIT_BF_HIDE_MINIMAP_DISPLAY,
        //UNIT_BF_SCALE_PROJECTILES,
        //UNIT_BF_SELECTION_CIRCLE_ON_WATER,
        //UNIT_BF_HAS_WATER_SHADOW,
    ];

    public static unitStringFields: unitstringfield[] = [
        UNIT_SF_NAME,
        UNIT_SF_PROPER_NAMES,
        UNIT_SF_GROUND_TEXTURE,
        UNIT_SF_SHADOW_IMAGE_UNIT,
    ]

    public static unitWeaponIntegerField: unitweaponintegerfield[] = [
        UNIT_WEAPON_IF_ATTACK_DAMAGE_NUMBER_OF_DICE,
        UNIT_WEAPON_IF_ATTACK_DAMAGE_BASE,
        UNIT_WEAPON_IF_ATTACK_DAMAGE_SIDES_PER_DIE,
        UNIT_WEAPON_IF_ATTACK_MAXIMUM_NUMBER_OF_TARGETS,
        //UNIT_WEAPON_IF_ATTACK_ATTACK_TYPE,
        //UNIT_WEAPON_IF_ATTACK_WEAPON_SOUND,
        //UNIT_WEAPON_IF_ATTACK_AREA_OF_EFFECT_TARGETS,
        //UNIT_WEAPON_IF_ATTACK_TARGETS_ALLOWED,
    ];

    public static unitWeaponRealField: unitweaponrealfield[] = [
        UNIT_WEAPON_RF_ATTACK_BACKSWING_POINT,
        UNIT_WEAPON_RF_ATTACK_DAMAGE_POINT,
        UNIT_WEAPON_RF_ATTACK_BASE_COOLDOWN,
        UNIT_WEAPON_RF_ATTACK_DAMAGE_LOSS_FACTOR,
        //UNIT_WEAPON_RF_ATTACK_DAMAGE_FACTOR_MEDIUM,
        //UNIT_WEAPON_RF_ATTACK_DAMAGE_FACTOR_SMALL,
        UNIT_WEAPON_RF_ATTACK_DAMAGE_SPILL_DISTANCE,
        UNIT_WEAPON_RF_ATTACK_DAMAGE_SPILL_RADIUS,
        //UNIT_WEAPON_RF_ATTACK_PROJECTILE_SPEED,
        //UNIT_WEAPON_RF_ATTACK_PROJECTILE_ARC,
        //UNIT_WEAPON_RF_ATTACK_AREA_OF_EFFECT_FULL_DAMAGE,
        //UNIT_WEAPON_RF_ATTACK_AREA_OF_EFFECT_MEDIUM_DAMAGE,
        //UNIT_WEAPON_RF_ATTACK_AREA_OF_EFFECT_SMALL_DAMAGE,
        UNIT_WEAPON_RF_ATTACK_RANGE,
    ];

    public static unitWeaponBooleanField: unitweaponbooleanfield[] = [
        UNIT_WEAPON_BF_ATTACK_SHOW_UI,
        UNIT_WEAPON_BF_ATTACKS_ENABLED,
        UNIT_WEAPON_BF_ATTACK_PROJECTILE_HOMING_ENABLED,
    ];

    public static unitWeaponStringField: unitweaponstringfield[] = [
        UNIT_WEAPON_SF_ATTACK_PROJECTILE_ART,
    ];
}