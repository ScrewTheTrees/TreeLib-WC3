import {Vector2} from "../../Utility/Data/Vector2";

export class PointWalkableChecker {
    private static _instance: PointWalkableChecker;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new PointWalkableChecker();
        }
        return this._instance;
    }
    private constructor() {
        this.checkRect = Rect(0, 0, 256, 256);
        this.checkItem = CreateItem(FourCC("afac"), 0, 0); //I cant believe you've done this.
        SetItemVisible(this.checkItem, false);
    }

    public maxRange = 4;
    public checkRect: rect;
    public hiddenItems: item[] = [];
    public checkItem: item;

    private hideItem(i: item) {
        if (IsItemVisible(i)) {
            this.hiddenItems.push(i);
            SetItemVisible(i, false);
        }
    }

    private _terrainCheckPointXY = Vector2.new(0, 0);
    public checkTerrainIsWalkableXY(x: number, y: number): boolean {
        const p = this._terrainCheckPointXY.updateTo(x, y);
        return this.checkTerrainIsWalkable(p);
    }

    private _terrainCheckCircle = Vector2.new(0, 0);
    public checkTerrainIsWalkableCircleXY(x: number, y: number, radius: number, precision: number = 8): boolean {
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

    private _terrainCheckPoint = Vector2.new(0, 0);
    private checkTerrainIsWalkable(p: Vector2): boolean {
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