import {PressType} from "./PressType";
import {Vector2} from "../Utility/Data/Vector2";

export class MouseCallback {
    public callback: (key: MouseCallback) => void;
    public button: mousebuttontype;
    public enabled: boolean = true;
    public pressType: PressType;
    public triggeringPlayer!: player;
    private _position: Vector2 = Vector2.new(0,0);

    get position(): Vector2 {
        return this._position;
    }

    set position(value: Vector2) {
        this._position.updateToPoint(value);
    }

    constructor(button: mousebuttontype, callback: (this: any, key: MouseCallback) => void, pressType: PressType) {
        this.button = button;
        this.callback = callback;
        this.pressType = pressType;
    }
}