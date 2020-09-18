import {Hooks} from "../Hooks";
import {UnitEventTypeGetName, UnitEventTypes} from "./UnitEventTypes";
import {Logger} from "../Logger";
import {EventContainerList} from "./EventContainerList";
import {UnitEventContainer} from "./UnitEventContainer";

export class UnitEventTracker {
    private static instance: UnitEventTracker;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new UnitEventTracker();
            Hooks.set(this.name, this.instance);
        }
        return this.instance;
    }

    private constructor() {
    }

    private containers: EventContainerList[] = [];

    private getContainer(types: UnitEventTypes): EventContainerList {
        if (this.containers[types] == null) this.containers[types] = new EventContainerList(types);
        return this.containers[types];
    }

    public registerAction(type: UnitEventTypes, callback: (target: unit) => void) {
        let eventContainer = this.getContainer(type);
        let container = new UnitEventContainer(type, callback);
        eventContainer.add(container);
        return container;
    }

    public executeEvent(type: UnitEventTypes, target: unit) {
        let eventContainer = this.getContainer(type);
        Logger.verbose("Execute Event: " + UnitEventTypeGetName(type));
        eventContainer.events.forEach((cont) => {
            xpcall(() => {
                cont.callback(target);
            }, Logger.critical)
        });
    }

    public removeAction(container: UnitEventContainer) {
        let eventContainer = this.getContainer(container.eventType);
        eventContainer.remove(container);
    }
}

{
    _G.main = Hooks.hookArgumentsBefore(_G.main, () => {
        const triggerUnitDeath = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitDeath, EVENT_PLAYER_UNIT_DEATH);
        TriggerAddAction(triggerUnitDeath, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.KILLED, GetDyingUnit())
        });

        const triggerUnitSummoned = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitSummoned, EVENT_PLAYER_UNIT_SUMMON);
        TriggerAddAction(triggerUnitSummoned, () => {
            const tracker = UnitEventTracker.getInstance();
            tracker.executeEvent(UnitEventTypes.SUMMONED, GetSummonedUnit());
            tracker.executeEvent(UnitEventTypes.CREATED_ANY, GetSummonedUnit());
        });

        const triggerUnitHired = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitHired, EVENT_PLAYER_UNIT_SELL);
        TriggerAddAction(triggerUnitHired, () => {
            const tracker = UnitEventTracker.getInstance();
            tracker.executeEvent(UnitEventTypes.SOLD_UNIT, GetSoldUnit());
            tracker.executeEvent(UnitEventTypes.CREATED_ANY, GetSoldUnit());
        });
        StartFuncs();
        CancelFuncs();
        FinishFuncs();
    });


    function StartFuncs() {
        const triggerUnitTrained = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitTrained, EVENT_PLAYER_UNIT_TRAIN_START);
        TriggerAddAction(triggerUnitTrained, () => {
            const tracker = UnitEventTracker.getInstance();
            tracker.executeEvent(UnitEventTypes.START_TRAINING, GetTriggerUnit());
        });
        const triggerUnitResearched = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitResearched, EVENT_PLAYER_UNIT_RESEARCH_START);
        TriggerAddAction(triggerUnitResearched, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.START_RESEARCH, GetResearchingUnit());
        });
        const triggerUnitUpgrading = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitUpgrading, EVENT_PLAYER_UNIT_UPGRADE_START);
        TriggerAddAction(triggerUnitUpgrading, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.START_UPGRADE, GetTriggerUnit());
        });
        const triggerUnitReviving = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitReviving, EVENT_PLAYER_HERO_REVIVE_START);
        TriggerAddAction(triggerUnitReviving, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.START_REVIVE, GetRevivingUnit());
        });

        const triggerUnitConstruction = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitConstruction, EVENT_PLAYER_UNIT_CONSTRUCT_START);
        TriggerAddAction(triggerUnitConstruction, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.START_CONSTRUCTION, GetConstructingStructure());
        });
    }


    function CancelFuncs() {
        const triggerUnitTrained = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitTrained, EVENT_PLAYER_UNIT_TRAIN_CANCEL);
        TriggerAddAction(triggerUnitTrained, () => {
            const tracker = UnitEventTracker.getInstance();
            tracker.executeEvent(UnitEventTypes.CANCEL_TRAINING, GetTriggerUnit());
        });
        const triggerUnitResearched = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitResearched, EVENT_PLAYER_UNIT_RESEARCH_CANCEL);
        TriggerAddAction(triggerUnitResearched, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CANCEL_RESEARCHING, GetTriggerUnit());
        });
        const triggerUnitUpgrading = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitUpgrading, EVENT_PLAYER_UNIT_UPGRADE_CANCEL);
        TriggerAddAction(triggerUnitUpgrading, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CANCEL_UPGRADING, GetTriggerUnit());
        });
        const triggerUnitReviving = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitReviving, EVENT_PLAYER_HERO_REVIVE_CANCEL);
        TriggerAddAction(triggerUnitReviving, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CANCEL_REVIVE, GetRevivingUnit());
        });
        const triggerUnitConstruction = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitConstruction, EVENT_PLAYER_UNIT_CONSTRUCT_CANCEL);
        TriggerAddAction(triggerUnitConstruction, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.CANCEL_CONSTRUCTION, GetConstructingStructure());
        });
    }

    function FinishFuncs() {
        const triggerUnitTrained = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitTrained, EVENT_PLAYER_UNIT_TRAIN_FINISH);
        TriggerAddAction(triggerUnitTrained, () => {
            const tracker = UnitEventTracker.getInstance();
            tracker.executeEvent(UnitEventTypes.FINISH_TRAINING, GetTrainedUnit());
            tracker.executeEvent(UnitEventTypes.CREATED_ANY, GetTrainedUnit());
        });
        const triggerUnitResearched = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitResearched, EVENT_PLAYER_UNIT_RESEARCH_FINISH);
        TriggerAddAction(triggerUnitResearched, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.FINISH_RESEARCHING, GetResearchingUnit());
        });
        const triggerUnitUpgrading = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitUpgrading, EVENT_PLAYER_UNIT_UPGRADE_FINISH);
        TriggerAddAction(triggerUnitUpgrading, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.FINISH_UPGRADING, GetTriggerUnit());
        });
        const triggerUnitReviving = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitReviving, EVENT_PLAYER_HERO_REVIVE_FINISH);
        TriggerAddAction(triggerUnitReviving, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.FINISH_REVIVE, GetRevivingUnit());
        });
        const triggerUnitConstruction = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(triggerUnitConstruction, EVENT_PLAYER_UNIT_CONSTRUCT_FINISH);
        TriggerAddAction(triggerUnitConstruction, () => {
            UnitEventTracker.getInstance().executeEvent(UnitEventTypes.FINISH_CONSTRUCTION, GetConstructedStructure());
        });
    }

    function unitCreatedEvent(this: void, u: unit) {
        const tracker = UnitEventTracker.getInstance();
        tracker.executeEvent(UnitEventTypes.CREATED_TRIGGER, u);
        tracker.executeEvent(UnitEventTypes.CREATED_ANY, u);
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