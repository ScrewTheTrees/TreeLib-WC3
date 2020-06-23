import {Entity} from "../TreeLib/Entity";
import {EntireBeeMovieScript} from "./EntireBeeMovieScript";
import {SyncSaveLoad} from "./SyncSaveLoad";
import {Logger} from "../TreeLib/Logger";
import {InputManager} from "../TreeLib/InputManager/InputManager";
import {InverseFourCC} from "../TreeLib/Misc";
import {Quick} from "../TreeLib/Quick";
import {EncodingInt8} from "../TreeLib/Utility/Data/Encodings/EncodingInt8";
import {StringFuncs} from "../TreeLib/Utility/Data/StringFuncs";

export class SyncSaveLoadTest extends Entity {
    private currentHotSave: number[] = [];
    private syncSaveLoad: SyncSaveLoad;

    constructor() {
        super();
        this._timerDelay = 1;
        this.syncSaveLoad = SyncSaveLoad.getInstance();

        this.syncSaveLoad.writeFile("test.txt", EntireBeeMovieScript);
        this.syncSaveLoad.read("test.txt", Player(0), (promise) => {
            xpcall(() => {
                this.parseLines = StringFuncs.UnpackStringNewlines(promise.finalString);
            }, Logger.critical);
        });


        InputManager.addKeyboardPressCallback(OSKEY_9, (call) => {
            let assemble = "";
            let units = Quick.GroupToUnitArrayDestroy(GetUnitsOfPlayerAll(call.triggeringPlayer));
            for (let u of units) {
                assemble += InverseFourCC(GetUnitTypeId(u));
                assemble += InverseFourCC(math.floor(GetUnitX(u)));
                assemble += InverseFourCC(math.floor(GetUnitY(u)));
                assemble += EncodingInt8.ToChars(GetPlayerId(GetOwningPlayer(u)));
            }
            let hotsaveId = this.currentHotSave[GetPlayerId(call.triggeringPlayer)] || 0;
            hotsaveId += 1;
            this.currentHotSave[GetPlayerId(call.triggeringPlayer)] = hotsaveId;

            if (call.triggeringPlayer == GetLocalPlayer()) {
                this.syncSaveLoad.writeFile(`${GetPlayerId(call.triggeringPlayer)}Snapshot${hotsaveId}.txt`, assemble);
            }
        });

        InputManager.addKeyboardPressCallback(OSKEY_0, (call) => {
            xpcall(() => {
                let hotsaveId = this.currentHotSave[GetPlayerId(call.triggeringPlayer)] || 0;
                this.syncSaveLoad.read(`${GetPlayerId(call.triggeringPlayer)}Snapshot${hotsaveId}.txt`, call.triggeringPlayer, (promise) => {
                    let units = Quick.GroupToUnitArrayDestroy(GetUnitsOfPlayerAll(call.triggeringPlayer));
                    for (let u of units) RemoveUnit(u);
                    let data = promise.finalString;
                    for (let i = 0; i < data.length - 12; i += 13) {
                        let id = FourCC(data.substr(i, 4));
                        let x = FourCC(data.substr(i + 4, 4));
                        let y = FourCC(data.substr(i + 8, 4));
                        let p = EncodingInt8.ToInt(data.substr(i + 12, 1));

                        CreateUnit(Player(p), id, x, y, 0);
                    }
                });
            }, Logger.critical)
        });
    }

    private currentLine = 0;
    private parseLines: string[] = [];

    step(): void {
        if (this.currentLine < this.parseLines.length) {
            print(this.currentLine, ": ", this.parseLines[this.currentLine]);
            this.currentLine += 1;
        }
    }
}