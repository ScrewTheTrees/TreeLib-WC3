import {TreeMath} from "wc3-treelib/src/TreeLib/Utility/TreeMath";
import {Recyclable} from "wc3-treelib/src/TreeLib/Utility/Data/Recyclable";
import {Quick} from "wc3-treelib/src/TreeLib/Quick";

export class RGB implements Recyclable {
    private _red: number = 0;
    private _green: number = 0;
    private _blue: number = 0;

    private constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    private static stash: RGB[] = [];
    public static new(red: number, green: number, blue: number): RGB {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(red, green, blue);
        else return new RGB(red, green, blue)
    }
    public static recycle(p: RGB) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        RGB.recycle(this);
        return this;
    }
    public updateTo(x: number, y: number, z: number) {
        this.red = x;
        this.green = y;
        this.blue = z;
        return this;
    }
    //Stuff

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
        return RGB.new(this.red, this.blue, this.green);
    }

    public toString(): string {
        return "r: " + this.red + " g: " + this.green + " b: " + this.blue;
    }

    //Static
    public static get red() {
        return RGB.new(255, 0, 0);
    }

    public static get green() {
        return RGB.new(0, 255, 0);
    }

    public static get blue() {
        return RGB.new(0, 0, 255);
    }

    public static get teal() {
        return RGB.new(0, 255, 255);
    }

    public static get white() {
        return RGB.new(255, 255, 255);
    }

    public static get black() {
        return RGB.new(0, 0, 0);
    }

    public static textString(color: RGB, ...input: any[]) {
        let ret = "|cFF" + string.format('%02x', color.red) + string.format('%02x', color.green) + string.format('%02x', color.blue);
        for (let i = 0; i < input.length; i++) {
            ret += tostring(input[i]);
            if (i != input.length - 1)
                ret += " ";
        }
        ret += "|r";
        return ret
    }
}