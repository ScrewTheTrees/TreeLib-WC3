local ____exports = {}
____exports.ProgressTracker = {}
local ProgressTracker = ____exports.ProgressTracker
ProgressTracker.name = "ProgressTracker"
ProgressTracker.__index = ProgressTracker
ProgressTracker.prototype = {}
ProgressTracker.prototype.__index = ProgressTracker.prototype
ProgressTracker.prototype.constructor = ProgressTracker
function ProgressTracker.new(...)
    local self = setmetatable({}, ProgressTracker.prototype)
    self:____constructor(...)
    return self
end
function ProgressTracker.prototype.____constructor(self)
end
function ProgressTracker.init(self)
    ____exports.ProgressTracker.onExitRegion = CreateTrigger()
    TriggerAddAction(____exports.ProgressTracker.onExitRegion, function()
        RemoveUnit(GetEnteringUnit())
        ____exports.ProgressTracker.lives = ____exports.ProgressTracker.lives - 1
    end)
end
function ProgressTracker.AddCreepExitRegion(self, enter, creepPlayer)
    local reg = CreateRegion()
    RegionAddRect(reg, enter)
    TriggerRegisterEnterRegion(____exports.ProgressTracker.onExitRegion, reg, Filter(function()
        return (GetOwningPlayer(GetFilterUnit()) == creepPlayer)
    end))
end
ProgressTracker.lives = 30
ceres.addHook("main::after", ____exports.ProgressTracker.init)
return ____exports
