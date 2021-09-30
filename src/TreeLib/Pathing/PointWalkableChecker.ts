import {Vector2} from "../Utility/Data/Vector2";

export class PointWalkableChecker {
    private static _instance: PointWalkableChecker;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new PointWalkableChecker();
        }
        return this._instance;
    }

    public maxRange = 6;
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

    public checkTerrainIsWalkableXY(x: number, y: number): boolean {
        const p = Vector2.new(x, y);
        const result = this.checkTerrainIsWalkable(p)
        p.recycle();
        return result;
    }

    public checkTerrainIsWalkableCircleXY(x: number, y: number, radius: number, precision: number = 8): boolean {
        const p = Vector2.new(x, y);
        let result = this.checkTerrainIsWalkable(p);
        if (!result) {
            let checkPoint = p.copy();
            let angle = 0;
            let anglePerStep = 360 / precision;
            for (let i = 0; i < precision; i++) {
                checkPoint.updateToPoint(p);
                result = this.checkTerrainIsWalkable(checkPoint.polarProject(radius, angle));
                if (!result) break;
                angle += anglePerStep;
            }
            checkPoint.recycle();
        }
        p.recycle();
        return result;
    }
    private checkTerrainIsWalkable(p: Vector2): boolean {
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