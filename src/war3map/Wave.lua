local ____exports = {}
____exports.Wave = {}
local Wave = ____exports.Wave
Wave.name = "Wave"
Wave.__index = Wave
Wave.prototype = {}
Wave.prototype.__index = Wave.prototype
Wave.prototype.constructor = Wave
function Wave.new(...)
    local self = setmetatable({}, Wave.prototype)
    self:____constructor(...)
    return self
end
function Wave.prototype.____constructor(self, unitType)
    self.unitType = unitType
end
return ____exports
