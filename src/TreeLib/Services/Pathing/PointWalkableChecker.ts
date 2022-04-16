import {Vector2} from "../../Utility/Data/Vector2";
import {Hooks} from "../../Hooks";

Hooks.addMainHook(() => PointWalkableChecker.Init());
export class PointWalkableChecker {
    private constructor() {}
    static Init() {
        this.checkRect = Rect(0, 0, 256, 256);
        this.checkItem = CreateItem(FourCC("afac"), 0, 0); //I cant believe you've done this.
        SetItemVisible(this.checkItem, false);
    }

    public static maxRange = 6;
    public static checkRect: rect;
    public static hiddenItems: item[] = [];
    public static checkItem: item;

    private static hideItem(i: item) {
        if (IsItemVisible(i)) {
            this.hiddenItems.push(i);
            SetItemVisible(i, false);
        }
    }

    private static _terrainCheckPointXY = Vector2.new(0, 0);
    public static checkTerrainIsWalkableXY(x: number, y: number): boolean {
        const p = this._terrainCheckPointXY.updateTo(x, y);
        return this.checkTerrainIsWalkable(p);
    }

    private static _terrainCheckCircle = Vector2.new(0, 0);
    public static checkTerrainIsWalkableCircleXY(x: number, y: number, radius: number, precision: number = 8): boolean {
        const p = this._terrainCheckCircle.updateTo(x, y);
        let result = this.checkTerrainIsWalkable(p);
        if (!result) {
            let angle = 0;
            let anglePerStep = 360 / precision;
            for (let i = 0; i < precision; i++) {
                p.updateToPoint(p);
                result = this.checkTerrainIsWalkable(p.polarProject(radius, angle));
                if (!result) break;
                angle += anglePerStep;
            }
        }
        return result;
    }

    private static _terrainCheckPoint = Vector2.new(0, 0);
    private static checkTerrainIsWalkable(p: Vector2): boolean {
        if (IsTerrainPathable(p.x, p.y, PATHING_TYPE_WALKABILITY)) return false; //Cant walk here

        MoveRectTo(this.checkRect, p.x, p.y);
        EnumItemsInRect(this.checkRect, null, () => this.hideItem(GetEnumItem()));
        SetItemPosition(this.checkItem, p.x, p.y);
        const actualPos = this._terrainCheckPoint.updateToWidget(this.checkItem);
        SetItemVisible(this.checkItem, false);
        for (let i of this.hiddenItems) {
            SetItemVisible(i, true);
        }
        const dist = p.distanceToSquared(actualPos);
        return dist < this.maxRange * this.maxRange;
    }
}