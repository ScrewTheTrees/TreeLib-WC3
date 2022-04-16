import {IAction} from "./IAction";
import {UnitGroupQueue} from "../Queues/UnitGroupQueue";

export interface IUnitGroupAction extends IAction{

    init(targets: unit[], queue: UnitGroupQueue): void;
    update(targets: unit[], timeStep: number, queue: UnitGroupQueue): void;

}