import {RGB} from "../../Utility/RGB";
import {StepEffect} from "./StepEffect";

export class ColorFadeEffect extends StepEffect {
    public color: RGB;
    public startColor: RGB;
    public endColor: RGB;
    public gfx: effect;

    constructor(eff: effect, time: number, color: RGB, endColor: RGB = new RGB(0, 0, 0)) {
        super(time);
        this.gfx = eff;
        this.color = color;
        this.startColor = color.copy();
        this.endColor = endColor;
    }

    public step() {
        let scale = 1 - (this.currentTime / this.timer);
        this.color.red = this.endColor.red + (this.startColor.red - this.endColor.red) * scale;
        this.color.green = this.endColor.green + (this.startColor.green - this.endColor.green) * scale;
        this.color.blue = this.endColor.blue + (this.startColor.blue - this.endColor.blue) * scale;

        BlzSetSpecialEffectColor(this.gfx, this.color.red, this.color.green, this.color.blue);
    }

    public destroy() {
        DestroyEffect(this.gfx);
    }
}