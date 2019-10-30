import {UnitAction} from "./UnitAction";

/**
 * An action that causes a unit to die and optionally be removed.
 */
export class UnitDeathAction implements UnitAction {
    private readonly remove: boolean;
    isFinished: boolean = false;

    constructor(alsoRemove: boolean = false) {
        this.remove = alsoRemove;
    }

    update(target: unit): void {
        // :)
    }

    init(target: unit): void {
        this.isFinished = true;
        KillUnit(target);
        if (this.remove) {
            RemoveUnit(target);
        }
    }

}