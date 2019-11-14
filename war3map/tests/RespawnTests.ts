import {Players} from "../TreeLib/Structs/Players";
import {Delay} from "../TreeLib/Utility/Delay";
import {Respawner} from "../TreeLib/Respawner/Respawner";
import {Logger} from "../TreeLib/Logger";

export class RespawnTests {
    private delay: Delay;
    private respawner: Respawner;

    constructor() {
        this.respawner = Respawner.getInstance();
        this.delay = Delay.getInstance();
    }

    run() {
        xpcall(() => {
            let foo1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 5000, 5000, 0);
            let foo2 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 5000, 5000, 0);
            let foo3 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 5000, 5000, 0);

            let foo1_1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 4000, 4000, 0);
            let foo2_1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 4000, 4000, 0);
            let foo3_1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 4000, 4000, 0);

            this.respawner.createNewUnitRespawner(foo1, 5, true);
            this.respawner.createNewUnitRespawner(foo2, 5, true, undefined, undefined, 1);
            this.respawner.createNewUnitRespawner(foo3, 5, true, undefined, undefined, 3);
            this.respawner.createNewUnitCampRespawner([foo1_1, foo2_1, foo3_1], 5, false, undefined, undefined,
                2);
        }, (...args) => Logger.LogCritical(...args))
    }
}