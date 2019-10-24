import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";
import {Players} from "../../Structs/Players";

export class AttackedPlayersDDSFilter implements DDSFilter {
    private readonly attackedPlayers: player[];

    constructor(...attackedPlayers: player[]) {
        this.attackedPlayers = [...attackedPlayers];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let play of this.attackedPlayers) {
            if (GetOwningPlayer(hitObject.attackedUnit) == play) {
                return true;
            }
        }
        return false;
    }

    public static get RED() {return new AttackedPlayersDDSFilter(Players.RED)}
    public static get BLUE() {return new AttackedPlayersDDSFilter(Players.BLUE)}
    public static get TEAL() {return new AttackedPlayersDDSFilter(Players.TEAL)}
    public static get PURPLE() {return new AttackedPlayersDDSFilter(Players.PURPLE)}
    public static get YELLOW() {return new AttackedPlayersDDSFilter(Players.YELLOW)}
    public static get ORANGE() {return new AttackedPlayersDDSFilter(Players.ORANGE)}
    public static get GREEN() {return new AttackedPlayersDDSFilter(Players.GREEN)}
    public static get PINK() {return new AttackedPlayersDDSFilter(Players.PINK)}
    public static get LIGHT_GRAY() {return new AttackedPlayersDDSFilter(Players.LIGHT_GRAY)}
    public static get LIGHT_BLUE() {return new AttackedPlayersDDSFilter(Players.LIGHT_BLUE)}
    public static get AQUA() {return new AttackedPlayersDDSFilter(Players.AQUA)}
    public static get BROWN() {return new AttackedPlayersDDSFilter(Players.BROWN)}
    public static get MAROON() {return new AttackedPlayersDDSFilter(Players.MAROON)}
    public static get NAVY() {return new AttackedPlayersDDSFilter(Players.NAVY)}
    public static get TURQUOISE() {return new AttackedPlayersDDSFilter(Players.TURQUOISE)}
    public static get VIOLET() {return new AttackedPlayersDDSFilter(Players.VIOLET)}
    public static get WHEAT() {return new AttackedPlayersDDSFilter(Players.WHEAT)}
    public static get PEACH() {return new AttackedPlayersDDSFilter(Players.PEACH)}
    public static get MINT() {return new AttackedPlayersDDSFilter(Players.MINT)}
    public static get LAVENDER() {return new AttackedPlayersDDSFilter(Players.LAVENDER)}
    public static get COAL() {return new AttackedPlayersDDSFilter(Players.COAL)}
    public static get SNOW() {return new AttackedPlayersDDSFilter(Players.SNOW)}
    public static get EMERALD() {return new AttackedPlayersDDSFilter(Players.EMERALD)}
    public static get PEANUT() {return new AttackedPlayersDDSFilter(Players.PEANUT)}
    public static get NEUTRAL_HOSTILE() {return new AttackedPlayersDDSFilter(Players.NEUTRAL_HOSTILE)}
    public static get NEUTRAL_PASSIVE() {return new AttackedPlayersDDSFilter(Players.NEUTRAL_PASSIVE)}
    public static get NEUTRAL_VICTIM() {return new AttackedPlayersDDSFilter(Players.NEUTRAL_VICTIM)}
    public static get NEUTRAL_EXTRA() {return new AttackedPlayersDDSFilter(Players.NEUTRAL_EXTRA)}
}