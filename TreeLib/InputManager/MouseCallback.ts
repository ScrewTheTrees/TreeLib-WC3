import {PressType} from "./PressType";
import {Vector2} from "../Utility/Data/Vector2";

export class MouseCallback {
    public callback: (key: MouseCallback) => void;
    public button: mousebuttontype;
    public enabled: boolean = true;
    public pressType: PressType;
    public triggeringPlayer: player | undefined;
    private _position: Vector2 | undefined;

    get position(): Vector2 | undefined {
        return this._position;
    }

    set position(value: Vector2 | undefined) {
        if (this._position) this._position.recycle();
        this._position = value;
    }

    constructor(button: mousebuttontype, callback: (this: any, key: MouseCallback) => void, pressType: PressType) {
        this.button = button;
        this.callback = callback;
        this.pressType = pressType;
    }
}