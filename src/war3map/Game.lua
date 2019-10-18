-- Lua Library inline imports
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
function __TS__ArrayPush(arr, ...)
    local items = ({...})
    for ____, item in ipairs(items) do
        arr[#arr + 1] = item
    end
    return #arr
end

local ____exports = {}
local __TSTL_GlobalGenerator = require("war3map.GlobalGenerator")
local GlobalGenerator = __TSTL_GlobalGenerator.GlobalGenerator
local __TSTL_CreepRoute = require("war3map.CreepRoute")
local CreepRoute = __TSTL_CreepRoute.CreepRoute
local __TSTL_Global = require("war3map.Global")
local Global = __TSTL_Global.Global
local __TSTL_ProgressTracker = require("war3map.ProgressTracker")
local ProgressTracker = __TSTL_ProgressTracker.ProgressTracker
local __TSTL_WaveHandler = require("war3map.WaveHandler")
local WaveHandler = __TSTL_WaveHandler.WaveHandler
local __TSTL_PlayerController = require("war3map.Player.PlayerController")
local PlayerController = __TSTL_PlayerController.PlayerController
local __TSTL_BasicUnitController = require("war3map.UnitControllers.BasicUnitController")
local BasicUnitController = __TSTL_BasicUnitController.BasicUnitController
local __TSTL_HeroUnit = require("war3map.UnitControllers.HeroUnit")
local HeroUnit = __TSTL_HeroUnit.HeroUnit
____exports.Game = {}
local Game = ____exports.Game
Game.name = "Game"
Game.__index = Game
Game.prototype = {}
Game.prototype.__index = Game.prototype
Game.prototype.constructor = Game
function Game.new(...)
    local self = setmetatable({}, Game.prototype)
    self:____constructor(...)
    return self
end
function Game.prototype.____constructor(self)
    self.routes = {}
    self.playerController = {}
    GlobalGenerator:run()
    self.routes[2] = CreepRoute.new(1, Global.CreepPlayers[2])
    self.routes[3] = CreepRoute.new(2, Global.CreepPlayers[3])
    self.routes[4] = CreepRoute.new(3, Global.CreepPlayers[4])
    local route = self.routes[2]
    local route2 = self.routes[3]
    local route3 = self.routes[4]
    self.waveHandler = WaveHandler.new()
    __TS__ArrayPush(self.waveHandler.sendSpawnSignal, function(____, wave)
        route:spawnUnit(wave.unitType)
    end)
    __TS__ArrayPush(self.waveHandler.sendSpawnSignal, function(____, wave)
        route2:spawnUnit(wave.unitType)
    end)
    __TS__ArrayPush(self.waveHandler.sendSpawnSignal, function(____, wave)
        route3:spawnUnit(wave.unitType)
    end)
    self.waveHandler:startWaveTimer()
    self:createPlayers()
    ProgressTracker:AddCreepExitRegion(route.endPoint, route.creepPlayer)
    ProgressTracker:AddCreepExitRegion(route2.endPoint, route2.creepPlayer)
    ProgressTracker:AddCreepExitRegion(route3.endPoint, route3.creepPlayer)
end
function Game.prototype.createPlayers(self)
    do
        local i = 0
        while i < #Global.ActivePlayers do
            local targetPlayer = Global.ActivePlayers[i + 1]
            local fogMod = CreateFogModifierRect(targetPlayer, FOG_OF_WAR_VISIBLE, GetEntireMapRect(), false, false)
            FogModifierStart(fogMod)
            local pc = PlayerController.new(targetPlayer)
            __TS__ArrayPush(self.playerController, pc)
            local hero = HeroUnit.HERO_POTM
            local u = CreateUnitAtLoc(targetPlayer, hero.unitType, GetPlayerStartLocationLoc(targetPlayer), bj_UNIT_FACING)
            pc:addControlledUnit(u, BasicUnitController.new(u, hero))
            i = i + 1
        end
    end
end
return ____exports
