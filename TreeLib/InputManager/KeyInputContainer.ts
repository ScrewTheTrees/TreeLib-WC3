import {KeyCallback} from "./KeyCallback";

export class KeyInputContainer {
    public key: oskeytype;
    public isDown: boolean = false;

    public callbacks: KeyCallback[] = [];

    constructor(key: oskeytype) {
        this.key = key;
    }
}