/** @noSelfInFile **/
import {Game} from "./Game";
import {Hooks} from "./TreeLib/Hooks";

{
    let gg_trg_Start: trigger;
    let gameInstance: Game;

    function MapStart() {
        xpcall(() => {
            gameInstance = new Game();
            gameInstance.run();
        }, print);
    }

    function NewMain() {
        gg_trg_Start = CreateTrigger();
        TriggerRegisterTimerEvent(gg_trg_Start, 0.10, false);
        TriggerAddAction(gg_trg_Start, () => MapStart())
    }

// @ts-ignore
    _G.main = Hooks.hookArguments(main, NewMain);
}