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
import {UnitActionGoToAction} from "./TreeLib/ActionQueue/Actions/UnitActionGoToAction";
import {QueueTests} from "./tests/QueueTests";
import {RespawnTests} from "./tests/RespawnTests";
import {QueueRespawnIntegrationTests} from "./tests/QueueRespawnIntegrationTests";

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
    }

    private dummyCasterTest() {
        let archmage = _G["gg_unit_Hamg_0003"];
        let knight = _G["gg_unit_hkni_0010"];

        this.delay.addDelay(() => {
            this.dummyCaster.castAtWidgetInstant(FourCC("ACf3"), "fingerofdeath", knight, archmage);
            this.dummyCaster.castImmediatelyDummy(FourCC("Awrs"), "stomp", archmage);
            this.dummyCaster.channelAtPoint(FourCC("ACfs"), "flamestrike", Point.fromWidget(archmage), archmage, 0, 15);
        }, 5);
    }

    private genericTests() {
        new StringBuilderTest().run();
        new DDSTests().run();
        new QueueTests().run();
        new RespawnTests().run();
        new QueueRespawnIntegrationTests().run();
    }
}