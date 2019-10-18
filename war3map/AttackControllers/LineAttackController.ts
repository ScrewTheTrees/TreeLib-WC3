import {IAttackController} from "./IAttackController";

export class LineAttackController implements IAttackController {
    private owningPlayer: player;
    private startLoc: location;
    private targetLoc: location;

    constructor(owningPlayer: player, startLoc: location, targetLoc: location) {
        this.owningPlayer = owningPlayer;
        this.startLoc = startLoc;
        this.targetLoc = targetLoc;
    }
}