import {Quick} from "./Quick";
import {Logger} from "./Logger";

/**
 * Entities are great for when you need logic executed continuously.
 * Loops in intervals of 0.01 , changeable with timerdelay on an entity level, at any time.
 */
export abstract class Entity {
    private static containers: Map<number, EntityContainer> = new Map();
    public static pauseExecution = false;

    //TimerDelay API
    protected _timerDelay: number;
    get timerDelay(): number {
        return this._timerDelay;
    }
    set timerDelay(value: number) {
        this.remove();
        value = Math.round(value * 1_000) / 1_000; //Should give 0.001 of precision.
        this._timerDelay = value;
        this.add();
    }

    public constructor(timerDelay: number = 0.01) {
        this._timerDelay = Math.round(timerDelay * 1_000) / 1_000;
        this.add();
    }
    //Logic to execute when the logic beat hits.
    abstract step(): void;

    private static getContainer(id: number) {
        let container = Entity.containers.get(id);
        if (!container) {
            container = new EntityContainer(id);
            Entity.containers.set(id, container);
        }
        return container;
    }

    /** Purges the Entity from the timer system, thus making it no longer run "step()", and also allows it
     * to properly garbage collect.
     **/
    public remove() {
        const container = Entity.getContainer(this.timerDelay);
        container.remove(this);
    }
    public add() {
        Entity.getContainer(this.timerDelay).add(this);
    }

    public static getDebugInfo() {
        const data: string[] = [];
        for (let container of this.containers.values()) {
            let str = `Container: ${container.identifier},  Entities: ${container.count()},  Disabled: ${container.isDisabled()}`;
            if (!container.isEmpty()) {
                str += ",  Names(T5): ";
                for (let i = 0; i < math.min(container.entities.length, 5); i++) {
                    const ent = container.entities[i];
                    str += ent.constructor.name + ", ";
                }
                if (container.entities.length > 5) {
                    str += ", ...etc";
                }
            }
            Quick.Push(data, str);
        }
        return data;
    }
}

class EntityContainer {
    public readonly entities: Entity[] = [];
    public readonly loop: trigger;
    public readonly identifier: number;
    public readonly stepCode: (this: void) => void;

    public constructor(timeBetween: number) {
        this.loop = CreateTrigger();
        this.identifier = timeBetween;
        this.stepCode = () => {
            for (let entity of this.entities) {
                entity.step();
            }
        }

        TriggerRegisterTimerEvent(this.loop, timeBetween, true);
        TriggerAddAction(this.loop, () => {
            this.step();
        });
    }

    public isDisabled() {
        return !IsTriggerEnabled(this.loop);
    }
    public count() {
        return this.entities.length;
    }
    public isEmpty() {
        return this.count() <= 0;
    }

    public add(e: Entity) {
        Quick.PushIfMissing(this.entities, e);
        if (!IsTriggerEnabled(this.loop)) {
            EnableTrigger(this.loop);
        }
    }
    public remove(e: Entity) {
        Quick.Remove(this.entities, e);
        return e;
    }
    private step() {
        if (!Entity.pauseExecution) {
            xpcall(this.stepCode, Logger.critical);
        }
    }
}