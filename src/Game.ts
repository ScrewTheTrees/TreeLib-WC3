import {Logger} from "./TreeLib/Logger";
import {Delay} from "./TreeLib/Utility/Delay";
import {DummyCaster} from "./TreeLib/DummyCasting/DummyCaster";
import {Point} from "./TreeLib/Utility/Point";
import {PathfindingTests} from "./tests/PathfindingTests";
import {QueueTests} from "./tests/QueueTests";
import {DDSTests} from "./tests/DDSTests";
import {StringBuilderTest} from "./tests/StringBuilderTest";

export class Game {
    constructor() {
    }

    public run() {
        Logger.doLogVerbose = false;
        Logger.doLogDebug = true;

        this.genericTests();
        this.dummyCasterTest();
    }

    private dummyCasterTest() {
        let archmage = _G["gg_unit_Hamg_0003"];
        let knight = _G["gg_unit_hkni_0010"];

        Delay.addDelay(() => {
            DummyCaster.castAtWidgetInstant(FourCC("ACf3"), "fingerofdeath", knight, archmage);
            DummyCaster.castImmediatelyDummy(FourCC("Awrs"), "stomp", archmage);
            DummyCaster.channelAtPoint(FourCC("ACfs"), "flamestrike", Point.fromWidget(archmage), archmage, 0, 15);
        }, 5);
    }

    private genericTests() {
        xpcall(() => {
            new StringBuilderTest().run();
            new DDSTests().run();
            new QueueTests().run();
            //new RespawnTests().run();
            //new QueueRespawnIntegrationTests().run();
            //new InputManagerTest().run();
            PathfindingTests.getInstance();
        }, Logger.critical);
    }
}