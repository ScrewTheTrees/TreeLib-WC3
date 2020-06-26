import {Logger} from "./TreeLib/Logger";

export class Game {

    public run() {
        Logger.doLogVerbose = false;
        Logger.doLogDebug = true;

        xpcall(() => {

        }, Logger.critical);
    }
}