import {IAction} from "./IAction";
import {UnitQueue} from "../Queues/UnitQueue";

export interface IUnitAction extends IAction{

    init(target: unit, queue: UnitQueue): void;
    update(target: unit, timeStep: number, queue: UnitQueue): void;

}