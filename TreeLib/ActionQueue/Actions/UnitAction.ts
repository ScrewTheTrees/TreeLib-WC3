import {Action} from "./Action";
import {UnitQueue} from "../Queues/UnitQueue";

export interface UnitAction extends Action{

    init(target: unit, queue: UnitQueue): void;
    update(target: unit, timeStep: number, queue: UnitQueue): void;

}