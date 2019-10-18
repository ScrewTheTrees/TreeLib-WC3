import {Logger} from "../Generic/Logger";

export class HeroAttack {
    public castTime: number;
    public backswing: number;
    constructor(castTime: number, backswing: number) {
        this.castTime = castTime;
        this.backswing = backswing;

        if (this.backswing > this.castTime) {
            Logger.LogCritical("Backswing value is higher than castTime.");
        }
    }
}