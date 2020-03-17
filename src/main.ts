/** @noSelfInFile **/
import {Game} from "./Game";

let gg_trg_Start: trigger;
let gameInstance: Game;

function MapStart() {
    xpcall(() => {
        gameInstance = new Game();
        gameInstance.run();
    }, print);

    DestroyTrigger(gg_trg_Start);
}

function NewMain() {
    gg_trg_Start = CreateTrigger();
    TriggerRegisterTimerEvent(gg_trg_Start, 0.00, false);
    TriggerAddAction(gg_trg_Start, () => MapStart())
}

_G.__oldMain = _G.main;
_G.main = () => {
    _G.__oldMain();
    NewMain();
};