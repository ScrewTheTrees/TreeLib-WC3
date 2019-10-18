local ____exports = {}
____exports.PlayerInput = {}
local PlayerInput = ____exports.PlayerInput
PlayerInput.name = "PlayerInput"
PlayerInput.__index = PlayerInput
PlayerInput.prototype = {}
PlayerInput.prototype.__index = PlayerInput.prototype
PlayerInput.prototype.constructor = PlayerInput
function PlayerInput.new(...)
    local self = setmetatable({}, PlayerInput.prototype)
    self:____constructor(...)
    return self
end
function PlayerInput.prototype.____constructor(self)
    self.up = false
    self.down = false
    self.left = false
    self.right = false
end
function PlayerInput.prototype.isInputActive(self)
    return (self.up or self.left or self.down or self.right)
end
function PlayerInput.prototype.getInputDirection(self)
    local x = 0
    local y = 0
    if self.up then
        y = -1
    end
    if self.left then
        x = -1
    end
    if self.down then
        y = 1
    end
    if self.right then
        x = 1
    end
    local radians = math.atan(y, x)
    return -(radians * 180 / math.pi)
end
return ____exports
