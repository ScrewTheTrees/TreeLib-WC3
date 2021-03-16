//!!!!! KEEP 0 DEPENDENCIES
export namespace Quick {

    export function Slice(arr: any[], index: number) {
        arr[index] = arr[arr.length - 1];
        arr.pop();
    }

    export function Push<T>(arr: T[], value: T) {
        arr[arr.length] = value;
    }

    export function Transfer(from: unit[], to: unit[]) {
        {
            let value = from.pop();
            while (value) {
                to.push(value);
                value = from.pop();
            }
        }
    }

    export function Clear<T>(arr: T[]) {
        {
            const count = arr.length;
            for (let i = 0; i < count; i++) {
                delete arr[i];
            }
        }
    }

    export function GroupToUnitArray(g: group): unit[] {
        {
            let units: unit[] = [];
            let val = FirstOfGroup(g);
            while (val != null) {
                Push(units, val);
                GroupRemoveUnit(g, val);
                val = FirstOfGroup(g);
            }

            return units;
        }
    }

    export function GroupInsertIntoArray(g: group, arr: unit[]): unit[] {
        {
            let val = FirstOfGroup(g);
            while (val != null) {
                Push(arr, val);
                GroupRemoveUnit(g, val);
                val = FirstOfGroup(g);
            }
            return arr;
        }
    }

    export function GroupToUnitArrayDestroy(g: group): unit[] {
        let units = GroupToUnitArray(g);
        DestroyGroup(g);
        return units;
    }

    export function UnitArrayToGroup(g: unit[]): group {
        {
            let units = CreateGroup();
            for (let i = 0; i < g.length; i++) {
                GroupAddUnit(units, g[i]);
            }
            return units;
        }
    }
}