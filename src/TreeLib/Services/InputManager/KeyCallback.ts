import {MetaKey} from "./MetaKey";
import {PressType} from "./PressType";

export class KeyCallback {
    public callback: (this: void, key: KeyCallback) => void;
    public key: oskeytype;
    public metaKeys: MetaKey[];
    public enabled: boolean = true;
    public pressType: PressType;
    public triggeringPlayer!: player;

    constructor(key: oskeytype, callback: (this: void, key: KeyCallback) => void, pressType: PressType, metaKeys: MetaKey[] = [MetaKey.ALL]) {
        this.key = key;
        this.callback = callback;
        this.pressType = pressType;
        this.metaKeys = metaKeys;
    }
}