import {DamageDetectionSystem} from "./TreeLib/DDS/DamageDetectionSystem";
import {Logger} from "./TreeLib/Logger";

export class Game {
    constructor() {
        DamageDetectionSystem.getInstance().registerBeforeHitEvent((hitObject) => {
            Logger.LogDebug("beforeHit", hitObject.toString());
        });
        DamageDetectionSystem.getInstance().registerAfterHitEvent((hitObject) => {
            Logger.LogDebug("afterHit", hitObject.toString());
            Logger.LogDebug(hitObject.damageType);
            Logger.LogDebug(hitObject.eventDamage);
        });
    }
}