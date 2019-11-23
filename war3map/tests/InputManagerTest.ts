import {Logger} from "../TreeLib/Logger";
import {InputManager} from "../TreeLib/InputManager/InputManager";
import {MetaKey} from "../TreeLib/InputManager/MetaKey";
import {Entity} from "../TreeLib/Entity";

export class InputManagerTest extends Entity {

    run() {
        xpcall(() => {
            InputManager.addKeyboardPressCallback(OSKEY_M, () => {
                Logger.warning("Press M!");
            });
            InputManager.addKeyboardReleaseCallback(OSKEY_M, () => {
                Logger.warning("Release M!");
            });

            InputManager.addKeyboardPressCallback(OSKEY_D, () => {
                Logger.warning("As intended!");
            });
            InputManager.addKeyboardPressCallback(OSKEY_D, () => {
                Logger.critical("No meta or all metas!");
            }, [MetaKey.SHIFT_CTRL_ALT, MetaKey.NONE]);
        }, (...args) => Logger.LogCritical(...args))
    }

    step(): void {
        this._timerDelay = 0.1;
        if (InputManager.isButtonHeld(OSKEY_M)) {
            Logger.critical("HOLDING M");
        }
    }
}