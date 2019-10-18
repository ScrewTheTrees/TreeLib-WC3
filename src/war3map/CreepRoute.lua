-- Lua Library inline imports
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
function __TS__StringStartsWith(self, searchString, position)
    if position == nil or position < 0 then
        position = 0
    end
    return string.sub(self, position + 1, #searchString + position) == searchString
end

--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
function __TS__Number(value)
    local valueType = type(value)
    if valueType == "number" then
        return value
    elseif valueType == "string" then
        local numberValue = tonumber(value)
        if numberValue then
            return numberValue
        end
        if value == "Infinity" then
            return math.huge
        end
        if value == "-Infinity" then
            return -math.huge
        end
        local stringWithoutSpaces = string.gsub(value, "%s", "")
        if stringWithoutSpaces == "" then
            return 0
        end
        return (0 / 0)
    elseif valueType == "boolean" then
        return value and 1 or 0
    else
        return (0 / 0)
    end
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
local __TSTL_ShitEx = require("war3map.Generic.ShitEx")
local ShitEx = __TSTL_ShitEx.ShitEx
local __TSTL_Logger = require("war3map.Generic.Logger")
local Logger = __TSTL_Logger.Logger
local __TSTL_Orders = require("war3map.Orders")
local Orders = __TSTL_Orders.Orders
local __TSTL_ExtensionFunctions = require("war3map.ExtensionFunctions")
local GetRandomLocInRectUnitSafe = __TSTL_ExtensionFunctions.GetRandomLocInRectUnitSafe
____exports.CreepRoute = {}
local CreepRoute = ____exports.CreepRoute
CreepRoute.name = "CreepRoute"
CreepRoute.__index = CreepRoute
CreepRoute.prototype = {}
CreepRoute.prototype.__index = CreepRoute.prototype
CreepRoute.prototype.constructor = CreepRoute
function CreepRoute.new(...)
    local self = setmetatable({}, CreepRoute.prototype)
    self:____constructor(...)
    return self
end
function CreepRoute.prototype.____constructor(self, index, creepPlayer)
    self.wayPoints = {}
    self.wayPointTriggers = {}
    self.myIndex = index
    self.creepPlayer = creepPlayer
    self.startPoint = Global.AllRegions["gg_rct_route" .. tostring(self.myIndex) .. "spawn"]
    self.endPoint = Global.AllRegions["gg_rct_route" .. tostring(self.myIndex) .. "end"]
    self:createWaypointList()
    self:generateWaypoints()
    Logger:LogVerbose("startPoint in route " .. tostring(self.myIndex) .. "  -  " .. tostring(self.startPoint))
    Logger:LogVerbose("endPoint in route " .. tostring(self.myIndex) .. "  -  " .. tostring(self.endPoint))
    Logger:LogDebug("Total wayPoints " .. tostring(#self.wayPoints) .. " in route " .. tostring(self.myIndex))
    Logger:LogDebug("Total triggers " .. tostring(#self.wayPointTriggers) .. " in route " .. tostring(self.myIndex))
end
function CreepRoute.prototype.spawnUnit(self, unitType)
    local loc = GetRandomLocInRectUnitSafe(nil, self.startPoint)
    local u = CreateUnitAtLoc(self.creepPlayer, unitType, loc, bj_UNIT_FACING)
    RemoveGuardPosition(u)
    RemoveLocation(loc)
end
function CreepRoute.prototype.createWaypointList(self)
    __TS__ArrayForEach(__TS__ObjectEntries(Global.AllRegions), function(____, ____TS_bindingPattern0)
        local key = ____TS_bindingPattern0[1]
        local value = ____TS_bindingPattern0[2]
        if __TS__StringStartsWith(key, "gg_rct_route" .. tostring(self.myIndex)) then
            local result = ShitEx:seperateNumbers(key)
            if result[3] == "waypoint" then
                self.wayPoints[__TS__Number(result[4]) + 1] = value
                Logger:LogVerbose("Added waypoint " .. tostring(result[4]) .. " to route " .. tostring(result[2]))
            end
        end
    end)
end
function CreepRoute.prototype.generateWaypoints(self)
    if #self.wayPoints > 0 then
        __TS__ArrayPush(self.wayPointTriggers, self:createWaypointTrigger(self.startPoint, self.wayPoints[2]))
        do
            local i = 1
            while i < #self.wayPoints - 1 do
                local start = self.wayPoints[i + 1]
                local ____end = self.wayPoints[(i + 1) + 1]
                __TS__ArrayPush(self.wayPointTriggers, self:createWaypointTrigger(start, ____end))
                i = i + 1
            end
        end
        __TS__ArrayPush(self.wayPointTriggers, self:createWaypointTrigger(self.wayPoints[#self.wayPoints], self.endPoint))
    else
        __TS__ArrayPush(self.wayPointTriggers, self:createWaypointTrigger(self.startPoint, self.endPoint))
    end
end
function CreepRoute.prototype.createWaypointTrigger(self, beginRect, endRect)
    local newTrigger = CreateTrigger()
    local reg = CreateRegion()
    RegionAddRect(reg, beginRect)
    TriggerRegisterEnterRegion(newTrigger, reg, nil)
    TriggerAddCondition(newTrigger, Condition(function()
        return (GetOwningPlayer(GetEnteringUnit()) == self.creepPlayer)
    end))
    TriggerAddAction(newTrigger, function()
        local loc = GetRandomLocInRectUnitSafe(nil, endRect)
        IssuePointOrderLoc(GetEnteringUnit(), Orders.patrol, loc)
        RemoveLocation(loc)
    end)
    return newTrigger
end
return ____exports
