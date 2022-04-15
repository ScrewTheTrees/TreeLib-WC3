import {MouseInputContainer} from "./MouseInputContainer";
import {Vector2} from "../../Utility/Data/Vector2";
import {PressType} from "./PressType";
import {MouseCallback} from "./MouseCallback";
import {Logger} from "../../Logger";
import {Quick} from "../../Quick";
import {Hooks} from "../../Hooks";

Hooks.addMainHook(() => {
    InputManagerMouseHandler.Init();
});
export class InputManagerMouseHandler {
    private constructor() {}
    static Init() {
        TriggerAddAction(this.mouseInputPressTrigger, () => this.onMousePressAction());
        TriggerAddAction(this.mouseInputReleaseTrigger, () => this.onMouseReleaseAction());
        for (let i = 0; i < PLAYER_NEUTRAL_AGGRESSIVE; i++) {
            TriggerRegisterPlayerEvent(this.mouseInputPressTrigger, Player(i), EVENT_PLAYER_MOUSE_DOWN);
            TriggerRegisterPlayerEvent(this.mouseInputReleaseTrigger, Player(i), EVENT_PLAYER_MOUSE_UP);
            TriggerRegisterPlayerEvent(this.mouseInputReleaseTrigger, Player(i), EVENT_PLAYER_MOUSE_MOVE);
        }
        TriggerAddAction(this.mouseMoveTrigger, () => this.onMouseMoveAction());
    }

    private static mouseInputPressTrigger: trigger = CreateTrigger();
    private static mouseInputReleaseTrigger: trigger = CreateTrigger();
    private static mouseMoveTrigger: trigger = CreateTrigger();
    public static registeredMouseEvents: MouseInputContainer[] = [];
    public static lastPosition: Vector2[] = [];
    public static lastCoordinate: Vector2[] = [];

    private static onMousePressAction() {
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
                    callback.position = Vector2.new(x, y);
                    xpcall(() => {
                        callback.callback(callback);
                    }, Logger.critical);
                }
            }
        }
    }

    private static onMouseReleaseAction() {
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
                    callback.position = Vector2.new(x, y);
                    callback.callback(callback);
                }
            }
        }
    }

    private static onMouseMoveAction() {
        let x = BlzGetTriggerPlayerMouseX();
        let y = BlzGetTriggerPlayerMouseY();
        if (!this.lastPosition[GetPlayerId(GetTriggerPlayer())]) this.lastPosition[GetPlayerId(GetTriggerPlayer())] = Vector2.new(x,y);
        this.lastPosition[GetPlayerId(GetTriggerPlayer())].updateTo(x,y)
        if (x != 0 && y != 0) {
            if (!this.lastCoordinate[GetPlayerId(GetTriggerPlayer())]) this.lastCoordinate[GetPlayerId(GetTriggerPlayer())] = Vector2.new(x,y);
            this.lastCoordinate[GetPlayerId(GetTriggerPlayer())].updateTo(x,y)
        }
    }

    public static removeMouseCallback(mouseCallback: MouseCallback) {
        let container = this.getMouseContainer(mouseCallback.button);
        if (container.callbacks.indexOf(mouseCallback) >= 0) {
            Quick.Slice(container.callbacks, container.callbacks.indexOf(mouseCallback));
        }
    }

    public static getMouseContainer(mouse: mousebuttontype) {
        let handleId = GetHandleId(mouse);
        if (this.registeredMouseEvents[handleId] == null) {
            let newKey = new MouseInputContainer(mouse);
            this.registeredMouseEvents[handleId] = newKey;
            return newKey;
        } else {
            return this.registeredMouseEvents[handleId];
        }
    }

    public static isMouseButtonHeld(button: mousebuttontype) {
        return this.getMouseContainer(button).isDown;
    }

    public static addMousePressCallback(mouse: mousebuttontype, callback: (this: any, key: MouseCallback) => void) {
        let container = this.getMouseContainer(mouse);
        let input = new MouseCallback(mouse, callback, PressType.PRESS);
        container.callbacks.push(input);
        return input;
    }

    public static addMouseReleaseCallback(mouse: mousebuttontype, callback: (this: any, key: MouseCallback) => void) {
        let container = this.getMouseContainer(mouse);
        let input = new MouseCallback(mouse, callback, PressType.RELEASE);
        container.callbacks.push(input);
        return input;
    }

    public static getLastMousePosition(triggerPlayer: player) {
        return this.lastPosition[GetPlayerId(triggerPlayer)] || Vector2.new(0, 0);
    }

    public static getLastMouseCoordinate(triggerPlayer: player) {
        return this.lastCoordinate[GetPlayerId(triggerPlayer)] || Vector2.new(0, 0);
    }
}