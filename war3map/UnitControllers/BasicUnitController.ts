import {IUnitController} from "./IUnitController";
import {HeroUnit} from "./HeroUnit";
import {Point} from "../Generic/Point";
import {IsWalkable} from "../ExtensionFunctions";
import {rotateToPoint} from "../Generic/Misc";

export class BasicUnitController implements IUnitController {
    private readonly targetUnit: unit;
    private readonly walkAnimationIndex: number;
    private currentDirection: number = bj_UNIT_FACING;
    public heroUnit: HeroUnit;


    constructor(targetUnit: unit, heroUnit: HeroUnit) {
        this.targetUnit = targetUnit;
        this.walkAnimationIndex = heroUnit.walkAnimationIndex;
        this.heroUnit = heroUnit;
    }

    public moveUnit(toDirection: number) {
        let speed = GetUnitMoveSpeed(this.targetUnit) / 100;
        this.currentDirection = rotateToPoint(this.currentDirection, toDirection, 180);
        let lastLoc = Point.fromLocationClean(GetUnitLoc(this.targetUnit));
        let currLoc = lastLoc.polarProject(speed, this.currentDirection);
        if (IsWalkable(currLoc.x, lastLoc.y)) {
            SetUnitX(this.targetUnit, currLoc.x);
        }
        if (IsWalkable(lastLoc.x, currLoc.y)) {
            SetUnitY(this.targetUnit, currLoc.y);
        }
        SetUnitFacing(this.targetUnit, this.currentDirection);
    }

    public getWalkAnimationIndex(): number {
        return this.walkAnimationIndex;
    }
}