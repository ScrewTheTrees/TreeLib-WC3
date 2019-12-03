export class TreeMath {
    public static Clamp(value: number, min: number, max: number) {
        if (value > max) {
            value = max;
        } else if (value < min) {
            value = min;
        }
        return value;
    }
}