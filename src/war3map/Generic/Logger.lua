local ____exports = {}
____exports.Logger = {}
local Logger = ____exports.Logger
Logger.name = "Logger"
Logger.__index = Logger
Logger.prototype = {}
Logger.prototype.__index = Logger.prototype
Logger.prototype.constructor = Logger
function Logger.new(...)
    local self = setmetatable({}, Logger.prototype)
    self:____constructor(...)
    return self
end
function Logger.prototype.____constructor(self)
end
function Logger.LogVerbose(self, ...)
    local params = ({...})
    if self.doLogVerbose then
        print("Verbose: ", table.unpack(params))
    end
end
function Logger.LogDebug(self, ...)
    local params = ({...})
    if self.doLogDebug then
        print("Debug: ", table.unpack(params))
    end
end
function Logger.LogWarning(self, ...)
    local params = ({...})
    if self.doLogWarning then
        print("Warning: ", table.unpack(params))
    end
end
function Logger.LogCritical(self, ...)
    local params = ({...})
    if self.doLogCritical then
        print("Critical: ", table.unpack(params))
    end
end
Logger.doLogVerbose = false
Logger.doLogDebug = true
Logger.doLogWarning = true
Logger.doLogCritical = true
return ____exports
