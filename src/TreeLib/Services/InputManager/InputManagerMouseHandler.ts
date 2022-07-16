import {MouseInputContainer} from "./MouseInputContainer";
import {Vector2} from "../../Utility/Data/Vector2";
import {PressType} from "./PressType";
import {MouseCallback} from "./MouseCallback";
import {Logger} from "../../Logger";
import {Quick} from "../../Quick";

export class InputManagerMouseHandler {
    private static _instance: InputManagerMouseHandler;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new InputManagerMouseHandler();
        }
        return this._instance;
    }
    private constructor() {
        TriggerAddAction(this.mouseInputPressTrigger, () => this.onMousePressAction());
        TriggerAddAction(this.mouseInputReleaseTrigger, () => this.onMouseReleaseAction());
        for (let i = 0; i < PLAYER_NEUTRAL_AGGRESSIVE; i++) {
            TriggerRegisterPlayerEvent(this.mouseInputPressTrigger, Player(i), EVENT_PLAYER_MOUSE_DOWN);
            TriggerRegisterPlayerEvent(this.mouseInputReleaseTrigger, Player(i), EVENT_PLAYER_MOUSE_UP);
            TriggerRegisterPlayerEvent(this.mouseInputReleaseTrigger, Player(i), EVENT_PLAYER_MOUSE_MOVE);
        }
        TriggerAddAction(this.mouseMoveTrigger, () => this.onMouseMoveAction());

    }

    private mouseInputPressTrigger: trigger = CreateTrigger();
    private mouseInputReleaseTrigger: trigger = CreateTrigger();
    private mouseMoveTrigger: trigger = CreateTrigger();
    public registeredMouseEvents: MouseInputContainer[] = [];
    public lastPosition: Vector2[] = [];
    public lastCoordinate: Vector2[] = [];

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
                    callback.position = Vector2.new(x, y);
                    xpcall(() => {
                        callback.callback(callback);
                    }, Logger.critical);
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
                    callback.position = Vector2.new(x, y);
                    callback.callback(callback);
                }
            }
        }
    }

    private onMouseMoveAction() {
        let x = BlzGetTriggerPlayerMouseX();
        let y = BlzGetTriggerPlayerMouseY();
        if (!this.lastPosition[GetPlayerId(GetTriggerPlayer())]) this.lastPosition[GetPlayerId(GetTriggerPlayer())] = Vector2.new(x,y);
        this.lastPosition[GetPlayerId(GetTriggerPlayer())].updateTo(x,y)
        if (x != 0 && y != 0) {
            if (!this.lastCoordinate[GetPlayerId(GetTriggerPlayer())]) this.lastCoordinate[GetPlayerId(GetTriggerPlayer())] = Vector2.new(x,y);
            this.lastCoordinate[GetPlayerId(GetTriggerPlayer())].updateTo(x,y)
        }
    }

    public removeMouseCallback(mouseCallback: MouseCallback) {
        let container = this.getMouseContainer(mouseCallback.button);
        if (container.callbacks.indexOf(mouseCallback) >= 0) {
            Quick.Slice(container.callbacks, container.callbacks.indexOf(mouseCallback));
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

    public isMouseButtonHeld(button: mousebuttontype) {
        return this.getMouseContainer(button).isDown;
    }

    public addMousePressCallback(mouse: mousebuttontype, callback: (this: any, key: MouseCallback) => void) {
        let container = this.getMouseContainer(mouse);
        let input = new MouseCallback(mouse, callback, PressType.PRESS);
        container.callbacks.push(input);
        return input;
    }

    public addMouseReleaseCallback(mouse: mousebuttontype, callback: (this: any, key: MouseCallback) => void) {
        let container = this.getMouseContainer(mouse);
        let input = new MouseCallback(mouse, callback, PressType.RELEASE);
        container.callbacks.push(input);
        return input;
    }

    public getLastMousePosition(triggerPlayer: player) {
        return this.lastPosition[GetPlayerId(triggerPlayer)] || Vector2.new(0, 0);
    }

    public getLastMouseCoordinate(triggerPlayer: player) {
        return this.lastCoordinate[GetPlayerId(triggerPlayer)] || Vector2.new(0, 0);
    }
}