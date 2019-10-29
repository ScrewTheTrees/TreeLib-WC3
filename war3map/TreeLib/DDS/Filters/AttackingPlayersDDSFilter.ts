import {DDSFilter} from "./DDSFilter";
import {DamageHitContainer} from "../DamageHitContainer";
import {Players} from "../../Structs/Players";

export class AttackingPlayersDDSFilter implements DDSFilter {
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

    public static get RED() {return new AttackingPlayersDDSFilter(Players.RED)}
    public static get BLUE() {return new AttackingPlayersDDSFilter(Players.BLUE)}
    public static get TEAL() {return new AttackingPlayersDDSFilter(Players.TEAL)}
    public static get PURPLE() {return new AttackingPlayersDDSFilter(Players.PURPLE)}
    public static get YELLOW() {return new AttackingPlayersDDSFilter(Players.YELLOW)}
    public static get ORANGE() {return new AttackingPlayersDDSFilter(Players.ORANGE)}
    public static get GREEN() {return new AttackingPlayersDDSFilter(Players.GREEN)}
    public static get PINK() {return new AttackingPlayersDDSFilter(Players.PINK)}
    public static get LIGHT_GRAY() {return new AttackingPlayersDDSFilter(Players.LIGHT_GRAY)}
    public static get LIGHT_BLUE() {return new AttackingPlayersDDSFilter(Players.LIGHT_BLUE)}
    public static get AQUA() {return new AttackingPlayersDDSFilter(Players.AQUA)}
    public static get BROWN() {return new AttackingPlayersDDSFilter(Players.BROWN)}
    public static get MAROON() {return new AttackingPlayersDDSFilter(Players.MAROON)}
    public static get NAVY() {return new AttackingPlayersDDSFilter(Players.NAVY)}
    public static get TURQUOISE() {return new AttackingPlayersDDSFilter(Players.TURQUOISE)}
    public static get VIOLET() {return new AttackingPlayersDDSFilter(Players.VIOLET)}
    public static get WHEAT() {return new AttackingPlayersDDSFilter(Players.WHEAT)}
    public static get PEACH() {return new AttackingPlayersDDSFilter(Players.PEACH)}
    public static get MINT() {return new AttackingPlayersDDSFilter(Players.MINT)}
    public static get LAVENDER() {return new AttackingPlayersDDSFilter(Players.LAVENDER)}
    public static get COAL() {return new AttackingPlayersDDSFilter(Players.COAL)}
    public static get SNOW() {return new AttackingPlayersDDSFilter(Players.SNOW)}
    public static get EMERALD() {return new AttackingPlayersDDSFilter(Players.EMERALD)}
    public static get PEANUT() {return new AttackingPlayersDDSFilter(Players.PEANUT)}
    public static get NEUTRAL_HOSTILE() {return new AttackingPlayersDDSFilter(Players.NEUTRAL_HOSTILE)}
    public static get NEUTRAL_PASSIVE() {return new AttackingPlayersDDSFilter(Players.NEUTRAL_PASSIVE)}
    public static get NEUTRAL_VICTIM() {return new AttackingPlayersDDSFilter(Players.NEUTRAL_VICTIM)}
    public static get NEUTRAL_EXTRA() {return new AttackingPlayersDDSFilter(Players.NEUTRAL_EXTRA)}
}