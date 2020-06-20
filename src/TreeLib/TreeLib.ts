export class TreeLib {
    public static version = "1.3.2";
    public static creator = "ScrewTheTrees";
    public static libName = "TreeLib";

    public static getIntroductionString() {
        return this.libName + " " + this.version + " - " + this.creator;
    }

    public static getMapVersion(): MapVersion {
        // @ts-ignore
        if (mapVersion) return mapVersion; //Supplied by operation.js and build.json
        else return new MapVersion();
    }
}

export class MapVersion {
    public major: string = "";
    public minor: string = "";
    public build: string = "";
    public date: string = "";
}