gg_trg_Untitled_Trigger_001 = nil
gg_unit_Hamg_0003 = nil
gg_unit_hkni_0010 = nil
function InitGlobals()
end

function CreateUnitsForPlayer0()
    local p = Player(0)
    local u
    local unitID
    local t
    local life
    gg_unit_Hamg_0003 = CreateUnit(p, FourCC("Hamg"), -820.8, -2289.2, 94.804)
    u = CreateUnit(p, FourCC("hrif"), -962.1, -2281.3, 81.096)
    u = CreateUnit(p, FourCC("Hmkg"), 4634.5, 3828.6, 83.719)
    SetHeroLevel(u, 10, false)
    SelectHeroSkill(u, FourCC("AHtb"))
    SelectHeroSkill(u, FourCC("AHtb"))
    SelectHeroSkill(u, FourCC("AHtb"))
    SelectHeroSkill(u, FourCC("AHtc"))
    SelectHeroSkill(u, FourCC("AHtc"))
    SelectHeroSkill(u, FourCC("AHtc"))
    SelectHeroSkill(u, FourCC("AHbh"))
    SelectHeroSkill(u, FourCC("AHbh"))
    SelectHeroSkill(u, FourCC("AHbh"))
    SelectHeroSkill(u, FourCC("AHav"))
    u = CreateUnit(p, FourCC("Hmkg"), 4803.3, 3825.1, 93.200)
    SetHeroLevel(u, 10, false)
    SelectHeroSkill(u, FourCC("AHtb"))
    SelectHeroSkill(u, FourCC("AHtb"))
    SelectHeroSkill(u, FourCC("AHtb"))
    SelectHeroSkill(u, FourCC("AHtc"))
    SelectHeroSkill(u, FourCC("AHtc"))
    SelectHeroSkill(u, FourCC("AHtc"))
    SelectHeroSkill(u, FourCC("AHbh"))
    SelectHeroSkill(u, FourCC("AHbh"))
    SelectHeroSkill(u, FourCC("AHbh"))
    SelectHeroSkill(u, FourCC("AHav"))
    u = CreateUnit(p, FourCC("Hmkg"), 4967.0, 3826.8, 102.237)
    SetHeroLevel(u, 10, false)
    SelectHeroSkill(u, FourCC("AHtb"))
    SelectHeroSkill(u, FourCC("AHtb"))
    SelectHeroSkill(u, FourCC("AHtb"))
    SelectHeroSkill(u, FourCC("AHtc"))
    SelectHeroSkill(u, FourCC("AHtc"))
    SelectHeroSkill(u, FourCC("AHtc"))
    SelectHeroSkill(u, FourCC("AHbh"))
    SelectHeroSkill(u, FourCC("AHbh"))
    SelectHeroSkill(u, FourCC("AHbh"))
    SelectHeroSkill(u, FourCC("AHav"))
end

function CreateUnitsForPlayer1()
    local p = Player(1)
    local u
    local unitID
    local t
    local life
    u = CreateUnit(p, FourCC("hfoo"), -932.0, -1594.1, 279.694)
    gg_unit_hkni_0010 = CreateUnit(p, FourCC("hkni"), -828.5, -1952.2, 260.635)
    u = CreateUnit(p, FourCC("hrif"), -549.7, -1611.1, 243.641)
    u = CreateUnit(p, FourCC("hpea"), -1090.4, -1576.2, 293.163)
    u = CreateUnit(p, FourCC("Hpal"), -1245.8, -1523.4, 302.207)
    u = CreateUnit(p, FourCC("hkni"), -734.7, -1598.0, 260.635)
end

function CreateUnitsForPlayer2()
    local p = Player(2)
    local u
    local unitID
    local t
    local life
    u = CreateUnit(p, FourCC("hpea"), -1085.4, -1430.0, 288.663)
    u = CreateUnit(p, FourCC("hfoo"), -927.0, -1447.9, 277.399)
    u = CreateUnit(p, FourCC("hkni"), -731.8, -1458.1, 262.115)
    u = CreateUnit(p, FourCC("hrif"), -544.7, -1464.8, 248.135)
    u = CreateUnit(p, FourCC("Hblm"), -417.2, -1538.6, 237.137)
end

function CreateNeutralHostileBuildings()
    local p = Player(PLAYER_NEUTRAL_AGGRESSIVE)
    local u
    local unitID
    local t
    local life
    u = CreateUnit(p, FourCC("hwtw"), 2432.0, -1536.0, 270.000)
end

function CreateNeutralPassiveBuildings()
    local p = Player(PLAYER_NEUTRAL_PASSIVE)
    local u
    local unitID
    local t
    local life
    u = CreateUnit(p, FourCC("nfoh"), -1088.0, -1216.0, 270.000)
    u = CreateUnit(p, FourCC("nfoh"), -576.0, -1216.0, 270.000)
end

function CreatePlayerBuildings()
end

function CreatePlayerUnits()
    CreateUnitsForPlayer0()
    CreateUnitsForPlayer1()
    CreateUnitsForPlayer2()
end

function CreateAllUnits()
    CreateNeutralHostileBuildings()
    CreateNeutralPassiveBuildings()
    CreatePlayerBuildings()
    CreatePlayerUnits()
end

function Trig_Untitled_Trigger_001_Conditions()
    if (not (GetTerrainTypeBJ(GetRectCenter(GetPlayableMapRect())) == FourCC("Odtr"))) then
        return false
    end
    return true
end

function Trig_Untitled_Trigger_001_Actions()
    BlzUnitInterruptAttack(gg_unit_Hamg_0003)
    BlzUnitInterruptAttack(gg_unit_hkni_0010)
end

function InitTrig_Untitled_Trigger_001()
    gg_trg_Untitled_Trigger_001 = CreateTrigger()
    TriggerRegisterUnitEvent(gg_trg_Untitled_Trigger_001, nil, EVENT_UNIT_ISSUED_POINT_ORDER)
    TriggerAddCondition(gg_trg_Untitled_Trigger_001, Condition(Trig_Untitled_Trigger_001_Conditions))
    TriggerAddAction(gg_trg_Untitled_Trigger_001, Trig_Untitled_Trigger_001_Actions)
end

function InitCustomTriggers()
    InitTrig_Untitled_Trigger_001()
end

function InitCustomPlayerSlots()
    SetPlayerStartLocation(Player(0), 0)
    ForcePlayerStartLocation(Player(0), 0)
    SetPlayerColor(Player(0), ConvertPlayerColor(0))
    SetPlayerRacePreference(Player(0), RACE_PREF_RANDOM)
    SetPlayerRaceSelectable(Player(0), true)
    SetPlayerController(Player(0), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(1), 1)
    ForcePlayerStartLocation(Player(1), 1)
    SetPlayerColor(Player(1), ConvertPlayerColor(1))
    SetPlayerRacePreference(Player(1), RACE_PREF_RANDOM)
    SetPlayerRaceSelectable(Player(1), true)
    SetPlayerController(Player(1), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(2), 2)
    ForcePlayerStartLocation(Player(2), 2)
    SetPlayerColor(Player(2), ConvertPlayerColor(2))
    SetPlayerRacePreference(Player(2), RACE_PREF_RANDOM)
    SetPlayerRaceSelectable(Player(2), true)
    SetPlayerController(Player(2), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(3), 3)
    ForcePlayerStartLocation(Player(3), 3)
    SetPlayerColor(Player(3), ConvertPlayerColor(3))
    SetPlayerRacePreference(Player(3), RACE_PREF_RANDOM)
    SetPlayerRaceSelectable(Player(3), true)
    SetPlayerController(Player(3), MAP_CONTROL_USER)
    SetPlayerStartLocation(Player(12), 4)
    ForcePlayerStartLocation(Player(12), 4)
    SetPlayerColor(Player(12), ConvertPlayerColor(12))
    SetPlayerRacePreference(Player(12), RACE_PREF_UNDEAD)
    SetPlayerRaceSelectable(Player(12), false)
    SetPlayerController(Player(12), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(13), 5)
    ForcePlayerStartLocation(Player(13), 5)
    SetPlayerColor(Player(13), ConvertPlayerColor(13))
    SetPlayerRacePreference(Player(13), RACE_PREF_UNDEAD)
    SetPlayerRaceSelectable(Player(13), false)
    SetPlayerController(Player(13), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(14), 6)
    ForcePlayerStartLocation(Player(14), 6)
    SetPlayerColor(Player(14), ConvertPlayerColor(14))
    SetPlayerRacePreference(Player(14), RACE_PREF_UNDEAD)
    SetPlayerRaceSelectable(Player(14), false)
    SetPlayerController(Player(14), MAP_CONTROL_COMPUTER)
    SetPlayerStartLocation(Player(15), 7)
    ForcePlayerStartLocation(Player(15), 7)
    SetPlayerColor(Player(15), ConvertPlayerColor(15))
    SetPlayerRacePreference(Player(15), RACE_PREF_UNDEAD)
    SetPlayerRaceSelectable(Player(15), false)
    SetPlayerController(Player(15), MAP_CONTROL_COMPUTER)
end

function InitCustomTeams()
    SetPlayerTeam(Player(0), 0)
    SetPlayerState(Player(0), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(1), 0)
    SetPlayerState(Player(1), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(2), 0)
    SetPlayerState(Player(2), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(3), 0)
    SetPlayerState(Player(3), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(0), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(2), true)
    SetPlayerAllianceStateAllyBJ(Player(1), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(2), Player(3), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(0), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(1), true)
    SetPlayerAllianceStateAllyBJ(Player(3), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(0), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(2), true)
    SetPlayerAllianceStateVisionBJ(Player(1), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(2), Player(3), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(0), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(1), true)
    SetPlayerAllianceStateVisionBJ(Player(3), Player(2), true)
    SetPlayerTeam(Player(12), 1)
    SetPlayerState(Player(12), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(13), 1)
    SetPlayerState(Player(13), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(14), 1)
    SetPlayerState(Player(14), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerTeam(Player(15), 1)
    SetPlayerState(Player(15), PLAYER_STATE_ALLIED_VICTORY, 1)
    SetPlayerAllianceStateAllyBJ(Player(12), Player(13), true)
    SetPlayerAllianceStateAllyBJ(Player(12), Player(14), true)
    SetPlayerAllianceStateAllyBJ(Player(12), Player(15), true)
    SetPlayerAllianceStateAllyBJ(Player(13), Player(12), true)
    SetPlayerAllianceStateAllyBJ(Player(13), Player(14), true)
    SetPlayerAllianceStateAllyBJ(Player(13), Player(15), true)
    SetPlayerAllianceStateAllyBJ(Player(14), Player(12), true)
    SetPlayerAllianceStateAllyBJ(Player(14), Player(13), true)
    SetPlayerAllianceStateAllyBJ(Player(14), Player(15), true)
    SetPlayerAllianceStateAllyBJ(Player(15), Player(12), true)
    SetPlayerAllianceStateAllyBJ(Player(15), Player(13), true)
    SetPlayerAllianceStateAllyBJ(Player(15), Player(14), true)
    SetPlayerAllianceStateVisionBJ(Player(12), Player(13), true)
    SetPlayerAllianceStateVisionBJ(Player(12), Player(14), true)
    SetPlayerAllianceStateVisionBJ(Player(12), Player(15), true)
    SetPlayerAllianceStateVisionBJ(Player(13), Player(12), true)
    SetPlayerAllianceStateVisionBJ(Player(13), Player(14), true)
    SetPlayerAllianceStateVisionBJ(Player(13), Player(15), true)
    SetPlayerAllianceStateVisionBJ(Player(14), Player(12), true)
    SetPlayerAllianceStateVisionBJ(Player(14), Player(13), true)
    SetPlayerAllianceStateVisionBJ(Player(14), Player(15), true)
    SetPlayerAllianceStateVisionBJ(Player(15), Player(12), true)
    SetPlayerAllianceStateVisionBJ(Player(15), Player(13), true)
    SetPlayerAllianceStateVisionBJ(Player(15), Player(14), true)
end

function InitAllyPriorities()
    SetStartLocPrioCount(0, 3)
    SetStartLocPrio(0, 0, 1, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(0, 1, 2, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(0, 2, 3, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(1, 2)
    SetStartLocPrio(1, 0, 2, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(1, 1, 3, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(2, 2)
    SetStartLocPrio(2, 0, 1, MAP_LOC_PRIO_LOW)
    SetStartLocPrio(2, 1, 3, MAP_LOC_PRIO_HIGH)
    SetStartLocPrioCount(3, 2)
    SetStartLocPrio(3, 0, 1, MAP_LOC_PRIO_HIGH)
    SetStartLocPrio(3, 1, 2, MAP_LOC_PRIO_HIGH)
end

function main()
    SetCameraBounds(-7424.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), -7680.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM), 7424.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), 7168.0 - GetCameraMargin(CAMERA_MARGIN_TOP), -7424.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), 7168.0 - GetCameraMargin(CAMERA_MARGIN_TOP), 7424.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), -7680.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM))
    SetDayNightModels("Environment\\DNC\\DNCDalaran\\DNCDalaranTerrain\\DNCDalaranTerrain.mdl", "Environment\\DNC\\DNCDalaran\\DNCDalaranUnit\\DNCDalaranUnit.mdl")
    NewSoundEnvironment("Default")
    SetAmbientDaySound("DalaranDay")
    SetAmbientNightSound("DalaranNight")
    SetMapMusic("Music", true, 0)
    CreateAllUnits()
    InitBlizzard()
    InitGlobals()
    InitCustomTriggers()
end

function config()
    SetMapName("TRIGSTR_003")
    SetMapDescription("TRIGSTR_005")
    SetPlayers(8)
    SetTeams(8)
    SetGamePlacement(MAP_PLACEMENT_TEAMS_TOGETHER)
    DefineStartLocation(0, -832.0, -2112.0)
    DefineStartLocation(1, -1856.0, -1024.0)
    DefineStartLocation(2, -2304.0, -1472.0)
    DefineStartLocation(3, -1856.0, -1472.0)
    DefineStartLocation(4, -3328.0, 2304.0)
    DefineStartLocation(5, -1280.0, 2240.0)
    DefineStartLocation(6, 896.0, 2240.0)
    DefineStartLocation(7, -192.0, 1920.0)
    InitCustomPlayerSlots()
    InitCustomTeams()
    InitAllyPriorities()
end

