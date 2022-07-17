import {Entity} from "../../../Entity";
import {Orders} from "../../../Structs/Orders";
import {UnitEventTracker} from "../../UnitEventTracker/UnitEventTracker";
import {UnitEventTypes} from "../../UnitEventTracker/UnitEventTypes";
import {Quick} from "../../../Quick";
import {BunkerUnitTypeConfig} from "./BunkerUnitTypeConfig";
import {BunkerUnitContainer} from "./BunkerUnitContainer";
import {Vector2} from "../../../Utility/Data/Vector2";
import {UnitEventContainer} from "../../UnitEventTracker/UnitEventContainer";


export class Bunkering extends Entity {
    private static _instance: Bunkering;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new Bunkering();
        }
        return this._instance;
    }
    private constructor() {
        super(0.01);
        this.deathTrigger = UnitEventTracker.getInstance().registerAction(UnitEventTypes.KILLED, (dead) => {
            this.removeUnitFromBunker(dead);
        });
        this.removeTrigger = UnitEventTracker.getInstance().registerAction(UnitEventTypes.REMOVED, (removed) => {
            this.removeUnitFromBunker(removed);
        });

        let test = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(test, EVENT_PLAYER_UNIT_ISSUED_ORDER);
        TriggerRegisterAnyUnitEventBJ(test, EVENT_PLAYER_UNIT_ISSUED_TARGET_ORDER);
        TriggerRegisterAnyUnitEventBJ(test, EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER);
        TriggerAddAction(test, () => {
                if (GetIssuedOrderId() == Orders.unloadallinstant) {
                    this.removeAllUnitsFromBunker(GetOrderedUnit());
                }

                if (GetIssuedOrderId() == Orders.stop
                    || GetIssuedOrderId() == Orders.attack
                    || GetIssuedOrderId() == Orders.smart
                ) {
                    this.removeUnitFromBunker(GetOrderedUnit());
                }
            }
        );

        let test2 = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(test2, EVENT_PLAYER_UNIT_LOADED);
        TriggerAddAction(test2, () => {
                this.addUnitToBunker(GetLoadedUnit(), GetTransportUnit());
            }
        );
    }
    public deathTrigger: UnitEventContainer;
    public removeTrigger: UnitEventContainer;

    public allBunkerConfigs: Map<number, BunkerUnitTypeConfig> = new Map();
    public allBunkers: Map<unit, BunkerUnitContainer> = new Map();
    public allBunkeredUnits: unit[] = [];

    public addUnitToBunker(soldier: unit, bunkerUnit: unit) {
        let bunkerUnitTypeConfig = this.allBunkerConfigs.get(GetUnitTypeId(bunkerUnit));
        if (bunkerUnitTypeConfig == null) return;

        let bunker = this.allBunkers.get(bunkerUnit);
        if (bunker == null) {
            bunker = BunkerUnitContainer.new(bunkerUnit, bunkerUnitTypeConfig);
            this.allBunkers.set(bunkerUnit, bunker);
        }
        bunker.addUnit(soldier);
        Quick.Push(this.allBunkeredUnits, soldier);
    }

    public removeAllUnitsFromBunker(bunkerUnit: unit) {
        let bunker = this.allBunkers.get(bunkerUnit);
        if (bunker != null) {
            for (let i = bunker.bunkeredUnits.length - 1; i >= 0; i--) {
                this.removeUnitFromBunker(bunker.bunkeredUnits[i], bunkerUnit);
            }
        }
    }

    public addBunkerConfig(config: BunkerUnitTypeConfig) {
        for (let type of config.unitTypes) {
            this.allBunkerConfigs.set(type, config);
        }
    }

    public removeUnitFromBunker(soldier: unit, bunkerUnit?: unit) {
        if (!Quick.Contains(this.allBunkeredUnits, soldier)) return;

        if (!bunkerUnit) {
            let toRemove: unit | undefined = undefined;

            for (let bunker of this.allBunkers.values()) {
                if (Quick.Contains(bunker.bunkeredUnits, soldier)) {
                    bunker.removeUnit(soldier);
                    Quick.Remove(this.allBunkeredUnits, soldier);
                    if (bunker.bunkeredUnits.length <= 0) {
                        toRemove = bunker.bunkerUnit;
                        bunker.recycle();
                    }
                    break;
                }
            }
            if (toRemove) {
                this.allBunkers.delete(toRemove);
            }
        }

    }

    private checkPoint: Vector2 = Vector2.new(0, 0);
    step(): void {
        let point = this.checkPoint;
        for (let bunker of this.allBunkers.values()) {
            bunker.currentStopDelayTimer += this.timerDelay;
            if (bunker.currentStopDelayTimer >= bunker.typeConfig.stopDelay) {
                for (let u of bunker.bunkeredMapping.values()) {
                    IssueImmediateOrderById(u, Orders.stop);
                }
                bunker.currentStopDelayTimer = 0;
            }

            for (let u of bunker.bunkeredUnits) {
                if (bunker.typeConfig.isMoveable) {
                    let toUpdate = bunker.bunkeredMapping.get(u);
                    if (!toUpdate) continue;

                    let index = bunker.getIndexMappingByUnit(u);
                    let position = bunker.typeConfig.getPositionFor(index);
                    point.updateTo(position.x, position.y);
                    let dist = point.distanceToXY(0, 0);
                    let direction = point.directionFromXY(0, 0);
                    if (bunker.typeConfig.doTweaking) {
                        direction = bunker.tweakDirection(direction, u);
                        dist = bunker.tweakDistance(dist, u);
                    }
                    point.updateTo(0, 0);
                    point.polarProject(dist, direction);

                    if (bunker.typeConfig.unitScale) {
                        SetUnitScale(toUpdate, bunker.typeConfig.unitScale, bunker.typeConfig.unitScale, bunker.typeConfig.unitScale);
                    }

                    if (BlzGetUnitCollisionSize(u) == 32
                        && !BlzGetUnitBooleanField(bunker.bunkerUnit, UNIT_BF_IS_A_BUILDING)) {
                        //I wish i could tell you why EXACTLY 32 OFFSETS a units center by 16,
                        //THis only matters when its a unit, FUk me
                        //ALL I KNOW IS THAT I WANT TO RIP MY HAIR OUR FINDING THAT IT DOES.
                        point.x -= 16;
                        point.y -= 16;
                    }

                    SetUnitX(toUpdate, math.floor(GetWidgetX(bunker.bunkerUnit) + point.x));
                    SetUnitY(toUpdate, math.floor(GetWidgetY(bunker.bunkerUnit) + point.y));
                    SetUnitFlyHeight(toUpdate, position.z, 0);
                }
            }

        }
    }

}