/**
 * My wrapper for Locations, contains some useful helper functions and wrappers from other functions.
 * In particular it provides functions that automatically cleans up the locations automatically.
 */
import {Quick} from "../../Quick";
import {IRecyclable} from "./IRecyclable";
import {Vector2} from "./Vector2";
import {Rectangle} from "./Rectangle";

export class Circle implements IRecyclable {
    public center: Vector2
    public radius: number;

    constructor(center: Vector2, radius: number) {
        this.center = center.copy();
        this.radius = radius;
    }

    private static stash: Circle[] = [];
    public static new(center: Vector2, radius: number): Circle {
        if (this.stash.length > 0) return this.stash.pop()!.updateTo(center, radius);
        else return new Circle(center, radius)
    }
    public static recycle(p: Circle) {
        if (!Quick.Contains(this.stash, p))
            Quick.Push(this.stash, p);
    }
    public recycle() {
        Circle.recycle(this);
        return this;
    }
    public updateTo(center: Vector2, radius: number) {
        this.center = center.copy();
        this.radius = radius;
        return this;
    }


    //Intersects
    public intersectRectangle(other: Rectangle) {
        let circleDistanceX = math.abs(this.center.x - other.xMin);
        let circleDistanceY = math.abs(this.center.y - other.yMin);

        if (circleDistanceX > (other.width/2 + this.radius)) return false;
        if (circleDistanceY > (other.height/2 + this.radius)) return false;

        if (circleDistanceX <= (other.width/2 + this.radius)) return true;
        if (circleDistanceY <= (other.height/2 + this.radius)) return true;

        let cornerDistance_sq = (circleDistanceX - other.width/2)^2 +
            (circleDistanceY - other.height/2)^2;

        return (cornerDistance_sq <= (this.radius^2));
    }

    public intersectVector2(other: Vector2) {
        return (other.distanceToSquared(this.center) <= (this.radius^2));
    }

    //Basic Shit
    public toString(): string {
        return "Circle { center {x:" + this.center.x + ", y:" + this.center.y + " }, radius: " + this.radius + " }";
    }

    public equals(other: Circle) {
        return other.center.equals(this.center) && this.radius == other.radius;
    }
}