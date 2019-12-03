import {DamageHitContainer} from "../DamageHitContainer";
import {DDSFilter} from "./DDSFilter";

/**
 * In case you want to create a custom filter without implementing the DDSFilter interface for whatever reason.
 * Very good for one off filters that has no practical use for being reused.
 */
export class DDSFilterCustom implements DDSFilter {
    constructor(private filter: (hitObject: DamageHitContainer) => boolean) {
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        return this.filter(hitObject);
    }
}