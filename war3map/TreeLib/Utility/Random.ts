/**
 * Random is used to have random generators independent of each other.
 * Great if you want to make minecraft.
 */
export class Random {

    public static readonly MIN: number = -2147483648; // Int32 min
    public static readonly MAX: number = 2147483647; // Int32 max

    private readonly _seed: number;
    private _value: number = NaN;

    constructor(seed: number) {
        this._seed = Random.getSafeSeed(seed);
        this.reset();
    }

    public next(min: number = 0, pseudoMax: number = 1): number {
        this.recalculate();
        return Random.map(this._value, Random.MIN, Random.MAX, min, pseudoMax);
    }

    public nextInt(min: number = 0, max: number = 10): number {
        this.recalculate();
        return Math.floor(Random.map(this._value, Random.MIN, Random.MAX, min, max + 1));
    }

    public reset(): void {
        this._value = this._seed;
    }


    private recalculate(): void {
        this._value = Random.xorshift(this._value);
    }

    private static xorshift(value: number) {
        value ^= value << 13;
        value ^= value >>> 17;
        value ^= value << 5;
        return value;
    }

    private static map(val: number, minFrom: number, maxFrom: number, minTo: number, maxTo: number) {
        return ((val - minFrom) / (maxFrom - minFrom)) * (maxTo - minTo) + minTo;
    }

    private static getSafeSeed(seed: number) {
        if (seed === 0) return 1;
        return seed;
    }
}