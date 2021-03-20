import {Quick} from "../../Quick";

export namespace UnitArrays {
    let _saveGroup: group;

    export function ArrayUnitsInRange(x: number, y: number, radius: number, checkArr?: unit[]) {
        const array = checkArr || [];
        if (!_saveGroup) _saveGroup = CreateGroup();
        GroupEnumUnitsInRange(_saveGroup, x, y, radius, null);
        Quick.GroupInsertIntoArray(_saveGroup, array);
        GroupClear(_saveGroup);
        return array;
    }

    export function ArrayUnitsOfPlayer(p: player, checkArr?: unit[]) {
        const array = checkArr || [];
        if (!_saveGroup) _saveGroup = CreateGroup();
        GroupEnumUnitsOfPlayer(_saveGroup, p, null);
        Quick.GroupInsertIntoArray(_saveGroup, array);
        GroupClear(_saveGroup);
        return array;
    }

    export function ArrayUnitsInRangeOfPlayers(x: number, y: number, radius: number, play: player[], checkArr?: unit[]) {
        const array = checkArr || [];
        if (!_saveGroup) _saveGroup = CreateGroup();
        GroupEnumUnitsInRange(_saveGroup, x, y, radius, null);
        Quick.GroupInsertIntoArrayIfPlayers(_saveGroup, array, play);
        GroupClear(_saveGroup);
        return array;
    }
}