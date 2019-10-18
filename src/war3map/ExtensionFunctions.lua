local ____exports = {}
function ____exports.IsWalkable(self, x, y)
    return not IsTerrainPathable(x, y, PATHING_TYPE_WALKABILITY)
end
function ____exports.GetRandomLocInRectUnitSafe(self, endRect)
    return Location(GetRandomReal(GetRectMinX(endRect) + 32, GetRectMaxX(endRect) - 32), GetRandomReal(GetRectMinY(endRect) + 32, GetRectMaxY(endRect) - 32))
end
function ____exports.GetTerrainHeight(self, x, y)
    local loc = Location(x, y)
    local retVar = GetLocationZ(loc)
    RemoveLocation(loc)
    return retVar
end
function ____exports.IsPointWalkable(self, p)
    return ____exports.IsWalkable(nil, p.x, p.y)
end
function ____exports.GetNumOfPlayerUnits(self, target)
    local units = CreateGroup()
    GroupEnumUnitsOfPlayer(units, target, nil)
    local foundUnit = FirstOfGroup(units)
    local count = 0
    while foundUnit ~= nil do
        foundUnit = FirstOfGroup(units)
        GroupRemoveUnit(units, foundUnit)
        count = count + 1
    end
    DestroyGroup(units)
    return count
end
return ____exports
