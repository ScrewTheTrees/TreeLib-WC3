import {DDSFilter} from "./Filters/DDSFilter";
import {DamageHitContainer} from "./DamageHitContainer";

export class HitCallback {
    public readonly filters: DDSFilter[] = [];

    constructor(public callback: (hitObject: DamageHitContainer) => void) {


    }

    public addFilter(filter: DDSFilter) {
        this.filters.push(filter);
    }

    public addFilters(filters: DDSFilter[]) {
        for (let filter of filters) {
            this.addFilter(filter);
        }
    }
}