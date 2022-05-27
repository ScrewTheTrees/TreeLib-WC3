/**
 * A collection of interpolations i've personally acquired over time to make things look smooth.
 */
export namespace Interpolation {

    export function Gradient2D(topLeft: number, topRight: number, bottomLeft: number, bottomRight: number, fractionalX: number, fractionalY: number) {
        let i1 = InterpolateCosine(topLeft, topRight, fractionalX);
        let i2 = InterpolateCosine(bottomLeft, bottomRight, fractionalX);
        // Interpolate Y
        return InterpolateCosine(i1, i2, fractionalY);
    }

    export function InterpolateCosine(a: number, b: number, fraction: number) {
        let ft = fraction * Math.PI;
        let f = (1 - Math.cos(ft)) * 0.5;
        return a * (1 - f) + b * f;
    }

    export function Lerp(start: number, end: number, maxStep: number = 1) {
        let diff = start - end;
        if (diff < 0) {
            return start + (math.max(maxStep, diff));
        } else {
            return start + (math.min(-maxStep, diff));
        }
    }

    export function DivisionSpring(start: number, end: number, divider: number, minimumStep: number = 1) {
        let diff = start - end;
        if (diff <= minimumStep && diff >= -minimumStep) {
            return end;
        }

        return start + (-diff / divider);
    }

    export function RotLerp(fromDir: number, toDir: number, turnSpeed: number) {
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

    export function RotDivisionSpring(fromDir: number, toDir: number, division: number, minimumStep: number = 1) {
        let sturn: number;
        fromDir = fromDir % 360;
        toDir = toDir % 360;

        if (toDir > fromDir) { //1
            if (toDir > fromDir + 180) {
                sturn = (toDir - 360 - fromDir);
            } else { //2.
                sturn = (toDir - fromDir);
            }
        } else {
            if (fromDir > toDir + 180) { //3.
                sturn = (360 - fromDir + toDir);
            } else { //4.
                sturn = (toDir - fromDir);
            }
        }

        if (math.abs(fromDir - toDir) <= minimumStep || math.abs(fromDir - toDir) >= 360 - minimumStep) {
            fromDir = toDir;
        } else {
            fromDir += sturn / division;
        }
        return fromDir;
    }
}