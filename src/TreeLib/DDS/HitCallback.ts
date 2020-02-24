import {DDSFilter} from "./Filters/DDSFilter";
import {DamageHitContainer} from "./DamageHitContainer";
import {Quick} from "../Quick";

export class HitCallback {
    public readonly filters: DDSFilter[] = [];

    constructor(public callback: (hitObject: DamageHitContainer) => void) {


    }

    public addFilter(filter: DDSFilter) {
        Quick.Push(this.filters, filter);
    }

    public addFilters(filters: DDSFilter[]) {
        for (let filter of filters) {
            this.addFilter(filter);
        }
    }
}