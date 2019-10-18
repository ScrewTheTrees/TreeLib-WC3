-- Lua Library inline imports
function __TS__ArrayForEach(arr, callbackFn)
    do
        local i = 0
        while i < #arr do
            callbackFn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
end

local ____exports = {}
function ____exports.linearInterpolate(self, start, ____end, maxStep)
    if maxStep == nil then
        maxStep = 1
    end
    local diff = start - ____end
    if diff < 0 then
        return start + math.max(maxStep, diff)
    else
        return start + math.min(-maxStep, diff)
    end
end
function ____exports.divisionInterpolate(self, start, ____end, divider, minimumStep)
    if minimumStep == nil then
        minimumStep = 1
    end
    local diff = start - ____end
    if diff <= minimumStep and diff >= -minimumStep then
        return diff
    end
    return start + (-diff / divider)
end
function ____exports.rotateToPoint(self, fromDir, toDir, turnSpeed)
    local result = toDir - fromDir
    while result > 180 do
        result = result - 360
    end
    while result < -180 do
        result = result + 360
    end
    local turnDir = result
    if turnDir < -turnSpeed then
        turnDir = -turnSpeed
    end
    if turnDir > turnSpeed then
        turnDir = turnSpeed
    end
    return (fromDir + turnDir) % 360
end
function ____exports.RGBTextString(self, red, green, blue, ...)
    local input = ({...})
    local ret = "|c00" .. tostring(
        string.format("%02x", red)
    ) .. tostring(
        string.format("%02x", green)
    ) .. tostring(
        string.format("%02x", blue)
    )
    __TS__ArrayForEach(
        input,
        function(____, val)
            ret = tostring(ret) .. tostring(
                tostring(val)
            ) .. " "
        end
    )
    ret = tostring(ret) .. "|r"
    return ret
end
function ____exports.ChooseOne(self, ...)
    local input = ({...})
    local random = GetRandomInt(0, #input - 1)
    return input[random + 1]
end
function ____exports.InverseFourCC(self, input)
    return string.pack(">I4", input)
end
return ____exports
