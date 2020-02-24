import {Random} from "../Utility/Random";
import {Point} from "../Utility/Point";

/**
 * Simplex is an algorithm for programmatically generating data, this implementation is 2D generally for map generation.
 */
export class Simplex {
    private static STRETCH_CONSTANT_2D = -0.211324;
    private static SQUISH_CONSTANT_2D = 0.366025;
    private static NORM_CONSTANT_2D = 47;

    private readonly perm: number[];

    constructor(random: Random) {
        this.perm = [];
        for (let i = 0; i < 256; i++) {
            this.perm[i] = random.nextInt(0, 255);
        }
    }

    /**
     * Gets data at a point, simplex 2d range is ±0.707 and not ±1
     * @param point point of impact.
     */
    public getValueAtPoint(point: Point) {
        return this.getValueAt(point.x, point.y);
    }
    /**
     * Gets data at x/y, simplex 2d range is ±0.707 and not ±1
     * @param x
     * @param y
     */
    public getValueAt(x: number, y: number) {
        let stretchOffset = (x + y) * Simplex.STRETCH_CONSTANT_2D;
        let xs = x + stretchOffset;
        let ys = y + stretchOffset;
        let xsb = math.floor(xs);
        let ysb = math.floor(ys);
        let squishOffset = (xsb + ysb) * Simplex.SQUISH_CONSTANT_2D;
        let xb = xsb + squishOffset;
        let yb = ysb + squishOffset;
        let xins = xs - xsb;
        let yins = ys - ysb;
        let inSum = xins + yins;
        let dx0 = x - xb;
        let dy0 = y - yb;
        let dx_ext, dy_ext;
        let xsv_ext, ysv_ext;
        let value = 0;
        //Contribution (1,0)
        let dx1 = dx0 - 1 - Simplex.SQUISH_CONSTANT_2D;
        let dy1 = dy0 - Simplex.SQUISH_CONSTANT_2D;
        let attn1 = 2 - dx1 * dx1 - dy1 * dy1;
        if (attn1 > 0) {
            attn1 *= attn1;
            value += attn1 * attn1 * this.extrapolate(xsb + 1, ysb, dx1, dy1);
        }
        //Contribution (0,1)
        let dx2 = dx0 - Simplex.SQUISH_CONSTANT_2D;
        let dy2 = dy0 - 1 - Simplex.SQUISH_CONSTANT_2D;
        let attn2 = 2 - dx2 * dx2 - dy2 * dy2;
        if (attn2 > 0) {
            attn2 *= attn2;
            value += attn2 * attn2 * this.extrapolate(xsb, ysb + 1, dx2, dy2);
        }

        if (inSum <= 1) { //We're inside the triangle (2-Simplex) at (0,0)
            let zins = 1 - inSum;
            if (zins > xins || zins > yins) { //(0,0) is one of the closest two triangular vertices
                if (xins > yins) {
                    xsv_ext = xsb + 1;
                    ysv_ext = ysb - 1;
                    dx_ext = dx0 - 1;
                    dy_ext = dy0 + 1;
                } else {
                    xsv_ext = xsb - 1;
                    ysv_ext = ysb + 1;
                    dx_ext = dx0 + 1;
                    dy_ext = dy0 - 1;
                }
            } else { //(1,0) and (0,1) are the closest two vertices.
                xsv_ext = xsb + 1;
                ysv_ext = ysb + 1;
                dx_ext = dx0 - 1 - 2 * Simplex.SQUISH_CONSTANT_2D;
                dy_ext = dy0 - 1 - 2 * Simplex.SQUISH_CONSTANT_2D;
            }
        } else { //We're inside the triangle (2-Simplex) at (1,1)
            let zins = 2 - inSum;
            if (zins < xins || zins < yins) { //(0,0) is one of the closest two triangular vertices
                if (xins > yins) {
                    xsv_ext = xsb + 2;
                    ysv_ext = ysb;
                    dx_ext = dx0 - 2 - 2 * Simplex.SQUISH_CONSTANT_2D;
                    dy_ext = dy0 - 2 * Simplex.SQUISH_CONSTANT_2D;
                } else {
                    xsv_ext = xsb;
                    ysv_ext = ysb + 2;
                    dx_ext = dx0 - 2 * Simplex.SQUISH_CONSTANT_2D;
                    dy_ext = dy0 - 2 - 2 * Simplex.SQUISH_CONSTANT_2D;
                }
            } else { //(1,0) and (0,1) are the closest two vertices.
                dx_ext = dx0;
                dy_ext = dy0;
                xsv_ext = xsb;
                ysv_ext = ysb;
            }
            xsb += 1;
            ysb += 1;
            dx0 = dx0 - 1 - 2 * Simplex.SQUISH_CONSTANT_2D;
            dy0 = dy0 - 1 - 2 * Simplex.SQUISH_CONSTANT_2D;
        }

//Contribution (0,0) or (1,1)
        let attn0 = 2 - dx0 * dx0 - dy0 * dy0;
        if (attn0 > 0) {
            attn0 *= attn0;
            value += attn0 * attn0 * this.extrapolate(xsb, ysb, dx0, dy0);
        }

//Extra Vertex
        let attn_ext = 2 - dx_ext * dx_ext - dy_ext * dy_ext;
        if (attn_ext > 0) {
            attn_ext *= attn_ext;
            value += attn_ext * attn_ext * this.extrapolate(xsv_ext, ysv_ext, dx_ext, dy_ext);
        }

        return value / Simplex.NORM_CONSTANT_2D;
    }

    private extrapolate(xsb: number, ysb: number, dx: number, dy: number) {
        let index = this.perm[(this.perm[xsb & 0xFF] + ysb) & 0xFF] & 0x0E;
        return Simplex.gradients2D[index] * dx + Simplex.gradients2D[index + 1] * dy;
    }

    private static gradients2D = [
        5, 2, 2, 5,
        -5, 2, -2, 5,
        5, -2, 2, -5,
        -5, -2, -2, -5,
    ]
}