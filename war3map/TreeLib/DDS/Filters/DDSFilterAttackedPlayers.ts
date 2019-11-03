import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";
import {Players} from "../../Structs/Players";

export class DDSFilterAttackedPlayers implements DDSFilter {
    private readonly attackedPlayers: player[];

    constructor(...attackedPlayers: player[]) {
        this.attackedPlayers = [...attackedPlayers];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let play of this.attackedPlayers) {
            if (hitObject.attackedPlayer == play) {
                return true;
            }
        }
        return false;
    }

    public static get RED() {return new DDSFilterAttackedPlayers(Players.RED)}
    public static get BLUE() {return new DDSFilterAttackedPlayers(Players.BLUE)}
    public static get TEAL() {return new DDSFilterAttackedPlayers(Players.TEAL)}
    public static get PURPLE() {return new DDSFilterAttackedPlayers(Players.PURPLE)}
    public static get YELLOW() {return new DDSFilterAttackedPlayers(Players.YELLOW)}
    public static get ORANGE() {return new DDSFilterAttackedPlayers(Players.ORANGE)}
    public static get GREEN() {return new DDSFilterAttackedPlayers(Players.GREEN)}
    public static get PINK() {return new DDSFilterAttackedPlayers(Players.PINK)}
    public static get LIGHT_GRAY() {return new DDSFilterAttackedPlayers(Players.LIGHT_GRAY)}
    public static get LIGHT_BLUE() {return new DDSFilterAttackedPlayers(Players.LIGHT_BLUE)}
    public static get AQUA() {return new DDSFilterAttackedPlayers(Players.AQUA)}
    public static get BROWN() {return new DDSFilterAttackedPlayers(Players.BROWN)}
    public static get MAROON() {return new DDSFilterAttackedPlayers(Players.MAROON)}
    public static get NAVY() {return new DDSFilterAttackedPlayers(Players.NAVY)}
    public static get TURQUOISE() {return new DDSFilterAttackedPlayers(Players.TURQUOISE)}
    public static get VIOLET() {return new DDSFilterAttackedPlayers(Players.VIOLET)}
    public static get WHEAT() {return new DDSFilterAttackedPlayers(Players.WHEAT)}
    public static get PEACH() {return new DDSFilterAttackedPlayers(Players.PEACH)}
    public static get MINT() {return new DDSFilterAttackedPlayers(Players.MINT)}
    public static get LAVENDER() {return new DDSFilterAttackedPlayers(Players.LAVENDER)}
    public static get COAL() {return new DDSFilterAttackedPlayers(Players.COAL)}
    public static get SNOW() {return new DDSFilterAttackedPlayers(Players.SNOW)}
    public static get EMERALD() {return new DDSFilterAttackedPlayers(Players.EMERALD)}
    public static get PEANUT() {return new DDSFilterAttackedPlayers(Players.PEANUT)}
    public static get NEUTRAL_HOSTILE() {return new DDSFilterAttackedPlayers(Players.NEUTRAL_HOSTILE)}
    public static get NEUTRAL_PASSIVE() {return new DDSFilterAttackedPlayers(Players.NEUTRAL_PASSIVE)}
    public static get NEUTRAL_VICTIM() {return new DDSFilterAttackedPlayers(Players.NEUTRAL_VICTIM)}
    public static get NEUTRAL_EXTRA() {return new DDSFilterAttackedPlayers(Players.NEUTRAL_EXTRA)}
}