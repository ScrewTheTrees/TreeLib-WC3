/**
 * Just a collection of random Math operators that were not present at the time of writing them.
 */
export namespace TreeMath {
    export function Clamp(value: number, min: number, max: number) {
        let x = Math.min(min, max)
        max = Math.max(min, max);
        min = x;
        if (value > max) {
            value = max;
        } else if (value < min) {
            value = min;
        }
        return value;
    }

    export function Round(value: number) {
        return math.floor(value + 0.5);
    }

    export function RandAngle() {
        return GetRandomReal(0, 360);
    }

    export function RandPercent() {
        return GetRandomReal(0, 1);
    }

    /**
     * Returns a value between -180 and 180.
     */
    export function GetDegreeDifference(angle1: number, angle2: number) {
        angle1 = angle1 % 360;
        angle2 = angle2 % 360;
        let diff = angle1 - angle2;
        if (diff < -180) { //If angle1=10 and angle2=350, convert to "20".
            diff += 360;
        } else if (diff > 180) { //If angle1=350 and angle2=10, convert to "-20".
            diff -= 360;
        }
        return diff;
    }

    /**
     * Returns a value between 0 and 180.
     */
    export function GetDegreeDifferenceAbs(angle1: number, angle2: number) {
        return math.abs(GetDegreeDifference(angle1, angle2));
    }
}

