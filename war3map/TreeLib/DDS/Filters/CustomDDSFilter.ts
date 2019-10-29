import {DamageHitContainer} from "../DamageHitContainer";
import {DDSFilter} from "./DDSFilter";

/**
 * In case you want to create a custom filter without implementing the DDSFilter framework for whatever reason.
 */
export class CustomDDSFilter implements DDSFilter {
    constructor(private filter: (hitObject: DamageHitContainer) => boolean) {
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        return this.filter(hitObject);
    }
}