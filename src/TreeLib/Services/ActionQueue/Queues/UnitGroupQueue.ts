import {IQueue} from "./IQueue";
import {Logger} from "../../../Logger";
import {Quick} from "../../../Quick";
import {IUnitGroupAction} from "../Actions/IUnitGroupAction";
import {IsValidUnit} from "../../../Misc";
import {Entity} from "../../../Entity";

/**
 * A unit queue is a queue for a several unit operating together. (Most actions are capped at 12 units)
 */
export class UnitGroupQueue extends Entity implements IQueue {
    isFinished: boolean = false;
    isPaused: boolean = false;
    public targets: unit[];
    public allActions: IUnitGroupAction[] = [];
    public currentActionIndex = 0;

    constructor(targets: unit[], ...unitActions: IUnitGroupAction[]) {
        super(0.25);
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
            this.finish();
            Logger.LogVerbose("Finished queue.");
        }

    }

    step(): void {
        for (let i = this.targets.length; i >= 0; i--) {
            let u = this.targets[i];
            if (!IsValidUnit(u) || IsUnitDeadBJ(u)) {
                Quick.Slice(this.targets, i);
            }
        }
        //if (IsValidUnit(this.target)) {
        //if (IsUnitAliveBJ(this.target)) {
        this.performAction(this.timerDelay);
        //}
        //} else {
        //Logger.LogVerbose("Unit has been removed, queue will be removed.");
        //this.isFinished = true;
        //}
    }

    public init() {
        this.add();
        this.allActions[this.currentActionIndex].init(this.targets, this);
    }

    public finish(): void {
        this.remove();
        this.isFinished = true;
    }

    public addAction(action: IUnitGroupAction): UnitGroupQueue {
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