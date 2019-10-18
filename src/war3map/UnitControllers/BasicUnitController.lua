local ____exports = {}
local __TSTL_Point = require("war3map.Generic.Point")
local Point = __TSTL_Point.Point
local __TSTL_ExtensionFunctions = require("war3map.ExtensionFunctions")
local IsWalkable = __TSTL_ExtensionFunctions.IsWalkable
local __TSTL_Misc = require("war3map.Generic.Misc")
local rotateToPoint = __TSTL_Misc.rotateToPoint
____exports.BasicUnitController = {}
local BasicUnitController = ____exports.BasicUnitController
BasicUnitController.name = "BasicUnitController"
BasicUnitController.__index = BasicUnitController
BasicUnitController.prototype = {}
BasicUnitController.prototype.__index = BasicUnitController.prototype
BasicUnitController.prototype.constructor = BasicUnitController
function BasicUnitController.new(...)
    local self = setmetatable({}, BasicUnitController.prototype)
    self:____constructor(...)
    return self
end
function BasicUnitController.prototype.____constructor(self, targetUnit, heroUnit)
    self.currentDirection = bj_UNIT_FACING
    self.targetUnit = targetUnit
    self.walkAnimationIndex = heroUnit.walkAnimationIndex
    self.heroUnit = heroUnit
end
function BasicUnitController.prototype.moveUnit(self, toDirection)
    local speed = GetUnitMoveSpeed(self.targetUnit) / 100
    self.currentDirection = rotateToPoint(nil, self.currentDirection, toDirection, 180)
    local lastLoc = Point:fromLocationClean(GetUnitLoc(self.targetUnit))
    local currLoc = lastLoc:polarProject(speed, self.currentDirection)
    if IsWalkable(nil, currLoc.x, lastLoc.y) then
        SetUnitX(self.targetUnit, currLoc.x)
    end
    if IsWalkable(nil, lastLoc.x, currLoc.y) then
        SetUnitY(self.targetUnit, currLoc.y)
    end
    SetUnitFacing(self.targetUnit, self.currentDirection)
end
function BasicUnitController.prototype.getWalkAnimationIndex(self)
    return self.walkAnimationIndex
end
return ____exports
