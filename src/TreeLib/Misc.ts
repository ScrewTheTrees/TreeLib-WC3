/**
 * This is just very Miscellaneous functions used for mostly movement and rotation.
 */

export function linearInterpolate(start: number, end: number, maxStep: number = 1) {
    let diff = start - end;
    if (diff < 0) {
        return start + (math.max(maxStep, diff));
    } else {
        return start + (math.min(-maxStep, diff));
    }
}

export function divisionInterpolate(start: number, end: number, divider: number, minimumStep: number = 1) {
    let diff = start - end;
    if (diff <= minimumStep && diff >= -minimumStep) {
        return diff;
    }

    return start + (-diff / divider);
}


export function rotateToPoint(fromDir: number, toDir: number, turnSpeed: number) {
    let result = toDir - fromDir;
    while (result > 180) {
        result -= 360
    }
    while (result < -180) {
        result += 360
    }
    let turnDir = result;

    if (turnDir < -turnSpeed) {
        turnDir = -turnSpeed
    }
    if (turnDir > turnSpeed) {
        turnDir = turnSpeed
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