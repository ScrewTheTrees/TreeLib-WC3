export class EncodingInt14 {
    private static readonly int14Offset = 8_191;

    //This is only to allow safe network sending of data, since null terminated strings
    //ruins the string by terminating it early.
    public static ToChars(num: number): string {
        let num1 = ((num + this.int14Offset) % 0x80) + 64;
        let num2 = (((num + this.int14Offset) >>> 7) % 0x80) + 64;

        return string.char(num1)
            + string.char(num2);
    }

    //Unpack these special char ints on the other side.
    public static ToInt(str: string): number {
        let char1 = str.charAt(0);
        let char2 = str.charAt(1);

        let x = (string.byte(char1) - 64);
        x += ((string.byte(char2) - 64) << 7);
        x -= this.int14Offset;

        return x;
    }
}