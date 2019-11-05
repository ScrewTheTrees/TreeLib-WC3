import {Action} from "./Action";

export interface UnitAction extends Action{

    update(target: unit, timeStep: number): void;
    init(target: unit): void;

}