-- Lua Library inline imports
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

local ____exports = {}
local ____Entity = require("war3map.Generic.Entity")
local Entity = ____Entity.Entity
local ____Hooks = require("war3map.Generic.Hooks")
local Hooks = ____Hooks.Hooks
local ____DelayDto = require("war3map.Generic.DataContainers.DelayDto")
local DelayDto = ____DelayDto.DelayDto
____exports.Delay = {}
local Delay = ____exports.Delay
Delay.name = "Delay"
Delay.__index = Delay
Delay.prototype = {}
Delay.prototype.__index = Delay.prototype
Delay.prototype.constructor = Delay
Delay.____super = Entity
setmetatable(Delay, Delay.____super)
setmetatable(Delay.prototype, Delay.____super.prototype)
function Delay.new(...)
    local self = setmetatable({}, Delay.prototype)
    self:____constructor(...)
    return self
end
function Delay.prototype.____constructor(self)
    Entity.prototype.____constructor(self)
    self.queue = {}
end
function Delay.getInstance(self)
    if self.instance == nil then
        self.instance = ____exports.Delay.new()
        Hooks:set("Delay", self.instance)
    end
    return self.instance
end
function Delay.prototype.step(self)
    __TS__ArrayForEach(
        self.queue,
        function(____, queueDto, index)
            queueDto.age = queueDto.age + 0.01
            if queueDto.age >= queueDto.delay then
                queueDto["function"](queueDto)
                __TS__ArraySplice(self.queue, index, 1)
            end
        end
    )
end
function Delay.prototype.addDelay(self, f, delay)
    self:addDelayFrom(
        DelayDto.new(f, delay)
    )
end
function Delay.prototype.addDelayFrom(self, delayDto)
    __TS__ArrayPush(self.queue, delayDto)
end
return ____exports
