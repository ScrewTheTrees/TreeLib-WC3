import {Queue} from "./Queue";
import {UnitAction} from "../Actions/UnitAction";
import {Logger} from "../../Logger";
import {IsValidUnit} from "../../Misc";

/**
 * A unit queue is a queue for a singular unit operating on its own.
 */
export class UnitQueue implements Queue {
    isFinished: boolean = false;
    private readonly target: unit;
    protected allActions: UnitAction[] = [];
    public currentActionIndex = 0;

    constructor(target: unit, ...unitActions: UnitAction[]) {
        this.target = target;
        this.allActions.push(...unitActions);
    }

    private performAction(timeStep: number) {
        if (this.currentActionIndex < this.allActions.length) {
            let action = this.allActions[this.currentActionIndex];
            action.update(this.target, timeStep);
            if (action.isFinished) {
                this.currentActionIndex += 1;
                Logger.LogVerbose("To next action: ", this.currentActionIndex + 1, "/", this.allActions.length);
                if (this.currentActionIndex < this.allActions.length) {
                    let newAction = this.allActions[this.currentActionIndex];
                    newAction.init(this.target);
                }
            }
        } else {
            this.isFinished = true;
            Logger.LogVerbose("Finished queue.");
        }
    }

    update(timeStep: number): void {
        if (IsValidUnit(this.target)) {
            if (IsUnitAliveBJ(this.target)) {
                this.performAction(timeStep);
            }
        } else {
            Logger.LogVerbose("Unit has been removed, queue will be removed.");
            this.isFinished = true;
        }
    }

    public addAction(action: UnitAction): UnitQueue {
        this.allActions.push(action);
        return this;
    }

    public getActionCount(): number {
        return this.allActions.length;
    }

}