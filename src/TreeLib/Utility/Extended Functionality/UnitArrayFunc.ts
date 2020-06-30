const _enumGroupToUse = CreateGroup();

export function ArrayUnitsInRange(x: number, y: number, radius: number, filter?: (filterUnit: unit) => boolean) {
    let array: unit[] = [];
    let filterEnum = Filter(() => {
        if (filter == null || filter(GetFilterUnit()))
            array.push(GetFilterUnit());
        return false;
    });
    GroupEnumUnitsInRange(_enumGroupToUse, x, y, radius, filterEnum);
    DestroyFilter(filterEnum);
    return array;
}

export function ArrayUnitsOfPlayer(p: player, filter?: (filterUnit: unit) => boolean) {
    let array: unit[] = [];
    let filterEnum = Filter(() => {
        if (filter == null || filter(GetFilterUnit()))
            array.push(GetFilterUnit());
        return false;
    });
    GroupEnumUnitsOfPlayer(_enumGroupToUse, p, filterEnum);
    DestroyFilter(filterEnum);
    return array;
}