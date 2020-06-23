import {Hooks} from "../TreeLib/Hooks";
import {StringBuilder} from "../TreeLib/Utility/StringBuilder";
import {Logger} from "../TreeLib/Logger";
import {EncodingBase64} from "../TreeLib/Utility/Data/Encodings/EncodingBase64";
import {EncodingHex} from "../TreeLib/Utility/Data/Encodings/EncodingHex";

export class SyncSaveLoad {
    private static instance: SyncSaveLoad;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new SyncSaveLoad();
            Hooks.set(this.name, this.instance);
        }
        return this.instance;
    }

    public syncPrefix = "S_TIO";
    public syncEvent: trigger = CreateTrigger();
    private allPromises: (FilePromise | undefined)[] = [];

    constructor() {
        for (let i = 0; i < GetBJMaxPlayers(); i++) {
            BlzTriggerRegisterPlayerSyncEvent(this.syncEvent, Player(i), this.syncPrefix, false);
        }
        TriggerAddAction(this.syncEvent, () => this.onSync());
    }


    public writeFile(filename: string, ...data: string[]) {
        PreloadGenClear();
        PreloadGenStart();

        let rawData = new StringBuilder(...data).toString();
        let toCompile = EncodingBase64.Encode(rawData);
        let chunkSize = 180;
        let assemble = "";
        let noOfChunks = math.ceil(toCompile.length / chunkSize);

        Logger.generic("rawData.length: ", rawData.length);
        Logger.generic("toCompile.length: ", toCompile.length);

        xpcall(() => {
            for (let i = 0; i < toCompile.length; i++) {
                assemble += toCompile.charAt(i);
                if (assemble.length >= chunkSize) {
                    let header = EncodingHex.To32BitHexString(noOfChunks) + EncodingHex.To32BitHexString(math.ceil(i / chunkSize));
                    Preload(`")\ncall BlzSendSyncData("${this.syncPrefix}","${header + assemble}")\ncall S2I("`);
                    assemble = "";
                }
            }
            if (assemble.length > 0) {
                let header = EncodingHex.To32BitHexString(noOfChunks) + EncodingHex.To32BitHexString(noOfChunks);
                Preload(`")\ncall BlzSendSyncData("${this.syncPrefix}","${header + assemble}")\ncall S2I("`);
                //Final curtain call
            }
        }, Logger.critical);
        PreloadGenEnd(filename);
    }

    public isPlayerAllowedToRead(reader: player) {
        return (this.allPromises[GetPlayerId(reader)] == null);
    }

    public read(filename: string, reader: player, onFinish?: (promise: FilePromise) => void): FilePromise {
        if (this.allPromises[GetPlayerId(reader)] == null) {
            this.allPromises[GetPlayerId(reader)] = new FilePromise(reader, onFinish);
            if (GetLocalPlayer() == reader) {
                Preloader(filename);
            }
        }
        return <FilePromise>this.allPromises[GetPlayerId(reader)];
    }

    private onSync() {
        xpcall(() => {
            const readData = BlzGetTriggerSyncData();
            let totalChunkSize = EncodingHex.ToNumber(readData.substr(0, 8));
            let currentChunk = EncodingHex.ToNumber(readData.substr(8, 8));
            let theRest = readData.substr(16);

            print(currentChunk, totalChunkSize);

            let promise = this.allPromises[GetPlayerId(GetTriggerPlayer())];
            if (promise) {
                promise.buffer[currentChunk - 1] = theRest;

                if (promise.allChunksPresent(totalChunkSize)) {
                    promise.finish();
                    this.allPromises[GetPlayerId(promise.syncOwner)] = undefined;
                }
            } else {
                Logger.warning(`Syncronised data in ${SyncSaveLoad.name} when there is no promise present for player: ${GetPlayerName(GetTriggerPlayer())}`);
            }
        }, Logger.critical);
    }
}


export class FilePromise {
    constructor(public syncOwner: player, public onFinish?: (promise: FilePromise) => void) {
    }

    public hasLoaded: boolean = false;
    public buffer: string[] = [];
    public finalString: string = "";

    public finish() {
        this.hasLoaded = true;
        let loadString = new StringBuilder(...this.buffer).toString();
        this.finalString = EncodingBase64.Decode(loadString);

        Logger.generic("loadString.length", loadString.length);
        Logger.generic("this.onFinish", this.onFinish);
        Logger.generic("Finished: ");
        Logger.generic("finalString.length: ", this.finalString.length);

        if (this.onFinish != null) this.onFinish(this);
    }

    public allChunksPresent(length: number): boolean {
        for (let i = 0; i < length; i++) {
            if (this.buffer[i] == null) return false;
        }
        return true;
    }
}