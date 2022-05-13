import {Vector2} from "../Vector2";
import {Quick} from "../../../Quick";

export class UnitLocationStorage {
    public constructor(public theUnit: unit, public position: Vector2) {
    }

    private static stash: UnitLocationStorage[] = [];
    public static new(theUnit: unit, position: Vector2): UnitLocationStorage {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(theUnit, position);
        else return new UnitLocationStorage(theUnit, position)
    }
    public static recycle(p: UnitLocationStorage) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        UnitLocationStorage.recycle(this);
        return this;
    }
    public updateTo(theUnit: unit, position: Vector2) {
        this.theUnit = theUnit;
        this.position = position;
        return this;
    }
}