import {Vector3} from "../../../Utility/Data/Vector3";

export class BunkerUnitTypeConfig {
    public constructor(...unitTypes: number[]) {
        this.unitTypes = unitTypes;
    }

    public unitTypes: number[];


    public unitScale?: number;
    public unitFilter?: (this: any, filterUnit: unit) => boolean;
    public onDummyUnitSpawn?: (this: any, dummyUnit: unit) => any;
    public defaultPosition: Vector3 = Vector3.new(0, 0, 0);
    public offsetPositions: Vector3[] = [];

    public isMoveable: boolean = false;
    public doTweaking: boolean = true;
    public stopDelay: number = 7;

    public getPositionFor(index: number) {
        return this.offsetPositions[index] || this.defaultPosition;
    }

    // Set this to 0 if you want SC2 bunkers.
    public setUnitScale(unitScale?: number): this {
        this.unitScale = unitScale;
        return this;
    }
    public setDefaultPosition(x: number, y: number, z: number): this {
        this.defaultPosition.updateTo(x, y, z);
        return this;
    }
    public setOffsetPositions(offsetPositions: Vector3[]): this {
        this.offsetPositions = offsetPositions;
        return this;
    }
    public setUnitFilter(unitFilter?: (this: any, filterUnit: unit) => boolean): this {
        this.unitFilter = unitFilter;
        return this;
    }
    public setOnDummyUnitSpawn(onDummyUnitSpawn?: (this: any, dummyUnit: unit) => any): this {
        this.onDummyUnitSpawn = onDummyUnitSpawn;
        return this;
    }
    public setIsMoveable(isMoveable: boolean) {
        this.isMoveable = isMoveable;
        return this;
    }
    public setRotateOffsetWithUnit(rotateOffsetWithUnit: boolean) {
        this.doTweaking = rotateOffsetWithUnit;
        return this;
    }
}