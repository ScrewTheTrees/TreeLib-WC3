import {DamageBeforeHitContainer} from "./DamageBeforeHitContainer";

export class BeforeHitCallback {
    public readonly callback: (hitObject: DamageBeforeHitContainer) => void;
    constructor(callback: (hitObject: DamageBeforeHitContainer) => void) {
        this.callback = callback;
    }
}