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
}

