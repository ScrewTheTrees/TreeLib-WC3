local ____exports = {}
____exports.Orders = {}
local Orders = ____exports.Orders
Orders.name = "Orders"
Orders.__index = Orders
Orders.prototype = {}
Orders.prototype.__index = Orders.prototype
Orders.prototype.constructor = Orders
function Orders.new(...)
    local self = setmetatable({}, Orders.prototype)
    self:____constructor(...)
    return self
end
function Orders.prototype.____constructor(self)
end
Orders.rally = 851970
Orders.smart = 851971
Orders.stop = 851972
Orders.pause = 851973
Orders.ai = 851974
Orders.cancel = 851975
Orders.cancelbuild = 851976
Orders.cancelrevive = 851977
Orders.canceltrain = 851978
Orders.canceltargetmode = 851979
Orders.setrally = 851980
Orders.getitem = 851981
Orders.suicide = 851982
return ____exports
