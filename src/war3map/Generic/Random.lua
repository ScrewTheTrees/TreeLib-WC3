local ____exports = {}
____exports.Random = {}
local Random = ____exports.Random
Random.name = "Random"
Random.__index = Random
Random.prototype = {}
Random.prototype.__index = Random.prototype
Random.prototype.constructor = Random
function Random.new(...)
    local self = setmetatable({}, Random.prototype)
    self:____constructor(...)
    return self
end
function Random.prototype.____constructor(self, seed)
    self._value = (0 / 0)
    self._seed = ____exports.Random:getSafeSeed(seed)
    self:reset()
end
function Random.prototype.next(self, min, pseudoMax)
    if min == nil then
        min = 0
    end
    if pseudoMax == nil then
        pseudoMax = 1
    end
    self:recalculate()
    return ____exports.Random:map(self._value, ____exports.Random.MIN, ____exports.Random.MAX, min, pseudoMax)
end
function Random.prototype.nextInt(self, min, max)
    if min == nil then
        min = 0
    end
    if max == nil then
        max = 10
    end
    self:recalculate()
    return math.floor(
        ____exports.Random:map(self._value, ____exports.Random.MIN, ____exports.Random.MAX, min, max + 1)
    )
end
function Random.prototype.reset(self)
    self._value = self._seed
end
function Random.prototype.recalculate(self)
    self._value = ____exports.Random:xorshift(self._value)
end
function Random.xorshift(self, value)
    value = value ~ value << 13
    value = value ~ value >> 17
    value = value ~ value << 5
    return value
end
function Random.map(self, val, minFrom, maxFrom, minTo, maxTo)
    return ((val - minFrom) / (maxFrom - minFrom)) * (maxTo - minTo) + minTo
end
function Random.hashCode(self, str)
    local hash = 0
    if str then
        local l = #str
        do
            local i = 0
            while i < l do
                hash = ((hash << 5) - hash) + string.byte(str, i + 1)
                hash = hash | 0
                hash = ____exports.Random:xorshift(hash)
                i = i + 1
            end
        end
    end
    return ____exports.Random:getSafeSeed(hash)
end
function Random.getSafeSeed(self, seed)
    if seed == 0 then
        return 1
    end
    return seed
end
Random.MIN = -2147483648
Random.MAX = 2147483647
return ____exports
