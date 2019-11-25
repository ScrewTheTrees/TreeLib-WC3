import {Hooks} from "../Hooks";
import {KeyInputContainer} from "./KeyInputContainer";
import {maxMetaKeys, MetaKey} from "./MetaKey";
import {KeyCallback} from "./KeyCallback";
import {PressType} from "./PressType";
import {MouseInputContainer} from "./MouseInputContainer";
import {Point} from "../Utility/Point";
import {MouseCallback} from "./MouseCallback";

export class InputManager {
    private static instance: InputManager;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new InputManager();
            Hooks.set("InputManager", this.instance);
        }
        return this.instance;
    }

    constructor() {
        TriggerAddAction(this.keyInputTrigger, () => this.onKeyAction());
        TriggerAddAction(this.mouseInputPressTrigger, () => this.onMousePressAction());
        TriggerAddAction(this.mouseInputReleaseTrigger, () => this.onMouseReleaseAction());
        for (let i = 0; i < PLAYER_NEUTRAL_AGGRESSIVE; i++) {
            TriggerRegisterPlayerEvent(this.mouseInputPressTrigger, Player(i), EVENT_PLAYER_MOUSE_DOWN);
            TriggerRegisterPlayerEvent(this.mouseInputReleaseTrigger, Player(i), EVENT_PLAYER_MOUSE_UP);
            TriggerRegisterPlayerEvent(this.mouseInputReleaseTrigger, Player(i), EVENT_PLAYER_MOUSE_MOVE);
        }
        TriggerAddAction(this.mouseMoveTrigger, () => this.onMouseMoveAction());
    }

    private keyInputTrigger: trigger = CreateTrigger();
    private mouseInputPressTrigger: trigger = CreateTrigger();
    private mouseInputReleaseTrigger: trigger = CreateTrigger();
    private mouseMoveTrigger: trigger = CreateTrigger();
    public registeredKeys: KeyInputContainer[] = [];
    public registeredMouseEvents: MouseInputContainer[] = [];
    public lastPosition: Point[] = [];
    public lastCoordinate: Point[] = [];

    private onKeyAction() {
        let key = BlzGetTriggerPlayerKey();
        let metaKey = BlzGetTriggerPlayerMetaKey();
        let isDown = BlzGetTriggerPlayerIsKeyDown();
        let inputContainer = this.getKeyContainer(key);
        inputContainer.isDown = isDown;
        for (let index = 0; index < inputContainer.callbacks.length; index += 1) {
            let callback = inputContainer.callbacks[index];
            if (callback.enabled && (callback.metaKeys.indexOf(metaKey) >= 0 || callback.metaKeys.indexOf(MetaKey.ALL) >= 0)) {
                if ((isDown && callback.pressType == PressType.PRESS)
                    || (!isDown && callback.pressType == PressType.RELEASE)) {
                    callback.triggeringPlayer = GetTriggerPlayer();
                    callback.callback(callback);
                }
            }
        }
    }

    private onMousePressAction() {
        let mouseButton = BlzGetTriggerPlayerMouseButton();
        let x = BlzGetTriggerPlayerMouseX();
        let y = BlzGetTriggerPlayerMouseY();
        this.onMouseMoveAction();
        let mouseContainer = this.getMouseContainer(mouseButton);
        mouseContainer.isDown = true;
        for (let index = 0; index < mouseContainer.callbacks.length; index += 1) {
            let callback = mouseContainer.callbacks[index];
            if (callback.enabled) {
                if (callback.pressType == PressType.PRESS) {
                    callback.triggeringPlayer = GetTriggerPlayer();
                    callback.position = new Point(x, y);
                    callback.callback(callback);
                }
            }
        }
    }

    private onMouseReleaseAction() {
        let mouseButton = BlzGetTriggerPlayerMouseButton();
        let x = BlzGetTriggerPlayerMouseX();
        let y = BlzGetTriggerPlayerMouseY();
        this.onMouseMoveAction();
        let mouseContainer = this.getMouseContainer(mouseButton);
        mouseContainer.isDown = false;
        for (let index = 0; index < mouseContainer.callbacks.length; index += 1) {
            let callback = mouseContainer.callbacks[index];
            if (callback.enabled) {
                if (callback.pressType == PressType.RELEASE) {
                    callback.triggeringPlayer = GetTriggerPlayer();
                    callback.position = new Point(x, y);
                    callback.callback(callback);
                }
            }
        }
    }

    private onMouseMoveAction() {
        let x = BlzGetTriggerPlayerMouseX();
        let y = BlzGetTriggerPlayerMouseY();
        this.lastPosition[GetPlayerId(GetTriggerPlayer())] = new Point(x, y);
        if (x != 0 && y != 0) {
            this.lastCoordinate[GetPlayerId(GetTriggerPlayer())] = new Point(x, y);
        }
    }

    private registerNewKeyEvent(key: oskeytype) {
        for (let i = 0; i < PLAYER_NEUTRAL_AGGRESSIVE; i++) {
            for (let meta = 0; meta <= maxMetaKeys(); meta++) {
                BlzTriggerRegisterPlayerKeyEvent(this.keyInputTrigger, Player(i), key, meta, true);
                BlzTriggerRegisterPlayerKeyEvent(this.keyInputTrigger, Player(i), key, meta, false);
            }
        }
    }

    public removeKeyCallback(keyCallback: KeyCallback) {
        let container = this.getKeyContainer(keyCallback.key);
        if (container.callbacks.indexOf(keyCallback) >= 0) {
            container.callbacks.splice(container.callbacks.indexOf(keyCallback), 1);
        }
    }

    public removeMouseCallback(mouseCallback: MouseCallback) {
        let container = this.getMouseContainer(mouseCallback.button);
        if (container.callbacks.indexOf(mouseCallback) >= 0) {
            container.callbacks.splice(container.callbacks.indexOf(mouseCallback), 1);
        }
    }

    public getKeyContainer(key: oskeytype) {
        let handleId = GetHandleId(key);
        if (this.registeredKeys[handleId] == null) {
            let newKey = new KeyInputContainer(key);
            this.registeredKeys[handleId] = newKey;
            this.registerNewKeyEvent(key);
            return newKey;
        } else {
            return this.registeredKeys[handleId];
        }
    }

    public getMouseContainer(mouse: mousebuttontype) {
        let handleId = GetHandleId(mouse);
        if (this.registeredMouseEvents[handleId] == null) {
            let newKey = new MouseInputContainer(mouse);
            this.registeredMouseEvents[handleId] = newKey;
            return newKey;
        } else {
            return this.registeredMouseEvents[handleId];
        }
    }

    public addKeyboardPressCallback(key: oskeytype, callback: (key: KeyCallback) => void, metaKeys?: MetaKey[]) {
        let container = this.getKeyContainer(key);
        container.callbacks.push(new KeyCallback(key, callback, PressType.PRESS, metaKeys));
        return container;
    }

    public addKeyboardReleaseCallback(key: oskeytype, callback: (key: KeyCallback) => void, metaKeys?: MetaKey[]) {
        let container = this.getKeyContainer(key);
        container.callbacks.push(new KeyCallback(key, callback, PressType.RELEASE, metaKeys));
        return container;
    }

    public isKeyButtonHeld(key: oskeytype) {
        return this.getKeyContainer(key).isDown;
    }

    public isMouseButtonHeld(button: mousebuttontype) {
        return this.getMouseContainer(button).isDown;
    }

    public addMousePressCallback(mouse: mousebuttontype, callback: (key: MouseCallback) => void) {
        let container = this.getMouseContainer(mouse);
        container.callbacks.push(new MouseCallback(mouse, callback, PressType.PRESS));
        return container;
    }

    public addMouseReleaseCallback(mouse: mousebuttontype, callback: (key: MouseCallback) => void) {
        let container = this.getMouseContainer(mouse);
        container.callbacks.push(new MouseCallback(mouse, callback, PressType.RELEASE));
        return container;
    }

    public getLastMousePosition(triggerPlayer: player) {
        return this.lastPosition[GetPlayerId(triggerPlayer)];
    }

    public getLastMouseCoordinate(triggerPlayer: player) {
        return this.lastCoordinate[GetPlayerId(triggerPlayer)];
    }

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
        return InputManager.getInstance().addKeyboardPressCallback(key, callback, metaKeys);
    }

    /**
     * Registers a keyboard callback to call when released.
     * @param key The key to trigger the release.
     * @param callback The function to call when the button is released
     * @param metaKeys Optional MetaKeys like having to hold shift or ctrl, by default its [MetaKeys.ALL] which works for any key combination.
     */
    public static addKeyboardReleaseCallback(key: oskeytype, callback: (key: KeyCallback) => void, metaKeys?: MetaKey[]) {
        return InputManager.getInstance().addKeyboardReleaseCallback(key, callback, metaKeys);
    }

    /**
     * Registers a mouse callback to call when pressed. Middle mouse button does not work for press.
     * @param button the mouse button type
     * @param callback the function to call when button is pressed.
     */
    public static addMousePressCallback(button: mousebuttontype, callback: (key: MouseCallback) => void) {
        return InputManager.getInstance().addMousePressCallback(button, callback);
    }

    /**
     * Registers a mouse callback to call when released. Unlike Pressed, Middle mouse button works here.
     * @param button the mouse button type
     * @param callback the function to call when button is released.
     */
    public static addMouseReleaseCallback(button: mousebuttontype, callback: (key: MouseCallback) => void) {
        return InputManager.getInstance().addMouseReleaseCallback(button, callback);
    }

    /**
     * Removes a keyCallback, making it useless, dead, and once having its reference it should be cleaned up by GC.
     * @param keyCallback the callback to remove
     */
    public static removeKeyCallback(keyCallback: KeyCallback) {
        return InputManager.getInstance().removeKeyCallback(keyCallback);
    }

    /**
     * Removes a MouseCallback, making it useless, dead, and once having its reference it should be cleaned up by GC.
     * @param mouseCallback the callback to remove
     */
    public static removeMouseCallback(mouseCallback: MouseCallback) {
        return InputManager.getInstance().removeMouseCallback(mouseCallback);
    }

    /**
     * Used internally for fetching data related to keyboard buttons.
     */
    public static getKeyContainer(key: oskeytype) {
        return InputManager.getInstance().getKeyContainer(key);
    }

    /**
     * Used internally for fetching data related to mouse buttons.
     */
    public static getMouseContainer(button: mousebuttontype) {
        return InputManager.getInstance().getMouseContainer(button);
    }

    /**
     *  Checks if a button is held down, entirely disregards metakeys.
     * @param key the button to press
     */
    public static isKeyButtonHeld(key: oskeytype) {
        return InputManager.getInstance().isKeyButtonHeld(key);
    }

    /**
     *  Checks if a button is held down, Middle mouse button does not work (see addMousePressCallback);
     * @param button the button
     */
    public static isMouseButtonHeld(button: mousebuttontype) {
        return InputManager.getInstance().isMouseButtonHeld(button);
    }

    /**
     * Gets the last known mouse position, does not filter out hovering the mouse over the UI, returning that as (0,0).
     * @param triggeringPlayer the player to get it from.
     */
    public static getLastMousePosition(triggeringPlayer: player) {
        return InputManager.getInstance().getLastMousePosition(triggeringPlayer);
    }

    /**
     * Gets the last known mouse position, filters out GUI hovering so its always referencing the game world coordinates.
     * @param triggeringPlayer the player to get it from.
     */
    public static getLastMouseCoordinate(triggeringPlayer: player) {
        return InputManager.getInstance().getLastMouseCoordinate(triggeringPlayer);
    }
}