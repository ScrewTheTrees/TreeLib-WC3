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

local ____exports = {}
local ____Hooks = require("war3map.Generic.Hooks")
local Hooks = ____Hooks.Hooks
____exports.Timers = {}
local Timers = ____exports.Timers
Timers.name = "Timers"
Timers.__index = Timers
Timers.prototype = {}
Timers.prototype.__index = Timers.prototype
Timers.prototype.constructor = Timers
function Timers.new(...)
    local self = setmetatable({}, Timers.prototype)
    self:____constructor(...)
    return self
end
function Timers.prototype.____constructor(self)
    self.fastTimerCallbacks = {}
    self.secondTimerCallbacks = {}
    self.fastTimer = CreateTrigger()
    TriggerRegisterTimerEvent(self.fastTimer, 0.01, true)
    TriggerAddAction(
        self.fastTimer,
        function()
            __TS__ArrayForEach(
                self.fastTimerCallbacks,
                function(____, callback)
                    callback(nil)
                end
            )
        end
    )
    self.secondTimer = CreateTrigger()
    TriggerRegisterTimerEvent(self.secondTimer, 1, true)
    TriggerAddAction(
        self.secondTimer,
        function()
            __TS__ArrayForEach(
                self.secondTimerCallbacks,
                function(____, callback)
                    callback(nil)
                end
            )
        end
    )
end
function Timers.getInstance(self)
    if self.instance == nil then
        self.instance = ____exports.Timers.new()
        Hooks:set("Timers", self.instance)
    end
    return self.instance
end
function Timers.prototype.addFastTimerCallback(self, func)
    __TS__ArrayPush(self.fastTimerCallbacks, func)
end
function Timers.prototype.addSecondTimerCallback(self, func)
    __TS__ArrayPush(self.secondTimerCallbacks, func)
end
return ____exports
