import {DamageHitContainer} from "../DamageHitContainer";
import {DDSFilter} from "./DDSFilter";

export class CustomDDSFilter implements DDSFilter {
    constructor(private filter: (hitObject: DamageHitContainer) => boolean) {
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        return this.filter(hitObject);
    }
}