local ____exports = {}
____exports.Global = {}
local Global = ____exports.Global
Global.name = "Global"
Global.__index = Global
Global.prototype = {}
Global.prototype.__index = Global.prototype
Global.prototype.constructor = Global
function Global.new(...)
    local self = setmetatable({}, Global.prototype)
    self:____constructor(...)
    return self
end
function Global.prototype.____constructor(self)
end
Global.MaxPlayerSlots = 4
Global.ActivePlayers = {}
Global.CreepPlayers = {}
Global.AllRegions = {}
return ____exports
