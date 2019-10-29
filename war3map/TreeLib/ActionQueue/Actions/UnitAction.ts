import {Action} from "./Action";

export interface UnitAction extends Action{

    update(target: unit): void;
    init(target: unit): void;

}