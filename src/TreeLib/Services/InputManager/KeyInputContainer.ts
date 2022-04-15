import {KeyCallback} from "./KeyCallback";

export class KeyInputContainer {
    public key: oskeytype;
    private _isDown: boolean[] = [];
    public isDown(p: number): boolean {
        return this._isDown[p] || false;
    }

    public setIsDown(value: boolean, playerId: number) {
        this._isDown[playerId] = value;
    }

    public callbacks: KeyCallback[] = [];

    constructor(key: oskeytype) {
        this.key = key;
    }
}