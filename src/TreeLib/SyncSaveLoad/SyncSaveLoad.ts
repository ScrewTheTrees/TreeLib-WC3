import {Hooks} from "../Hooks";
import {StringBuilder} from "../Utility/StringBuilder";
import {Logger} from "../Logger";
import {EncodingBase64} from "../Utility/Data/Encodings/EncodingBase64";
import {EncodingHex} from "../Utility/Data/Encodings/EncodingHex";

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
    public syncPrefixFinish = "S_TIOF";
    public syncEvent: trigger = CreateTrigger();
    private allPromises: (FilePromise | undefined)[] = [];

    constructor() {
        for (let i = 0; i < GetBJMaxPlayers(); i++) {
            BlzTriggerRegisterPlayerSyncEvent(this.syncEvent, Player(i), this.syncPrefix, false);
            BlzTriggerRegisterPlayerSyncEvent(this.syncEvent, Player(i), this.syncPrefixFinish, false);
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

        Logger.verbose("rawData.length: ", rawData.length);
        Logger.verbose("toCompile.length: ", toCompile.length);

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
                PreloadStart();
                Preloader(filename);
                PreloadEnd(1);

                BlzSendSyncData(this.syncPrefixFinish, "");
            }
        } else {
            Logger.warning("Trying to read file when file read is already busy.");
        }
        return <FilePromise>this.allPromises[GetPlayerId(reader)];
    }

    public

    private onSync() {
        xpcall(() => {

            const readData = BlzGetTriggerSyncData();
            let totalChunkSize = EncodingHex.ToNumber(readData.substr(0, 8));
            let currentChunk = EncodingHex.ToNumber(readData.substr(8, 8));
            let theRest = readData.substr(16);

            Logger.verbose("Loading ", currentChunk, " out of ", totalChunkSize);

            let promise = this.allPromises[GetPlayerId(GetTriggerPlayer())];
            if (promise) {
                if (BlzGetTriggerSyncPrefix() == this.syncPrefix) {
                    promise.buffer[currentChunk - 1] = theRest;
                } else if (BlzGetTriggerSyncPrefix() == this.syncPrefixFinish) {
                    promise.finish();
                    this.allPromises[GetPlayerId(promise.syncOwner)] = undefined;
                    Logger.generic("Promise killed: ", this.allPromises[GetPlayerId(promise.syncOwner)]);
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

        Logger.verbose("loadString.length", loadString.length);
        Logger.verbose("this.onFinish", this.onFinish);
        Logger.verbose("Finished: ");
        Logger.verbose("finalString.length: ", this.finalString.length);

        if (this.onFinish != null) this.onFinish(this);
    }
}