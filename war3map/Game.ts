import {Logger} from "./TreeLib/Logger";
import {Delay} from "./TreeLib/Utility/Delay";
import {DummyCaster} from "./TreeLib/DummyCasting/DummyCaster";
import {Players} from "./TreeLib/Structs/Players";
import {Point} from "./TreeLib/Utility/Point";
import {ActionQueue} from "./TreeLib/ActionQueue/ActionQueue";
import {UnitActionWaypoint} from "./TreeLib/ActionQueue/Actions/UnitActionWaypoint";
import {WaypointOrders} from "./TreeLib/ActionQueue/Actions/WaypointOrders";
import {UnitActionDeath} from "./TreeLib/ActionQueue/Actions/UnitActionDeath";
import {UnitActionKillUnit} from "./TreeLib/ActionQueue/Actions/UnitActionKillUnit";
import {StringBuilderTest} from "./tests/StringBuilderTest";
import {DDSTests} from "./tests/DDSTests";
import {DamageDetectionSystem} from "./TreeLib/DDS/DamageDetectionSystem";
import {Respawner} from "./TreeLib/Respawner/Respawner";

export class Game {
    private dummyCaster: DummyCaster;
    private actionQueue: ActionQueue;
    private delay: Delay;
    private dds: DamageDetectionSystem;
    private respawner: Respawner;

    constructor() {
        Logger.doLogVerbose = true;
        this.delay = Delay.getInstance();
        this.dummyCaster = DummyCaster.getInstance();
        this.actionQueue = ActionQueue.getInstance();
        this.dds = DamageDetectionSystem.getInstance();
        this.respawner = Respawner.getInstance();

        this.genericTests();
        this.dummyCasterTest();
        this.actionQueueTest();

    }

    private actionQueueTest() {
        let killKnight = CreateUnit(Players.BLUE, FourCC("hkni"), 4000, 0, 0);

        this.delay.addDelay(() => {
            let mortar = CreateUnit(Players.RED, FourCC("hmtm"), -1400, -3000, 0);
            this.actionQueue.createUnitQueue(mortar,
                new UnitActionWaypoint(new Point(870, -3064)),
                new UnitActionWaypoint(new Point(870, -1450), WaypointOrders.smart),
                new UnitActionWaypoint(new Point(2000, -1450), WaypointOrders.attack),
                new UnitActionKillUnit(killKnight),
                new UnitActionDeath(true),
            )
        }, 2, 5);

        let knightSpawn = this.respawner.createNewUnitRespawner(killKnight, 5);
        knightSpawn.onRespawn = (target: unit) => {
            Logger.LogDebug("Revived ", GetUnitName(target));
        };

        let foo1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 5000, 5000, 0);
        let foo2 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 5000, 5000, 0);
        let foo3 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 5000, 5000, 0);

        let foo1_1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 4000, 4000, 0);
        let foo2_1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 4000, 4000, 0);
        let foo3_1 = CreateUnit(Players.NEUTRAL_HOSTILE, FourCC("hfoo"), 4000, 4000, 0);

        this.respawner.createNewUnitCampRespawner([foo1, foo2, foo3], 5, true);
        this.respawner.createNewUnitCampRespawner([foo1_1, foo2_1, foo3_1], 5, false);
    }

    private dummyCasterTest() {
        let archmage = _G["gg_unit_Hamg_0003"];
        let knight = _G["gg_unit_hkni_0010"];

        this.delay.addDelay(() => {
            this.dummyCaster.castAtWidgetInstant(FourCC("ACf3"), "fingerofdeath", knight, archmage);
            this.dummyCaster.castImmediately(FourCC("ACds"), "divineshield", archmage);
            this.dummyCaster.channelAtPoint(FourCC("ACfs"), "flamestrike", Point.fromWidget(archmage), archmage, 0, 15);
        }, 5);
    }

    private genericTests() {
        new StringBuilderTest().run();
        new DDSTests().run();
    }
}