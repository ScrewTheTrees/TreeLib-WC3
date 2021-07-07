import {Vector2} from "../Utility/Data/Vector2";

export class PointWalkableChecker {
    private static _instance: PointWalkableChecker;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new PointWalkableChecker();
        }
        return this._instance;
    }

    public maxRange = 10;
    public checkRect = Rect(0, 0, 256, 256);
    public hiddenItems: item[] = [];
    public checkItem = CreateItem(FourCC("afac"), 0, 0);

    private constructor() {
        SetItemVisible(this.checkItem, false);
    }

    private hideItem(i: item) {
        if (IsItemVisible(i)) {
            this.hiddenItems.push(i);
            SetItemVisible(i, false);
        }
    }

    public checkTerrainXY(x: number, y: number): boolean {
        const p = Vector2.new(x, y);
        const result = this.checkTerrain(p)
        p.recycle();
        return result;
    }
    private checkTerrain(p: Vector2): boolean {
        MoveRectTo(this.checkRect, p.x, p.y);
        EnumItemsInRect(this.checkRect, null, () => this.hideItem(GetEnumItem()));
        SetItemPosition(this.checkItem, p.x, p.y);
        const actualPos = Vector2.fromWidget(this.checkItem);
        SetItemVisible(this.checkItem, false);
        for (let i of this.hiddenItems) {
            SetItemVisible(i, true);
        }
        const dist = p.distanceToSquared(actualPos);
        actualPos.recycle();
        return dist < this.maxRange * this.maxRange;
    }
}