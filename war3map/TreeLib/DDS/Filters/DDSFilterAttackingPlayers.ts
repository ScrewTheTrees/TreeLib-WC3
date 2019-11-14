import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";
import {Players} from "../../Structs/Players";

/**
 * Checks if the attacking unit is owned by any of these players.
 * There are a few helper functions for getting a singular player quickly.
 */
export class DDSFilterAttackingPlayers implements DDSFilter {
    private readonly attackingPlayers: player[];

    constructor(...attackingPlayers: player[]) {
        this.attackingPlayers = [...attackingPlayers];
    }

    runFilter(hitObject: DamageHitContainer): boolean {
        for (let play of this.attackingPlayers) {
            if (hitObject.attackingPlayer == play) {
                return true;
            }
        }
        return false;
    }

    public static get RED() {return new DDSFilterAttackingPlayers(Players.RED)}
    public static get BLUE() {return new DDSFilterAttackingPlayers(Players.BLUE)}
    public static get TEAL() {return new DDSFilterAttackingPlayers(Players.TEAL)}
    public static get PURPLE() {return new DDSFilterAttackingPlayers(Players.PURPLE)}
    public static get YELLOW() {return new DDSFilterAttackingPlayers(Players.YELLOW)}
    public static get ORANGE() {return new DDSFilterAttackingPlayers(Players.ORANGE)}
    public static get GREEN() {return new DDSFilterAttackingPlayers(Players.GREEN)}
    public static get PINK() {return new DDSFilterAttackingPlayers(Players.PINK)}
    public static get LIGHT_GRAY() {return new DDSFilterAttackingPlayers(Players.LIGHT_GRAY)}
    public static get LIGHT_BLUE() {return new DDSFilterAttackingPlayers(Players.LIGHT_BLUE)}
    public static get AQUA() {return new DDSFilterAttackingPlayers(Players.AQUA)}
    public static get BROWN() {return new DDSFilterAttackingPlayers(Players.BROWN)}
    public static get MAROON() {return new DDSFilterAttackingPlayers(Players.MAROON)}
    public static get NAVY() {return new DDSFilterAttackingPlayers(Players.NAVY)}
    public static get TURQUOISE() {return new DDSFilterAttackingPlayers(Players.TURQUOISE)}
    public static get VIOLET() {return new DDSFilterAttackingPlayers(Players.VIOLET)}
    public static get WHEAT() {return new DDSFilterAttackingPlayers(Players.WHEAT)}
    public static get PEACH() {return new DDSFilterAttackingPlayers(Players.PEACH)}
    public static get MINT() {return new DDSFilterAttackingPlayers(Players.MINT)}
    public static get LAVENDER() {return new DDSFilterAttackingPlayers(Players.LAVENDER)}
    public static get COAL() {return new DDSFilterAttackingPlayers(Players.COAL)}
    public static get SNOW() {return new DDSFilterAttackingPlayers(Players.SNOW)}
    public static get EMERALD() {return new DDSFilterAttackingPlayers(Players.EMERALD)}
    public static get PEANUT() {return new DDSFilterAttackingPlayers(Players.PEANUT)}
    public static get NEUTRAL_HOSTILE() {return new DDSFilterAttackingPlayers(Players.NEUTRAL_HOSTILE)}
    public static get NEUTRAL_PASSIVE() {return new DDSFilterAttackingPlayers(Players.NEUTRAL_PASSIVE)}
    public static get NEUTRAL_VICTIM() {return new DDSFilterAttackingPlayers(Players.NEUTRAL_VICTIM)}
    public static get NEUTRAL_EXTRA() {return new DDSFilterAttackingPlayers(Players.NEUTRAL_EXTRA)}
}