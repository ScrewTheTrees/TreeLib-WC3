local ____exports = {}
____exports.LineAttackController = {}
local LineAttackController = ____exports.LineAttackController
LineAttackController.name = "LineAttackController"
LineAttackController.__index = LineAttackController
LineAttackController.prototype = {}
LineAttackController.prototype.__index = LineAttackController.prototype
LineAttackController.prototype.constructor = LineAttackController
function LineAttackController.new(...)
    local self = setmetatable({}, LineAttackController.prototype)
    self:____constructor(...)
    return self
end
function LineAttackController.prototype.____constructor(self, owningPlayer, startLoc, targetLoc)
    self.owningPlayer = owningPlayer
    self.startLoc = startLoc
    self.targetLoc = targetLoc
end
return ____exports
