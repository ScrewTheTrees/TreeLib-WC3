import {Hooks} from "../Hooks";
import {KeyInputContainer} from "./KeyInputContainer";
import {maxMetaKeys, MetaKey} from "./MetaKey";
import {KeyCallback} from "./KeyCallback";
import {PressType} from "./PressType";

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
    }

    private keyInputTrigger: trigger = CreateTrigger();
    public registeredKeys: KeyInputContainer[] = [];

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
                    callback.callback(callback);
                }
            }
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

    public getKeyContainer(key: oskeytype) {
        if (this.registeredKeys[GetHandleId(key)] == null) {
            let newKey = new KeyInputContainer(key);
            this.registeredKeys[GetHandleId(key)] = newKey;
            this.registerNewKeyEvent(key);
            return newKey;
        } else {
            return this.registeredKeys[GetHandleId(key)];
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

    public isButtonHeld(key: oskeytype) {
        return this.getKeyContainer(key).isDown;
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
     * Removes a keyCallback, making it useless, dead, and once having its reference it should be cleaned up by GC.
     * @param keyCallback the callback to remove
     */
    public static removeKeyCallback(keyCallback: KeyCallback) {
        return InputManager.getInstance().removeKeyCallback(keyCallback);
    }

    /**
     * Used internally a lot.
     */
    public static getKeyContainer(key: oskeytype) {
        return InputManager.getInstance().getKeyContainer(key);
    }

    /**
     *  Checks if a button is held down, entirely disregards metakeys.
     * @param key the button
     */
    public static isButtonHeld(key: oskeytype) {
        return InputManager.getInstance().isButtonHeld(key);
    }
}