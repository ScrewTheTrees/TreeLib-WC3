import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";
import {Players} from "../../Structs/Players";

/**
 * Checks if the target unit is owned by any of these players.
 * There are a few helper functions for getting a singular player quickly.
 */
export class DDSFilterTargetUnitPlayers implements DDSFilter {
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

    public static get RED() {return new DDSFilterTargetUnitPlayers(Players.RED)}
    public static get BLUE() {return new DDSFilterTargetUnitPlayers(Players.BLUE)}
    public static get TEAL() {return new DDSFilterTargetUnitPlayers(Players.TEAL)}
    public static get PURPLE() {return new DDSFilterTargetUnitPlayers(Players.PURPLE)}
    public static get YELLOW() {return new DDSFilterTargetUnitPlayers(Players.YELLOW)}
    public static get ORANGE() {return new DDSFilterTargetUnitPlayers(Players.ORANGE)}
    public static get GREEN() {return new DDSFilterTargetUnitPlayers(Players.GREEN)}
    public static get PINK() {return new DDSFilterTargetUnitPlayers(Players.PINK)}
    public static get LIGHT_GRAY() {return new DDSFilterTargetUnitPlayers(Players.LIGHT_GRAY)}
    public static get LIGHT_BLUE() {return new DDSFilterTargetUnitPlayers(Players.LIGHT_BLUE)}
    public static get AQUA() {return new DDSFilterTargetUnitPlayers(Players.AQUA)}
    public static get BROWN() {return new DDSFilterTargetUnitPlayers(Players.BROWN)}
    public static get MAROON() {return new DDSFilterTargetUnitPlayers(Players.MAROON)}
    public static get NAVY() {return new DDSFilterTargetUnitPlayers(Players.NAVY)}
    public static get TURQUOISE() {return new DDSFilterTargetUnitPlayers(Players.TURQUOISE)}
    public static get VIOLET() {return new DDSFilterTargetUnitPlayers(Players.VIOLET)}
    public static get WHEAT() {return new DDSFilterTargetUnitPlayers(Players.WHEAT)}
    public static get PEACH() {return new DDSFilterTargetUnitPlayers(Players.PEACH)}
    public static get MINT() {return new DDSFilterTargetUnitPlayers(Players.MINT)}
    public static get LAVENDER() {return new DDSFilterTargetUnitPlayers(Players.LAVENDER)}
    public static get COAL() {return new DDSFilterTargetUnitPlayers(Players.COAL)}
    public static get SNOW() {return new DDSFilterTargetUnitPlayers(Players.SNOW)}
    public static get EMERALD() {return new DDSFilterTargetUnitPlayers(Players.EMERALD)}
    public static get PEANUT() {return new DDSFilterTargetUnitPlayers(Players.PEANUT)}
    public static get NEUTRAL_HOSTILE() {return new DDSFilterTargetUnitPlayers(Players.NEUTRAL_HOSTILE)}
    public static get NEUTRAL_PASSIVE() {return new DDSFilterTargetUnitPlayers(Players.NEUTRAL_PASSIVE)}
    public static get NEUTRAL_VICTIM() {return new DDSFilterTargetUnitPlayers(Players.NEUTRAL_VICTIM)}
    public static get NEUTRAL_EXTRA() {return new DDSFilterTargetUnitPlayers(Players.NEUTRAL_EXTRA)}
}