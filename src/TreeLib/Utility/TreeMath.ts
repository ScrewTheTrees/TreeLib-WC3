export namespace TreeMath {
    function Clamp(value: number, min: number, max: number) {
        if (value > max) {
            value = max;
        } else if (value < min) {
            value = min;
        }
        return value;
    }
    
    function RandAngle() {
        return GetRandomReal(0, 360);
    }

    function RandPercent() {
        return GetRandomReal(0, 1);
    }
}

