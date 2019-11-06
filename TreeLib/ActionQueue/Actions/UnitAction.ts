import {Action} from "./Action";

export interface UnitAction extends Action{

    init(target: unit): void;
    update(target: unit, timeStep: number): void;

}