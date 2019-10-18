local ____exports = {}
local __TSTL_HeroAttack = require("war3map.AttackControllers.HeroAttack")
local HeroAttack = __TSTL_HeroAttack.HeroAttack
____exports.HeroUnit = {}
local HeroUnit = ____exports.HeroUnit
HeroUnit.name = "HeroUnit"
HeroUnit.__index = HeroUnit
HeroUnit.prototype = {}
HeroUnit.prototype.__index = HeroUnit.prototype
HeroUnit.prototype.constructor = HeroUnit
function HeroUnit.new(...)
    local self = setmetatable({}, HeroUnit.prototype)
    self:____constructor(...)
    return self
end
function HeroUnit.prototype.____constructor(self, unitType, walkAnimationIndex, heroAttack)
    self.attackSpellId = FourCC("A000")
    self.attackSpellOrderString = "farsight"
    self.unitType = FourCC(unitType)
    self.walkAnimationIndex = walkAnimationIndex
    self.heroAttack = heroAttack
end
HeroUnit.HERO_POTM = ____exports.HeroUnit.new("E000", 6, HeroAttack.new(0.6, 0.4))
return ____exports
