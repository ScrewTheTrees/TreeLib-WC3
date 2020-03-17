import {Action} from "./Action";
import {UnitGroupQueue} from "../Queues/UnitGroupQueue";

export interface UnitGroupAction extends Action{

    init(targets: unit[], queue: UnitGroupQueue): void;
    update(targets: unit[], timeStep: number, queue: UnitGroupQueue): void;

}