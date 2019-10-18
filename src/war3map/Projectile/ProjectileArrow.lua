local ____exports = {}
local __TSTL_Entity = require("war3map.Generic.Entity")
local Entity = __TSTL_Entity.Entity
local __TSTL_ExtensionFunctions = require("war3map.ExtensionFunctions")
local GetTerrainHeight = __TSTL_ExtensionFunctions.GetTerrainHeight
local __TSTL_Misc = require("war3map.Generic.Misc")
local linearInterpolate = __TSTL_Misc.linearInterpolate
____exports.ProjectileArrow = {}
local ProjectileArrow = ____exports.ProjectileArrow
ProjectileArrow.name = "ProjectileArrow"
ProjectileArrow.__index = ProjectileArrow
ProjectileArrow.prototype = {}
ProjectileArrow.prototype.__index = ProjectileArrow.prototype
ProjectileArrow.prototype.constructor = ProjectileArrow
ProjectileArrow.____super = Entity
setmetatable(ProjectileArrow, ProjectileArrow.____super)
setmetatable(ProjectileArrow.prototype, ProjectileArrow.____super.prototype)
function ProjectileArrow.new(...)
    local self = setmetatable({}, ProjectileArrow.prototype)
    self:____constructor(...)
    return self
end
function ProjectileArrow.prototype.____constructor(self, model, size, owner, startLocation, targetLocation, lifeSpan, speed)
    Entity.prototype.____constructor(self)
    self.model = model
    self.size = size
    self.owner = owner
    self.previousPoint = startLocation
    self.currentPoint = startLocation
    self.targetPoint = targetLocation
    self.lifeSpan = lifeSpan
    self.speed = speed
    self.effectHeight = 96
    self.cliffLevel = GetTerrainCliffLevel(startLocation.x, startLocation.y)
    self.direction = self.currentPoint:directionTo(self.targetPoint)
    self.effect = AddSpecialEffect(self.model, startLocation.x, startLocation.y)
    BlzSetSpecialEffectYaw(self.effect, self.direction)
    BlzSetSpecialEffectPosition(self.effect, startLocation.x, startLocation.y, BlzGetLocalSpecialEffectZ(self.effect) + 96)
end
function ProjectileArrow.prototype.move(self, nextPoint)
    self.previousPoint = self.currentPoint
    self.currentPoint = nextPoint
    local currentZ = BlzGetLocalSpecialEffectZ(self.effect)
    local wantedZ = GetTerrainHeight(nil, nextPoint.x, nextPoint.y) + self.effectHeight
    BlzSetSpecialEffectPosition(self.effect, nextPoint.x, nextPoint.y, linearInterpolate(nil, currentZ, wantedZ, 1))
    BlzSetSpecialEffectYaw(self.effect, self.direction * bj_DEGTORAD)
end
function ProjectileArrow.prototype.step(self)
    local nextPosition = self.currentPoint:polarProject(self.speed, self.direction)
    if GetTerrainCliffLevel(nextPosition.x, nextPosition.y) <= self.cliffLevel then
        self.cliffLevel = GetTerrainCliffLevel(nextPosition.x, nextPosition.y)
        self:move(nextPosition)
    else
        self:remove()
    end
    if not RectContainsCoords(GetEntireMapRect(), nextPosition.x, nextPosition.y) then
        self:remove()
    end
end
function ProjectileArrow.prototype.remove(self)
    Entity.prototype.remove(self)
    DestroyEffect(self.effect)
end
function ProjectileArrow.prototype.getOwningPlayer(self)
    GetOwningPlayer(self.owner)
end
return ____exports
