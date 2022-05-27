/**
 * This metadata is only present using my own build tools, It should be present in my WC3 TSTL template.
 */
export class TreeLibMeta {
    public static getMapVersion(): MapVersion {
        // @ts-ignore
        if (mapVersion) return mapVersion; //Supplied by operation.ts and build.json, only works with my Template currently.
        else return new MapVersion();
    }
}

export class MapVersion {
    public major: string = "";
    public minor: string = "";
    public build: string = "";
    public date: string = "";
}