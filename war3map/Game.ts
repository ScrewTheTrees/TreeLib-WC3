import {DamageDetectionSystem} from "./Generic/DDS/DamageDetectionSystem";
import {Logger} from "./Generic/Logger";

export class Game {
    constructor() {
        DamageDetectionSystem.getInstance().registerBeforeHitEvent((hitObject) => {
            Logger.LogDebug("beforeHit", hitObject.toString());
        });
        DamageDetectionSystem.getInstance().registerAfterHitEvent((hitObject) => {
            Logger.LogDebug("afterHit", hitObject.toString());
        });
    }
}