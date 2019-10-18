local ____exports = {}
____exports.PlayerCastDto = {}
local PlayerCastDto = ____exports.PlayerCastDto
PlayerCastDto.name = "PlayerCastDto"
PlayerCastDto.__index = PlayerCastDto
PlayerCastDto.prototype = {}
PlayerCastDto.prototype.__index = PlayerCastDto.prototype
PlayerCastDto.prototype.constructor = PlayerCastDto
function PlayerCastDto.new(...)
    local self = setmetatable({}, PlayerCastDto.prototype)
    self:____constructor(...)
    return self
end
function PlayerCastDto.prototype.____constructor(self, castLoc)
    self.disableAbility = false
    self.castLoc = castLoc
end
function PlayerCastDto.prototype.destruct(self)
    RemoveLocation(self.castLoc)
end
return ____exports
