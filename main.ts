import {Game} from "./war3map/Game";

let gg_trg_Start: trigger;
let gameInstance: Game;

function MapStart() {
    xpcall(() => {
        gameInstance = new Game();
    }, print);

    DestroyTrigger(gg_trg_Start);
}

function NewMain() {
    gg_trg_Start = CreateTrigger();
    TriggerRegisterTimerEvent(gg_trg_Start, 0.00, false);
    TriggerAddAction(gg_trg_Start, () => MapStart())
}


ceres.addHook("main::after", NewMain);