import {Queue} from "./Queue";
import {Logger} from "../../Logger";
import {Quick} from "../../Quick";
import {UnitGroupAction} from "../Actions/UnitGroupAction";

/**
 * A unit queue is a queue for a several unit operating together. (Most actions are capped at 12 units)
 */
export class UnitGroupQueue implements Queue {
    isFinished: boolean = false;
    isPaused: boolean = false;
    public targets: unit[];
    public allActions: UnitGroupAction[] = [];
    public currentActionIndex = 0;

    constructor(targets: unit[], ...unitActions: UnitGroupAction[]) {
        this.targets = targets;
        this.allActions.push(...unitActions);
    }

    private performAction(timeStep: number) {
        if (this.currentActionIndex < this.allActions.length) {
            let action = this.allActions[this.currentActionIndex];
            action.update(this.targets, timeStep, this);
            if (action.isFinished) {
                this.currentActionIndex += 1;
                Logger.LogVerbose("To next action: ", this.currentActionIndex + 1, "/", this.allActions.length);
                if (this.currentActionIndex < this.allActions.length) {
                    let newAction = this.allActions[this.currentActionIndex];
                    newAction.init(this.targets, this);
                }
            }
        } else {
            this.isFinished = true;
            Logger.LogVerbose("Finished queue.");
        }
    }

    update(timeStep: number): void {
        //if (IsValidUnit(this.target)) {
            //if (IsUnitAliveBJ(this.target)) {
                this.performAction(timeStep);
            //}
        //} else {
            //Logger.LogVerbose("Unit has been removed, queue will be removed.");
            //this.isFinished = true;
        //}
    }

    public init() {
        this.allActions[this.currentActionIndex].init(this.targets, this);
    }

    public addAction(action: UnitGroupAction): UnitGroupQueue {
        Quick.Push(this.allActions, action);
        return this;
    }

    public getActionCount(): number {
        return this.allActions.length;
    }

    public resetActions() {
        for (let action of this.allActions) {
            action.isFinished = false;
        }
    }

}