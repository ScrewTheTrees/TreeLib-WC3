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

    export function Lerp(a: number, b: number, t: number) {
        return a + (b - a) * TreeMath.Clamp(t, 0, 1);
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

