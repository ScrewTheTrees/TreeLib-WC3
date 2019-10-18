import {HeroUnit} from "./HeroUnit";

export interface IUnitController {
    heroUnit: HeroUnit;
    moveUnit(direction: number): void;
    getWalkAnimationIndex(): number;
}