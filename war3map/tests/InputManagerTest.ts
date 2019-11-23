import {Logger} from "../TreeLib/Logger";
import {InputManager} from "../TreeLib/InputManager/InputManager";
import {KeyCallback} from "../TreeLib/InputManager/KeyCallback";
import {MetaKey} from "../TreeLib/InputManager/MetaKey";
import {Entity} from "../TreeLib/Entity";

export class InputManagerTest extends Entity {

    run() {
        xpcall(() => {
            InputManager.addKeyboardPressCallback(OSKEY_M, (key: KeyCallback) => {
                Logger.warning("Press M!");
            });
            InputManager.addKeyboardReleaseCallback(OSKEY_M, (key: KeyCallback) => {
                Logger.warning("Release M!");
            });

            InputManager.addKeyboardPressCallback(OSKEY_D, (key: KeyCallback) => {
                Logger.warning("As intended!");
            });
            InputManager.addKeyboardPressCallback(OSKEY_D, (key: KeyCallback) => {
                Logger.critical("No meta or all metas!");
            }, [MetaKey.SHIFT_CTRL_ALT, MetaKey.NONE]);
        }, (...args) => Logger.LogCritical(...args))
    }

    step(): void {
        this._timerDelay = 0.1;
        if (InputManager.getInstance().isButtonHeld(OSKEY_M)) {
            Logger.critical("HOLDING M");
        }
    }
}