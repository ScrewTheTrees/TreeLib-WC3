import {Entity} from "../Generic/Entity";
import {Point} from "../Generic/Point";
import {GetTerrainHeight} from "../ExtensionFunctions";
import {linearInterpolate} from "../Generic/Misc";

export class ProjectileSkillshot extends Entity {
    public readonly model: string;
    public size: number;
    public owner: unit;
    public previousPoint: Point;
    public currentPoint: Point;
    public targetPoint: Point;
    public direction: number;
    public lifeSpan: number;
    public speed: number;
    private readonly effect: effect;
    public effectHeight: number;
    private cliffLevel: number;

    constructor(model: string, size: number, owner: unit, startLocation: Point, targetLocation: Point, lifeSpan: number, speed: number) {
        super();
        this.model = model;
        this.size = size;
        this.owner = owner;
        this.previousPoint = startLocation;
        this.currentPoint = startLocation;
        this.targetPoint = targetLocation;
        this.lifeSpan = lifeSpan;
        this.speed = speed;
        this.effectHeight = 96;
        this.cliffLevel = GetTerrainCliffLevel(startLocation.x, startLocation.y);

        this.direction = this.currentPoint.directionTo(this.targetPoint);

        this.effect = AddSpecialEffect(this.model, startLocation.x, startLocation.y);
        BlzSetSpecialEffectYaw(this.effect, this.direction);
        BlzSetSpecialEffectPosition(this.effect, startLocation.x, startLocation.y, BlzGetLocalSpecialEffectZ(this.effect) + 96);
    }

    public move(nextPoint: Point) {
        this.previousPoint = this.currentPoint;
        this.currentPoint = nextPoint;
        let currentZ = BlzGetLocalSpecialEffectZ(this.effect);
        let wantedZ = GetTerrainHeight(nextPoint.x, nextPoint.y) + this.effectHeight;
        BlzSetSpecialEffectPosition(this.effect, nextPoint.x, nextPoint.y, linearInterpolate(currentZ, wantedZ, 1));
        BlzSetSpecialEffectYaw(this.effect, this.direction * bj_DEGTORAD);
    }

    step(): void {
        const nextPosition: Point = this.currentPoint.polarProject(this.speed, this.direction);
        if (GetTerrainCliffLevel(nextPosition.x, nextPosition.y) <= this.cliffLevel) {
            this.cliffLevel = GetTerrainCliffLevel(nextPosition.x, nextPosition.y);
            this.move(nextPosition);
        } else {
            this.remove();
        }
        if (!RectContainsCoords(GetEntireMapRect(), nextPosition.x, nextPosition.y)) {
            this.remove();
        }
    }

    remove() {
        super.remove();
        DestroyEffect(this.effect);
    }

    private getOwningPlayer() {
        GetOwningPlayer(this.owner);
    }

}