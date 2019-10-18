local ____exports = {}
____exports.DelayDto = {}
local DelayDto = ____exports.DelayDto
DelayDto.name = "DelayDto"
DelayDto.__index = DelayDto
DelayDto.prototype = {}
DelayDto.prototype.__index = DelayDto.prototype
DelayDto.prototype.constructor = DelayDto
function DelayDto.new(...)
    local self = setmetatable({}, DelayDto.prototype)
    self:____constructor(...)
    return self
end
function DelayDto.prototype.____constructor(self, func, delay)
    self.age = 0
    self["function"] = func
    self.delay = delay
end
return ____exports
