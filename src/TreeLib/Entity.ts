import {Quick} from "./Quick";

/**
 * Entities are great for when you need logic executed continuously.
 * Loops in intervals of 0.01 , changeable with timerdelay on an entity level, at any time.
 */
export abstract class Entity {
    private static containers: Map<number, EntityContainer> = new Map();
    public static pauseExecution = false;

    //TimerDelay API
    protected _timerDelay: number;
    protected _timer: timer = CreateTimer();

    get timerDelay(): number {
        return this._timerDelay;
    }
    set timerDelay(value: number) {
        this.remove();
        value = Math.round(value * 1_000) / 1_000; //Should give 0.001 of precision.
        this._timerDelay = value;
        this.add();
    }
    public timerYield(time: number) {
        this.resetTimer();
        TimerStart(this._timer, time, true, () => {
            this.resetTimer();
            this.step();
        });
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
        this.removeTimer();
    }
    public add() {
        Entity.getContainer(this.timerDelay).add(this);
        this.resetTimer();
        TimerStart(this._timer, this.timerDelay, true, () => {
            this.step();
        });
    }
    private removeTimer() {
        PauseTimer(this._timer);
        DestroyTimer(this._timer);
    }
    private resetTimer() {
        this.removeTimer();
        this._timer = CreateTimer();
    }

    public static getDebugInfo() {
        const data: string[] = [];
        this.containers.forEach((container) => {
            let str = `Container: ${container.identifier},  Entities: ${container.count()}`;
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
        });
        return data;
    }
}

class EntityContainer {
    public readonly entities: Entity[] = [];
    public readonly identifier: number;

    public constructor(timeBetween: number) {
        this.identifier = timeBetween;
    }

    public count() {
        return this.entities.length;
    }
    public isEmpty() {
        return this.count() <= 0;
    }

    public add(e: Entity) {
        Quick.PushIfMissing(this.entities, e);
    }
    public remove(e: Entity) {
        Quick.Remove(this.entities, e);
        return e;
    }
}