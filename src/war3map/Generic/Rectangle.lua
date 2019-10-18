local ____exports = {}
____exports.Rectangle = {}
local Rectangle = ____exports.Rectangle
Rectangle.name = "Rectangle"
Rectangle.__index = Rectangle
Rectangle.prototype = {}
Rectangle.prototype.__index = Rectangle.prototype
Rectangle.prototype.constructor = Rectangle
function Rectangle.new(...)
    local self = setmetatable({}, Rectangle.prototype)
    self:____constructor(...)
    return self
end
function Rectangle.prototype.____constructor(self, x, y, x2, y2)
    self.x = x
    self.y = y
    self.x2 = x2
    self.y2 = y2
end
function Rectangle.prototype.toRect(self)
    return Rect(self.x, self.y, self.x2, self.y2)
end
function Rectangle.fromRect(self, input)
    return ____exports.Rectangle.new(
        GetRectMinX(input),
        GetRectMinY(input),
        GetRectMaxX(input),
        GetRectMaxY(input)
    )
end
function Rectangle.fromRectClean(self, input)
    local retVar = ____exports.Rectangle.new(
        GetRectMinX(input),
        GetRectMinY(input),
        GetRectMaxX(input),
        GetRectMaxY(input)
    )
    RemoveRect(input)
    return retVar
end
return ____exports
