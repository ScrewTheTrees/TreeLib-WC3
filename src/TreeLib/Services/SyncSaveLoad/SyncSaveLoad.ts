import {Hooks} from "../../Hooks";
import {Logger} from "../../Logger";
import {EncodingBase64} from "../../Utility/Encodings/EncodingBase64";
import {EncodingHex} from "../../Utility/Encodings/EncodingHex";
import {FilePromise} from "./FilePromise";

Hooks.addMainHook(() => {
    SyncSaveLoad.Init();
});
export class SyncSaveLoad {
    private constructor() {}
    static Init() {
        for (let i = 0; i < GetBJMaxPlayers(); i++) {
            BlzTriggerRegisterPlayerSyncEvent(this.syncEvent, Player(i), this.syncPrefix, false);
            BlzTriggerRegisterPlayerSyncEvent(this.syncEvent, Player(i), this.syncPrefixFinish, false);
        }
        TriggerAddAction(this.syncEvent, () => this.onSync());
    }

    public static syncPrefix = "S_TIO";
    public static syncPrefixFinish = "S_TIOF";
    public static syncEvent: trigger = CreateTrigger();
    private static allPromises: (FilePromise | undefined)[] = [];


    public static writeFile(filename: string, ...data: string[]) {
        PreloadGenClear();
        PreloadGenStart();

        let rawData = table.concat(data);
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

    public static isPlayerAllowedToRead(reader: player) {
        return (this.allPromises[GetPlayerId(reader)] == null);
    }

    public static read(filename: string, reader: player, onFinish?: (promise: FilePromise) => void): FilePromise {
        if (this.allPromises[GetPlayerId(reader)] == null) {
            this.allPromises[GetPlayerId(reader)] = new FilePromise(reader, onFinish);
            if (GetLocalPlayer() == reader) {
                PreloadStart();
                Preloader(filename);
                PreloadEnd(1);

                BlzSendSyncData(this.syncPrefixFinish, "");
            }
        } else {
            Logger.warning("Trying to read file when file reader is already busy, please wait until finished.");
        }
        return <FilePromise>this.allPromises[GetPlayerId(reader)];
    }

    private static onSync() {
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