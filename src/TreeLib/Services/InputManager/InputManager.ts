import {MetaKey} from "./MetaKey";
import {KeyCallback} from "./KeyCallback";
import {MouseCallback} from "./MouseCallback";
import {InputManagerKeyboardHandler} from "./InputManagerKeyboardHandler";
import {InputManagerMouseHandler} from "./InputManagerMouseHandler";

/**
 * Helper class to access the Keyboard and Mouse handlers
 */
export class InputManager {
    /**
     * Registers a keyboard callback to call when pressed.
     * @param key The key to trigger the press.
     * @param callback The function to call when the button is pressed
     * @param metaKeys Optional MetaKeys like having to hold shift or ctrl, by default its [MetaKeys.ALL] which works for any key combination.
     */
    public static addKeyboardPressCallback(key: oskeytype, callback: (this: void, key: KeyCallback) => void, metaKeys?: MetaKey[]) {
        return InputManagerKeyboardHandler.getInstance().addKeyboardPressCallback(key, callback, metaKeys);
    }

    /**
     * Registers a keyboard callback to call when released.
     * @param key The key to trigger the release.
     * @param callback The function to call when the button is released
     * @param metaKeys Optional MetaKeys like having to hold shift or ctrl, by default its [MetaKeys.ALL] which works for any key combination.
     */
    public static addKeyboardReleaseCallback(key: oskeytype, callback: (this: void, key: KeyCallback) => void, metaKeys?: MetaKey[]) {
        return InputManagerKeyboardHandler.getInstance().addKeyboardReleaseCallback(key, callback, metaKeys);
    }

    /**
     * Removes a keyCallback, making it useless, dead, and once having its reference it should be cleaned up by GC.
     * @param keyCallback the callback to remove
     */
    public static removeKeyCallback(keyCallback: KeyCallback) {
        return InputManagerKeyboardHandler.getInstance().removeKeyCallback(keyCallback);
    }

    /**
     * Used internally for fetching data related to keyboard buttons.
     */
    public static getKeyContainer(key: oskeytype) {
        return InputManagerKeyboardHandler.getInstance().getKeyContainer(key);
    }

    /**
     *  Checks if a button is held down, entirely disregards metakeys.
     * @param key the button to press
     * @param triggeringPlayer the player holding the key.
     */
    public static isKeyButtonHeld(key: oskeytype, triggeringPlayer: player) {
        return InputManagerKeyboardHandler.getInstance().isKeyButtonHeld(key, triggeringPlayer);
    }

    // MOUSE
    /**
     * Registers a mouse callback to call when pressed. Middle mouse button does not work for press.
     * @param button the mouse button type
     * @param callback the function to call when button is pressed.
     */
    public static addMousePressCallback(button: mousebuttontype, callback: (this: any, key: MouseCallback) => void) {
        return InputManagerMouseHandler.getInstance().addMousePressCallback(button, callback);
    }

    /**
     * Registers a mouse callback to call when released. Unlike Pressed, Middle mouse button works here.
     * @param button the mouse button type
     * @param callback the function to call when button is released.
     */
    public static addMouseReleaseCallback(button: mousebuttontype, callback: (this: any, key: MouseCallback) => void) {
        return InputManagerMouseHandler.getInstance().addMouseReleaseCallback(button, callback);
    }


    /**
     * Removes a MouseCallback, making it useless, dead, and once having its reference it should be cleaned up by GC.
     * @param mouseCallback the callback to remove
     */
    public static removeMouseCallback(mouseCallback: MouseCallback) {
        return InputManagerMouseHandler.getInstance().removeMouseCallback(mouseCallback);
    }

    /**
     * Used internally for fetching data related to mouse buttons.
     */
    public static getMouseContainer(button: mousebuttontype) {
        return InputManagerMouseHandler.getInstance().getMouseContainer(button);
    }

    /**
     *  Checks if a button is held down, Middle mouse button does not work (see addMousePressCallback);
     * @param button the button
     */
    public static isMouseButtonHeld(button: mousebuttontype) {
        return InputManagerMouseHandler.getInstance().isMouseButtonHeld(button);
    }

    /**
     * Gets the last known mouse position, does not filter out hovering the mouse over the UI, returning that as (0,0).
     * @param triggeringPlayer the player to get it from.
     */
    public static getLastMousePosition(triggeringPlayer: player) {
        return InputManagerMouseHandler.getInstance().getLastMousePosition(triggeringPlayer);
    }

    /**
     * Gets the last known mouse position, filters out GUI hovering so its always referencing the game world coordinates.
     * @param triggeringPlayer the player to get it from.
     */
    public static getLastMouseCoordinate(triggeringPlayer: player) {
        return InputManagerMouseHandler.getInstance().getLastMouseCoordinate(triggeringPlayer);
    }
}