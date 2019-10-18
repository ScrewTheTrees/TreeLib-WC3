local ____exports = {}
____exports.IAttackController = {}
local IAttackController = ____exports.IAttackController
IAttackController.name = "IAttackController"
IAttackController.__index = IAttackController
IAttackController.prototype = {}
IAttackController.prototype.__index = IAttackController.prototype
IAttackController.prototype.constructor = IAttackController
function IAttackController.new(...)
    local self = setmetatable({}, IAttackController.prototype)
    self:____constructor(...)
    return self
end
function IAttackController.prototype.____constructor(self)
end
return ____exports
