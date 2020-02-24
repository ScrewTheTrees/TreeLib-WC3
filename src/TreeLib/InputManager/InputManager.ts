import {Hooks} from "../Hooks";
import {MetaKey} from "./MetaKey";
import {KeyCallback} from "./KeyCallback";
import {MouseCallback} from "./MouseCallback";
import {InputManagerKeyboardHandler} from "./InputManagerKeyboardHandler";
import {InputManagerMouseHandler} from "./InputManagerMouseHandler";

export class InputManager {
    private static instance: InputManager;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new InputManager();
            Hooks.set(this.name, this.instance);
        }
        return this.instance;
    }

    public keyboardHandler: InputManagerKeyboardHandler = new InputManagerKeyboardHandler();
    public mouseHandler: InputManagerMouseHandler = new InputManagerMouseHandler();

    /*
    STATIC API
    */
    /**
     * Registers a keyboard callback to call when pressed.
     * @param key The key to trigger the press.
     * @param callback The function to call when the button is pressed
     * @param metaKeys Optional MetaKeys like having to hold shift or ctrl, by default its [MetaKeys.ALL] which works for any key combination.
     */
    public static addKeyboardPressCallback(key: oskeytype, callback: (key: KeyCallback) => void, metaKeys?: MetaKey[]) {
        return InputManager.getInstance().keyboardHandler.addKeyboardPressCallback(key, callback, metaKeys);
    }

    /**
     * Registers a keyboard callback to call when released.
     * @param key The key to trigger the release.
     * @param callback The function to call when the button is released
     * @param metaKeys Optional MetaKeys like having to hold shift or ctrl, by default its [MetaKeys.ALL] which works for any key combination.
     */
    public static addKeyboardReleaseCallback(key: oskeytype, callback: (key: KeyCallback) => void, metaKeys?: MetaKey[]) {
        return InputManager.getInstance().keyboardHandler.addKeyboardReleaseCallback(key, callback, metaKeys);
    }

    /**
     * Removes a keyCallback, making it useless, dead, and once having its reference it should be cleaned up by GC.
     * @param keyCallback the callback to remove
     */
    public static removeKeyCallback(keyCallback: KeyCallback) {
        return InputManager.getInstance().keyboardHandler.removeKeyCallback(keyCallback);
    }

    /**
     * Used internally for fetching data related to keyboard buttons.
     */
    public static getKeyContainer(key: oskeytype) {
        return InputManager.getInstance().keyboardHandler.getKeyContainer(key);
    }

    /**
     *  Checks if a button is held down, entirely disregards metakeys.
     * @param key the button to press
     */
    public static isKeyButtonHeld(key: oskeytype) {
        return InputManager.getInstance().keyboardHandler.isKeyButtonHeld(key);
    }

    // MOUSE
    /**
     * Registers a mouse callback to call when pressed. Middle mouse button does not work for press.
     * @param button the mouse button type
     * @param callback the function to call when button is pressed.
     */
    public static addMousePressCallback(button: mousebuttontype, callback: (key: MouseCallback) => void) {
        return InputManager.getInstance().mouseHandler.addMousePressCallback(button, callback);
    }

    /**
     * Registers a mouse callback to call when released. Unlike Pressed, Middle mouse button works here.
     * @param button the mouse button type
     * @param callback the function to call when button is released.
     */
    public static addMouseReleaseCallback(button: mousebuttontype, callback: (key: MouseCallback) => void) {
        return InputManager.getInstance().mouseHandler.addMouseReleaseCallback(button, callback);
    }


    /**
     * Removes a MouseCallback, making it useless, dead, and once having its reference it should be cleaned up by GC.
     * @param mouseCallback the callback to remove
     */
    public static removeMouseCallback(mouseCallback: MouseCallback) {
        return InputManager.getInstance().mouseHandler.removeMouseCallback(mouseCallback);
    }

    /**
     * Used internally for fetching data related to mouse buttons.
     */
    public static getMouseContainer(button: mousebuttontype) {
        return InputManager.getInstance().mouseHandler.getMouseContainer(button);
    }

    /**
     *  Checks if a button is held down, Middle mouse button does not work (see addMousePressCallback);
     * @param button the button
     */
    public static isMouseButtonHeld(button: mousebuttontype) {
        return InputManager.getInstance().mouseHandler.isMouseButtonHeld(button);
    }

    /**
     * Gets the last known mouse position, does not filter out hovering the mouse over the UI, returning that as (0,0).
     * @param triggeringPlayer the player to get it from.
     */
    public static getLastMousePosition(triggeringPlayer: player) {
        return InputManager.getInstance().mouseHandler.getLastMousePosition(triggeringPlayer);
    }

    /**
     * Gets the last known mouse position, filters out GUI hovering so its always referencing the game world coordinates.
     * @param triggeringPlayer the player to get it from.
     */
    public static getLastMouseCoordinate(triggeringPlayer: player) {
        return InputManager.getInstance().mouseHandler.getLastMouseCoordinate(triggeringPlayer);
    }
}