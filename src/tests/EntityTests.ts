import {Entity} from "../TreeLib/Entity";
import {Logger} from "../TreeLib/Logger";
import {InputManager} from "../TreeLib/InputManager/InputManager";

export class EntityTests extends Entity {
    constructor() {
        super(1);
    }
    public run() {
        try {
            const entity1 = new Test1();
            new Test2();
            new Test2();
            new Test2();
            new Test2();

            InputManager.addKeyboardPressCallback(OSKEY_DELETE, () => {
                entity1.remove();
            });
            InputManager.addKeyboardPressCallback(OSKEY_INSERT, () => {
                entity1.add();
            });
        } catch (e) {
            Logger.critical(e);
        }
    }
    step(): void {
        if (InputManager.isKeyButtonHeld(OSKEY_D, Player(0))) {
            const data = Entity.getDebugInfo();
            ClearTextMessages();
            print("-------------------");
            data.forEach((debug) => {
                print(debug);
            });
        }
    }
}

class Test1 extends Entity {
    constructor() {
        super(0.13);
    }
    step(): void {
        SetPlayerState(Player(0), PLAYER_STATE_RESOURCE_GOLD,
            GetPlayerState(Player(0), PLAYER_STATE_RESOURCE_GOLD) + 1
        );
    }
}

class Test2 extends Entity {
    constructor() {
        super();
    }
    step(): void {
        this.timerDelay = 1;
        SetPlayerState(Player(0), PLAYER_STATE_RESOURCE_LUMBER,
            GetPlayerState(Player(0), PLAYER_STATE_RESOURCE_LUMBER) + 1
        );
    }
}