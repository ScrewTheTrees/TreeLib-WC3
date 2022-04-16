import {IDDSFilter} from "./Filters/IDDSFilter";
import {DamageHitContainer} from "./DamageHitContainer";
import {Quick} from "../Quick";

export class HitCallback {
    public readonly filters: IDDSFilter[] = [];

    constructor(public callback: (hitObject: DamageHitContainer) => void) {


    }

    public addFilter(filter: IDDSFilter) {
        Quick.Push(this.filters, filter);
    }

    public addFilters(filters: IDDSFilter[]) {
        for (let filter of filters) {
            this.addFilter(filter);
        }
    }
}