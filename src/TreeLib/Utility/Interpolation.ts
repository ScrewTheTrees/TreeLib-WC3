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
            return diff;
        }

        return start + (-diff / divider);
    }

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
            turnDir = -turnSpeed
        }
        if (turnDir > turnSpeed) {
            turnDir = turnSpeed
        }

        return (fromDir + turnDir) % 360;
    }
}