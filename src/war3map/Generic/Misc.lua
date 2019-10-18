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
return ____exports
