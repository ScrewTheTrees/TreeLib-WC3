import {Logger} from "./TreeLib/Logger";
import {StringBuilderTest} from "./tests/StringBuilderTest";
import {DDSTests} from "./tests/DDSTests";
import {QueueTests} from "./tests/QueueTests";
import {PathfindingTests} from "./tests/PathfindingTests";
import {RespawnTests} from "./tests/RespawnTests";
import {QueueRespawnIntegrationTests} from "./tests/QueueRespawnIntegrationTests";
import {InputManagerTest} from "./tests/InputManagerTest";
import {UnitEventTracker} from "./TreeLib/UnitEventTracker/UnitEventTracker";
import {UnitEventTypes} from "./TreeLib/UnitEventTracker/UnitEventTypes";
import {EntityTests} from "./tests/EntityTests";

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
            new EntityTests().run();
            PathfindingTests.getInstance();
            UnitEventTracker.getInstance().registerAction(UnitEventTypes.CREATED_ANY, (u) => {
            });
        }, Logger.critical);
    }
}