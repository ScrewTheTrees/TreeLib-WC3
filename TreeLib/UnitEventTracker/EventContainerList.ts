import {UnitEventContainer} from "./UnitEventContainer";
import {UnitEventTypes} from "./UnitEventTypes";

export class EventContainerList {
    constructor(public eventType: UnitEventTypes) {

    }

    public events: UnitEventContainer[] = [];

    public add(container: UnitEventContainer) {
        this.events.push(container);
    }

    public remove(container: UnitEventContainer) {
        let index = this.events.indexOf(container);
        if (index >= 0) this.events.slice(index);
    }
}