export class PlayerCastDto {
    public castLoc: location;
    public disableAbility: boolean = false;

    constructor(castLoc: location) {
        this.castLoc = castLoc;

    }

    destruct() {
        RemoveLocation(this.castLoc)
    }

}