export namespace Quick {

    export function Splice(arr: any[], index: number) {
        arr[index] = arr[arr.length - 1];
        delete arr[arr.length - 1];
    }

    export function Push<T>(arr: T[], value: T) {
        arr[arr.length] = value;
    }

    export function GroupToUnitArray(g: group): unit[] {
        let units = [];
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
}