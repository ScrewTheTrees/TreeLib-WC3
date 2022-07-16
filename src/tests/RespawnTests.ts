import {Players} from "../TreeLib/Structs/Players";
import {Respawner} from "../TreeLib/Services/Respawner/Respawner";
import {Logger} from "../TreeLib/Logger";

export class RespawnTests {

    run() {
        xpcall(() => {
            let foo1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 5000, 5000, 0);
            let foo2 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 5000, 5000, 0);
            let foo3 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 5000, 5000, 0);

            let foo1_1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 4000, 4000, 0);
            let foo2_1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 4000, 4000, 0);
            let foo3_1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 4000, 4000, 0);

            Respawner.getInstance().createNewUnitRespawner(foo1, 5, true);
            Respawner.getInstance().createNewUnitRespawner(foo2, 5, true, undefined, 1);
            Respawner.getInstance().createNewUnitRespawner(foo3, 5, true, undefined, 3);
            Respawner.getInstance().createNewUnitCampRespawner([foo1_1, foo2_1, foo3_1], 5, false, undefined, 2);
        }, (...args) => Logger.LogCritical(...args))
    }
}