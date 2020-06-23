import {Entity} from "../TreeLib/Entity";
import {EntireBeeMovieScript} from "./EntireBeeMovieScript";
import {SyncSaveLoad} from "./SyncSaveLoad";
import {StringFuncs} from "../TreeLib/Utility/Data/StringFuncs";
import {Logger} from "../TreeLib/Logger";

export class SyncSaveLoadTest extends Entity {

    constructor() {
        super();
        this._timerDelay = 1;
        SyncSaveLoad.getInstance().writeFile("test.txt", EntireBeeMovieScript);
        SyncSaveLoad.getInstance().read("test.txt", Player(0), (promise) => {
            xpcall(() => {
                this.parseLines = StringFuncs.UnpackStringNewlines(promise.finalString);
            }, Logger.critical);
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