-- Lua Library inline imports
function __TS__ArrayForEach(arr, callbackFn)
    do
        local i = 0
        while i < #arr do
            callbackFn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
end

function __TS__ArrayPush(arr, ...)
    local items = ({...})
    for ____, item in ipairs(items) do
        arr[#arr + 1] = item
    end
    return #arr
end

function __TS__ArrayIndexOf(arr, searchElement, fromIndex)
    local len = #arr
    if len == 0 then
        return -1
    end
    local n = 0
    if fromIndex then
        n = fromIndex
    end
    if n >= len then
        return -1
    end
    local k
    if n >= 0 then
        k = n
    else
        k = len + n
        if k < 0 then
            k = 0
        end
    end
    do
        local i = k
        while i < len do
            if arr[i + 1] == searchElement then
                return i
            end
            i = i + 1
        end
    end
    return -1
end

function __TS__ArraySplice(list, ...)
    local len = #list
    local actualArgumentCount = select("#", ...)
    local start = select(1, ...)
    local deleteCount = select(2, ...)
    local actualStart
    if start < 0 then
        actualStart = math.max(len + start, 0)
    else
        actualStart = math.min(start, len)
    end
    local itemCount = math.max(actualArgumentCount - 2, 0)
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - actualStart
    else
        actualDeleteCount = math.min(
            math.max(deleteCount or 0, 0),
            len - actualStart
        )
    end
    local out = {}
    do
        local k = 0
        while k < actualDeleteCount do
            local from = actualStart + k
            if list[from + 1] then
                out[k + 1] = list[from + 1]
            end
            k = k + 1
        end
    end
    if itemCount < actualDeleteCount then
        do
            local k = actualStart
            while k < len - actualDeleteCount do
                local from = k + actualDeleteCount
                local to = k + itemCount
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k + 1
            end
        end
        do
            local k = len
            while k > len - actualDeleteCount + itemCount do
                list[k] = nil
                k = k - 1
            end
        end
    elseif itemCount > actualDeleteCount then
        do
            local k = len - actualDeleteCount
            while k > actualStart do
                local from = k + actualDeleteCount - 1
                local to = k + itemCount - 1
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k - 1
            end
        end
    end
    local j = actualStart
    for i = 3, actualArgumentCount do
        list[j + 1] = select(i, ...)
        j = j + 1
    end
    do
        local k = #list - 1
        while k >= len - actualDeleteCount + itemCount do
            list[k + 1] = nil
            k = k - 1
        end
    end
    return out
end

local ____exports = {}
local ____Timers = require("war3map.Generic.Timers")
local Timers = ____Timers.Timers
local ____Logger = require("war3map.Generic.Logger")
local Logger = ____Logger.Logger
____exports.Entity = {}
local Entity = ____exports.Entity
Entity.name = "Entity"
Entity.__index = Entity
Entity.prototype = {}
Entity.prototype.__index = Entity.prototype
Entity.prototype.constructor = Entity
function Entity.new(...)
    local self = setmetatable({}, Entity.prototype)
    self:____constructor(...)
    return self
end
function Entity.prototype.____constructor(self)
    self._internalTimer = 0
    self._timerDelay = 0.01
    if ____exports.Entity.entityLoop == nil then
        ____exports.Entity.entityLoop = function()
            __TS__ArrayForEach(
                ____exports.Entity.entities,
                function(____, entity) return ({
                    xpcall(
                        function()
                            entity._internalTimer = entity._internalTimer + 0.01
                            if entity._internalTimer >= entity._timerDelay then
                                entity.step(entity)
                            end
                        end,
                        function() return Logger.LogCritical end
                    )
                }) end
            )
        end
        Timers:getInstance():addFastTimerCallback(____exports.Entity.entityLoop)
    end
    __TS__ArrayPush(____exports.Entity.entities, self)
end
function Entity.prototype.remove(self)
    local index = __TS__ArrayIndexOf(____exports.Entity.entities, self)
    if index ~= -1 then
        __TS__ArraySplice(____exports.Entity.entities, index, 1)
    end
end
Entity.entities = {}
return ____exports
