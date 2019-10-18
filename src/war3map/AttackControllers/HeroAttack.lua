local ____exports = {}
local __TSTL_Logger = require("war3map.Generic.Logger")
local Logger = __TSTL_Logger.Logger
____exports.HeroAttack = {}
local HeroAttack = ____exports.HeroAttack
HeroAttack.name = "HeroAttack"
HeroAttack.__index = HeroAttack
HeroAttack.prototype = {}
HeroAttack.prototype.__index = HeroAttack.prototype
HeroAttack.prototype.constructor = HeroAttack
function HeroAttack.new(...)
    local self = setmetatable({}, HeroAttack.prototype)
    self:____constructor(...)
    return self
end
function HeroAttack.prototype.____constructor(self, castTime, backswing)
    self.castTime = castTime
    self.backswing = backswing
    if self.backswing > self.castTime then
        Logger:LogCritical("Backswing value is higher than castTime.")
    end
end
return ____exports
