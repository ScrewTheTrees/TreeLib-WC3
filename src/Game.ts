import {Logger} from "./TreeLib/Logger";
import {StringBuilderTest} from "./tests/StringBuilderTest";
import {DDSTests} from "./tests/DDSTests";
import {QueueTests} from "./tests/QueueTests";
import {PathfindingTests} from "./tests/PathfindingTests";
import {RespawnTests} from "./tests/RespawnTests";
import {QueueRespawnIntegrationTests} from "./tests/QueueRespawnIntegrationTests";
import {InputManagerTest} from "./tests/InputManagerTest";
import {UnitEventTracker} from "./TreeLib/Services/UnitEventTracker/UnitEventTracker";
import {EntityTests} from "./tests/EntityTests";
import {Cube} from "./TreeLib/Utility/Data/Cube";
import {Vector2} from "./TreeLib/Utility/Data/Vector2";
import {Vector3} from "./TreeLib/Utility/Data/Vector3";
import {Rectangle} from "./TreeLib/Utility/Data/Rectangle";
import {BunkeringTests} from "./tests/BunkeringTests";

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
            new BunkeringTests().run();

            PathfindingTests.getInstance();
            UnitEventTracker.getInstance();

            Vector2.new(0, 0);
            Vector3.new(0, 0, 0);
            Rectangle.new(0, 0, 0, 0);
            Cube.new(0, 0, 0, 0, 0, 0);


            const camCommand = CreateTrigger();
            TriggerRegisterPlayerChatEvent(camCommand, Player(0), "", false);
            TriggerAddAction(camCommand, () => {
                let chat = GetEventPlayerChatString().toLowerCase();

                if (chat.startsWith("-cam")) {
                    chat = chat.substring("-cam ".length, chat.length);
                    let num = tonumber(chat) || 2000;
                    if (GetTriggerPlayer() == GetLocalPlayer()) {
                        SetCameraField(CAMERA_FIELD_TARGET_DISTANCE, num, 1);
                        SetCameraField(CAMERA_FIELD_FARZ, 40000, 0);
                    }
                }
            });

        }, Logger.critical);
    }
}