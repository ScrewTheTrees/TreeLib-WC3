import {Quick} from "../../Quick";

export namespace UnitArrays {
    export function ArrayUnitsInRange(x: number, y: number, radius: number, checkArr?: unit[]) {
        const array = checkArr || [];
        let g = CreateGroup();
        GroupEnumUnitsInRange(g, x, y, radius, null);
        Quick.GroupInsertIntoArray(g, array);
        DestroyGroup(g);
        return array;
    }

    export function ArrayUnitsOfPlayer(p: player, checkArr?: unit[]) {
        const array = checkArr || [];
        const g = CreateGroup();
        GroupEnumUnitsOfPlayer(g, p, null);
        Quick.GroupInsertIntoArray(g, array);
        DestroyGroup(g);
        return array;
    }
}