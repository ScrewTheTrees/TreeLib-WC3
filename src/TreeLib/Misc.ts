/**
 * This is just very Miscellaneous functions used for mostly movement and rotation.
 */
import {Point} from "./Utility/Point";
import {Quick} from "./Quick";
import GroupToUnitArray = Quick.GroupToUnitArray;

export function RotateToPoint(fromDir: number, toDir: number, turnSpeed: number) {
    let result = toDir - fromDir;
    while (result > 180) {
        result -= 360
    }
    while (result < -180) {
        result += 360
    }
    let turnDir = result;

    if (turnDir < -turnSpeed) {
        turnDir = -turnSpeed;
    }
    if (turnDir > turnSpeed) {
        turnDir = turnSpeed;
    }

    return (fromDir + turnDir) % 360;
}
export function RotateToSmooth(fromDir: number, toDir: number, turnSpeed: number, minimum: number = 1) {
    let result = toDir - fromDir;
    while (result > 180) {
        result -= 360
    }
    while (result < -180) {
        result += 360
    }
    let turnDir = result / turnSpeed;

    if (math.abs(turnDir) < minimum) {
        turnDir = result; //Insta turn
    }

    return (fromDir + turnDir) % 360;
}


export function ChooseOne<T>(...input: T[]): T {
    let random = GetRandomInt(0, input.length - 1);
    return input[random];
}

export function InverseFourCC(input: number): string {
    return string.pack(">I4", input);
}

export function IsValidUnit(target: unit) {
    return GetUnitTypeId(target) != 0;
}

export function IsUnitAlive(u: unit): boolean {
    return IsValidUnit(u) && !IsUnitType(u, UNIT_TYPE_DEAD);
}

export function IsOfAnyType(buildingType: number, ...targetUnitTypes: number[]): boolean {
    for (let i = 0; i < targetUnitTypes.length; i++) {
        if (buildingType == targetUnitTypes[i]) {
            return true;
        }
    }
    return false;
}

export function GetUnitsOfTypesAroundPointInRange(point: Point, range: number, ...unitIds: string[]): unit[] {
    const f = Filter(() => {
        for (let i = 0; i < unitIds.length; i++) {
            if (GetUnitTypeId(GetFilterUnit()) == FourCC(unitIds[i])) {
                return true;
            }
        }
        return false;
    });
    let g = CreateGroup();
    GroupEnumUnitsInRange(g, point.x, point.y, range, f);
    let units = GroupToUnitArray(g);
    DestroyGroup(g);
    DestroyFilter(f);

    return units;
}

export function GetAliveUnitsOfTypeByPlayer(unitType: number, player: player) {
    let f = Filter(() => {
        return (GetUnitTypeId(GetFilterUnit()) == unitType);
    });
    let g = CreateGroup();
    GroupEnumUnitsOfPlayer(g, player, f);
    let unit = FirstOfGroup(g);
    let arr: unit[] = [];
    while (unit != null) {
        if (IsUnitAliveBJ(unit)) arr.push(unit);
        GroupRemoveUnit(g, unit);
        unit = FirstOfGroup(g)
    }
    DestroyFilter(f);
    DestroyGroup(g);
    return arr;
}