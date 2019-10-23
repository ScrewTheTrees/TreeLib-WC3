import {DamageDetectionSystem} from "./TreeLib/DDS/DamageDetectionSystem";
import {Logger} from "./TreeLib/Logger";

export class Game {
    constructor() {
        DamageDetectionSystem.getInstance().registerBeforeCalculation((hitObject) => {
            Logger.LogDebug("beforeHit", hitObject.toString());
        });
        DamageDetectionSystem.getInstance().registerAfterCalculation((hitObject) => {
            Logger.LogDebug("afterHit", hitObject.toString());
            Logger.LogDebug(hitObject.damageType);
            Logger.LogDebug(hitObject.eventDamage);
        });
    }
}