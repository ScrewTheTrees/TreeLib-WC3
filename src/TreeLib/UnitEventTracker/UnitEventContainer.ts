import {UnitEventTypes} from "./UnitEventTypes";

export class UnitEventContainer {
    constructor(public eventType: UnitEventTypes, public callback: (target: unit) => void) {
    }
}