import {IUnitController} from "../UnitControllers/IUnitController";
import {PlayerInput} from "./PlayerInput";
import {Orders} from "../Orders";
import {Entity} from "../Generic/Entity";
import {PlayerCastDto} from "./PlayerCastDto";
import {ProjectileSkillshot} from "../Projectile/ProjectileSkillshot";
import {Point} from "../Generic/Point";

export class PlayerController extends Entity {
    public controllingPlayer: player;
    private controlledUnit: unit | null = null;
    private unitController: IUnitController | null = null;
    private input: PlayerInput = new PlayerInput();
    private wasInputActive: boolean = false;
    private readonly pressKey: trigger;
    private readonly pressMouseButton: trigger;
    private isCasting: boolean = false;
    private castingTimer: number = 0;
    private nextCast: PlayerCastDto | null = null;

    constructor(controllingPlayer: player) {
        super();
        this.controllingPlayer = controllingPlayer;
        this.pressKey = CreateTrigger();
        this.pressMouseButton = CreateTrigger();
        this.createTriggers();
    }

    step() {
        if (this.controlledUnit && this.unitController) {
            if (this.nextCast && !this.isCasting) {
                IssuePointOrder(this.controlledUnit, this.unitController.heroUnit.attackSpellOrderString, GetLocationX(this.nextCast.castLoc), GetLocationY(this.nextCast.castLoc));
                this.isCasting = true;
            }
            if (this.nextCast && this.isCasting && this.castingTimer < this.getBackswingValue()) {
                new ProjectileSkillshot("Abilities\\Weapons\\MoonPriestessMissile\\MoonPriestessMissile.mdl",
                    25, this.controlledUnit, Point.fromLocationClean(GetUnitLoc(this.controlledUnit)),
                    Point.fromLocation(this.nextCast.castLoc), 1.00, 4);

                this.nextCast.destruct();
                this.nextCast = null;
            }

            if (!this.isCasting) {
                IssueImmediateOrder(this.controlledUnit, Orders.stop);
            }
            SetCameraPositionForPlayer(this.controllingPlayer, GetUnitX(this.controlledUnit), GetUnitY(this.controlledUnit));

            if (!this.isCasting) {
                if (this.input.isInputActive()) {
                    if (this.wasInputActive != this.input.isInputActive()) {
                        SetUnitAnimationByIndex(this.controlledUnit, this.unitController.getWalkAnimationIndex())
                    }
                    this.unitController.moveUnit(this.input.getInputDirection());
                } else {
                    if (this.wasInputActive != this.input.isInputActive()) {
                        SetUnitAnimation(this.controlledUnit, "stand");
                    }
                }
            }

            this.wasInputActive = this.input.isInputActive();
        }

        if (this.isCasting) {
            this.castingTimer -= 0.01;
            if (this.castingTimer <= 0) {
                this.isCasting = false;
                this.castingTimer = 0;
            }
            this.wasInputActive = !(this.input.isInputActive());
        }
    }

    private createTriggers() {
        for (let i = 0; i <= 4; i++) {
            BlzTriggerRegisterPlayerKeyEvent(this.pressKey, this.controllingPlayer, OSKEY_W, i, false);
            BlzTriggerRegisterPlayerKeyEvent(this.pressKey, this.controllingPlayer, OSKEY_W, i, true);
            BlzTriggerRegisterPlayerKeyEvent(this.pressKey, this.controllingPlayer, OSKEY_A, i, false);
            BlzTriggerRegisterPlayerKeyEvent(this.pressKey, this.controllingPlayer, OSKEY_A, i, true);
            BlzTriggerRegisterPlayerKeyEvent(this.pressKey, this.controllingPlayer, OSKEY_S, i, false);
            BlzTriggerRegisterPlayerKeyEvent(this.pressKey, this.controllingPlayer, OSKEY_S, i, true);
            BlzTriggerRegisterPlayerKeyEvent(this.pressKey, this.controllingPlayer, OSKEY_D, i, false);
            BlzTriggerRegisterPlayerKeyEvent(this.pressKey, this.controllingPlayer, OSKEY_D, i, true);
        }

        TriggerRegisterPlayerEvent(this.pressMouseButton, this.controllingPlayer, EVENT_PLAYER_MOUSE_DOWN);

        TriggerAddAction(this.pressKey, () => {
            switch (BlzGetTriggerPlayerKey()) {
                case OSKEY_W:
                    return this.input.up = BlzGetTriggerPlayerIsKeyDown();
                case OSKEY_A:
                    return this.input.left = BlzGetTriggerPlayerIsKeyDown();
                case OSKEY_S:
                    return this.input.down = BlzGetTriggerPlayerIsKeyDown();
                case OSKEY_D:
                    return this.input.right = BlzGetTriggerPlayerIsKeyDown();
            }
        });

        TriggerAddAction(this.pressMouseButton, () => {
            const button = BlzGetTriggerPlayerMouseButton();
            const loc = BlzGetTriggerPlayerMousePosition();
            if (this.controlledUnit && this.unitController) {
                if (button === MOUSE_BUTTON_TYPE_RIGHT && !this.isCasting) {
                    this.castingTimer = this.unitController.heroUnit.heroAttack.castTime;
                    this.nextCast = new PlayerCastDto(loc);
                }
            }
        });
    }


    public addControlledUnit(controlledUnit: unit, unitController: IUnitController) {
        this.controlledUnit = controlledUnit;
        this.unitController = unitController;
    }


    private getBackswingValue(): number {
        if (this.unitController) {
            return this.unitController.heroUnit.heroAttack.castTime - this.unitController.heroUnit.heroAttack.backswing;
        }
        return -1;
    }
}