import {UnitEventTypes} from "./UnitEventTypes";

export class UnitEventContainer {
    public constructor(public eventType: UnitEventTypes, public callback: (target: unit) => void) {
    }
}