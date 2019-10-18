export class WaveUnitTypes {
    public static unitTypes: number[] = [];

    public static init() {
        WaveUnitTypes.unitTypes[1] = FourCC("h000");
    }

    public static get(index: number) {
        let ret = WaveUnitTypes.unitTypes[index];
        if (!ret) {
            ret = WaveUnitTypes.unitTypes[GetRandomInt(1, WaveUnitTypes.unitTypes.length - 1)]
        }

        return ret;
    }
}

ceres.addHook("main::after", WaveUnitTypes.init);