export class EncodingHex {
    public static To32BitHexString(num: number) {
        return string.format('%08X', num);
    }

    public static ToNumber(someHexString: string) {
        return tonumber(someHexString, 16) || 0;
    }
}