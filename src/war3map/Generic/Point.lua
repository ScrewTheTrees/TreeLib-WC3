local ____exports = {}
____exports.Point = {}
local Point = ____exports.Point
Point.name = "Point"
Point.__index = Point
Point.prototype = {}
Point.prototype.__index = Point.prototype
Point.prototype.constructor = Point
function Point.new(...)
    local self = setmetatable({}, Point.prototype)
    self:____constructor(...)
    return self
end
function Point.prototype.____constructor(self, x, y)
    self.x = x
    self.y = y
end
function Point.prototype.distanceTo(self, target)
    return (math.sqrt(self.x - target.x) + math.sqrt(self.y - target.y))
end
function Point.prototype.directionTo(self, target)
    local radians = math.atan(target.y - self.y, target.x - self.x)
    return (radians * 180 / math.pi)
end
function Point.prototype.toLocation(self)
    return Location(self.x, self.y)
end
function Point.prototype.polarProject(self, distance, angle)
    local x = self.x + distance * math.cos(angle * bj_DEGTORAD)
    local y = self.y + distance * math.sin(angle * bj_DEGTORAD)
    return ____exports.Point.new(x, y)
end
function Point.fromLocation(self, inputLoc)
    return ____exports.Point.new(GetLocationX(inputLoc), GetLocationY(inputLoc))
end
function Point.fromLocationClean(self, inputLoc)
    local point = ____exports.Point.new(GetLocationX(inputLoc), GetLocationY(inputLoc))
    RemoveLocation(inputLoc)
    return point
end
function Point.prototype.distanceToLine(self, lineStart, lineEnd)
    local A = self.x - lineStart.x
    local B = self.y - lineStart.y
    local C = lineEnd.x - lineStart.x
    local D = lineEnd.y - lineStart.y
    local dot = A * C + B * D
    local len_sq = C * C + D * D
    local param = -1
    if len_sq ~= 0 then
        param = dot / len_sq
    end
    local xx
    local yy
    if param < 0 then
        xx = lineStart.x
        yy = lineStart.y
    elseif param > 1 then
        xx = lineEnd.x
        yy = lineEnd.y
    else
        xx = lineStart.x + param * C
        yy = lineStart.y + param * D
    end
    local dx = self.x - xx
    local dy = self.y - yy
    return math.sqrt(dx * dx + dy * dy)
end
return ____exports
