-- Lua Library inline imports
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
function __TS__StringStartsWith(self, searchString, position)
    if position == nil or position < 0 then
        position = 0
    end
    return string.sub(self, position + 1, #searchString + position) == searchString
end

--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
function __TS__ObjectEntries(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = {
            key,
            obj[key],
        }
    end
    return result
end

--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
function __TS__ArrayForEach(arr, callbackFn)
    do
        local i = 0
        while i < #arr do
            callbackFn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
end

--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
function __TS__ArrayPush(arr, ...)
    local items = ({...})
    for ____, item in ipairs(items) do
        arr[#arr + 1] = item
    end
    return #arr
end

local ____exports = {}
local __TSTL_Global = require("war3map.Global")
local Global = __TSTL_Global.Global
local __TSTL_Logger = require("war3map.Generic.Logger")
local Logger = __TSTL_Logger.Logger
____exports.GlobalGenerator = {}
local GlobalGenerator = ____exports.GlobalGenerator
GlobalGenerator.name = "GlobalGenerator"
GlobalGenerator.__index = GlobalGenerator
GlobalGenerator.prototype = {}
GlobalGenerator.prototype.__index = GlobalGenerator.prototype
GlobalGenerator.prototype.constructor = GlobalGenerator
function GlobalGenerator.new(...)
    local self = setmetatable({}, GlobalGenerator.prototype)
    self:____constructor(...)
    return self
end
function GlobalGenerator.prototype.____constructor(self)
end
function GlobalGenerator.run(self)
    __TS__ArrayForEach(__TS__ObjectEntries(_G), function(____, data)
        local key = data[1]
        local value = data[2]
        if __TS__StringStartsWith(key, "gg_rct") then
            self:handleRegion(key, value)
        end
    end)
    self:generatePlayers()
end
function GlobalGenerator.handleRegion(self, key, value)
    Global.AllRegions[key] = value
    Logger:LogVerbose(Global.AllRegions[key])
end
function GlobalGenerator.generatePlayers(self)
    local computerPlayers = 0
    do
        local i = 0
        while i < Global.MaxPlayerSlots do
            local targetPlayer = Player(i)
            if GetPlayerSlotState(targetPlayer) == PLAYER_SLOT_STATE_PLAYING then
                if GetPlayerController(targetPlayer) == MAP_CONTROL_USER then
                    __TS__ArrayPush(Global.ActivePlayers, targetPlayer)
                    print(tostring(GetPlayerName(targetPlayer)) .. " is up for the task.")
                else
                    computerPlayers = computerPlayers + 1
                    Logger:LogDebug("Cpu player found: ", i)
                end
            else
                Logger:LogDebug("Empty slot found: ", i)
            end
            i = i + 1
        end
    end
    if computerPlayers > 0 then
        print("I know friends are hard to find, but the " .. tostring(computerPlayers) .. " computer/s is no substitute.")
    end
    Global.CreepPlayers[2] = Player(12)
    Global.CreepPlayers[3] = Player(13)
    Global.CreepPlayers[4] = Player(14)
    Global.CreepPlayers[5] = Player(15)
    Logger:LogDebug("Num of Creep players: ", #Global.CreepPlayers)
end
return ____exports
