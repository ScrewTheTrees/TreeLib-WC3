import {PressType} from "./PressType";
import {Point} from "../Utility/Point";

export class MouseCallback {
    public callback: (key: MouseCallback) => void;
    public button: mousebuttontype;
    public enabled: boolean = true;
    public pressType: PressType;
    public triggeringPlayer: player | undefined;
    public position: Point | undefined;

    constructor(button: mousebuttontype, callback: (key: MouseCallback) => void, pressType: PressType) {
        this.button = button;
        this.callback = callback;
        this.pressType = pressType;
    }
}