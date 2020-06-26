import {Hooks} from "../Hooks";

export class UnitMoveAssistant {
    private static instance: UnitMoveAssistant;
    private units: unit[] = [];

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new UnitMoveAssistant();
            Hooks.set(this.name, this.instance);
        }
        return this.instance;
    }

    constructor() {

    }
}