import {MouseCallback} from "./MouseCallback";

export class MouseInputContainer {
    public buttonType: mousebuttontype;
    public isDown: boolean = false;

    public callbacks: MouseCallback[] = [];

    constructor(buttonType: mousebuttontype) {
        this.buttonType = buttonType;
    }
}