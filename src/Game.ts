import {Logger} from "./TreeLib/Logger";
import {StringBuilderTest} from "./tests/StringBuilderTest";
import {DDSTests} from "./tests/DDSTests";
import {QueueTests} from "./tests/QueueTests";
import {PathfindingTests} from "./tests/PathfindingTests";
import {RespawnTests} from "./tests/RespawnTests";
import {QueueRespawnIntegrationTests} from "./tests/QueueRespawnIntegrationTests";
import {InputManagerTest} from "./tests/InputManagerTest";
import {UnitTracker} from "./TreeLib/SpecialUnitFunctionality/UnitTracker";
import {UnitEventTypes} from "./TreeLib/SpecialUnitFunctionality/UnitEventTypes";

export class Game {

    public run() {
        Logger.doLogVerbose = false;
        Logger.doLogDebug = true;

        xpcall(() => {
            new StringBuilderTest().run();
            new DDSTests().run();
            new QueueTests().run();
            new RespawnTests().run();
            new QueueRespawnIntegrationTests().run();
            new InputManagerTest().run();
            PathfindingTests.getInstance();
            UnitTracker.getInstance().registerAction(UnitEventTypes.CREATED_ANY, (u) => {
            });
        }, Logger.critical);
    }
}