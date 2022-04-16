import {EncodingBase64} from "../../Utility/Encodings/EncodingBase64";

export class FilePromise {
    constructor(public syncOwner: player, public onFinish?: (promise: FilePromise) => void) {
    }

    public hasLoaded: boolean = false;
    public buffer: string[] = [];
    public finalString: string = "";

    public finish() {
        this.hasLoaded = true;
        let loadString = table.concat(this.buffer);
        this.finalString = EncodingBase64.Decode(loadString);
        if (this.onFinish != null) this.onFinish(this);
    }
}