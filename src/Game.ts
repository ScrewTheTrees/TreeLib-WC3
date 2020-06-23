import {Logger} from "./TreeLib/Logger";
import {SyncSaveLoadTest} from "./SaveLoad/SyncSaveLoadTest";

export class Game {

    public run() {
        Logger.doLogVerbose = false;
        Logger.doLogDebug = true;

        xpcall(() => {
            new SyncSaveLoadTest();
        }, Logger.critical);
    }
}