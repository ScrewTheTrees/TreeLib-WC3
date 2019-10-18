local ____exports = {}
local __TSTL_Logger = require("war3map.Generic.Logger")
local Logger = __TSTL_Logger.Logger
_G.__hooks = {}
____exports.Hooks = {}
local Hooks = ____exports.Hooks
Hooks.name = "Hooks"
Hooks.__index = Hooks
Hooks.prototype = {}
Hooks.prototype.__index = Hooks.prototype
Hooks.prototype.constructor = Hooks
function Hooks.new(...)
    local self = setmetatable({}, Hooks.prototype)
    self:____constructor(...)
    return self
end
function Hooks.prototype.____constructor(self)
end
function Hooks.get(self, name)
    return _G.__hooks[name]
end
function Hooks.set(self, name, value)
    _G.__hooks[name] = value
    Logger:LogDebug("Hooked: " .. tostring(name))
end
return ____exports
