import {Hooks} from "../../Hooks";
import {UnitEventTypes} from "./UnitEventTypes";
import {Logger} from "../../Logger";
import {EventContainerList} from "./EventContainerList";
import {UnitEventContainer} from "./UnitEventContainer";

export class UnitEventTracker {
    private static _instance: UnitEventTracker;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new UnitEventTracker();
        }
        return this._instance;
    }

    private constructor() {
        let triggerUnitDeath = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitDeath, EVENT_PLAYER_UNIT_DEATH);
        TriggerAddAction(triggerUnitDeath, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.KILLED, GetDyingUnit())
        });

        let triggerUnitSummoned = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitSummoned, EVENT_PLAYER_UNIT_SUMMON);
        TriggerAddAction(triggerUnitSummoned, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.SUMMONED, GetSummonedUnit());
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CREATED_ANY, GetSummonedUnit());
        });

        let triggerUnitHired = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitHired, EVENT_PLAYER_UNIT_SELL);
        TriggerAddAction(triggerUnitHired, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.SOLD_UNIT, GetSoldUnit());
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CREATED_ANY, GetSoldUnit());
        });


        let triggerUnitTrained = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitTrained, EVENT_PLAYER_UNIT_TRAIN_START);
        TriggerAddAction(triggerUnitTrained, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.START_TRAINING, GetTriggerUnit());
        });
        let triggerUnitResearched = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitResearched, EVENT_PLAYER_UNIT_RESEARCH_START);
        TriggerAddAction(triggerUnitResearched, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.START_RESEARCH, GetResearchingUnit());
        });
        let triggerUnitUpgrading = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitUpgrading, EVENT_PLAYER_UNIT_UPGRADE_START);
        TriggerAddAction(triggerUnitUpgrading, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.START_UPGRADE, GetTriggerUnit());
        });
        let triggerUnitReviving = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitReviving, EVENT_PLAYER_HERO_REVIVE_START);
        TriggerAddAction(triggerUnitReviving, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.START_REVIVE, GetRevivingUnit());
        });

        let triggerUnitConstruction = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitConstruction, EVENT_PLAYER_UNIT_CONSTRUCT_START);
        TriggerAddAction(triggerUnitConstruction, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.START_CONSTRUCTION, GetConstructingStructure());
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CREATED_ANY, GetConstructingStructure());
        });

        triggerUnitTrained = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitTrained, EVENT_PLAYER_UNIT_TRAIN_CANCEL);
        TriggerAddAction(triggerUnitTrained, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CANCEL_TRAINING, GetTriggerUnit());
        });
        triggerUnitResearched = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitResearched, EVENT_PLAYER_UNIT_RESEARCH_CANCEL);
        TriggerAddAction(triggerUnitResearched, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CANCEL_RESEARCHING, GetTriggerUnit());
        });
        triggerUnitUpgrading = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitUpgrading, EVENT_PLAYER_UNIT_UPGRADE_CANCEL);
        TriggerAddAction(triggerUnitUpgrading, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CANCEL_UPGRADING, GetTriggerUnit());
        });
        triggerUnitReviving = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitReviving, EVENT_PLAYER_HERO_REVIVE_CANCEL);
        TriggerAddAction(triggerUnitReviving, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CANCEL_REVIVE, GetRevivingUnit());
        });
        triggerUnitConstruction = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitConstruction, EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL);
        TriggerAddAction(triggerUnitConstruction, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CANCEL_CONSTRUCTION, GetCancelledStructure());
        });

        triggerUnitTrained = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitTrained, EVENT_PLAYER_UNIT_TRAIN_FINISH);
        TriggerAddAction(triggerUnitTrained, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.FINISH_TRAINING, GetTrainedUnit());
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CREATED_ANY, GetTrainedUnit());
        });
        triggerUnitResearched = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitResearched, EVENT_PLAYER_UNIT_RESEARCH_FINISH);
        TriggerAddAction(triggerUnitResearched, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.FINISH_RESEARCHING, GetResearchingUnit());
        });
        triggerUnitUpgrading = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitUpgrading, EVENT_PLAYER_UNIT_UPGRADE_FINISH);
        TriggerAddAction(triggerUnitUpgrading, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.FINISH_UPGRADING, GetTriggerUnit());
        });
        triggerUnitReviving = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitReviving, EVENT_PLAYER_HERO_REVIVE_FINISH);
        TriggerAddAction(triggerUnitReviving, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.FINISH_REVIVE, GetRevivingUnit());
        });
        triggerUnitConstruction = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitConstruction, EVENT_PLAYER_UNIT_CONSTRUCT_FINISH);
        TriggerAddAction(triggerUnitConstruction, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.FINISH_CONSTRUCTION, GetConstructedStructure());
        });

        function unitCreatedEvent(this: void, u: unit) {
            xpcall(() => {
                UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CREATED_TRIGGER, u);
                UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CREATED_ANY, u);
            }, Logger.critical);
        }

        _G.CreateUnit = Hooks.hookResult(_G.CreateUnit, unitCreatedEvent);
        _G.CreateUnitByName = Hooks.hookResult(_G.CreateUnitByName, unitCreatedEvent);
        _G.CreateUnitAtLoc = Hooks.hookResult(_G.CreateUnitAtLoc, unitCreatedEvent);
        _G.CreateUnitAtLocByName = Hooks.hookResult(_G.CreateUnitAtLocByName, unitCreatedEvent);
        _G.BlzCreateUnitWithSkin = Hooks.hookResult(_G.BlzCreateUnitWithSkin, unitCreatedEvent);

        _G.CreateCorpse = Hooks.hookResult(_G.CreateCorpse, (u: unit) => UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CREATED_DEAD, u));

//_G.KillUnit = Hooks.hookArguments(_G.KillUnit, (u: unit) => UnitTracker.killUnit(u));

        _G.RemoveUnit = Hooks.hookArgumentsBefore(_G.RemoveUnit, (u: unit) => UnitEventTracker.getInstance().executeEvent(UnitEventTypes.REMOVED, u));
    }

    private containers: EventContainerList[] = [];
    public suspendEvents = false;

    private getContainer(types: UnitEventTypes): EventContainerList {
        if (this.containers[types] == null) this.containers[types] = new EventContainerList(types);
        return this.containers[types];
    }

    public registerAction(type: UnitEventTypes, callback: (target: unit) => void): UnitEventContainer {
        let eventContainer = this.getContainer(type);
        let container = new UnitEventContainer(type, callback);
        eventContainer.add(container);
        return container;
    }

    public executeEvent(type: UnitEventTypes, target: unit): void {
        if (this.suspendEvents) return;
        {
            let eventContainer = this.getContainer(type);
            Logger.verbose("Execute Event: " + type);
            for (let cont of eventContainer.events) {
                cont.callback(target);
            }
        }
    }

    public removeAction(container: UnitEventContainer) {
        let eventContainer = this.getContainer(container.eventType);
        eventContainer.remove(container);
    }
}