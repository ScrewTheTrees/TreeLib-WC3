import {Logger} from "../TreeLib/Logger";
import {InputManager} from "../TreeLib/InputManager/InputManager";
import {MetaKey} from "../TreeLib/InputManager/MetaKey";
import {Entity} from "../TreeLib/Entity";
import {Delay} from "../TreeLib/Utility/Delay";

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
                Logger.warning("No meta or all metas!");
            }, [MetaKey.SHIFT_CTRL_ALT, MetaKey.NONE]);

            InputManager.addMousePressCallback(MOUSE_BUTTON_TYPE_MIDDLE, () => {
                Logger.warning("MMB Pressed");
            });
            InputManager.addMouseReleaseCallback(MOUSE_BUTTON_TYPE_MIDDLE, () => {
                Logger.warning("MMB Released");
            });


        }, (...args) => Logger.LogCritical(...args))
    }

    step(): void {
        this._timerDelay = 0.1;
        if (InputManager.isKeyButtonHeld(OSKEY_M)) {
            Logger.warning("HOLDING M");
        }
        if (InputManager.isMouseButtonHeld(MOUSE_BUTTON_TYPE_MIDDLE)) {
            Logger.critical(InputManager.getLastMousePosition(Player(0)).toString());
            Logger.critical(InputManager.getLastMouseCoordinate(Player(0)).toString());
            Logger.critical(InputManager.getLastMouseCoordinate(Player(1)).toString());
        }

    }
}