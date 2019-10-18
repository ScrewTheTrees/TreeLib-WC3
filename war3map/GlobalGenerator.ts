import {Global} from "./Global";
import {Logger} from "./Generic/Logger";

export class GlobalGenerator {
    public static run() {
        Object.entries(_G).forEach((data) => {
            const key = data[0];
            const value = data[1];
            if (key.startsWith("gg_rct")) {
                this.handleRegion(key, value);
            }
        });

        this.generatePlayers();
    }

    private static handleRegion(key : string, value : rect) {
        Global.AllRegions[key] = value;
        Logger.LogVerbose(Global.AllRegions[key]);
    }

    private static generatePlayers() {
        let computerPlayers = 0;

        for (let i = 0; i < Global.MaxPlayerSlots; i++) {
            const targetPlayer = Player(i);
            if (GetPlayerSlotState(targetPlayer) == PLAYER_SLOT_STATE_PLAYING) {
                if (GetPlayerController(targetPlayer) == MAP_CONTROL_USER) {
                    Global.ActivePlayers.push(targetPlayer);
                    print(GetPlayerName(targetPlayer) + " is up for the task.");
                } else {
                    computerPlayers += 1;
                    Logger.LogDebug("Cpu player found: ", i)
                }
            } else {
                Logger.LogDebug("Empty slot found: ", i)
            }
        }

        if (computerPlayers > 0) {
            print("I know friends are hard to find, but the " + computerPlayers + " computer/s is no substitute.");
        }

        Global.CreepPlayers[1] = Player(12);
        Global.CreepPlayers[2] = Player(13);
        Global.CreepPlayers[3] = Player(14);
        Global.CreepPlayers[4] = Player(15);
        Logger.LogDebug("Num of Creep players: ", Global.CreepPlayers.length)

    }
}