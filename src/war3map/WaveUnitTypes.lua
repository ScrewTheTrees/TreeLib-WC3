local ____exports = {}
____exports.WaveUnitTypes = {}
local WaveUnitTypes = ____exports.WaveUnitTypes
WaveUnitTypes.name = "WaveUnitTypes"
WaveUnitTypes.__index = WaveUnitTypes
WaveUnitTypes.prototype = {}
WaveUnitTypes.prototype.__index = WaveUnitTypes.prototype
WaveUnitTypes.prototype.constructor = WaveUnitTypes
function WaveUnitTypes.new(...)
    local self = setmetatable({}, WaveUnitTypes.prototype)
    self:____constructor(...)
    return self
end
function WaveUnitTypes.prototype.____constructor(self)
end
function WaveUnitTypes.init(self)
    ____exports.WaveUnitTypes.unitTypes[2] = FourCC("h000")
end
function WaveUnitTypes.get(self, index)
    local ret = ____exports.WaveUnitTypes.unitTypes[index + 1]
    if not ret then
        ret = ____exports.WaveUnitTypes.unitTypes[GetRandomInt(1, #____exports.WaveUnitTypes.unitTypes - 1) + 1]
    end
    return ret
end
WaveUnitTypes.unitTypes = {}
ceres.addHook("main::after", ____exports.WaveUnitTypes.init)
return ____exports
