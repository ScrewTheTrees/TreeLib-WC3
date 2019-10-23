import {DamageHitContainer} from "./DamageHitContainer";

export class AfterHitCallback {
    public readonly callback: (hitObject: DamageHitContainer) => void;
    constructor(callback: (hitObject: DamageHitContainer) => void) {
        this.callback = callback;
    }
}