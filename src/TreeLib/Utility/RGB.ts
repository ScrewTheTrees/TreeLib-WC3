import {TreeMath} from "./TreeMath";

export class RGB {
    get blue(): number {
        return this._blue;
    }

    set blue(value: number) {
        this._blue = math.floor(TreeMath.Clamp(value, 0, 255));
    }

    get green(): number {
        return this._green;
    }

    set green(value: number) {
        this._green = math.floor(TreeMath.Clamp(value, 0, 255));
    }

    get red(): number {
        return this._red;
    }

    set red(value: number) {
        this._red = math.floor(TreeMath.Clamp(value, 0, 255));
    }

    public copy() {
        return new RGB(this.red, this.blue, this.green);
    }

    public toString(): string {
        return "r: " + this.red + " g: " + this.green + " b: " + this.blue;
    }

    private _red: number = 0;
    private _green: number = 0;
    private _blue: number = 0;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public static getFull() {
        return new RGB(255, 255, 255);
    }

    public static get red() {
        return new RGB(255, 0, 0);
    }

    public static get green() {
        return new RGB(0, 255, 0);
    }

    public static get blue() {
        return new RGB(0, 0, 255);
    }

    public static get teal() {
        return new RGB(0, 255, 255);
    }
}

export function RGBTextString(color: RGB, ...input: any[]) {
    let ret = "|cFF" + string.format('%02x', color.red) + string.format('%02x', color.green) + string.format('%02x', color.blue);
    for (let i = 0; i < input.length; i++) {
        ret += tostring(input[i]);
        ret += " ";
    }
    ret += "|r";
    return ret
}