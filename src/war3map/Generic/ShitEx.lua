-- Lua Library inline imports
--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
function __TS__ArrayPush(arr, ...)
    local items = ({...})
    for ____, item in ipairs(items) do
        arr[#arr + 1] = item
    end
    return #arr
end

local ____exports = {}
____exports.ShitEx = {}
local ShitEx = ____exports.ShitEx
ShitEx.name = "ShitEx"
ShitEx.__index = ShitEx
ShitEx.prototype = {}
ShitEx.prototype.__index = ShitEx.prototype
ShitEx.prototype.constructor = ShitEx
function ShitEx.new(...)
    local self = setmetatable({}, ShitEx.prototype)
    self:____constructor(...)
    return self
end
function ShitEx.prototype.____constructor(self)
end
function ShitEx.seperateNumbers(self, input)
    local lastChar = ""
    local result = {}
    local build = ""
    do
        local i = 0
        while i < #input do
            local char = string.sub(input, i + 1, i + 1)
            if self:isNumber(char) ~= self:isNumber(lastChar) then
                if #build > 0 then
                    __TS__ArrayPush(result, build)
                    build = ""
                end
            end
            build = tostring(build) .. tostring(char)
            lastChar = char
            i = i + 1
        end
    end
    if #build > 0 then
        __TS__ArrayPush(result, build)
    end
    return result
end
function ShitEx.isNumber(self, input)
    return (input == "0" or input == "1" or input == "2" or input == "3" or input == "4" or input == "5" or input == "6" or input == "7" or input == "8" or input == "9")
end
return ____exports
