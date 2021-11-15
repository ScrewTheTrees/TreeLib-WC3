import {Vector2} from "../Vector2";

export abstract class DataTreePositionEvaluation<T> {
    public abstract evaluate(value: T): Vector2;
}