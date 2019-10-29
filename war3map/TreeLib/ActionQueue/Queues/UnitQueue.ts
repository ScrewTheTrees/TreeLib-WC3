import {Queue} from "./Queue";
import {UnitAction} from "../Actions/UnitAction";
import {Logger} from "../../Logger";


export class UnitQueue implements Queue {
    isFinished: boolean = false;
    private readonly target: unit;
    protected allActions: UnitAction[] = [];
    protected currentActionIndex = 0;

    constructor(target: unit, ...unitActions: UnitAction[]) {
        this.target = target;
        this.allActions.push(...unitActions);
    }

    private performAction() {
        if (this.currentActionIndex < this.allActions.length) {
            let action = this.allActions[this.currentActionIndex];
            action.update(this.target);
            if (action.isFinished) {
                Logger.LogVerbose("To next action: ", this.currentActionIndex + 1, "/", this.allActions.length);
                this.currentActionIndex += 1;
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

    update(): void {
        if (GetUnitTypeId(this.target) != 0) {
            if (IsUnitAliveBJ(this.target)) {
                this.performAction();
            }
        } else {
            Logger.LogVerbose("Unit has been removed, queue will be removed.");
            this.isFinished = true;
        }
    }

    public addAction(action: UnitAction) {
        this.allActions.push(action);
    }

}