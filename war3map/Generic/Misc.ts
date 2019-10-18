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