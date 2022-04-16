import {IQueue} from "./IQueue";
import {IUnitAction} from "../Actions/IUnitAction";
import {Logger} from "../../Logger";
import {Quick} from "../../Quick";
import {Entity} from "../../Entity";
import {IsValidUnit} from "../../Misc";

/**
 * A unit queue is a queue for a singular unit operating on its own.
 */
export class UnitQueue extends Entity implements IQueue {
    isFinished: boolean = false;
    isPaused: boolean = false;
    public target: unit;
    public allActions: IUnitAction[] = [];
    public currentActionIndex = 0;

    constructor(target: unit, ...unitActions: IUnitAction[]) {
        super(0.25);
        this.target = target;
        this.allActions.push(...unitActions);
    }

    private performAction(timeStep: number) {
        if (this.currentActionIndex < this.allActions.length) {
            let action = this.allActions[this.currentActionIndex];
            action.update(this.target, timeStep, this);
            if (action.isFinished) {
                this.currentActionIndex += 1;
                Logger.LogVerbose("To next action: ", this.currentActionIndex + 1, "/", this.allActions.length);
                if (this.currentActionIndex < this.allActions.length) {
                    let newAction = this.allActions[this.currentActionIndex];
                    newAction.init(this.target, this);
                }
            }
        } else {
            this.finish();
            Logger.LogVerbose("Finished queue.");
        }
    }

    step() {
        if (IsValidUnit(this.target)) {
            if (IsUnitAliveBJ(this.target)) {
                this.performAction(this.timerDelay);
            }
        } else {
            Logger.LogVerbose("Unit has been removed, queue will be removed.");
            this.finish();
        }
    }

    public init() {
        this.add();
        this.allActions[this.currentActionIndex].init(this.target, this);
    }

    public finish(): void {
        this.remove();
        this.isFinished = true;
    }

    public addAction(action: IUnitAction): UnitQueue {
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