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
}