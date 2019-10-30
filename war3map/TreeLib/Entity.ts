import {Timers} from "./Timers";
import {Logger} from "./Logger";

/**
 * Entities are great for when you need logic executed continuously.
 * Loops in intervals of 0.01 , changeable with timerdelay on an entity level, at any time.
 */
export abstract class Entity {
    private static entities: Entity[] = [];
    private static entityLoop: Function;

    private _internalTimer: number = 0;
    protected _timerDelay: number = 0.01;

    protected constructor() {
        if (Entity.entityLoop == null) {
            Entity.entityLoop = () => {
                Entity.entities.forEach((entity) =>
                    xpcall(() => {
                        entity._internalTimer += 0.01;
                        if (entity._internalTimer >= entity._timerDelay) {
                            entity.step();
                            entity._internalTimer = 0;
                        }
                    }, () => Logger.LogCritical));
            };
            Timers.getInstance().addFastTimerCallback(Entity.entityLoop);
        }
        Entity.entities.push(this);
    }

    abstract step(): void;

    public remove() {
        let index = Entity.entities.indexOf(this);
        if (index != -1) {
            Entity.entities.splice(index, 1);
        }
    }
}