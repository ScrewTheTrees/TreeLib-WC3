//!!!!! KEEP 0 DEPENDENCIES

export namespace Quick {

    export function Slice<T>(arr: T[], index: number) {
        arr[index] = arr[arr.length - 1];
        arr.pop();
    }
    export function Remove<T>(arr: T[], value: T) {
        let index = arr.indexOf(value);
        if (index >= 0) {
            Slice(arr, index);
        }
    }

    export function Push<T>(arr: T[], value: T) {
        arr[arr.length] = value;
    }
    export function PushIfMissing<T>(arr: T[], value: T) {
        if (!Quick.Contains(arr, value)) {
            Push(arr, value);
        }
    }

    export function Transfer<T>(from: T[], to: T[]) {
        let value = from.pop();
        while (value) {
            to.push(value);
            value = from.pop();
        }
    }

    export function Clear<T>(arr: T[]) {
        const count = arr.length;
        for (let i = 0; i < count; i++) {
            delete arr[i];
        }
    }

    export function Contains<T>(arr: T[], data: T) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == data) return true;
        }
        return false;
    }

    export function GroupToUnitArray(g: group): unit[] {
        let units: unit[] = [];
        let val = FirstOfGroup(g);
        while (val != null) {
            Push(units, val);
            GroupRemoveUnit(g, val);
            val = FirstOfGroup(g);
        }

        return units;
    }

    export function GroupToUnitArrayDestroy(g: group): unit[] {
        let units = GroupToUnitArray(g);
        DestroyGroup(g);
        return units;
    }

    export function GroupInsertIntoArray(g: group, arr: unit[]): unit[] {
        let val = FirstOfGroup(g);
        while (val != null) {
            Push(arr, val);
            GroupRemoveUnit(g, val);
            val = FirstOfGroup(g);
        }
        return arr;
    }

    export function GroupInsertIntoArrayIfPlayers(g: group, arr: unit[], play: player[]): unit[] {
        let val = FirstOfGroup(g);
        while (val != null) {
            if (Contains(play, GetOwningPlayer(val))) {
                Push(arr, val);
            }
            GroupRemoveUnit(g, val);
            val = FirstOfGroup(g);
        }
        return arr;
    }

    export function UnitArrayToGroup(g: unit[]): group {
        let units = CreateGroup();
        for (let i = 0; i < g.length; i++) {
            GroupAddUnit(units, g[i]);
        }
        return units;
    }
}