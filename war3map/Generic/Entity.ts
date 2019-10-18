import {Timers} from "./Timers";

export abstract class Entity {
    private static entities: Entity[] = [];
    private static entityLoop: Function;

    protected constructor() {
        if (Entity.entityLoop == null) {
            Entity.entityLoop = () => {
                Entity.entities.forEach((entity) => {
                    entity._updateEntity();
                });
            };
            Timers.addFastTimerCallback("entityLoop",Entity.entityLoop);
        }
        Entity.entities.push(this);
    }

    private _updateEntity() {
        this["step"]();
    }

    abstract step(): void;

    public remove() {
        let index = Entity.entities.indexOf(this);
        if (index != -1) {
            Entity.entities.splice(index, 1);
        }

    }
}